import { useState, useEffect } from 'react'

// NOTE variables defined outside hook (so data is shared by all)
// In other words: State management is global
let globalState = {}
let listeners = []
let actions = {}

/**
 * Any component that uses this custom hook will:
 * - use shared data (Globally managed state and listeners)
 * - re-render (when you call useState)
 *
 * Also: can manage multiple slices (products/user authentication status, etc.)
 *
 * this is basically a redux replacement so you don't need the additional dependency
 */
export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1]

  // whenever this is called we update global state
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload)
    globalState = { ...globalState, ...newState }

    for (const listener of listeners) {
      listener(globalState)
    }
  };

  // register listeners
  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState)
    }

    // Unregister listeners when component is destroyed
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState)
      }
    }
  }, [setState, shouldListen])

  return [globalState, dispatch]
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState }
  }
  actions = { ...actions, ...userActions }
}