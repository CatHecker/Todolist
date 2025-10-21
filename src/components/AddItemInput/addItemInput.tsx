import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemFromPropsType } from "../Todolist/Todolist";
import { IconButton, TextField } from "@mui/material";
import { Add } from "@mui/icons-material";
import style from "./styles.module.css";

export const AddItemInput = React.memo(
  ({ addItem, placeholder }: AddItemFromPropsType) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const onChangeAddTask = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value);
    };
    const enterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (error !== "" && inputValue.trim() !== "") setError("");
      if (e.code === "Enter") addTask();
    };
    const addTask = () => {
      if (inputValue.trim() !== "") {
        addItem(inputValue);
        setInputValue("");
      } else {
        setError("Поле не должно быть пустым");
      }
    };
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant={"outlined"}
          placeholder={placeholder}
          onKeyDown={enterHandler}
          onChange={onChangeAddTask}
          value={inputValue}
          error={!!error}
          helperText={error}
          className={style.addItemInput}
          sx={{
            "& fieldset": {
              border: "none",
            },
          }}
        />
        <IconButton aria-label="Add item" onClick={addTask} color={"primary"}>
          <Add sx={{ color: "var(--main-font)" }} />
        </IconButton>
      </div>
    );
  }
);
