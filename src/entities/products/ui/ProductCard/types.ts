export interface ProductCardProps {
  mode?: 'default' | 'full';
  title?: string;
  price?: number;
  tags?: string[];
  imageUrl?: string;
  onShopClick?: () => void;
  onDeleteClick?: () => void;
  onClose?: () => void;
}