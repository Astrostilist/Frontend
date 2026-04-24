import type { SxProps, Theme } from '@mui/material';

export interface DropzoneProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  description?: string;
  maxSizeLabel?: string;
  acceptedFileLabel?: string;
  sx?: SxProps<Theme>;
}