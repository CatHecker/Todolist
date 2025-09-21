import { v1 } from "uuid";
import { TaskStateType } from "../App";
import {
  AddTodolistType,
  RemoveTodolistType,
  todolistId1,
  todolistId2,
} from "./todolists-reducer";

type RemoveTaskActionType = {
  type: "REMOVE_TASK";
  id: string;
  todolistId: string;
};

type AddTaskActionType = {
  type: "ADD_TASK";
  title: string;
  todolistId: string;
};

type ChangeStatusType = {
  type: "CHANGE_TASK_STATUS";
  id: string;
  todolistId: string;
  status: boolean;
};

type ChangeTitleType = {
  type: "CHANGE_TASK_TITLE";
  id: string;
  todolistId: string;
  title: string;
};

type ActionType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeStatusType
  | ChangeTitleType
  | AddTodolistType
  | RemoveTodolistType;

const initialState: TaskStateType = {
  [todolistId1]: [
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "HTML & CSS", isDone: true },
    { id: v1(), title: "JavaScript", isDone: true },
  ],
  [todolistId2]: [
    { id: v1(), title: "Bread", isDone: false },
    { id: v1(), title: "Milk", isDone: true },
  ],
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
        { id: v1(), title: action.title, isDone: false },
        ...taskList,
      ];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE_TASK_STATUS": {
      state[action.todolistId] = state[action.todolistId].map((t) =>
        t.id === action.id ? { ...t, isDone: action.status } : t
      );
      return { ...state };
    }
    case "CHANGE_TASK_TITLE": {
      state[action.todolistId] = state[action.todolistId].map((t) =>
        t.id === action.id ? { ...t, title: action.title } : t
      );
      return state;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.todolistId] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
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
  todolistId: string
): AddTaskActionType => {
  return { type: "ADD_TASK", title: title, todolistId: todolistId };
};

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
