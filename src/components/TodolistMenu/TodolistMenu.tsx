import { IconButton, Menu, MenuItem } from "@mui/material";
import style from "./style.module.css";
import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Delete, Edit } from "@mui/icons-material";

type TodolistMenuProps = {
  removeTodolist: () => void;
  setMode: (mode: boolean) => void;
};

export const TodolistMenu = React.memo(
  ({ removeTodolist, setMode }: TodolistMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const status = Boolean(anchorEl);
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className="menu-container">
        <IconButton
          id="basic-button"
          aria-controls={status ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={status ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          sx={{
            "& .MuiPaper-root": {
              borderRadius: 2,
              minWidth: 120,
              color: "rgb(55, 65, 81)",
              boxShadow:
                "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
              "& .MuiMenuItem-root": {
                "& .MuiSvgIcon-root": {
                  fontSize: "1.3em",
                  marginRight: "0.5em",
                },
              },
            },
          }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={status}
          onClose={handleClose}
          className={style.todolistMenu}
          slotProps={{
            list: {
              "aria-labelledby": "basic-button",
            },
          }}
          elevation={0}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              setMode(true);
            }}
          >
            <Edit />
            Edit
          </MenuItem>
          <MenuItem onClick={removeTodolist}>
            <Delete /> Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }
);
