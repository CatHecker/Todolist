import { combineReducers, createStore } from "redux";
import { TaskReducer } from "./tasks-reducer";
import { todolistsReducer } from "./todolists-reducer";
import { SnackbarReducer } from "./snackbar-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: TaskReducer,
  snackbar: SnackbarReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
