import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const TableContainer = styled.div`
  flex: 1;
  overflow: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-weight: bold;
      font-size: 0.875;
      line-height: 1.6;
      margin-bottom: 4px;

      &:first-child {
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }
      &:last-child {
        padding-right: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    td {
      background-color: ${(props) => props.theme['gray-700']};
      padding: 1rem;
      line-height: 1.6;
      font-size: 0.875;
      border-top: 4px solid ${(props) => props.theme['gray-800']};

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`

const STATUS_COLORS = {
  red: 'red-500',
  yellow: 'yellow-500',
  green: 'green-500',
} as const

interface StatusProps {
  statusColor: keyof typeof STATUS_COLORS
}

export const StatusContainer = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
    border-radius: 50%;
  }
`
