import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import style from "./style.module.css";

type AlwaysEditableSpanPropsType = {
  title: string;
  onChange: (newValue: string) => void;
  className: string;
  multiline?: boolean;
  label: string;
};

export const AlwaysEditableSpan = React.memo(
  ({
    title,
    onChange,
    className,
    multiline = false,
    label,
  }: AlwaysEditableSpanPropsType) => {
    const [_title, setTitle] = useState(title);
    const onChangeTitleHandler = (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
    ) => {
      setTitle(e.currentTarget.value);
    };

    const onEnterDownHandler = (
      e: KeyboardEvent<HTMLInputElement> | KeyboardEvent<HTMLTextAreaElement>
    ) => {
      if (e.key === "Enter") onChange(_title);
    };
    return multiline ? (
      <textarea
        placeholder={label}
        className={style[className]}
        onBlur={() => {
          onChange(_title);
        }}
        value={_title}
        onChange={onChangeTitleHandler}
      />
    ) : (
      <input
        autoComplete="off"
        className={style[className]}
        onBlur={() => onChange(_title)}
        type="text"
        value={_title}
        onChange={onChangeTitleHandler}
        onKeyDown={onEnterDownHandler}
      />
    );
  }
);
