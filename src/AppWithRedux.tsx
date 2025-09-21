import { TaskType, Todolist } from "./components/Todolist";
import { AddItemInput } from "./components/addItemInput";
import { Container, Grid, Paper } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  addTodolistAC,
  changeTodolistFilterTypeAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
} from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export type FilterValue = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValue;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {
  console.log("app rendered");

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TaskStateType>(
    (state) => state.tasks
  );

  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskAC(id, todolistId));
    },
    [dispatch]
  );
  const addTask = useCallback(
    (title: string, todolistId: string) => {
      dispatch(addTaskAC(title, todolistId));
    },
    [dispatch]
  );
  const changeStatus = useCallback(
    (taskId: string, isDone: boolean, todolistId: string) => {
      dispatch(changeStatusTaskAC(taskId, isDone, todolistId));
    },
    [dispatch]
  );
  const changeTaskTitle = useCallback(
    (id: string, title: string, todolistId: string) => {
      dispatch(changeTitleTaskAC(id, title, todolistId));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (value: FilterValue, todolistId: string) => {
      dispatch(changeTodolistFilterTypeAC(todolistId, value));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      const action = removeTodolistAC(todolistId);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (title: string, id: string) => {
      dispatch(changeTodolistTitleAC(id, title));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = addTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  return (
    <div className="App">
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemInput addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            return (
              <Grid>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskList={changeTaskTitle}
                    title={tl.title}
                    key={tl.id}
                    id={tl.id}
                    tasks={tasks[tl.id]}
                    removeTask={removeTask}
                    setFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
