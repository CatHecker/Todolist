import { Meta, StoryObj } from "@storybook/react-webpack5";
import { AddItemInput } from "../components/addItemInput";


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
  },
};

/* 
export const AddItemInputExample = (props: any) => {
  return (
    <AddItemInput
      addItem={action()}
    />
  );
};
*/

/*
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
*/
