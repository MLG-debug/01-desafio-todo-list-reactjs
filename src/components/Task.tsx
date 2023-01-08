import { Check, Circle, Trash } from 'phosphor-react'
import { ChangeEvent, useState } from 'react';
import { TaskProps } from '../App'

import styles from './Task.module.css'

export const Task = ({ checked, createdAt, description, id, onDeleteTask, onUpdateTask }: TaskProps) => {
  const [checkedState, setCheckedState] = useState(checked);

  const handleCheckInput = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckedState(event.target.checked);
    onUpdateTask!(id);
  }

  const handleDeleteTask = () => {
    onDeleteTask!(id);
  }

  return (
    <div className={checkedState ? styles.taskCompleted : styles.task}>
      <div className={styles.taskContent}>
        <label className={styles.checkBoxLabel}>
          {checkedState ? <Check className={styles.completed} /> : <Circle className={styles.notCompleted} />}
          <span>
            <input type="checkbox" className={styles.input} onChange={handleCheckInput} />
            <p>{description}</p>
          </span>
        </label>
      </div>
      <button type='button' onClick={handleDeleteTask}><Trash /> </button>
    </div>
  )
}
