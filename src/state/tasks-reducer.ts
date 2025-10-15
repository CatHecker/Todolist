import { v1 } from "uuid";
import {
  AddDeletedTodolistType,
  AddTodolistType,
  RemoveTodolistType,
  todolistId1,
} from "./todolists-reducer";
import { SubtaskType, TaskType } from "../components/Todolist/Todolist";
import dayjs, { Dayjs } from "dayjs";

type RemoveTaskActionType = {
  type: "REMOVE_TASK";
  id: string;
  todolistId: string;
};

type AddTaskActionType = {
  type: "ADD_TASK";
  title: string;
  todolistId: string;
  id: string;
  isDone: boolean;
  date: null | Dayjs;
  description: string;
  subtasks: SubtaskType[];
};

type ChangeStatusType = {
  type: "CHANGE_TASK_STATUS";
  id: string;
  todolistId: string;
  status: boolean;
};

type ChangeDescriptionTaskType = {
  type: "CHANGE_TASK_DESCRIPTION";
  id: string;
  description: string | null;
  todolistId: string;
};

type ChangeTitleType = {
  type: "CHANGE_TASK_TITLE";
  id: string;
  todolistId: string;
  title: string;
};

type SetOpenTaskType = {
  type: "SET_OPEN_TASK";
  id: string;
  open: boolean;
  todolistId: string;
};

type SetTaskDeadline = {
  type: "SET_TASK_DEADLINE";
  id: string;
  date: null | Dayjs;
  todolistId: string;
};

type AddSubtaskType = {
  type: "ADD_SUBTASK";
  title: string;
  todolistId: string;
  taskId: string;
};

type ChangeSubtaskTitleType = {
  type: "CHANGE_SUBTASK_TITLE";
  subId: string;
  taskId: string;
  todolistId: string;
  title: string;
};

type ChangeSubtaskStatusType = {
  type: "CHANGE_SUBTASK_STATUS";
  id: string;
  taskId: string;
  todolistId: string;
  status: boolean;
};

type RemoveSubtaskActionType = {
  type: "REMOVE_SUBTASK";
  subId: string;
  taskId: string;
  todolistId: string;
};

type ActionType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeStatusType
  | ChangeTitleType
  | AddTodolistType
  | RemoveTodolistType
  | SetOpenTaskType
  | SetTaskDeadline
  | ChangeDescriptionTaskType
  | AddSubtaskType
  | RemoveSubtaskActionType
  | ChangeSubtaskStatusType
  | ChangeSubtaskTitleType
  | AddDeletedTodolistType;

export type TaskStateType = {
  [key: string]: TaskType[];
  lastDeletedTodolist: TaskType[];
};

const initialState: TaskStateType = {
  [todolistId1]: [
    {
      id: v1(),
      title: "React",
      isDone: false,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2030, 1, 1)),
      description: "Base description",
    },
    {
      id: v1(),
      title: "HTML & CSS",
      isDone: true,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2030, 1, 1)),
      description: "Base description",
    },
    {
      id: v1(),
      title: "JavaScript",
      isDone: true,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2030, 1, 1)),
      description: "Base description",
    },
  ],
  lastDeletedTodolist: [],
};

