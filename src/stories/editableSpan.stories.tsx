import { Meta, StoryObj } from "@storybook/react-webpack5";
import { EditableSpan } from "../components/editableSpan";

const meta = {
  title: "EditableSpan component",
  component: EditableSpan,
} satisfies Meta<typeof EditableSpan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpanExample: Story = {
  args: {
    title: "HTml",
    onChange: (newValue: string) => {
      console.log(newValue);
    },
  },
};
