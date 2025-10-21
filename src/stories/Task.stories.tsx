import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Task } from "../components/Task/Task";
import dayjs from "dayjs";

const meta = {
  title: "Task component",
  component: Task,
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskExample: Story = {
  args: {
    task: {
      title: "HTML",
      id: "1",
      isDone: true,
      editMode: false,
      openDrawer: false,
      date: dayjs(new Date(2030, 1, 1)),
      description: "HTML task desc",
    },
    todolist_id: "TodolistId_1",
  },
};
