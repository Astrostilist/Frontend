import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: 'Widgets/Layout/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: 'Главная',
  },
};

export const WithLongTitle: Story = {
  args: {
    title: 'Редактор правил',
  },
};

