import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import {
  closeSnackbarAC,
  SnackbarStateType,
} from "../../state/snackbar-reducer";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";

export default function SimpleSnackbar() {
  const dispatch = useDispatch();

  const closeSnackbar = () => {
    const action = closeSnackbarAC();
    dispatch(action);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    closeSnackbar();
  };

  const snackbarData = useSelector<AppRootState, SnackbarStateType>((state) => {
    return state.snackbar;
  });

  const handleUndo = () => {
    if (snackbarData.undoFunc) snackbarData.undoFunc();
    closeSnackbar();
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleUndo}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const snackbarMessage = `${
    snackbarData.type === "todolist" ? "Todolist" : "Task"
  } "${snackbarData.title}" was deleted`;

  return (
    <Snackbar
      open={snackbarData.openSnackbar}
      autoHideDuration={4000}
      onClose={handleClose}
      message={snackbarMessage}
      action={action}
    />
  );
}
