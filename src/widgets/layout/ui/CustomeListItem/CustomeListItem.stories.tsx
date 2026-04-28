import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomeListItem } from "./CustomeListItem";
import DashboardIcon from "@mui/icons-material/Dashboard";

const meta: Meta<typeof CustomeListItem> = {
  title: "Widgets/Layout/CustomeListItem",
  component: CustomeListItem,
};

export default meta;

type Story = StoryObj<typeof CustomeListItem>;

export const Default: Story = {
  args: {
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
};

export const Selected: Story = {
  args: {
    label: "Dashboard",
    icon: <DashboardIcon />,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Dashboard",
    icon: <DashboardIcon />,
    disabled: true,
  },
};