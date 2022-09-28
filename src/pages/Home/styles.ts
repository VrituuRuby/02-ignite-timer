import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const ButtonContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const ButtonBase = styled.button`
  width: 100%;
  position: relative;
  color: ${(props) => props.theme['gray-100']};
  border: 0;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  cursor: pointer;

  transition: background-color 0.1s;
`

export const StartCountdownButton = styled(ButtonBase)`
  background: ${(props) => props.theme['green-500']};
  &:disabled {
    filter: opacity(0.7);
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }
`

export const StopCountdownButton = styled(ButtonBase)`
  background: ${(props) => props.theme['red-500']};

  &:hover {
    background: ${(props) => props.theme['red-700']};
  }
`

export const ButtonTooltipContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 100%;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  z-index: 1;
  background-color: #09090a;
  color: ${(props) => props.theme['gray-100']};
  border-radius: 8px;
  line-height: 1.4;
  font-weight: bold;

  cursor: default;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    width: 10px;
    height: 10px;
    background-color: #09090a;
    transform: rotate(45deg);
  }
`
