import React, { useState, useEffect } from 'react';
import rawData from '../../../data/product.json';
import {
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { SearchField } from './components/search';
import styles from './tableProduct.module.css';
import Pagination from './components/Pagination';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const tags = ['Все', 'Электроника', 'Одежда', 'Дом', 'Книги'];
  const productsData: Product[] = rawData?.data?.items || [];

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  // Исправленный обработчик с правильным типом MUI Select
  const handleTagChange = (event: SelectChangeEvent<string>) => {
    setTag(event.target.value || 'Все');
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredProducts = products.filter((product) => {
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
    <>
      <Typography className={styles.table} variant="h6" gutterBottom>
        Таблица с товарами
      </Typography>

      <Box
        className={styles.imputform}
        sx={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Box sx={{ flex: { xs: 1, sm: 2 } }}>
          <SearchField value={searchTerm} onChange={handleSearchChange} />
        </Box>

        <Box sx={{ flex: { xs: 1, sm: 1 } }}>
          <FormControl fullWidth>
            <InputLabel>Тег</InputLabel>
            <Select
              value={tag}
              onChange={handleTagChange}
              label="Тег"
              sx={{ minWidth: 120 }}
            >
              {tags.map((tagOption) => (
                <MenuItem key={tagOption} value={tagOption}>
                  {tagOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        {/* Остальная часть компонента остается без изменений */}
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
                <TableRow key={product.ext_product_id}>
                  <TableCell>
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/50'}
                      alt={product.name}
                      style={{ width: '50px' }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell style={{ alignItems: 'center' }}>
                    {product.price}
                    <span style={{ marginLeft: 4 }}>₽</span>
                  </TableCell>
                  <TableCell>
                    {product.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button variant="text" color="primary">
                      Открыть
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Нет товаров
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          count={Math.ceil(filteredProducts.length / rowsPerPage)}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
