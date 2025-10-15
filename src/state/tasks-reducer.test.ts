import dayjs from "dayjs";
import {
  addSubtaskAC,
  addTaskAC,
  changeDescriptionTaskAC,
  changeStatusSubtaskAC,
  changeStatusTaskAC,
  changeTitleSubtaskAC,
  changeTitleTaskAC,
  removeSubtaskAC,
  removeTaskAC,
  setOpenTaskAC,
  setTaskDeadlineAC,
  TaskReducer,
  TaskStateType,
} from "./tasks-reducer";
import {
  addDeletedTodolistAC,
  addTodolistAC,
  removeTodolistAC,
} from "./todolists-reducer";

// Subtask type
//   id: string,
//   title: string,
//   isDone: boolean,

const getStartState = (): TaskStateType => ({
  todolistId1: [
    {
      id: "1",
      title: "React",
      isDone: false,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2000, 1, 1)),
      description: "Base task description",
    },
    {
      id: "2",
      title: "HTML & CSS",
      isDone: true,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2000, 1, 1)),
      description: "Base task description",
      subtasks: [
        { id: "sub1", title: "HTML", isDone: true },
        { id: "sub2", title: "CSS", isDone: false },
      ],
    },
    {
      id: "3",
      title: "JavaScript",
      isDone: true,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2000, 1, 1)),
      description: "Base task description",
    },
  ],
  todolistId2: [
    {
      id: "1",
      title: "Bread",
      isDone: false,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2000, 1, 1)),
      description: "Base task description",
    },
    {
      id: "2",
      title: "Milk",
      isDone: true,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2000, 1, 1)),
      description: "Base task description",
    },
  ],
  lastDeletedTodolist: [],
});

test("should remove task from correct todolist", () => {
  const startState = getStartState();
  const action = removeTaskAC("2", "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"]).toHaveLength(1);
  expect(endState["todolistId2"].find((t) => t.id === "2")).toBeUndefined();
  expect(endState["todolistId1"]).toHaveLength(3);
});

test("should add task to correct todolist", () => {
  const startState = getStartState();
  const action = addTaskAC("juice", "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"]).toHaveLength(3);
  expect(endState["todolistId2"][0]).toMatchObject({
    title: "juice",
    isDone: false,
  });
  expect(endState["todolistId2"][0].id).toBeDefined();
});

test("should add task with correct parameters", () => {
  const taskId = "bigTaskId";
  const newTask = {
    title: "juice",
    id: taskId,
    isDone: true,
    date: null,
    description: "Task with very big data! Lorem ipsum...",
  };

  const startState = getStartState();

  const action = addTaskAC(
    newTask.title,
    "todolistId2",
    newTask.id,
    newTask.isDone,
    newTask.date,
    newTask.description
  );

  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][0]).toMatchObject(newTask);
});

test("should change task status at correct todolist", () => {
  const startState = getStartState();
  const action = changeStatusTaskAC("2", false, "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBeFalsy();
  expect(endState["todolistId1"][1].isDone).toBeTruthy();
});

test("should change title of correct task", () => {
  const startState = getStartState();
  const action = changeTitleTaskAC("2", "Milkyway", "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("HTML & CSS");
  expect(endState["todolistId2"][1].title).toBe("Milkyway");
});

test("should add empty array when todolist added", () => {
  const startState = getStartState();
  const action = addTodolistAC("newTodolist");
  const endState = TaskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }
  expect(keys.length).toBe(4);
  expect(endState[newKey]).toEqual([]);
});

test("should add deleted tasks", () => {
  const startState = getStartState();
  const action = addDeletedTodolistAC("deleted");
  const endState = TaskReducer(startState, action);

  expect(endState.lastDeletedTodolist).toEqual([]);
  const keys = Object.keys(endState);
  expect(keys.length).toBe(4);
});
test("propety with todolistId should be deleted", () => {
  const startState = getStartState();
  const action = removeTodolistAC("todolistId2");
  const endState = TaskReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(2);
  expect(endState["todolistId2"]).toBeUndefined();
});

test("should open menu of correct task", () => {
  const startState = getStartState();
  const action = setOpenTaskAC("2", true, "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].openDrawer).toBe(false);
  expect(endState["todolistId2"][1].openDrawer).toBe(true);
});

test("should change deadline of correct task", () => {
  let now = new Date();
  const startState = getStartState();
  const action = setTaskDeadlineAC("2", dayjs(now), "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][1].date?.toDate().getTime()).toBe(
    now.getTime()
  );
});

test("should change description of correst task", () => {
  const startState = getStartState();
  const action = changeDescriptionTaskAC("2", "New desc", "todolistId1");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].description).toBe("New desc");
});

test("should not change name if new name is 0 length", () => {
  const startState = getStartState();
  const action = changeTitleTaskAC("2", "", "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe(
    startState["todolistId2"][1].title
  );
});

test("should not change name if new name is more than 100 length", () => {
  const startState = getStartState();
  const action = changeTitleTaskAC(
    "2",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "todolistId2"
  );
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe(
    startState["todolistId2"][1].title
  );
});

// Subtasks tests

test("should remove correct subtask", () => {
  const startState = getStartState();
  const action = removeSubtaskAC("sub1", "2", "todolistId1");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].subtasks).toBeDefined();
  expect(endState["todolistId1"][1].subtasks).toHaveLength(1);
  expect(endState["todolistId1"][1].subtasks?.[0].id).toBe("sub2");
});

test("should add subtask to correct task", () => {
  const startState = getStartState();
  const action = addSubtaskAC("2", "juice", "todolistId1");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].subtasks).toHaveLength(3);
});

test("should add subtask list to task", () => {
  const startState = getStartState();
  const action = addSubtaskAC("2", "juice", "todolistId2");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId2"][1].subtasks).toBeDefined();
});

test("should change subtask status at correct todolist", () => {
  const startState = getStartState();
  const action = changeStatusSubtaskAC("2", "sub1", false, "todolistId1");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].subtasks?.[0].isDone).toBeFalsy();
  expect(endState["todolistId1"][1].subtasks?.[1].isDone).toBeFalsy();
});

test("should change title of correct subtask", () => {
  const startState = getStartState();
  const action = changeTitleSubtaskAC("sub1", "2", "JSX", "todolistId1");
  const endState = TaskReducer(startState, action);

  expect(endState["todolistId1"][1].subtasks?.[0].title).toBe("JSX");
});
