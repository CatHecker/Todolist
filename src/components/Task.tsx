import { Checkbox, IconButton } from "@mui/material";
import { TasksPropsType } from "./Todolist";
import { EditableSpan } from "./editableSpan";
import { Delete } from "@mui/icons-material";
import React, { ChangeEvent, useCallback } from "react";

export const Task = React.memo((props: TasksPropsType) => {
  const removeTask = () => props.removeTask(props.task.id, props.todolist_id);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(
      props.task.id,
      e.currentTarget.checked,
      props.todolist_id
    );
  };
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskList(props.task.id, newValue, props.todolist_id);
    },
    [props.todolist_id, props.task.id, props.changeTaskList]
  );

  return (
    <li className={props.task.isDone ? "is-done" : ""} key={props.task.id}>
      <Checkbox onChange={onChangeHandler} checked={props.task.isDone} />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={removeTask}>
        <Delete />
      </IconButton>
    </li>
  );
});
