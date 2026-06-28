import React from 'react';
import { TableProduct } from '../widgets/products/ui/TableProduct'; // укажите правильный путь к вашему компоненту

export const CatalogPage: React.FC = () => {
  return (
    <div>
      <h1>Каталог товаров</h1>
      <TableProduct />
    </div>
  );
};