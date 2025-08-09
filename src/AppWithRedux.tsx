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
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";

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

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TaskStateType>(
    (state) => state.tasks
  );

  const removeTask = (id: string, todolistId: string) => {
    dispatch(removeTaskAC(id, todolistId));
  };
  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC(title, todolistId));
  };
  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    dispatch(changeStatusTaskAC(taskId, isDone, todolistId));
  };
  const changeTaskTitle = (id: string, title: string, todolistId: string) => {
    dispatch(changeTitleTaskAC(id, title, todolistId));
  };

  function changeFilter(value: FilterValue, todolistId: string) {
    dispatch(changeTodolistFilterTypeAC(todolistId, value));
  }

  function removeTodolist(todolistId: string) {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }

  function changeTodolistTitle(title: string, id: string) {
    dispatch(changeTodolistTitleAC(id, title));
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
  }

  return (
    <div className="App">
      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemInput addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let tasksFiltered = tasks[tl.id];
            if (tl.filter === "completed") {
              tasksFiltered = tasksFiltered.filter(
                (task) => task.isDone === true
              );
            }
            if (tl.filter === "active") {
              tasksFiltered = tasksFiltered.filter(
                (task) => task.isDone === false
              );
            }

            return (
              <Grid>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskList={changeTaskTitle}
                    title={tl.title}
                    key={tl.id}
                    id={tl.id}
                    tasks={tasksFiltered}
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
