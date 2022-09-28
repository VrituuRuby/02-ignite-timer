import { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import { HandPalm, Play } from 'phosphor-react'
import {
  ButtonContainer,
  ButtonTooltipContainer,
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { CyclesContext } from '../../contexts/CycleContext'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O valor deve ter no minimo 5')
    .max(60, 'O valor deve ter maximo 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        <ButtonContainer>
          {errors?.minutesAmount || errors?.task ? (
            <ButtonTooltipContainer>
              Preencha o nome e a duração antes de começar.
            </ButtonTooltipContainer>
          ) : (
            ''
          )}
          {activeCycle ? (
            <StopCountdownButton
              type="button"
              onClick={() => {
                interruptCurrentCycle()
              }}
            >
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton type="submit">
              <Play size={24} /> Começar
            </StartCountdownButton>
          )}
        </ButtonContainer>
      </form>
    </HomeContainer>
  )
}
