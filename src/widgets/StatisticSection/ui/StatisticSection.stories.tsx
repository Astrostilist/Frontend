import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatisticSection } from './StatisticSection';
import { type StatisticData } from './StatisticSection.types';

const meta: Meta<typeof StatisticSection> = {
  title: 'Widgets/StatisticSection/StatisticSection',
  component: StatisticSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    skeletonCount: {
      control: 'number',
      description: 'Количество карточек-скелетонов',
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticSection>;

const mockData: StatisticData[] = [
  {
    id: '1',
    type: 'inquiry',
    value: 57,
    changePercent: 12.5,
    title: 'Запросы за 24ч',
  },
  {
    id: '2',
    type: 'successRate',
    value: 95.4,
    title: 'Успешные генерации',
  },
  {
    id: '3',
    type: 'retry',
    value: 3,
    changeAbsolute: 2,
    title: 'Задачи Retry',
  },
  {
    id: '4',
    type: 'dlq',
    value: 2,
    title: 'Задачи DLQ',
  },
];

export const Default: Story = {
  args: {
    data: mockData,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    loading: true,
    skeletonCount: 4,
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
