import React, { useCallback } from "react";
import { FilterValue } from "../App";
import { AddItemInput } from "./addItemInput";
import { EditableSpan } from "./editableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "./Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksPropsType = {
  task: TaskType;
  todolist_id: string;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskList: (id: string, title: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
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
  setFilter: (filter: FilterValue, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  changeTaskList: (id: string, title: string, todolistId: string) => void;
  removeTask: (id: string, todolistId: string) => void;
  filter: FilterValue;
  title: string;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (title: string, id: string) => void;
};

export const Todolist = React.memo(function (props: PropsType) {
  console.log("todo render");
  const setAllFilter = useCallback(
    () => props.setFilter("all", props.id),
    [props.id, props.setFilter]
  );
  const setActiveFilter = useCallback(
    () => props.setFilter("active", props.id),
    [props.id, props.setFilter]
  );
  const setCompletedFilter = useCallback(
    () => props.setFilter("completed", props.id),
    [props.id, props.setFilter]
  );
  const removeTodolist = useCallback(() => props.removeTodolist(props.id), []);
  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.id, props.addTask]
  );
  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(title, props.id);
    },
    [props.id, props.changeTodolistTitle]
  );

  let tasksFiltered = props.tasks;
  if (props.filter === "completed") {
    tasksFiltered = props.tasks.filter((task) => task.isDone === true);
  }
  if (props.filter === "active") {
    tasksFiltered = props.tasks.filter((task) => task.isDone === false);
  }

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
        {tasksFiltered.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              todolist_id={props.id}
              changeStatus={props.changeStatus}
              changeTaskList={props.changeTaskList}
              removeTask={props.removeTask}
            />
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
});
