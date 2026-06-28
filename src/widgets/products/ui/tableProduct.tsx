import React, { useState, useCallback } from 'react';
import rawData from '../../../data/product.json';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { SearchField } from './components/search';
import styles from '../tableProduct.module.css';
import { TagFilter } from './components/tagFilter';
import  Pagination  from './components/pagination';
import { ProductRow } from './components/productRow';
import type { SelectChangeEvent } from '@mui/material/Select';

interface Product {
  ext_product_id: string;
  name: string;
  price: number;
  tags: string[];
  images: string[];
}

export const TableProduct: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [tag, setTag] = useState<string>('Все');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [hiddenTags, setHiddenTags] = useState<Record<string, string[]>>({});

  const productsData: Product[] = rawData?.data?.items || [];
  const allTags = Array.from(new Set(productsData.flatMap(p => p.tags)));

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(0);
  };

  const handleTagChange = (event: SelectChangeEvent<string>) => {
    setTag(event.target.value || 'Все');
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleHiddenTags = useCallback((productId: string) => {
    setHiddenTags(prev => {
      const product = productsData.find(p => p.ext_product_id === productId);
      if (!product) return prev;

      const existingHidden = prev[productId] || [];

      if (existingHidden.length > 0) {
        const newHiddenTags = { ...prev };
        delete newHiddenTags[productId];
        return newHiddenTags;
      } else {
        const allHiddenTags = product.tags.slice(2);
        return {
          ...prev,
          [productId]: allHiddenTags
        };
      }
    });
  }, [productsData]);

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = tag === 'Все' || product.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    );
    return matchesSearch && matchesTag;
  });

  const displayedRows = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <Typography className={styles.table} variant="h6" gutterBottom>
        Таблица с товарами
      </Typography>

      <Box className={styles.imputform}>
        <Box className={styles.search}>
          <SearchField
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </Box>

        <TagFilter
          tag={tag}
          allTags={allTags}
          onTagChange={handleTagChange}
        />
      </Box>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Изображение</TableCell>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Теги</TableCell>
              <TableCell>Действие</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedRows.length > 0 ? (
              displayedRows.map((product) => (
                <ProductRow
                  key={product.ext_product_id}
                  product={product}
                  hiddenTags={hiddenTags}
                  onToggleHiddenTags={toggleHiddenTags}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                Нет товаров по вашему запросу
              </TableCell>
            </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredProducts.length / rowsPerPage)}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
