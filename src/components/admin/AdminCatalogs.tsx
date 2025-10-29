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
  file_url: string;
  file_name: string;
  file_size: number;
  created_at: string;
}

const AdminCatalogs = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
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
    setUploadProgress(0);

    try {
      const reader = new FileReader();
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 50);
          setUploadProgress(progress);
        }
      };
      
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        setUploadProgress(60);

        const response = await fetch('https://functions.poehali.dev/dbd7cd76-78c9-47c7-a69e-3f4708c84bfc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            category,
            file_data: base64Data,
            file_name: file.name
          })
        });

        setUploadProgress(90);
        const data = await response.json();

        if (response.ok) {
          setUploadProgress(100);
          toast({
            title: "Успешно",
            description: "Каталог загружен"
          });
          setShowUploadForm(false);
          setTitle("");
          setDescription("");
          setFile(null);
          setUploadProgress(0);
          fetchCatalogs();
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading catalog:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить каталог",
        variant: "destructive"
      });
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
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

            {uploading && (
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Загрузка: {uploadProgress}%
                </p>
              </div>
            )}

            <Button onClick={handleUpload} disabled={uploading} className="w-full gap-2">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Загрузка...
                </>
              ) : (
                <>
                  <Icon name="Upload" size={18} />
                  Загрузить каталог
                </>
              )}
            </Button>
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
                    onClick={() => setViewPdf(catalog.file_url)}
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2"
                  >
                    <Icon name="Eye" size={16} />
                    Просмотр
                  </Button>
                  <a href={catalog.file_url} download className="flex-1">
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      <Icon name="Download" size={16} />
                      Скачать
                    </Button>
                  </a>
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