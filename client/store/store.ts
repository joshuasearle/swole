import { action, observable, makeObservable } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { useMemo } from "react"
import {
  ExerciseFragment,
  UserDataFragment,
  WorkoutExerciseFragment,
  WorkoutFragment,
} from "../generated/graphql"
import { UserDataMap } from "../types/UserDataMap"

// Avoids memory leak in mobx when using SSR
enableStaticRendering(typeof window === "undefined")

let store: Store

export class Store {
  constructor() {
    makeObservable(this)
  }

  @observable loggedIn: boolean = false

  @observable userDataMap: UserDataMap | undefined

  @action hydrate = (userData: UserDataFragment | undefined) => {
    if (!userData) return
    this.loggedIn = true
    this.userDataMap = {
      exercises: {},
      workouts: {},
      workoutExercises: {},
      sets: {},
    }

    userData.exercises.forEach((exercise) => {
      this.userDataMap!.exercises[exercise.id] = exercise
    })

    userData.workouts.forEach((workout) => {
      this.userDataMap!.workouts[workout.id] = workout

      workout.workoutExercises.forEach((workoutExercise) => {
        this.userDataMap!.workoutExercises[workoutExercise.id] = workoutExercise
      })
    })

    userData.sets.forEach((set) => {
      this.userDataMap!.sets[set.id] = set
    })
  }

  @action getExerciseById = (id: string) => {
    if (!this.userDataMap) return
    return this.userDataMap.exercises[id]
  }

  @action addExercise = (exercise: ExerciseFragment) => {
    if (!this.userDataMap) return
    this.userDataMap.exercises[exercise.id] = exercise
  }

  @action removeExercise = (exercise: ExerciseFragment) => {
    if (!this.userDataMap) return

    // Remove exercise itself
    delete this.userDataMap.exercises[exercise.id]

    // Remove sets with the exericse
    Object.keys(this.userDataMap.sets).forEach((setId) => {
      if (this.userDataMap!.sets[setId].exercise.id === exercise.id) {
        delete this.userDataMap!.sets[setId]
      }
    })

    // Filter out workoutExercises that are of the deleted exercise
    Object.keys(this.userDataMap.workouts).forEach((workoutId) => {
      const workout = this.userDataMap!.workouts[workoutId]
      this.userDataMap!.workouts[workoutId].workoutExercises =
        workout.workoutExercises.filter((workoutExercise) => {
          workoutExercise.exercise.id !== exercise.id
        })
    })

    // Remove workout exercises from the map
    Object.keys(this.userDataMap.workouts).forEach((workoutId) => {
      const workout = this.userDataMap!.workouts[workoutId]
      workout.workoutExercises.forEach((workoutExercise) => {
        if (workoutExercise.exercise.id === exercise.id) {
          delete this.userDataMap!.workoutExercises[workoutExercise.id]
        }
      })
    })
  }

  @action updateExercise = (
    exercise: ExerciseFragment,
    updates: Partial<ExerciseFragment>
  ) => {
    if (!this.userDataMap) return

    this.userDataMap.exercises[exercise.id] = {
      ...this.userDataMap.exercises[exercise.id],
      ...updates,
    }
  }

  @action getWorkoutById = (id: string) => {
    if (!this.userDataMap) return
    return this.userDataMap.workouts[id]
  }

  @action addWorkout = (workout: WorkoutFragment) => {
    if (!this.userDataMap) return
    this.userDataMap.workouts[workout.id] = workout
  }

  @action updateWorkout = (
    workout: WorkoutFragment,
    updates: Partial<WorkoutFragment>
  ) => {
    if (!this.userDataMap) return
    this.userDataMap.workouts[workout.id] = {
      ...this.userDataMap.workouts[workout.id],
      ...updates,
    }
  }

  @action workoutNameExists = (name: string) => {
    if (!this.userDataMap) return
    return !!Object.keys(this.userDataMap.workouts).find((workoutId) => {
      return this.userDataMap!.workouts[workoutId].name === name
    })
  }

  @action exerciseNameExists = (name: string) => {
    if (!this.userDataMap) return
    return !!Object.keys(this.userDataMap.exercises).find((exerciseId) => {
      return this.userDataMap!.exercises[exerciseId].name === name
    })
  }

  @action removeWorkout = (workout: WorkoutFragment) => {
    // TODO: Make sure this removes the workout everywhere

    if (!this.userDataMap) return

    delete this.userDataMap.workouts[workout.id]
  }

  @action getExerciseOptions = () => {
    if (!this.userDataMap) return

    return Object.keys(this.userDataMap.exercises).map((exerciseId) => {
      const exercise = this.userDataMap!.exercises[exerciseId]
      return { id: exerciseId, label: exercise.name }
    })
  }

  @action addWorkoutExercise = (
    workout: WorkoutFragment,
    workoutExercise: WorkoutExerciseFragment
  ) => {
    if (!this.userDataMap) return
    this.userDataMap.workouts[workout.id].workoutExercises.push(workoutExercise)
    this.userDataMap.workoutExercises[workoutExercise.id] = workoutExercise
  }
}

function initStore(initialData: UserDataFragment | undefined = undefined) {
  const _store = store ?? new Store()

  // If page has ssr methods that use mobx store,
  // it will get hydrated here
  if (initialData) {
    _store.hydrate(initialData)
  }

  // If using SSR, don't save store in global store object and always create a new store
  // This avoids data spreading over multiple sessions
  if (typeof window === "undefined") return _store

  // If not using SSR save the store as the global
  if (!store) store = _store

  return _store
}

export function useStore(
  initialState: UserDataFragment | undefined = undefined
) {
  // Memoize the output of the function, and re-evaluate when dependencies change
  // If initial state changes to undefined, the data will remain as the data is only hydrated if it is truthy
  const store = useMemo(() => initStore(initialState), [initialState])
  return store
}
