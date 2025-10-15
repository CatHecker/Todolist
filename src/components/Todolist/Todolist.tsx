import React, { useCallback } from "react";
import { AddItemInput } from "../AddItemInput/addItemInput";
import { EditableSpan } from "../EditableText/editableSpan";
import { Button } from "@mui/material";
import { Task } from "../Task/Task";
import { FilterValue, TodolistType } from "../../AppWithRedux";
import style from "./styles.module.css";
import { TodolistMenu } from "../TodolistMenu/TodolistMenu";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import { useDispatch } from "react-redux";
import {
  addDeletedTodolistAC,
  changeTodolistFilterTypeAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setModeTodolistAC,
} from "../../state/todolists-reducer";
import { addTaskAC } from "../../state/tasks-reducer";
import { Dayjs } from "dayjs";
import { openSnackbarAC } from "../../state/snackbar-reducer";

export type SubtaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TaskType = {
  description: string | null;
  id: string;
  title: string;
  isDone: boolean;
  editMode: boolean;
  openDrawer: boolean;
  date: null | Dayjs;
  subtasks?: SubtaskType[];
};

export type TasksPropsType = {
  task: TaskType;
  todolist_id: string;
};

export type AddItemFromPropsType = {
  addItem: (title: string) => void;
  placeholder: string;
};

type PropsType = {
  tl: TodolistType;
};

export const Todolist = React.memo(({ tl }: PropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, TaskType[]>(
    (state) => state.tasks[tl.id]
  );
  const setTodolistMode = useCallback(
    (newMode: boolean) => {
      dispatch(setModeTodolistAC(tl.id, newMode));
    },
    [dispatch, tl.id]
  );

  const addTask = useCallback(
    (title: string) => {
      dispatch(addTaskAC(title, tl.id));
    },
    [dispatch, tl.id]
  );

  const setFilter = useCallback(
    (value: FilterValue) => {
      console.log("try to change filter: ", value);
      dispatch(changeTodolistFilterTypeAC(tl.id, value));
    },
    [dispatch, tl.id]
  );

  const removeTodolist = () => {
    dispatch(removeTodolistAC(tl.id));
    dispatch(
      openSnackbarAC(tl.title, "todolist", () => {
        dispatch(addDeletedTodolistAC(tl.id));
      })
    );
  };

  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(changeTodolistTitleAC(tl.id, title));
    },
    [dispatch, tl.id]
  );

  let tasksFiltered = tasks;
  if (tl.filter === "completed") {
    tasksFiltered = tasks.filter((task: TaskType) => task.isDone === true);
  }
  if (tl.filter === "active") {
    tasksFiltered = tasks.filter((task: TaskType) => task.isDone === false);
  }

  return (
    <div className={style.todolist}>
      <h3 className={style.TodolistTitle}>
        <EditableSpan
          setMode={setTodolistMode}
          editMode={tl.editMode}
          title={tl.title}
          onChange={changeTodolistTitle}
        />
        <TodolistMenu
          setMode={setTodolistMode}
          removeTodolist={removeTodolist}
        />
      </h3>
      <AddItemInput addItem={addTask} placeholder="Add new Task" />
      <ul>
        {tasksFiltered.map((task: TaskType) => {
          return <Task key={task.id} task={task} todolist_id={tl.id} />;
        })}
      </ul>
      <div style={{ marginTop: "0.5em" }}>
        <Button
          sx={
            tl.filter === "all"
              ? { bgcolor: "var(--taskMenu-color)", color: "white" }
              : { color: "var(--main-font)" }
          }
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          sx={
            tl.filter === "active"
              ? { bgcolor: "var(--taskMenu-color)", color: "white" }
              : { color: "var(--main-font)" }
          }
          onClick={() => setFilter("active")}
        >
          Active
        </Button>
        <Button
          sx={
            tl.filter === "completed"
              ? { bgcolor: "var(--taskMenu-color)", color: "white" }
              : { color: "var(--main-font)" }
          }
          onClick={() => setFilter("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
});
