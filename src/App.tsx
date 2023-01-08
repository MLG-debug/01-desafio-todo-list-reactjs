import { ChangeEvent, FormEvent, useState } from 'react'

import { Header } from './components/Header'

import styles from './App.module.css'

import { PlusCircle } from "phosphor-react"
import { Clipboard } from './components/Clipboard'

export interface TaskProps {
  id: string;
  description: string;
  checked: boolean;
  createdAt: Date;
  onDeleteTask?: (id: string) => void;
  onUpdateTask?: (id: string) => void;
}

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([])
  const [newTaskText, setNewTaskText] = useState("")

  const handleChangeTaskText = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskText(event.target.value);
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const updateTask = (id: string) => {
    const checkedTask: TaskProps[] = tasks.filter((task) => task.id === id);
    checkedTask[0].checked = !checkedTask[0].checked;
    const filteredTasks: TaskProps[] = tasks.filter((task) => task.id !== id);
    if (checkedTask[0].checked) {
      setTasks([...filteredTasks, ...checkedTask]);
    } else {
      setTasks([...checkedTask, ...filteredTasks]);
    }
  }

  const handleCreateNewTask = (event: FormEvent) => {
    event.preventDefault();
    const newTask: TaskProps = {
      checked: false,
      description: newTaskText,
      createdAt: new Date(),
      id: crypto.randomUUID()
    }

    setTasks((state) => [newTask, ...state]);
    setNewTaskText("");
  }

  return (
    <div>
      <Header />
      <main className={styles.wrapper}>
        <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
          <label className={styles.taskFormInput}>
            <span>Descrição da tarefa </span>
            <input
              required
              type="text"
              value={newTaskText}
              onChange={handleChangeTaskText}
              placeholder='Adicione uma nova tarefa' />
          </label>
          <button disabled={!newTaskText} type="submit">Criar<PlusCircle size={20} /></button>
        </form>
        <Clipboard tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
      </main>
    </div>
  )
}

export default App

