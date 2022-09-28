import produce from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

interface Actions {
  type:
    | ActionTypes.ADD_NEW_CYCLE
    | ActionTypes.FINISH_CURRENT_CYCLE
    | ActionTypes.INTERRUPT_CURRENT_CYCLE
  payload?: {
    newCycle: Cycle
  }
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })
    case ActionTypes.FINISH_CURRENT_CYCLE:
      console.log('Reducer finished')
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else return cycle
        }),
        activeCycleId: null,
      }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else return cycle
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
