import React, { ChangeEvent, useCallback, useState } from "react";
import { EditableSpanPropsType } from "./Todolist";
import { TextField } from "@mui/material";

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  console.log("render editable span " + props.title);
  const [title, setTitle] = useState(props.title);
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const activateViewMode = useCallback(() => {
    setMode(false);
    props.onChange(title);
  }, [props.onChange, title]);

  let [editMode, setMode] = useState(false);

  return editMode ? (
    <TextField
      onBlur={activateViewMode}
      type="text"
      value={title}
      autoFocus
      onChange={onChangeTitleHandler}
    />
  ) : (
    <span onDoubleClick={() => setMode(true)}>{title}</span>
  );
});
