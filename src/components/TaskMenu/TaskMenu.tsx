import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { TaskType } from "../Todolist/Todolist";
import style from "./styles.module.css";
import { Checkbox, List, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import { Delete } from "@mui/icons-material";
import { Dayjs } from "dayjs";
import { AlwaysEditableSpan } from "../AlwaysEditable/alwaysEditableSpan";
import { AddItemInput } from "../AddItemInput/addItemInput";
import { Subtask } from "../Subtask/Subtask";
import { TaskDatePicker } from "../TaskDatePicker/TaskDatePicker";

type TaskMenuProps = {
  toggleDrawer: (newOpen: boolean) => void;
  task: TaskType;
  todolist_id: string;
  changeStatus: (e: ChangeEvent<HTMLInputElement>) => void;
  removeTask: () => void;
  changeStateDescription: (newDesc: string | null) => void;
  changeTaskTitle: (title: string) => void;
  addSubtask: (title: string) => void;
  setSelectedDate: (newDate: Dayjs) => void;
};

export default function TaskMenu({
  toggleDrawer,
  task,
  changeStatus,
  removeTask,
  changeStateDescription,
  todolist_id,
  changeTaskTitle,
  addSubtask,
  setSelectedDate,
}: TaskMenuProps) {
  const DrawerList = (
    <Box
      className={style.box}
      sx={{
        minWidth: { sx: 10, sm: 5, md: 6 },
        bgcolor: "var(--taskMenu-color)",
        height: "100vh",
      }}
      role="presentation"
    >
      <div className={style.topContainer}>
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          onChange={changeStatus}
          checked={task.isDone}
          color="default"
        />
        <AlwaysEditableSpan
          className="taskMenuTitle"
          title={task.title}
          onChange={changeTaskTitle}
          label=""
        />
      </div>
      <List className={style.taskMenuList}>
        <ListItem>
          <TaskDatePicker
            setSelectedDate={setSelectedDate}
            selectedDate={task.date}
          />
        </ListItem>
        <ListItem>
          <AlwaysEditableSpan
            multiline={true}
            title={task.description ?? ""}
            onChange={changeStateDescription}
            className="descriptionInput"
            label="Task description"
          />
        </ListItem>
        <ListItem sx={{ display: "block" }}>
          <AddItemInput addItem={addSubtask} placeholder={"Add subtask"} />
          <List>
            {task.subtasks?.map((subtask) => {
              return (
                <Subtask
                  key={subtask.id}
                  subtask={subtask}
                  task={task}
                  todolist_id={todolist_id}
                />
              );
            })}
          </List>
        </ListItem>
      </List>
      <Delete className={style.deleteItem} onClick={() => removeTask()} />
    </Box>
  );

  const appRoot =
    typeof document !== "undefined" ? document.querySelector(".App") : null;
  return (
    <Drawer
      container={appRoot}
      open={task.openDrawer}
      anchor="right"
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      {DrawerList}
    </Drawer>
  );
}
