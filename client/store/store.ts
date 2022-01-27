import { action, observable, makeObservable } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { useMemo } from "react"
import {
  ExerciseFragment,
  UserDataFragment,
  WorkoutFragment,
} from "../generated/graphql"

// Avoids memory leak in mobx when using SSR
enableStaticRendering(typeof window === "undefined")

let store: Store

export class Store {
  constructor() {
    makeObservable(this)
  }

  @observable loggedIn: boolean = false

  @observable userData: UserDataFragment | undefined

  @action hydrate = (userData: UserDataFragment | undefined) => {
    if (!userData) return
    this.loggedIn = true
    this.userData = userData
  }

  @action getExerciseById = (id: string) => {
    if (!this.userData) return
    return this.userData.exercises.find((ex) => {
      return ex.id === id
    })
  }

  @action addExercise = (exercise: ExerciseFragment) => {
    if (!this.userData) return
    this.userData!.exercises.push(exercise)
  }

  @action removeExercise = (exercise: ExerciseFragment) => {
    if (!this.userData) return

    this.userData.exercises = this.userData.exercises.filter((ex) => {
      return ex.id !== exercise.id
    })

    this.userData.sets = this.userData.sets.filter((set) => {
      return set.exercise.id !== exercise.id
    })
    this.userData.workouts.forEach((workout) => {
      workout.workoutExercises = workout.workoutExercises.filter((we) => {
        return we.exercise.id !== exercise.id
      })
    })
  }

  @action updateExercise = (
    exercise: ExerciseFragment,
    updates: Partial<ExerciseFragment>
  ) => {
    if (!this.userData) return
    const exerciseIndex = this.userData.exercises.findIndex(
      (e) => e.id === exercise.id
    )

    if (exerciseIndex === -1) return

    this.userData.exercises[exerciseIndex] = { ...exercise, ...updates }
  }

  @action getWorkoutById = (id: string) => {
    if (!this.userData) return
    return this.userData.workouts.find((w) => {
      return w.id === id
    })
  }

  @action addWorkout = (workout: WorkoutFragment) => {
    if (!this.userData) return
    this.userData!.workouts.push(workout)
  }

  @action updateWorkout = (
    workout: WorkoutFragment,
    updates: Partial<WorkoutFragment>
  ) => {
    if (!this.userData) return
    const workoutIndex = this.userData.workouts.findIndex(
      (w) => w.id === workout.id
    )

    if (workoutIndex === -1) return

    this.userData.workouts[workoutIndex] = { ...workout, ...updates }
  }

  @action workoutNameExists = (name: string) => {
    if (!this.userData) return
    return !!this.userData.workouts.find((workout) => workout.name === name)
  }

  @action exerciseNameExists = (name: string) => {
    if (!this.userData) return
    return !!this.userData.exercises.find((exercise) => exercise.name === name)
  }

  @action removeWorkout = (workout: WorkoutFragment) => {
    // TODO: Make sure this removes the workout everywhere

    if (!this.userData) return

    this.userData.workouts = this.userData.workouts.filter((w) => {
      return w.id !== workout.id
    })
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
