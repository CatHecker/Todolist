import { Checkbox } from "@mui/material";
import { TasksPropsType } from "../Todolist/Todolist";
import { EditableSpan } from "../EditableText/editableSpan";
import React, { useCallback } from "react";
import style from "./style.module.css";
import TaskMenu from "../TaskMenu/TaskMenu";
import { useDispatch } from "react-redux";
import {
  addSubtaskAC,
  addTaskAC,
  changeDescriptionTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
  setOpenTaskAC,
  setTaskDeadlineAC,
} from "../../state/tasks-reducer";
import { Dayjs } from "dayjs";
import { openSnackbarAC } from "../../state/snackbar-reducer";

export const Task = React.memo(({ todolist_id, task }: TasksPropsType) => {
  const dispatch = useDispatch();
  const removeTask = useCallback(() => {
    dispatch(removeTaskAC(task.id, todolist_id));
    dispatch(
      openSnackbarAC(task.title, "task", () => {
        dispatch(addTaskAC(task, todolist_id));
      })
    );
  }, [dispatch, task, todolist_id]);

  const changeTaskTitle = useCallback(
    (title: string) => {
      dispatch(changeTitleTaskAC(task.id, title, todolist_id));
    },
    [dispatch, todolist_id, task.id]
  );

  const changeStatus = useCallback(() => {
    dispatch(changeStatusTaskAC(task.id, !task.isDone, todolist_id));
  }, [dispatch, todolist_id, task.id, task.isDone]);

  const setOpen = useCallback(
    (newOpen: boolean) => {
      dispatch(setOpenTaskAC(task.id, newOpen, todolist_id));
    },
    [dispatch, todolist_id, task.id]
  );

  const changeDescription = useCallback(
    (newDesc: string | null) => {
      dispatch(changeDescriptionTaskAC(task.id, newDesc, todolist_id));
    },
    [dispatch, todolist_id, task.id]
  );

  const changeDate = useCallback(
    (newDate: Dayjs | null) => {
      dispatch(setTaskDeadlineAC(task.id, newDate, todolist_id));
    },
    [dispatch, todolist_id, task.id]
  );

  const addSubtask = useCallback(
    (title: string) => {
      dispatch(addSubtaskAC(task.id, title, todolist_id));
    },
    [dispatch, todolist_id, task.id]
  );

  return (
    <ul className={style.task_container}>
      <li
        className={`${style.task} ${task.isDone ? style.task_done : ""}`}
        onClick={() => setOpen(true)}
      >
        <Checkbox
          aria-label="Task status"
          onClick={(e) => e.stopPropagation()}
          onChange={changeStatus}
          checked={task.isDone}
          color="default"
        />
        <EditableSpan
          setMode={setOpen}
          editMode={task.editMode}
          title={task.title}
          onChange={changeTaskTitle}
        />
      </li>
      <TaskMenu
        addSubtask={addSubtask}
        changeStateDescription={changeDescription}
        changeStatus={changeStatus}
        removeTask={removeTask}
        toggleDrawer={setOpen}
        task={task}
        setSelectedDate={changeDate}
        todolist_id={todolist_id}
        changeTaskTitle={changeTaskTitle}
      />
    </ul>
  );
});
