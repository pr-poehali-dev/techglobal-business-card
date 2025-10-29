export interface Catalog {
  id: number;
  title: string;
  description: string;
  category: string;
  file_name: string;
  file_size: number;
  created_at: string;
}

export interface UploadFormProps {
  show: boolean;
  uploading: boolean;
  uploadProgress: number;
  isPaused: boolean;
  title: string;
  description: string;
  category: string;
  file: File | null;
  externalUrl: string;
  onClose: () => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExternalUrlChange: (value: string) => void;
  onUpload: () => void;
  onPause: () => void;
  onResume: () => void;
  onCancel: () => void;
}

export interface CatalogListProps {
  catalogs: Catalog[];
  loading: boolean;
  onDownload: (catalogId: number, fileName: string) => void;
  onView: (catalogId: number) => void;
  onDelete: (catalogId: number) => void;
}

export interface DeleteDialogProps {
  show: boolean;
  deleting: boolean;
  password: string;
  onPasswordChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface PdfViewerProps {
  catalogId: number | null;
  onClose: () => void;
}
