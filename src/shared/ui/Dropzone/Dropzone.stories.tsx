import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Typography, Paper } from '@mui/material';
import { Dropzone } from './Dropzone';

const meta: Meta<typeof Dropzone> = {
  title: 'shared/ui/Dropzone',
  component: Dropzone,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Компонент для загрузки файлов с поддержкой drag-and-drop, валидацией и различными состояниями.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onFileSelect: { action: 'file selected' },
    accept: {
      control: 'text',
      description: 'Accept file types',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    errorMessage: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    maxSizeLabel: {
      control: 'text',
    },
    acceptedFileLabel: {
      control: 'text',
    },
  },
  decorators: [
    (Story) => (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Story />
      </Container>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropzone>;

// Default состояние
export const Default: Story = {
  args: {
    description: 'Нажмите или перетащите файл',
    acceptedFileLabel: 'CSV файл',
    maxSizeLabel: 'макс. 50MB',
  },
};

// Hover состояние
export const Hover: Story = {
  args: {
    description: 'Нажмите или перетащите файл',
    acceptedFileLabel: 'CSV файл',
    maxSizeLabel: 'макс. 50MB',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

// Error состояние
export const Error: Story = {
  args: {
    error: true,
    errorMessage: 'Файл не поддерживается',
    description: 'Нажмите или перетащите файл',
    acceptedFileLabel: 'CSV файл',
    maxSizeLabel: 'макс. 50MB',
  },
};

// Disabled состояние
export const Disabled: Story = {
  args: {
    disabled: true,
    description: 'Нажмите или перетащите файл',
    acceptedFileLabel: 'CSV файл',
    maxSizeLabel: 'макс. 50MB',
  },
};

// С кастомными текстами
export const CustomTexts: Story = {
  args: {
    description: 'Загрузите изображение',
    acceptedFileLabel: 'PNG, JPG или WebP',
    maxSizeLabel: 'макс. 10MB',
    accept: '.png,.jpg,.jpeg,.webp',
  },
};

// С разными типами файлов
export const AcceptMultipleFormats: Story = {
  args: {
    description: 'Нажмите или перетащите файл',
    acceptedFileLabel: 'CSV, JSON или XML файл',
    maxSizeLabel: 'макс. 100MB',
    accept: '.csv,.json,.xml',
    maxSize: 100 * 1024 * 1024,
  },
};

// Все состояния в одном месте для обзора
const AllStatesExample = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Typography variant="h6" gutterBottom>Все состояния Dropzone</Typography>
    
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 0 }}>
        1. Default состояние
      </Typography>
      <Dropzone />
      
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
        2. Hover и Focus состояния (наведите курсор)
      </Typography>
      <Dropzone /*className="hover-demo"*/ />
      
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
        3. Error состояние
      </Typography>
      <Dropzone 
        error
        errorMessage="Файл не поддерживается"
      />
      
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 3 }}>
        4. Disabled состояние
      </Typography>
      <Dropzone disabled />
    </Paper>
  </Container>
);

export const AllStates: Story = {
  render: () => <AllStatesExample />,
  parameters: {
    docs: {
      description: {
        story: 'Демонстрация всех состояний компонента Dropzone в одном месте для удобного сравнения.',
      },
    },
  },
};