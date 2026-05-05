import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack, Typography, Box } from '@mui/material';
import { CardStatistic } from './CardStatistic';

const meta: Meta<typeof CardStatistic> = {
  title: 'Widgets/StatisticSection/CardStatistic',
  component: CardStatistic,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['inquiry', 'successRate', 'retry', 'dlq'],
      description: 'Тип карточки',
    },
    value: {
      control: 'number',
      description: 'Основное значение',
    },
    changePercent: {
      control: 'number',
      description: 'Процент изменения (для inquiry)',
    },
    changeAbsolute: {
      control: 'number',
      description: 'Абсолютное изменение за 24ч (для retry)',
    },
    unit: {
      control: 'text',
      description: 'Единица измерения',
    },
    title: {
      control: 'text',
      description: 'Заголовок (по умолчанию из type)',
    },
    onClick: {
      action: 'clicked',
      description: 'Обработчик клика',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardStatistic>;

export const InquiryGrowth: Story = {
  args: {
    type: 'inquiry',
    value: 57,
    changePercent: 12.5,
  },
};

export const InquiryDecline: Story = {
  args: {
    type: 'inquiry',
    value: 42,
    changePercent: -8.3,
  },
};

export const SuccessRateNormal: Story = {
  args: {
    type: 'successRate',
    value: 95.4,
  },
};

export const RetryGrowth: Story = {
  args: {
    type: 'retry',
    value: 3,
    changeAbsolute: 2,
  },
};

export const RetryDecline: Story = {
  args: {
    type: 'retry',
    value: 1,
    changeAbsolute: -3,
  },
};

export const DlqWithTasks: Story = {
  args: {
    type: 'dlq',
    value: 1,
  },
};

export const DlqEmpty: Story = {
  args: {
    type: 'dlq',
    value: 0,
  },
};

export const CardGroup: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Box sx={{ width: '100%', maxWidth: 1200}}>
      <Typography variant="h6" gutterBottom>
        Все типы карточек
      </Typography>
      <Box sx={{ p: '20px 20px 35px 20px', border: '1px dashed #9747FF', borderRadius: '5px' }}>
        <Stack spacing="35px">
          <CardStatistic type="inquiry" value={57} changePercent={12.5} />
          <CardStatistic type="successRate" value={95.4} />
          <CardStatistic type="retry" value={3} changeAbsolute={2} />
          <CardStatistic type="dlq" value={2} />
        </Stack>
      </Box>

      <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
        Разные состояния Success Rate
      </Typography>
      <Box sx={{ p: '20px' }}>
        <Stack spacing="35px">
          <Box>
            <CardStatistic type="successRate" value={95.4} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Норма (80-100%)
            </Typography>
          </Box>
          <Box>
            <CardStatistic type="successRate" value={65.2} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Внимание (50-80%)
            </Typography>
          </Box>
          <Box>
            <CardStatistic type="successRate" value={32.8} />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Критично (0-50%)
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  ),
};
