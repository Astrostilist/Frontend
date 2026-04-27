import React from 'react';
import { Box, IconButton, Typography, LinearProgress } from '@mui/material';
import { Delete as DeleteIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { UploadFile } from '@mui/icons-material';

import styles from './UploadItem.module.css';

interface UploadItemProps {
  file: File;
  onRemove: () => void;
  uploadProgress?: number;
  uploadStatus?: 'uploading' | 'success' | 'error';
  fileSize?: number;
}

export const UploadItem: React.FC<UploadItemProps> = ({
  file,
  onRemove,
  uploadProgress = 100,
  uploadStatus = 'success',
  fileSize,
}) => {
  // Функция для определения цвета прогресс-бара и иконки файла
  const getColorByStatus = () => {
    if (uploadStatus === 'error') return 'rgba(253, 237, 237, 1)';
    if (uploadStatus === 'success') return '#1976D2';
    return '#1976D2';
  };

  // Текст статуса
  const getStatusText = () => {
    if (uploadStatus === 'error') return 'Failed';
    if (uploadStatus === 'success') return 'Complete';
    return 'Loading';
  };

  // Иконка успеха или удаления
  const renderStatusIcon = () => {
    if (uploadStatus === 'success') {
      return (
        <CheckCircleIcon style={{ color: 'green', fontSize: 20 }} />
      );
    }
    return (
      <IconButton
        aria-label="удалить"
        size="small"
        onClick={onRemove}
        style={{ marginLeft: 8, color: 'gray' }}
      >
        <DeleteIcon />
      </IconButton>
    );
  };

  // Форматирование размера файла
  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + 'KB';
    } else {
      return bytes + 'B';
    }
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.contentWrapper}>
        {/* Левая часть: иконка, название, блок с весом и статусом */}
        <Box className={styles.infoBlock}>
          {/* Иконка файла с условным цветом */}
          <UploadFile
            className={styles.uploaditem}
            style={{ color: uploadStatus === 'error' ? 'red' : '#1976D2' }}
          />

          {/* Детали файла и блок веса/статуса */}
          <Box className={styles.fileDetails}>
            <Typography
              variant="body2"
              className={styles.namefile}
              style={{ color: uploadStatus === 'error' ? 'red' : 'inherit' }}
            >
              {file.name}
            </Typography>
            {/* Блок с весом файла или сообщением об ошибке, а также статус */}
            <Box className={styles.sizeAndStatus}>
              {uploadStatus === 'error' ? (
                <Typography variant="caption" style={{ color: 'red' }}>File too large</Typography>
              ) : (
                fileSize !== undefined && (
                  <Typography variant="caption" className={styles.item}>
                    {formatFileSize(fileSize)}
                  </Typography>
                )
              )}
              <span className={styles.separator}>•</span>
              {/* Статус */}
              <Typography
                className={styles.statusText}
                style={{
                  color: uploadStatus === 'error' ? 'red' : 'rgba(0, 0, 0, 0.6)',
                }}
              >
                {getStatusText()}
              </Typography>
            </Box>
            {/* Полоса прогресса — при статусе error или success меняется цвет */}
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              className={styles.loading}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: '#e0e0e0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getColorByStatus() + ' !important',
                },
              }}
            />
          </Box>
        </Box>
        {/* Иконка или кнопка удаления/галочка */}
        {renderStatusIcon()}
      </Box>
    </Box>
  );
};