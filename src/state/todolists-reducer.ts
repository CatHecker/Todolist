import { v1 } from "uuid";
import { FilterValue, TodolistType } from "../App";

export type RemoveTodolistType = {
  type: "REMOVE-TODOLIST";
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
type ActionType =
  | RemoveTodolistType
  | AddTodolistType
  | changeTodolistTitleActionType
  | changeTodolistFilterActionType;

export const todolistId1 = v1();

export const todolistId2 = v1();

const initialState: Array<TodolistType> = [
  {
    id: todolistId1,
    title: "What to learn",
    filter: "all",
  },
  {
    id: todolistId2,
    title: "What to buy",
    filter: "all",
  },
];

export const todolistsReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionType
): Array<TodolistType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => action.id !== tl.id);
    }
    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all",
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const newTodolists = state.map((tl) => {
        if (tl.id === action.id) tl.filter = action.filter;
        return tl;
      });
      return newTodolists;
    }
    case "CHANGE-TODOLIST-TITLE": {
      const newTodolists = state.map((tl) => {
        if (tl.id === action.id) tl.title = action.title;
        return tl;
      });
      return newTodolists;
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
