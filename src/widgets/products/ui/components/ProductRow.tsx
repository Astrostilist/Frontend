import React from 'react';
import { TableCell, TableRow, Button } from '@mui/material';
import { TagsChipGroup } from './tagsChipGroup';

interface ProductRowProps {
  product: {
    ext_product_id: string;
    name: string;
    price: number;
    tags: string[];
    images: string[];
  };
  hiddenTags: Record<string, string[]>;
  onToggleHiddenTags: (productId: string) => void;
}

export const ProductRow: React.FC<ProductRowProps> = ({
  product,
  hiddenTags,
  onToggleHiddenTags
}) => {
  return (
    <TableRow key={product.ext_product_id}>
      <TableCell>
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/40'}
          alt={product.name}
          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
        />
      </TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>
        {product.price} <span style={{ marginLeft: 4 }}>₽</span>
      </TableCell>
      <TableCell>
        <TagsChipGroup
          tags={product.tags}
          hiddenTags={hiddenTags}
          productId={product.ext_product_id}
          onToggleHiddenTags={onToggleHiddenTags}
        />
      </TableCell>
      <TableCell>
        <Button variant="text" color="primary">
          Открыть
        </Button>
      </TableCell>
    </TableRow>
  );
};
