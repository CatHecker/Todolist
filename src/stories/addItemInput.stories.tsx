import { Meta, StoryObj } from "@storybook/react-webpack5";
import { AddItemInput } from "../components/AddItemInput/addItemInput";
import { string } from "prop-types";

const meta = {
  title: "addItemInput component",
  component: AddItemInput,
} satisfies Meta<typeof AddItemInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemInputExample: Story = {
  args: {
    addItem: (title: string) => {
      console.log("Button 'add' clicked: " + title);
    },
    placeholder: "Add something",
  },
};
