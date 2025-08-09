import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemFromPropsType } from "./Todolist";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";

export const AddItemInput = (props: AddItemFromPropsType) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };
  const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
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
};
