export interface UploadItemProps {
  file: File;
  uploadProgress: number;
  uploadStatus: 'uploading' | 'success' | 'error';
  onRemove: () => void;
}