import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Catalog {
  id: number;
  title: string;
  description: string;
  category: string;
  file_name: string;
  file_size: number;
  created_at: string;
}

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
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [viewPdf, setViewPdf] = useState<string | null>(null);
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
    if (!title || !file) {
      toast({
        title: "Ошибка",
        description: "Заполните название и выберите файл",
        variant: "destructive"
      });
      return;
    }

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
          reader.onload = () => resolve(reader.result as string);
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

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Upload failed');
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
    } finally {
      if (!isPaused) {
        setUploading(false);
      }
    }
  };

  const handlePauseResume = () => {
    if (uploading && !isPaused) {
      setIsPaused(true);
      setUploading(false);
    } else if (isPaused) {
      setIsPaused(false);
      handleUpload();
    }
  };

  const handleCancelUpload = () => {
    setIsPaused(false);
    setUploading(false);
    setUploadProgress(0);
    setUploadId(null);
    setCurrentChunk(0);
  };

  const handleDelete = async (catalogId: number) => {
    if (!deletePassword) {
      toast({
        title: "Ошибка",
        description: "Введите пароль для удаления",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/fa6e325c-ef88-4764-84d3-1d0ce1ad56ab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: catalogId,
          password: deletePassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Каталог удален"
        });
        setDeletePassword("");
        setDeletingId(null);
        fetchCatalogs();
      } else {
        throw new Error(data.error || 'Delete failed');
      }
    } catch (error: any) {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось удалить каталог",
        variant: "destructive"
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Загрузка каталогов...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Каталоги PDF</h2>
        <Button onClick={() => setShowUploadForm(!showUploadForm)} className="gap-2">
          <Icon name={showUploadForm ? "X" : "Plus"} size={18} />
          {showUploadForm ? "Отмена" : "Загрузить PDF"}
        </Button>
      </div>

      {showUploadForm && (
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Название каталога</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Экскаваторы XCMG 2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Описание</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Полный каталог гусеничных экскаваторов..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Категория</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md"
              >
                <option value="xcmg">XCMG</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">PDF файл (макс. 500 МБ)</label>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
              {file && (
                <p className="text-sm text-muted-foreground mt-2">
                  Выбран файл: {file.name} ({formatFileSize(file.size)})
                </p>
              )}
            </div>

            {(uploading || isPaused) && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  {isPaused ? 'Приостановлено' : 'Загрузка'}: {uploadProgress}%
                </p>
              </div>
            )}

            <div className="flex gap-2">
              {(uploading || isPaused) ? (
                <>
                  <Button onClick={handlePauseResume} variant="outline" className="flex-1 gap-2">
                    <Icon name={isPaused ? "Play" : "Pause"} size={18} />
                    {isPaused ? "Продолжить" : "Пауза"}
                  </Button>
                  <Button onClick={handleCancelUpload} variant="destructive" className="flex-1 gap-2">
                    <Icon name="X" size={18} />
                    Отменить
                  </Button>
                </>
              ) : (
                <Button onClick={handleUpload} className="w-full gap-2">
                  <Icon name="Upload" size={18} />
                  Загрузить каталог
                </Button>
              )}
            </div>
          </div>
        </Card>
      )}

      {catalogs.length === 0 ? (
        <Card className="p-8 text-center">
          <Icon name="FileText" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">Каталогов пока нет</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {catalogs.map((catalog) => (
            <Card key={catalog.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{catalog.title}</h3>
                    {catalog.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{catalog.description}</p>
                    )}
                  </div>
                  <Icon name="FileText" size={24} className="text-primary flex-shrink-0 ml-2" />
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Категория: {catalog.category}</p>
                  <p>Размер: {formatFileSize(catalog.file_size)}</p>
                  <p>Загружен: {new Date(catalog.created_at).toLocaleDateString('ru-RU')}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownloadCatalog(catalog.id, catalog.file_name)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <Icon name="Download" size={16} />
                    Скачать
                  </Button>
                </div>

                {deletingId === catalog.id ? (
                  <div className="space-y-2 pt-2 border-t">
                    <Input
                      type="password"
                      placeholder="Пароль для удаления"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleDelete(catalog.id)}
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                      >
                        Подтвердить
                      </Button>
                      <Button
                        onClick={() => {
                          setDeletingId(null);
                          setDeletePassword("");
                        }}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setDeletingId(catalog.id)}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 text-destructive hover:text-destructive"
                  >
                    <Icon name="Trash2" size={16} />
                    Удалить
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!viewPdf} onOpenChange={() => setViewPdf(null)}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Просмотр каталога</DialogTitle>
            <DialogDescription>
              PDF документ открыт для просмотра
            </DialogDescription>
          </DialogHeader>
          {viewPdf && (
            <iframe
              src={viewPdf}
              className="w-full h-full rounded-md"
              title="PDF Viewer"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCatalogs;