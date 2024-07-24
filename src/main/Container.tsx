import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./Container.scss";
import Task from "./task/Task";
import iconAdd from "../assets/images/icon-add.svg";

export interface Task {
  index: number;
  isChecked: boolean;
  content: string;
}

interface ContainerProps {
  localData: Task[];
}

export default function Container(props: ContainerProps) {
  const dateInfo = new Date();
  const week = ["일", "월", "화", "수", "목", "금", "토"];

  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState(props.localData || ([] as Task[]));
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddButtonClicked() {
    setIsAddButtonClicked((isAddButtonClicked) => !isAddButtonClicked);
  }

  function editTodo(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value);
  }

  // Todo : useCallback 적용
  function onSubmit(event: FormEvent) {
    const newTask = {
      index: !tasks.length ? 1 : tasks[tasks.length - 1].index + 1,
      isChecked: false,
      content: todo,
    };
    setTasks((tasks) => [...tasks, newTask]);
    setTodo(() => "");
    setIsAddButtonClicked((isAddButtonClicked) => !isAddButtonClicked);
    event.preventDefault();
  }

  function deleteTask(index: number) {
    setTasks((tasks) => tasks.filter((task: Task) => task.index !== index));
    localStorage.removeItem("tasks");
  }

  function checkedTask(index: number) {
    // setTasks((tasks) =>
    //   tasks.map((task: Task) =>
    //     task.index === index ? (task.isChecked = !task.isChecked) : null
    //   )
    // );
  }

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="date-info">
            <span className="date">
              {dateInfo.getFullYear() +
                "." +
                (dateInfo.getMonth() + 1) +
                "." +
                dateInfo.getDate()}
            </span>
            <span className="day">{week[dateInfo.getDay()]}</span>
          </div>
          <button className="add-button" onClick={handleAddButtonClicked}>
            <img src={iconAdd} alt="" className="icon-add" />
          </button>
        </div>

        {isAddButtonClicked ? (
          <form className="input" onSubmit={onSubmit}>
            <input
              className="input-area"
              type="text"
              placeholder="여기에서 할 일을 추가해주세요"
              value={todo}
              required
              onChange={editTodo}
            />
            <button
              className={"input-add" + (todo ? " active" : "")}
              type="submit"
            >
              추가
            </button>
          </form>
        ) : null}

        {tasks.length ? (
          <div className="content">
            {tasks.map((task: Task) => (
              <Task
                key={task.index}
                task={task}
                deleteTask={() => {
                  deleteTask(task.index);
                }}
                checkedTask={() => {
                  checkedTask(task.index);
                }}
              ></Task>
            ))}
          </div>
        ) : (
          <div className="content empty">
            <span className="memo">아직 아무것도 없네요...</span>
            <span className="strong-memo">오늘 해야할 일을 추가해주세요.!</span>
          </div>
        )}
      </div>
    </>
  );
}
