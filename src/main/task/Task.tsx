import { useState } from "react";
import "./Task.scss";
import { type Task } from "../Container";
import { ReactComponent as IconDelete } from "../../assets/images/icon-delete.svg";

interface taskProps {
  task: Task;
  deleteTask: (id: number) => void;
  checkedTask: (id: number) => void;
}

export default function Task(props: taskProps) {
  const { task, deleteTask, checkedTask } = props;
  const [isChecked, setIsChecked] = useState(task.isChecked);

  function onChange() {
    setIsChecked(() => !isChecked);
    checkedTask(task.index);
  }

  function onClickDelete() {
    deleteTask(task.index);
  }

  return (
    <>
      <div className="task-container">
        <input
          type={"checkbox"}
          checked={isChecked}
          onChange={onChange}
          className="checkbox"
        ></input>
        <span className="task-content">{task.content}</span>
        <button className="delete-button">
          <IconDelete
            className="icon-delete"
            onClick={onClickDelete}
          ></IconDelete>
        </button>
      </div>
    </>
  );
}
