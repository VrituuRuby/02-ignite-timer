import { differenceInSeconds } from 'date-fns'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'

import alert from '../assets/alert-sound.wav'
import {
  ActionTypes,
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

interface NewCycleFormData {
  task: string
  minutesAmount: number
}

interface CyclesContextInterface {
  activeCycle: Cycle | undefined
  activeCycleId: any
  cycles: Cycle[]
  finishCurrentCycle: () => void
  interruptCurrentCycle: () => void
  createNewCycle: (data: NewCycleFormData) => void
  setSecondsPassed: (second: number) => void
  amountSecondsPassed: number
}

export const CyclesContext = createContext({} as CyclesContextInterface)
const alertSound = new Audio(alert)
alertSound.volume = 0.5

interface CycleContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedCyclesDataAsJSON = localStorage.getItem(
        '@ignite-timer:cycles-data',
      )

      if (storedCyclesDataAsJSON) {
        return JSON.parse(storedCyclesDataAsJSON)
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-data', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    const actualSecondsPassed = activeCycle
      ? differenceInSeconds(new Date(), new Date(activeCycle.startDate))
      : 0
    return actualSecondsPassed
  })

  function setSecondsPassed(second: number) {
    setAmountSecondsPassed(second)
  }

  function createNewCycle(data: NewCycleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function finishCurrentCycle() {
    alertSound.play()
    dispatch(finishCurrentCycleAction())
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cycles,
        finishCurrentCycle,
        interruptCurrentCycle,
        setSecondsPassed,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
