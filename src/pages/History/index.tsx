import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { HistoryContainer, StatusContainer, TableContainer } from './styles'

interface CycleData {
  id: string
  startDate: Date
  finishedDate?: Date
  interruptedDate?: Date
}

export function History() {
  const { cycles } = useContext(CyclesContext)

  function getCycleStatus(cycle: CycleData) {
    if (cycle.finishedDate)
      return <StatusContainer statusColor="green">Concluído</StatusContainer>
    if (cycle.interruptedDate)
      return <StatusContainer statusColor="red">Interrompido</StatusContainer>

    return <StatusContainer statusColor="yellow">Em andamento</StatusContainer>
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>{getCycleStatus(cycle)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </HistoryContainer>
  )
}
