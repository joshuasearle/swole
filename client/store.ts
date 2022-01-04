import { action, observable, computed, runInAction, makeObservable } from "mobx"
import { enableStaticRendering } from "mobx-react"
import { useMemo } from "react"

// Avoids memory leak in mobx when using SSR
enableStaticRendering(typeof window === "undefined")

let store: Store

export class Store {
  constructor() {
    makeObservable(this)
  }

  @observable data: any = {}

  @action hydrate = (data: any) => {
    if (!data) return
    this.data = data
  }
}

function initStore(initialData = null) {
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

export function useStore(initialState: any) {
  // Memoize the output of the function, and re-evaluate when dependencies change
  const store = useMemo(() => initStore(initialState), [initialState])
  return store
}
