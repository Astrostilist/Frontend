import React, { useCallback, useState, useRef } from 'react';
import type { DropzoneProps } from './types';
import {
  Box,
  Typography,
  alpha,
} from '@mui/material';
import {
  UploadFile,
} from '@mui/icons-material';

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelect,
  accept = '.csv',
  maxSize = 50 * 1024 * 1024,
  disabled = false,
  error = false,
  errorMessage = 'Файл не поддерживается',
  description = 'Нажмите или перетащите файл',
  maxSizeLabel = 'макс. 50MB',
  acceptedFileLabel = 'CSV файл',
  sx,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileExtension = (fileName: string): string => {
    return fileName.split('.').pop()?.toLowerCase() || '';
  };

  const validateFile = useCallback(
    (file: File): { valid: boolean; error?: string } => {
      const fileExtension = getFileExtension(file.name);
      const acceptedTypes = accept.replace(/\s/g, '').split(',');
      
      const isValidType = acceptedTypes.some(
        (type) => type === `.${fileExtension}` || type === file.type
      );
      
      if (!isValidType) {
        return { valid: false, error: 'Файл не поддерживается' };
      }

      if (file.size > maxSize) {
        return { valid: false, error: `Файл превышает ${maxSizeLabel}` };
      }

      return { valid: true };
    },
    [accept, maxSize, maxSizeLabel]
  );

  const openFileDialog = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        const validation = validateFile(file);
        
        if (validation.valid) {
          onFileSelect?.(file);
        } else if (onFileSelect) {
          console.error(validation.error);
        }
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [disabled, validateFile, onFileSelect]
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && !error) {
      setIsDragging(true);
    }
  }, [disabled, error]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const validation = validateFile(file);
        
        if (validation.valid) {
          onFileSelect?.(file);
        } else if (onFileSelect) {
          console.error(validation.error);
        }
      }
    },
    [disabled, validateFile, onFileSelect]
  );

  const getBorderColor = () => {
    if (error) return 'error.main';
    if (isDragging) return 'primary.main';
    if (disabled) return 'action.disabled';
    return 'divider';
  };

  const getBorderStyle = () => {
    if (error) return 'solid';
    return 'dashed';
  }

  const getBackgroundColor = () => {
    if (error) return alpha('#D32F2F0A', 0.04);
    if (isDragging) return alpha('#1976d2', 0.04);
    return 'background.paper';
  };

  const getIconColor = () => {
    if (error) return 'error.main';
    if (disabled) return 'action.disabled';
    return 'primary.main';
  };

  const getTextColor = () => {
    if (disabled) return 'text.disabled';
    return 'text.primary';
  };

  const getHelperText = () => {
    if (error) return errorMessage;
    if (disabled) return `${acceptedFileLabel} (${maxSizeLabel})`;
    return `${acceptedFileLabel} (${maxSizeLabel})`;
  };

  const getHelperTextColor = () => {
    if (error) return 'error.main';
    if (disabled) return 'text.disabled';
    return 'text.secondary';
  };

  return (
    <Box sx={sx}>
      <Box
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        sx={{
          border: 2,
          borderColor: getBorderColor(),
          borderStyle: getBorderStyle(),
          borderRadius: 2,
          backgroundColor: getBackgroundColor(),
          transition: 'all 0.2s ease',
          cursor: disabled ? 'not-allowed' : 'default',
          position: 'relative',
          '&:hover':
            !disabled && !error
              ? {
                  borderColor: 'primary.main',
                  backgroundColor: alpha('#1976d2', 0.04),
                }
              : {},
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          style={{
            display: 'none',
          }}
        />
        
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            py: 3,
            px: 2,
            textAlign: 'center',
          }}
        >
          <UploadFile
            sx={{
              p: 1,
              color: getIconColor(),
              transform: isDragging ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              cursor: !disabled ? 'pointer' : 'default',
            }}
            onClick={openFileDialog}
          />
          
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.8,
          }}>
            <Typography
              variant="body1"
              sx={{
                color: getTextColor(),
                fontWeight: 'fontWeightRegular',
              }}
            >
              <Box
                component="span"
                sx={{
                  color: !disabled ? 'primary.main' : 'inherit',
                  textDecoration: 'underline',
                  cursor: !disabled ? 'pointer' : 'default',
                  '&:hover': {
                    opacity: !disabled ? 0.8 : 1,
                  },
                }}
                onClick={openFileDialog}
              >
                Нажмите
              </Box>
              {description.replace('Нажмите', '')}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: getHelperTextColor(),
                display: 'block',
                mt: 0.5,
              }}
            >
              {getHelperText()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};