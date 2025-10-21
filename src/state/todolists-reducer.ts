import { v1 } from "uuid";
import { FilterValue, TodolistType } from "../AppWithRedux";

export type RemoveTodolistType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddDeletedTodolistType = {
  type: "ADD_DELETED_TODOLIST";
  id: string;
};

export type AddTodolistType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type changeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  title: string;
  id: string;
};

export type changeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValue;
};

export type setModeTodolistActionType = {
  type: "CHANGE-TODOLIST-MODE";
  id: string;
  editMode: boolean;
};

type ActionType =
  | RemoveTodolistType
  | AddTodolistType
  | changeTodolistTitleActionType
  | changeTodolistFilterActionType
  | setModeTodolistActionType
  | AddDeletedTodolistType

export const todolistId1 = v1();

export const todolistId2 = v1();

export type TodolistStateType = {
  todolists: TodolistType[];
  lastDeletedTodolist: null | TodolistType;
};

const initialState: TodolistStateType = {
  todolists: [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      editMode: false,
    },
  ],
  lastDeletedTodolist: null,
};

export const todolistsReducer = (
  state: TodolistStateType = initialState,
  action: ActionType
): TodolistStateType => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      const deletedTodolist =
        state.todolists.find((tl) => tl.id === action.id) || null;
      return {
        todolists: [...state.todolists].filter((tl) => action.id !== tl.id),
        lastDeletedTodolist: deletedTodolist,
      };
    }
    case "ADD-TODOLIST": {
      const newTodolist: TodolistType = {
        id: action.todolistId,
        title: action.title,
        filter: "all",
        editMode: false,
      };
      return { ...state, todolists: [newTodolist, ...state.todolists] };
    }
    case "CHANGE-TODOLIST-FILTER": {
      const newTodolists = state.todolists.map((tl) => {
        if (tl.id === action.id) return { ...tl, filter: action.filter };
        return tl;
      });
      return { ...state, todolists: newTodolists };
    }
    case "CHANGE-TODOLIST-TITLE": {
      const newTodolists = state.todolists.map((tl) => {
        if (tl.id === action.id) return { ...tl, title: action.title };
        return tl;
      });
      return { ...state, todolists: newTodolists };
    }
    case "CHANGE-TODOLIST-MODE": {
      const newTodolists = state.todolists.map((tl) => {
        if (tl.id === action.id) return { ...tl, editMode: action.editMode };
        return tl;
      });
      return { ...state, todolists: newTodolists };
    }
    case "ADD_DELETED_TODOLIST": {
      if (!state.lastDeletedTodolist) return state;
      return {
        lastDeletedTodolist: null,
        todolists: [state.lastDeletedTodolist, ...state.todolists],
      };
    }
    default:
      return state;
  }
};

export const addTodolistAC = (title: string): AddTodolistType => {
  return { type: "ADD-TODOLIST", title: title, todolistId: v1() };
};

export const removeTodolistAC = (id: string): RemoveTodolistType => {
  return { type: "REMOVE-TODOLIST", id };
};

export const addDeletedTodolistAC = (id: string): AddDeletedTodolistType => {
  return { type: "ADD_DELETED_TODOLIST", id };
};

export const changeTodolistFilterTypeAC = (
  id: string,
  filter: FilterValue
): changeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter };
};

export const changeTodolistTitleAC = (
  id: string,
  title: string
): changeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id, title };
};

export const setModeTodolistAC = (
  id: string,
  editMode: boolean
): setModeTodolistActionType => {
  return { type: "CHANGE-TODOLIST-MODE", id, editMode };
};