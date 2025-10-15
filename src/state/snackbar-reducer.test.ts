import { openSnackbarAC, SnackbarReducer } from "./snackbar-reducer";

test("should open snackbar", () => {
  const startState = {
    openSnackbar: false,
    title: "",
    type: null,
    undoFunc: () => {},
  };
  const action = openSnackbarAC("deleted task", "task", () => {});
  const endState = SnackbarReducer(startState, action);

  expect(endState.openSnackbar).toBeTruthy();
});
