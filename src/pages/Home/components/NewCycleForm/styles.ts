import styled from 'styled-components'

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;
  font: 1.125rem;
  flex-wrap: wrap;
`

const InputBase = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme['gray-400']};
  color: ${(props) => props.theme['gray-400']};
  padding: 0 0.5rem;
  font-size: 1.125rem;
  color: ${(props) => props.theme['gray-100']};
  font-weight: bold;

  &::placeholder {
    font-weight: bold;
  }

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }
`

export const TaskInput = styled(InputBase)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const TimerInput = styled(InputBase)`
  width: 4rem;
  text-align: center;
`
