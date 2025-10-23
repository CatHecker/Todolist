import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { TextField } from "@mui/material";
import style from "./style.module.css";

type EditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
  setMode: (mode: boolean) => void;
  editMode: boolean;
};

export const EditableSpan = React.memo(
  ({ title, onChange, setMode, editMode }: EditableSpanPropsType) => {
    const [_title, setTitle] = useState(title);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (error) setError("");
      setTitle(e.currentTarget.value);
    };
    useEffect(() => {
      setTitle(title);
    }, [title]);

    const activateViewMode = useCallback(() => {
      if (_title.length === 0) {
        return setError("Введите минимум 1 символ!");
      }
      if (_title.length > 60) {
        return setError("Размер должен быть меньше 60 символов!");
      }
      setMode(false);
      onChange(_title);
    }, [onChange, _title, setMode]);

    const onEnterDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") activateViewMode();
    };

    useEffect(() => {
      if (inputRef && inputRef.current) inputRef.current.focus();
    }, [editMode]);

    return (
      <div className={style.text_container}>
        {editMode ? (
          <TextField
            inputRef={inputRef}
            onBlur={activateViewMode}
            type="text"
            value={_title}
            onChange={onChangeTitleHandler}
            onKeyDown={onEnterDownHandler}
          />
        ) : (
          <span className={style.ellipsis}>{_title}</span>
        )}
        {error.length ? <p className={style.text}>{error}</p> : null}
      </div>
    );
  }
);
