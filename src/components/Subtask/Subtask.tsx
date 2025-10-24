import { Checkbox } from "@mui/material";
import { SubtaskType, TaskType } from "../Todolist/Todolist";
import React, { useCallback } from "react";
import style from "./style.module.css";
import { useDispatch } from "react-redux";
import {
  changeStatusSubtaskAC,
  changeTitleSubtaskAC,
  removeSubtaskAC,
} from "../../state/tasks-reducer";
import { AlwaysEditableSpan } from "../AlwaysEditable/alwaysEditableSpan";
import { Close } from "@mui/icons-material";

export type SubtasksPropsType = {
  subtask: SubtaskType;
  task: TaskType;
  todolist_id: string;
};

export const Subtask = React.memo(
  ({ subtask, todolist_id, task }: SubtasksPropsType) => {
    const dispatch = useDispatch();
    const removeTask = useCallback(() => {
      dispatch(removeSubtaskAC(subtask.id, task.id, todolist_id));
    }, [dispatch, todolist_id, task.id, subtask.id]);

    const changeTaskTitle = useCallback(
      (title: string) => {
        dispatch(changeTitleSubtaskAC(subtask.id, task.id, title, todolist_id));
      },
      [dispatch, todolist_id, task.id, subtask.id]
    );

    const changeStatus = useCallback(
      (status: boolean) => {
        dispatch(
          changeStatusSubtaskAC(task.id, subtask.id, status, todolist_id)
        );
      },
      [dispatch, todolist_id, task.id, subtask.id]
    );
    return (
      <ul className={style.task_container}>
        <li
          className={`${style.task} ${subtask.isDone ? style.task_done : ""}`}
        >
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            onChange={() => changeStatus(!subtask.isDone)}
            checked={subtask.isDone}
            color="default"
          />
          <AlwaysEditableSpan
            className="input"
            title={subtask.title}
            onChange={changeTaskTitle}
            label=""
          />
          <Close
            role="button"
            tabIndex={0}
            className={style.closeBtn}
            aria-label="Delete subtask"
            onClick={() => removeTask()}
          />
        </li>
      </ul>
    );
  }
);
