import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemFromPropsType } from "./Todolist";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

export const AddItemInput = React.memo((props: AddItemFromPropsType) => {
  console.log("render item input");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError("");
    if (e.code === "Enter") addTask();
  };
  const addTask = () => { 
    if (inputValue.trim() !== "") {
      props.addItem(inputValue);
      setInputValue("");
    } else {
      setError("Empty string");
    }
  };
  return (
    <div>
      <TextField
        variant={"outlined"}
        label={"Type value"}
        onKeyDown={enterHandler}
        onChange={onChangeAddTask}
        value={inputValue}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={"primary"}>
        <Add />
      </IconButton>
    </div>
  );
});
