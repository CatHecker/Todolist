import { Brush } from "@mui/icons-material";
import {
  AppBar,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import style from "./style.module.css";
import { ThemesType } from "../../AppWithRedux";

type HeaderPropsType = {
  setTheme: (theme: string) => void;
};

export const Header = ({ setTheme }: HeaderPropsType) => {
  const [openThemes, setOpenThemes] = useState(false);

  const themeHandler = (theme: ThemesType) => {
    setTheme(theme);
    setOpenThemes(false);
  };

  return (
    <AppBar>
      <Toolbar sx={{ bgcolor: "var(--taskMenu-color)" }}>
        <div
          className={`${style.themesBlock} ${
            openThemes ? style.open : style.close
          }`}
        >
          <IconButton
            sx={{ marginRight: "0.5em" }}
            onClick={() => setOpenThemes(!openThemes)}
          >
            <Brush sx={{ color: "white", fontSize: "1.2em" }} />
          </IconButton>
          {openThemes ? (
            <ButtonGroup className={"button_group"} variant="text">
              <Button
                onClick={() => themeHandler("white")}
                sx={{ bgcolor: "#f9f6f3" }}
              ></Button>
              <Button
                onClick={() => themeHandler("dark")}
                sx={{ bgcolor: "#433a3f" }}
              ></Button>
              <Button
                onClick={() => themeHandler("pink")}
                sx={{ bgcolor: "#c1666b" }}
              ></Button>
            </ButtonGroup>
          ) : null}
        </div>
      </Toolbar>
    </AppBar>
  );
};
