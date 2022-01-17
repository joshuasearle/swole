import { action, observable, makeObservable } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { useMemo } from "react"
import { ExerciseFragment, UserDataFragment } from "../generated/graphql"

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
    console.log(JSON.stringify(this.userData.exercises, null, 2))

    this.userData.exercises = this.userData.exercises.filter((ex) => {
      return ex.id !== exercise.id
    })

    console.log(JSON.stringify(this.userData.exercises, null, 2))
    this.userData.sets = this.userData.sets.filter((set) => {
      return set.exercise.id !== exercise.id
    })
    this.userData.workouts.forEach((workout) => {
      workout.workoutExercises = workout.workoutExercises.filter((we) => {
        return we.exercise.id !== exercise.id
      })
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
