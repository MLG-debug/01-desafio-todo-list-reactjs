import { Task } from './Task'

import emptyClipboard from '../assets/Clipboard.png'
import styles from './Clipboard.module.css'

import { TaskProps } from '../App'

interface ClipboardProps {
  tasks: TaskProps[],
  onDeleteTask: (id: string) => void
  onUpdateTask: (id: string) => void
}

export const Clipboard = ({ tasks, onDeleteTask, onUpdateTask }: ClipboardProps) => {
  const checkedTasks = tasks.filter(task => task.checked)
  return (
    <div className={styles.clipboard}>
      <header className={styles.clipboardInfos}>
        <div className={styles.blue}>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.purple}>
          <strong>Concluídas</strong>
          <span>{checkedTasks.length} de {tasks.length}</span>
        </div>
      </header>
      <div>
        {tasks.length != 0 ?
          tasks.map((task: TaskProps) => (
            <Task key={task.id} {...task} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} />
          ))
          :
          <div className={styles.emptyClipboard}>
            <img src={emptyClipboard} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>}
      </div>
    </div>
  )
}
