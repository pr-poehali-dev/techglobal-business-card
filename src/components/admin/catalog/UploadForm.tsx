import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadFormProps } from "./types";

const UploadForm = ({
  show,
  uploading,
  uploadProgress,
  isPaused,
  title,
  description,
  category,
  file,
  externalUrl,
  onClose,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onFileChange,
  onExternalUrlChange,
  onUpload,
  onPause,
  onResume,
  onCancel
}: UploadFormProps) => {
  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Добавить каталог</DialogTitle>
          <DialogDescription>
            Загрузите PDF файл или укажите ссылку на внешний файл
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Название</label>
            <Input
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Название каталога"
              disabled={uploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Описание</label>
            <Textarea
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Краткое описание каталога"
              rows={3}
              disabled={uploading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Категория</label>
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full p-2 border rounded-md"
              disabled={uploading}
            >
              <option value="xcmg">XCMG</option>
            </select>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium mb-2">Выберите один из вариантов:</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Вариант 1: Загрузить PDF файл
                </label>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={onFileChange}
                  disabled={uploading || !!externalUrl}
                />
                {file && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Выбран файл: {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} МБ)
                  </p>
                )}
              </div>

              <div className="text-center text-sm text-muted-foreground">ИЛИ</div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Вариант 2: Ссылка на внешний файл
                </label>
                <Input
                  value={externalUrl}
                  onChange={(e) => onExternalUrlChange(e.target.value)}
                  placeholder="https://example.com/catalog.pdf"
                  disabled={uploading || !!file}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Укажите прямую ссылку на PDF файл (например, с S3 или CDN)
                </p>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Загрузка...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 justify-end">
            {!uploading && (
              <>
                <Button variant="outline" onClick={onClose}>
                  Отмена
                </Button>
                <Button onClick={onUpload}>
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить
                </Button>
              </>
            )}
            
            {uploading && !isPaused && (
              <>
                <Button variant="outline" onClick={onPause}>
                  <Icon name="Pause" size={16} className="mr-2" />
                  Пауза
                </Button>
                <Button variant="destructive" onClick={onCancel}>
                  <Icon name="X" size={16} className="mr-2" />
                  Отменить
                </Button>
              </>
            )}
            
            {uploading && isPaused && (
              <>
                <Button onClick={onResume}>
                  <Icon name="Play" size={16} className="mr-2" />
                  Продолжить
                </Button>
                <Button variant="destructive" onClick={onCancel}>
                  <Icon name="X" size={16} className="mr-2" />
                  Отменить
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadForm;
