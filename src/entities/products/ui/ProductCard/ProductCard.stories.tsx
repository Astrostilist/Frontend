// entities/products/ui/ProductCard/ProductCard.stories.tsx
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

// Default состояние
export const Default: Story = {
  args: {
    mode: 'default',
    title: '',
    price: undefined,
    tags: [],
    imageUrl: '',
  },
};

// Full состояние
export const FullWithDefaultData: Story = {
  args: {
    mode: 'full',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
  },
  parameters: {
    docs: {
      description: {
        story: 'Белая футболка Classic',
      },
    },
  },
};

// Full состояние с длинными тегами
export const FullWithLongTags: Story = {
  args: {
    mode: 'full',
    title: 'Спортивные штаны с очень длинным названием',
    price: 3590,
    tags: ['very-long-tag-name', 'comfortable', 'premium-quality', 'best-seller-2024'],
    imageUrl: 'https://picsum.photos/id/20/300/300',
  },
};

// Галерея всех состояний
export const Gallery: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 1}}>
        <ProductCard mode="default"/>
        <ProductCard mode="full" />
    </Box>
  ),
};