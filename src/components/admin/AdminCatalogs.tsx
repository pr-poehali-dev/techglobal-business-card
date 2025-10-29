import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Catalog } from "./catalog/types";
import UploadForm from "./catalog/UploadForm";
import CatalogList from "./catalog/CatalogList";
import DeleteDialog from "./catalog/DeleteDialog";
import PdfViewer from "./catalog/PdfViewer";

const AdminCatalogs = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("xcmg");
  const [file, setFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [viewPdf, setViewPdf] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ba11d4a2-3f01-402e-b27a-60f4e96dd305');
      const data = await response.json();
      setCatalogs(data.catalogs || []);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить каталоги",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCatalog = async (catalogId: number, fileName: string) => {
    try {
      const response = await fetch(`https://functions.poehali.dev/dba10cc1-2227-43d6-bfdc-130bb8e4bc14?id=${catalogId}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Успешно",
        description: "Файл скачан"
      });
    } catch (error) {
      console.error('Error downloading catalog:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось скачать файл",
        variant: "destructive"
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({
          title: "Ошибка",
          description: "Можно загружать только PDF файлы",
          variant: "destructive"
        });
        return;
      }
      if (selectedFile.size > 500 * 1024 * 1024) {
        toast({
          title: "Ошибка",
          description: "Размер файла не должен превышать 500 МБ",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!title) {
      toast({
        title: "Ошибка",
        description: "Заполните название каталога",
        variant: "destructive"
      });
      return;
    }

    if (!file && !externalUrl) {
      toast({
        title: "Ошибка",
        description: "Выберите файл или укажите ссылку",
        variant: "destructive"
      });
      return;
    }

    if (externalUrl) {
      try {
        setUploading(true);
        const response = await fetch('https://functions.poehali.dev/dbd7cd76-78c9-47c7-a69e-3f4708c84bfc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            category,
            external_url: externalUrl
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${response.status} ${errorText}`);
        }

        await response.json();
        
        toast({
          title: "Успешно",
          description: "Каталог добавлен"
        });
        setShowUploadForm(false);
        setTitle("");
        setDescription("");
        setExternalUrl("");
        fetchCatalogs();
      } catch (error) {
        console.error('Error adding catalog:', error);
        toast({
          title: "Ошибка",
          description: error instanceof Error ? error.message : "Не удалось добавить каталог",
          variant: "destructive"
        });
      } finally {
        setUploading(false);
      }
      return;
    }

    if (!file) return;

    setUploading(true);
    setIsPaused(false);
    if (!uploadId) {
      setUploadProgress(0);
      setCurrentChunk(0);
      setUploadId(Math.random().toString(36).substring(7));
    }

    try {
      const CHUNK_SIZE = 5 * 1024 * 1024;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const currentUploadId = uploadId || Math.random().toString(36).substring(7);
      
      for (let chunkIndex = currentChunk; chunkIndex < totalChunks; chunkIndex++) {
        if (isPaused) {
          setCurrentChunk(chunkIndex);
          break;
        }

        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        
        const reader = new FileReader();
        const base64Chunk = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            const base64Data = result.split(',')[1];
            resolve(base64Data);
          };
          reader.onerror = reject;
          reader.readAsDataURL(chunk);
        });

        const response = await fetch('https://functions.poehali.dev/dbd7cd76-78c9-47c7-a69e-3f4708c84bfc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            category,
            file_data: base64Chunk,
            file_name: file.name,
            chunk_index: chunkIndex,
            total_chunks: totalChunks,
            upload_id: currentUploadId,
            file_size: file.size
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Upload failed: ${response.status} ${errorText}`);
        }

        const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        setUploadProgress(progress);
        setCurrentChunk(chunkIndex + 1);
      }

      if (!isPaused) {
        toast({
          title: "Успешно",
          description: "Каталог загружен"
        });
        setShowUploadForm(false);
        setTitle("");
        setDescription("");
        setFile(null);
        setExternalUrl("");
        setUploadProgress(0);
        setUploadId(null);
        setCurrentChunk(0);
        fetchCatalogs();
      }
      
    } catch (error) {
      console.error('Error uploading catalog:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось загрузить каталог",
        variant: "destructive"
      });
      setUploading(false);
      setUploadProgress(0);
    } finally {
      if (!isPaused) {
        setUploading(false);
      }
    }
  };

  const handlePauseUpload = () => {
    setIsPaused(true);
    setUploading(false);
  };

  const handleResumeUpload = () => {
    setIsPaused(false);
    handleUpload();
  };

  const handleCancelUpload = () => {
    setUploading(false);
    setIsPaused(false);
    setUploadProgress(0);
    setCurrentChunk(0);
    setUploadId(null);
    setShowUploadForm(false);
    setTitle("");
    setDescription("");
    setFile(null);
    setExternalUrl("");
  };

  const handleDeleteCatalog = async () => {
    if (!deletingId || !deletePassword) return;

    setDeleting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/fa6e325c-ef88-4764-84d3-1d0ce1ad56ab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          catalog_id: deletingId,
          password: deletePassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }

      toast({
        title: "Успешно",
        description: "Каталог удален"
      });
      setDeletingId(null);
      setDeletePassword("");
      fetchCatalogs();
    } catch (error) {
      console.error('Error deleting catalog:', error);
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось удалить каталог",
        variant: "destructive"
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Каталоги продукции</h2>
          <p className="text-muted-foreground mt-1">Управление PDF каталогами</p>
        </div>
        <Button onClick={() => setShowUploadForm(true)}>
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить каталог
        </Button>
      </div>

      <CatalogList
        catalogs={catalogs}
        loading={loading}
        onDownload={handleDownloadCatalog}
        onView={(id) => setViewPdf(id)}
        onDelete={(id) => setDeletingId(id)}
      />

      <UploadForm
        show={showUploadForm}
        uploading={uploading}
        uploadProgress={uploadProgress}
        isPaused={isPaused}
        title={title}
        description={description}
        category={category}
        file={file}
        externalUrl={externalUrl}
        onClose={() => !uploading && setShowUploadForm(false)}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onCategoryChange={setCategory}
        onFileChange={handleFileChange}
        onExternalUrlChange={setExternalUrl}
        onUpload={handleUpload}
        onPause={handlePauseUpload}
        onResume={handleResumeUpload}
        onCancel={handleCancelUpload}
      />

      <DeleteDialog
        show={deletingId !== null}
        deleting={deleting}
        password={deletePassword}
        onPasswordChange={setDeletePassword}
        onConfirm={handleDeleteCatalog}
        onCancel={() => {
          setDeletingId(null);
          setDeletePassword("");
        }}
      />

      <PdfViewer
        catalogId={viewPdf}
        onClose={() => setViewPdf(null)}
      />
    </div>
  );
};

export default AdminCatalogs;
