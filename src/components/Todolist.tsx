import { ChangeEvent } from "react";
import { FilterValue } from "../App";
import { AddItemInput } from "./addItemInput";
import { EditableSpan } from "./editableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type AddItemFromPropsType = {
  addItem: (title: string) => void;
};

export type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
};

type PropsType = {
  id: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  setFilter: (filter: FilterValue, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValue;
  title: string;
  removeTodolist: (todolistId: string) => void;
  changeTaskList: (id: string, title: string, todolistId: string) => void;
  changeTodolistTitle: (title: string, id: string) => void;
};

export function Todolist(props: PropsType) {
  const setAllFilter = () => props.setFilter("all", props.id);
  const setActiveFilter = () => props.setFilter("active", props.id);
  const setCompletedFilter = () => props.setFilter("completed", props.id);
  const removeTodolist = () => props.removeTodolist(props.id);
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(title, props.id);
  };

  return (
    <div className="ToDoList">
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />{" "}
        <IconButton onClick={() => removeTodolist()}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemInput addItem={addTask} />

      <ul>
        {props.tasks.map((task) => {
          const removeTask = () => props.removeTask(task.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(task.id, e.currentTarget.checked, props.id);
          };
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskList(task.id, newValue, props.id);
          };

          return (
            <li className={task.isDone ? "is-done" : ""} key={task.id}>
              <Checkbox onChange={onChangeHandler} checked={task.isDone} />
              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />
              <IconButton onClick={removeTask}>
                <Delete />
              </IconButton>
            </li>
          );
        })}
      </ul>
      <div>
        <Button
          color={"inherit"}
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={setAllFilter}
        >
          All
        </Button>
        <Button
          color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={setActiveFilter}
        >
          Active
        </Button>
        <Button
          color={"success"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={setCompletedFilter}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
