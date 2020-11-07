import { useState, useEffect } from 'react'
import { ProductsContext } from '../context/products-context'

let globalState = {}
let listeners = []
let actions = {}

export const useStore = () => {
  const setState = useState(globalState)[1]

  const dispatch = actionIdentifer => {
    const newState = actions[actionIdentifer](globalState)
    globalState = {...globalState, ...newState} // merge old and new state

    for (const listener of listeners) {
      listener(globalState)
    }
  }

  useEffect(() => {
    listeners.push(setState)

    return () => {
      // remove listeners (cleanup) when component unmounts
      listeners = listeners.filter(li => li !== setState)
    }

  }, [setState]) // effect will run only when component mounts

  return [globalState, dispatch]
}

export const initStore = () => (userActions, initialState) => {
  if (initialState) {
    globalState = {...globalState, ...initialState}
  }
  actions = {...actions, ...userActions}
}