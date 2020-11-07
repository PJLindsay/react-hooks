import { useState, useEffect } from 'react'

let globalState = {}
let listeners = []
let actions = {}

const useStore = () => {
  const setState = useState(globalState)[1]

  useEffect(() => {
    listeners.push(setState)

    return () => {
      // remove listeners (cleanup) when component unmounts
      listeners = listeners.filter(li => li !== setState)
    }

  }, []) // effect will run only when component mounts
}