import { Brush } from "@mui/icons-material";
import {
  AppBar,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import style from "./style.module.css";
import { ThemesType } from "../../AppWithRedux";

type HeaderPropsType = {
  setTheme: (theme: string) => void;
};

export const Header = React.memo(({ setTheme }: HeaderPropsType) => {
  const [openThemes, setOpenThemes] = useState(false);

  const themeHandler = (theme: ThemesType) => {
    setTheme(theme);
    setOpenThemes(false);
  };

  return (
    <AppBar>
      <Toolbar className={style.toolbar}>
        <Typography className={style.appTitle}>Todolist</Typography>
        <div
          className={`${style.themesBlock} ${
            openThemes ? style.open : style.close
          }`}
        >
          <IconButton
            aria-label="theme-change button"
            aria-haspopup="true"
            aria-expanded={openThemes}
            sx={{ marginRight: "0.5em" }}
            onClick={() => setOpenThemes(!openThemes)}
          >
            <Brush
              aria-label="theme-change button"
              sx={{ color: "white", fontSize: "1.2em" }}
            />
          </IconButton>
          {openThemes ? (
            <ButtonGroup className={"button_group"} variant="text">
              <Button
                aria-label="White theme"
                onClick={() => themeHandler("white")}
                sx={{ bgcolor: "#f9f6f3" }}
              ></Button>
              <Button
                aria-label="Dark theme"
                onClick={() => themeHandler("dark")}
                sx={{ bgcolor: "#433a3f" }}
              ></Button>
              <Button
                aria-label="Pink theme"
                onClick={() => themeHandler("pink")}
                sx={{ bgcolor: "#c1666b" }}
              ></Button>
            </ButtonGroup>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
});
