type OpenSnackbarType = {
  type: "OPEN_SNACKBAR";
  title: string;
  typeOfObject: "task" | "todolist";
  undoFunc: () => void;
};

type CloseSnackbarType = {
  type: "CLOSE_SNACKBAR";
};

type ActionType = OpenSnackbarType | CloseSnackbarType;

export type SnackbarStateType = {
  openSnackbar: boolean;
  title: string;
  type: "task" | "todolist" | null;
  undoFunc: () => void;
};

const initialState: SnackbarStateType = {
  openSnackbar: false,
  title: "",
  type: null,
  undoFunc: () => {},
};

export const SnackbarReducer = (
  state: SnackbarStateType = initialState,
  action: ActionType
): SnackbarStateType => {
  switch (action.type) {
    case "OPEN_SNACKBAR": {
      return {
        openSnackbar: true,
        title: action.title,
        type: action.typeOfObject,
        undoFunc: action.undoFunc,
      };
    }
    case "CLOSE_SNACKBAR": {
      return {
        openSnackbar: false,
        title: "",
        type: null,
        undoFunc: () => {},
      };
    }
    default:
      return state;
  }
};

export const openSnackbarAC = (
  title: string,
  typeObj: "task" | "todolist",
  undoFunc: () => void
): OpenSnackbarType => {
  return {
    type: "OPEN_SNACKBAR",
    title,
    typeOfObject: typeObj,
    undoFunc: undoFunc,
  };
};

export const closeSnackbarAC = (): CloseSnackbarType => {
  return {
    type: "CLOSE_SNACKBAR",
  };
};