export const TaskReducer = (
  state: TaskStateType = initialState,
  action: ActionType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE_TASK": {
      const stateCopy = { ...state };
      const taskList = stateCopy[action.todolistId];
      const filteredTasks = taskList.filter((t) => t.id !== action.id);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD_TASK": {
      const stateCopy = { ...state };
      const taskList = stateCopy[action.todolistId];
      const newTasks = [
        {
          id: action.id || v1(),
          title: action.title || "",
          isDone: action.isDone || false,
          editMode: false,
          openDrawer: false,
          date: action.date || null,
          description: action.description || "",
          subtasks: action.subtasks,
        },
        ...taskList,
      ];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE_TASK_STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, isDone: action.status } : t
        ),
      };
    }

    case "CHANGE_TASK_TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) => {
          return t.id === action.id &&
            action.title.length > 0 &&
            action.title.length < 60
            ? { ...t, title: action.title }
            : t;
        }),
      };
    }
    case "SET_OPEN_TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, openDrawer: action.open } : t
        ),
      };
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }

    case "ADD_DELETED_TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.id] = stateCopy["lastDeletedTodolist"];
      stateCopy["lastDeletedTodolist"] = [];
      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy["lastDeletedTodolist"] = stateCopy[action.id];
      delete stateCopy[action.id];
      return stateCopy;
    }
    case "SET_TASK_DEADLINE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, date: action.date } : t
        ),
      };
    }
    case "CHANGE_TASK_DESCRIPTION": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.id ? { ...t, description: action.description } : t
        ),
      };
    }
    case "ADD_SUBTASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                subtasks: [
                  ...(t.subtasks ?? []),
                  { id: v1(), title: action.title, isDone: false },
                ],
              }
            : t
        ),
      };
    }
    case "REMOVE_SUBTASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                subtasks:
                  t.subtasks?.filter(
                    (subtask) => subtask.id !== action.subId
                  ) ?? [],
              }
            : t
        ),
      };
    }
    case "CHANGE_SUBTASK_STATUS": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                subtasks:
                  t.subtasks?.map((subtask) => {
                    if (subtask.id === action.id)
                      return { ...subtask, isDone: action.status };
                    return subtask;
                  }) ?? [],
              }
            : t
        ),
      };
    }
    case "CHANGE_SUBTASK_TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                subtasks:
                  t.subtasks?.map((subtask) => {
                    if (subtask.id === action.subId)
                      return { ...subtask, title: action.title };
                    return subtask;
                  }) ?? [],
              }
            : t
        ),
      };
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  id: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE_TASK", id: id, todolistId: todolistId };
};

export const addTaskAC = (
  title: string,
  todolistId: string,
  id = v1(),
  isDone = false,
  date: Dayjs | null = null,
  description: string = "",
  subtasks: SubtaskType[] = []
): AddTaskActionType => {
  return {
    type: "ADD_TASK",
    title,
    todolistId,
    id,
    isDone,
    date,
    description,
    subtasks,
  };
};

// type AddTaskActionType = {
//   type: "ADD_TASK";
//   title: string;
//   todolistId: string;
//   id?: string;
//   isDone?: boolean;
//   date?: null | Dayjs;
//   description?: string;
// };

export const changeStatusTaskAC = (
  id: string,
  status: boolean,
  todolistId: string
): ChangeStatusType => {
  return {
    type: "CHANGE_TASK_STATUS",
    id: id,
    status: status,
    todolistId: todolistId,
  };
};

export const changeTitleTaskAC = (
  id: string,
  title: string,
  todolistId: string
): ChangeTitleType => {
  return {
    type: "CHANGE_TASK_TITLE",
    id: id,
    title: title,
    todolistId: todolistId,
  };
};

export const changeDescriptionTaskAC = (
  id: string,
  description: string | null,
  todolistId: string
): ChangeDescriptionTaskType => {
  return {
    id,
    description,
    todolistId,
    type: "CHANGE_TASK_DESCRIPTION",
  };
};

export const setOpenTaskAC = (
  id: string,
  open: boolean,
  todolistId: string
): SetOpenTaskType => {
  return {
    type: "SET_OPEN_TASK",
    id: id,
    open: open,
    todolistId: todolistId,
  };
};

export const setTaskDeadlineAC = (
  id: string,
  date: null | Dayjs,
  todolistId: string
): SetTaskDeadline => {
  return {
    type: "SET_TASK_DEADLINE",
    id: id,
    date: date,
    todolistId: todolistId,
  };
};

export const removeSubtaskAC = (
  subId: string,
  taskId: string,
  todolistId: string
): RemoveSubtaskActionType => {
  return {
    type: "REMOVE_SUBTASK",
    subId,
    taskId,
    todolistId,
  };
};

export const addSubtaskAC = (
  taskId: string,
  title: string,
  todolistId: string
): AddSubtaskType => {
  return {
    type: "ADD_SUBTASK",
    title,
    todolistId,
    taskId,
  };
};

export const changeStatusSubtaskAC = (
  taskId: string,
  id: string,
  status: boolean,
  todolistId: string
): ChangeSubtaskStatusType => {
  return {
    type: "CHANGE_SUBTASK_STATUS",
    id,
    taskId,
    todolistId,
    status,
  };
};

export const changeTitleSubtaskAC = (
  subId: string,
  taskId: string,
  title: string,
  todolistId: string
): ChangeSubtaskTitleType => {
  return {
    type: "CHANGE_SUBTASK_TITLE",
    subId,
    taskId,
    todolistId,
    title,
  };
};
