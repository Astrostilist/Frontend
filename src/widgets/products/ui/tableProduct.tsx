import React, { useState, useCallback } from 'react';
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
  Pagination,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import styles from './tableProduct.module.css';
import { SearchField } from './components/Search';

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
  const [page, setPage] = useState<number>(1); // Исправлено: начальная страница 1, а не 0
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [hiddenTags, setHiddenTags] = useState<Record<string, string[]>>({});

  const productsData: Product[] = rawData?.data?.items || [];

  // Получаем все уникальные теги для выпадающего списка
  const allTags = Array.from(new Set(productsData.flatMap(p => p.tags)));

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1); // Начало с первой страницы
  };

  const handleTagChange = (event: SelectChangeEvent<string>) => {
    setTag(event.target.value || 'Все');
    setPage(1); // Начало с первой страницы
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1); // Начало с первой страницы при изменении количества элементов
  };

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = tag === 'Все' || product.tags.some(
      (t) => t.toLowerCase() === tag.toLowerCase()
    );
    return matchesSearch && matchesTag;
  });

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

  const renderTags = (product: Product) => {
    const visibleTags = product.tags.slice(0, 2);
    const hasHiddenTags = product.tags.length > 2;
    const hiddenTagCount = product.tags.length - 2;
    const isExpanded = hiddenTags[product.ext_product_id] !== undefined;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {visibleTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mr: 1, mb: 1 }}
          />
        ))}

        {!isExpanded && hasHiddenTags && (
          <Chip
            label={`+${hiddenTagCount}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ cursor: 'pointer', mr: 1, mb: 1 }}
            onClick={() => toggleHiddenTags(product.ext_product_id)}
          />
        )}

        {isExpanded && hasHiddenTags && (
          <>
            {hiddenTags[product.ext_product_id]?.map((hiddenTag) => (
              <Chip
                key={hiddenTag}
                label={hiddenTag}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </>
        )}
      </Box>
    );
  };

  const displayedRows = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box>
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
          <SearchField
            value={searchTerm}
            onChange={handleSearchChange}
          />
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
              <MenuItem value="Все">Все</MenuItem>
              {allTags.map((tagOption) => (
                <MenuItem key={tagOption} value={tagOption}>
                  {tagOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
                <TableRow key={product.ext_product_id}>
                  <TableCell>
                    <img
                      src={product.images?.[0] || 'https://via.placeholder.com/50'}
                      alt={product.name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.price} <span style={{ marginLeft: 4 }}>₽</span>
                  </TableCell>
                  <TableCell>
                    {renderTags(product)}
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
                  Нет товаров по вашему запросу
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '16px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{ minWidth: 60 }}
                displayEmpty
                inputProps={{ name: 'rowsPerPage', id: 'rows-per-page-select' }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>

            <Pagination
              count={Math.ceil(filteredProducts.length / rowsPerPage) || 0}
              page={page}
              onChange={handleChangePage}
              color="primary"
              disabled={filteredProducts.length === 0}
            />
          </Box>
        </Box>
      </TableContainer>
    </Box>
  );
};
