import { Todolist } from "./components/Todolist/Todolist";
import { AddItemInput } from "./components/AddItemInput/addItemInput";
import { Container, Grid, Paper } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { addTodolistAC } from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { AppRootState } from "./state/store";
import { useSelector } from "react-redux";
import SimpleSnackbar from "./components/Snackbar/Snackbar";
import { Header } from "./components/AppBar/AppBar";
import { usePersistedTheme } from "./helpers/hooks/usePersistedTheme";

export type FilterValue = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValue;
  editMode: boolean;
};

export type ThemesType = "pink" | "dark" | "white";

function AppWithRedux() {
  const dispatch = useDispatch();
  const [theme, setTheme] = usePersistedTheme("dark");

  const todolists = useSelector<AppRootState, Array<TodolistType>>((state) => {
    return state.todolists.todolists;
  });

  return (
    <div className={`App ${theme}`}>
      <Header setTheme={setTheme} />
      <Container fixed>
        <Grid container sx={{ padding: "6em 10px 10px" }}>
          <AddItemInput
            addItem={(t) => dispatch(addTodolistAC(t))}
            placeholder="Add new TO-DO"
          />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((tl) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={tl.id}>
              <Paper style={{ backgroundColor: "inherit" }} elevation={0}>
                <Todolist tl={tl} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <SimpleSnackbar />
    </div>
  );
}

export default AppWithRedux;
