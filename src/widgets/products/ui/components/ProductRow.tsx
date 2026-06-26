// components/ProductRow.tsx
import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';

interface ProductRowProps {
  imageUrl: string;
  title: string;
  price: number;
  tags: string[];
  shopUrl: string;
}

export const ProductRow: React.FC<ProductRowProps> = ({ imageUrl, title, price, tags, shopUrl }) => {
  return (
    <TableRow>
      <TableCell>
        <img src={imageUrl} alt={title} width={50} height={50} style={{ objectFit: 'cover' }} />
      </TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>{tags.join(', ')}</TableCell>
      <TableCell>
        <Button variant="text" color="primary" onClick={() => window.open(shopUrl, '_blank')}>
          Открыть
        </Button>
      </TableCell>
    </TableRow>
  );
};