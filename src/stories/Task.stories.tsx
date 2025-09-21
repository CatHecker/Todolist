import { Meta, StoryObj } from "@storybook/react-webpack5";
import { Task } from "../components/Task";

const meta = {
  title: "Task component",
  component: Task,
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskExample: Story = {
  args: {
    task: { title: "HTML", id: "1", isDone: true },
    todolist_id: "TodolistId_1",
    changeStatus: (props: any) => {
      console.log("Status changed: " + props);
    },
    changeTaskList: () => {
      "Task List Changed: ";
    },
    removeTask: (props: any) => {
      console.log("Ids for remove: " + props);
    },
  },
};
