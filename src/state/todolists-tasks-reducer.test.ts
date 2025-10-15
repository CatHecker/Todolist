import { TaskReducer, TaskStateType } from "./tasks-reducer";
import {
  addDeletedTodolistAC,
  addTodolistAC,
  removeTodolistAC,
  todolistsReducer,
  TodolistStateType,
} from "./todolists-reducer";

test("ids should be equal", () => {
  const startTasksState: TaskStateType = { lastDeletedTodolist: [] };
  const startTodolistsState: TodolistStateType = {
    todolists: [],
    lastDeletedTodolist: null,
  };

  const action = addTodolistAC("new todolist");

  const endTasksState = TaskReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  console.log(endTasksState);
  const idFromTasks = keys[1];
  const idFromTodolists = endTodolistsState.todolists[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});

test("id of deleted todolist should be equal", () => {
  const startTasksState: TaskStateType = {
    lastDeletedTodolist: [],
    delTodo: [
      {
        id: "t1",
        description: null,
        title: "How to go?",
        isDone: false,
        editMode: false,
        openDrawer: false,
        date: null,
        subtasks: [
          {
            id: "s1",
            title: "First step",
            isDone: false,
          },
        ],
      },
    ],
  };
  const startTodolistsState: TodolistStateType = {
    todolists: [
      {
        id: "delTodo",
        title: "Deleted todolist",
        filter: "all",
        editMode: false,
      },
    ],
    lastDeletedTodolist: null,
  };

  const action = removeTodolistAC("delTodo");

  const removeTasksState = TaskReducer(startTasksState, action);
  const removeTodolistsState = todolistsReducer(startTodolistsState, action);

  const undoAction = addDeletedTodolistAC("delTodo");

  const endTasksState = TaskReducer(removeTasksState, undoAction);
  const endTodolistsState = todolistsReducer(removeTodolistsState, undoAction);

  const keys = Object.keys(endTasksState);
  console.log(endTasksState);
  const idFromTasks = keys[1];
  const idFromTodolists = endTodolistsState.todolists[0].id;

  expect(idFromTasks).toBe(undoAction.id);
  expect(idFromTodolists).toBe(undoAction.id);
});
