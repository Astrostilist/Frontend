// entities/products/ui/ProductCard/ProductCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import type { ProductCardProps } from './types';

export const ProductCard: React.FC<ProductCardProps> = ({
  mode = 'default',
  title,
  price,
  tags = [],
  imageUrl,
  onShopClick,
  onDeleteClick,
  onClose,
}) => {
  const isFull = mode === 'full';

  const fullData = {
    title: 'Белая футболка Classic',
    price: 1100,
    tags: ['classic', 'comfort', 'high-quality', 'essential'],
    imageUrl: 'https://picsum.photos/id/20/300/300',
  };

  const displayTitle = isFull ? (title ?? fullData.title) : 'Название товара';
  const displayPrice = isFull ? (price ?? fullData.price) : undefined;
  const displayTags = isFull ? (tags.length ? tags : fullData.tags) : [];
  const displayImage = isFull ? (imageUrl ?? fullData.imageUrl) : undefined;

  return (
    <Card
      sx={{
        width: '360px',
        borderRadius: 1,
        boxShadow: '24',
        position: 'relative',
      }}
    >
      <CardContent
        sx={{
          p: '20px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '17px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 500,
              lineHeight: '160%',
              letterSpacing: '0.15px',
            }}
          >
            {displayTitle}
          </Typography>

          <IconButton onClick={onClose} size="medium" sx={{ p: 1 }} aria-label="Закрыть">
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Box>

        <Box
          sx={{
            width: '100%',
            height: 300,
            bgcolor: 'grey.400',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {isFull && displayImage ? (
            <Box
              component="img"
              src={displayImage}
              alt={displayTitle}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.3,
              }}
            >
              <ImageNotSupportedIcon />
              <Typography variant="overline" color="text.secondary">
                НЕТ ИЗОБРАЖЕНИЯ
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '17px' }}>
            {isFull ? (
              <>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' }}
                >
                  Цена:
                </Typography>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' }}
                >
                  {displayPrice?.toLocaleString('ru-RU')} ₽
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  component="span"
                  sx={{ fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' }}
                >
                  Цена:{' '}
                </Typography>
              </>
            )}
          </Box>

          {isFull ? (
            displayTags.length > 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'flex-srart', gap: 1 }}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' }}
                >
                  Теги:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {displayTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="medium"
                      variant="outlined"
                      color="primary"
                      sx={{ fontSize: '0.75rem', height: 24 }}
                    />
                  ))}
                </Box>
              </Box>
            ) : (
              <Typography
                variant="body1"
                sx={{ fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' }}
              >
                Теги: —
              </Typography>
            )
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: 400, lineHeight: '150%', letterSpacing: '0.15px' }}
              >
                Теги:
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            variant="contained"
            onClick={onShopClick}
            disabled={!isFull}
            size="medium"
            fullWidth
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '0.835rem',
            }}
          >
            ПЕРЕЙТИ В МАГАЗИН
          </Button>
          <Button
            variant="outlined"
            onClick={onDeleteClick}
            disabled={!isFull}
            size="medium"
            fullWidth
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              fontSize: '0.835rem',
            }}
          >
            УДАЛИТЬ
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
