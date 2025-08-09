import { v1 } from "uuid";
import { TodolistType } from "../App";
import { addTodolistAC, changeTodolistFilterTypeAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";

test("empty todolist should be added to array", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  const action = addTodolistAC("What to sell");

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(3);
  expect(endState[0].id).toBeDefined();
  expect(endState[0].title).toBe("What to sell")
});

test("correct todolist should be removed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  const action = removeTodolistAC(todolistId1);

  const endState = todolistsReducer(startState, action);

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("title of specified todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  const action = changeTodolistTitleAC(todolistId1, "Roadmap");

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("Roadmap");
});

test("filter type of specified todolist should be changed", () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: Array<TodolistType> = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "what to buy", filter: "all" },
  ];

  const action = changeTodolistFilterTypeAC(todolistId1, "active");
 
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("active");
});
