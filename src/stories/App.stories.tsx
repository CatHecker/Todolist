import { Meta, StoryObj } from "@storybook/react-webpack5";
import AppWithRedux from "../AppWithRedux";
import { ReduxStoreProviderDecorator } from "./ReduxStoreProviderDecorator";

const meta = {
  title: "App component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} satisfies Meta<typeof AppWithRedux>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AppExample: Story = {};
