import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProductCard } from './ProductCard';
import { Box } from '@mui/material';

const meta = {
  title: 'Entities/Products/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Карточка товара',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['default', 'full'],
      description: 'Режим отображения',
    },
    onShopClick: { action: 'Переход в магазин' },
    onDeleteClick: { action: 'Удалить товар' },
    onClose: { action: 'Закрыть карточку' },
  },
  decorators: [
    (Story) => (
      <Box>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: 'default',
    title: '',
    price: undefined,
    tags: [],
    imageUrl: '',
  },
};

export const FullWithDefaultData: Story = {
  args: {
    mode: 'full',
    imageUrl: 'https://picsum.photos/id/20/300/300',
  },
  parameters: {
    docs: {
      description: {
        story: 'Белая футболка Classic',
      },
    },
  },
};

export const FullWithLongTags: Story = {
  args: {
    mode: 'full',
    title: 'Спортивные штаны с очень длинным названием',
    price: 3590,
    tags: ['very-long-tag-name', 'comfortable', 'premium-quality', 'best-seller-2024'],
    imageUrl: 'https://picsum.photos/id/20/300/300',
  },
};

export const Gallery: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 1}}>
        <ProductCard mode="default"/>
        <ProductCard mode="full" />
    </Box>
  ),
};