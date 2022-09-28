import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CycleContext'

import { FormContainer, TaskInput, TimerInput } from './styles'

export function NewCycleForm() {
  const { activeCycle, cycles } = useContext(CyclesContext)
  const { register } = useFormContext()
  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        placeholder="Dê um nome a seu projeto"
        id="task"
        list="task-suggestion"
        disabled={!!activeCycle}
        min={1}
        {...register('task', { required: 'Informe uma tarefa' })}
      />
      <datalist id="task-suggestion">
        {cycles.map((cycle) => (
          <option key={cycle.id} value={cycle.task} />
        ))}
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <TimerInput
        type="number"
        placeholder="00"
        id="minutesAmount"
        step={1}
        disabled={!!activeCycle}
        {...register('minutesAmount', {
          valueAsNumber: true,
          required: 'informe um intervalo',
        })}
        min={1}
        max={60}
      />
      <span>minutos.</span>
    </FormContainer>
  )
}
