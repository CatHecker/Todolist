import { TaskStateType } from "../App";
import {
  addTaskAC,
  changeStatusTaskAC,
  changeTitleTaskAC,
  removeTaskAC,
  TaskReducer,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

test("correct task should be removed from correct array", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "React", isDone: false },
      { id: "2", title: "HTML & CSS", isDone: true },
      { id: "3", title: "JavaScript", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = removeTaskAC("2", "todolistId2");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(1);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "React", isDone: false },
      { id: "2", title: "HTML & CSS", isDone: true },
      { id: "3", title: "JavaScript", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = addTaskAC("juice", "todolistId2");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juice");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("correct status task should be changed at the correct array", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "React", isDone: false },
      { id: "2", title: "HTML & CSS", isDone: true },
      { id: "3", title: "JavaScript", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = changeStatusTaskAC("2", false, "todolistId2");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBeFalsy();
  expect(endState["todolistId1"][1].isDone).toBeTruthy();
});

test("title of specified task should be changed", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "React", isDone: false },
      { id: "2", title: "HTML & CSS", isDone: true },
      { id: "3", title: "JavaScript", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = changeTitleTaskAC("2", "Milkyway", "todolistId2");

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("HTML & CSS");
  expect(endState["todolistId2"][1].title).toBe("Milkyway");
});

test("when todolist added to task should be added empty array", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "React", isDone: false },
      { id: "2", title: "HTML & CSS", isDone: true },
      { id: "3", title: "JavaScript", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = addTodolistAC("newTodolist");

  const endState = TaskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("propety with todolistId should be deleted", () => {
  const startState: TaskStateType = {
    todolistId1: [
      { id: "1", title: "React", isDone: false },
      { id: "2", title: "HTML & CSS", isDone: true },
      { id: "3", title: "JavaScript", isDone: true },
    ],
    todolistId2: [
      { id: "1", title: "Bread", isDone: false },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = removeTodolistAC("todolistId2");

  const endState = TaskReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});