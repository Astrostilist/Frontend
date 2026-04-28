import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import EditIcon from "@mui/icons-material/Edit";

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
    companyName: "Астростилист",
    user: {
      name: "Ирина С.",
      avatar: "",
    },
    items: [
      { label: "Главная", icon: <HomeIcon /> },
      { label: "Каталог товаров", icon: <ViewListIcon />, selected: true },
      { label: "Редактор правил", icon: <EditIcon /> },
    ],
  },
};

export const NoAvatar: Story = {
  args: {
    companyName: "Астростилист",
    user: {
      name: "Ирина С.",
    },
    items: [
      { label: "Главная", icon: <HomeIcon /> },
      { label: "Каталог", icon: <ViewListIcon /> },
    ],
  },
};

