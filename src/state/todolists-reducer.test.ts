import {
  addDeletedTodolistAC,
  addTodolistAC,
  changeTodolistFilterTypeAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setModeTodolistAC,
  todolistsReducer,
  TodolistStateType,
} from "./todolists-reducer";

const getStartState = (): TodolistStateType => {
  return {
    lastDeletedTodolist: {
      id: "deleted",
      title: "What to think",
      filter: "all",
      editMode: false,
    },
    todolists: [
      { id: "1", title: "What to learn", filter: "all", editMode: false },
      { id: "2", title: "what to buy", filter: "all", editMode: false },
    ],
  };
};

test("empty todolist should be added to array", () => {
  const startState = getStartState();
  const action = addTodolistAC("What to sell");
  const endState = todolistsReducer(startState, action).todolists;

  expect(endState.length).toBe(3);
  expect(endState[0].id).toBeDefined();
  expect(endState[0].title).toBe("What to sell");
});

test("correct todolist should be removed", () => {
  const startState = getStartState();
  const action = removeTodolistAC("1");
  const endState = todolistsReducer(startState, action);
  expect(endState.todolists.length).toBe(1);
  expect(endState.todolists[0].id).toBe("2");
  expect(endState.lastDeletedTodolist?.id).toBe("1");
});

test("last deleted todolists should be added to array", () => {
  const startState = getStartState();
  const action = addDeletedTodolistAC("deleted");
  const endState = todolistsReducer(startState, action);
  expect(endState.lastDeletedTodolist).toBe(null);
  expect(endState.todolists.length).toBe(3);
  expect(endState.todolists[0].id).toBe("deleted");
});

test("title of correct todolist should be changed", () => {
  const startState = getStartState();
  const action = changeTodolistTitleAC("1", "Roadmap");
  const endState = todolistsReducer(startState, action).todolists;

  expect(endState[0].title).toBe("Roadmap");
});

test("filter type of correct todolist should be changed", () => {
  const startState = getStartState();
  const action = changeTodolistFilterTypeAC("1", "active");
  const endState = todolistsReducer(startState, action).todolists;

  expect(endState[0].filter).toBe("active");
});

test("edit mode of specified todolist should be changed", () => {
  const startState = getStartState();
  const action = setModeTodolistAC("1", !startState.todolists[0].editMode);
  const endState = todolistsReducer(startState, action).todolists;

  expect(endState[0].editMode).toBe(true);
});
