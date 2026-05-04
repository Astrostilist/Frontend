import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "widgets/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    user: {
      name: "Ирина С.",
      avatar: "",
    },
  },
};

export const NoAvatar: Story = {
  args: {
    user: {
      name: "Ирина С.",
    },
  },
};

