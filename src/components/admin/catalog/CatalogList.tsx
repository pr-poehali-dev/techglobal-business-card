import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { CatalogListProps } from "./types";

const CatalogList = ({ catalogs, loading, onDownload, onView, onDelete }: CatalogListProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Загрузка каталогов...</p>
      </div>
    );
  }

  if (catalogs.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Icon name="FileText" size={64} className="mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-xl font-semibold mb-2">Каталогов пока нет</h3>
        <p className="text-muted-foreground">Нажмите кнопку "Добавить каталог" чтобы загрузить первый каталог</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {catalogs.map((catalog) => (
        <Card key={catalog.id} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 mb-2">
                <Icon name="FileText" size={24} className="text-primary flex-shrink-0 mt-1" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-1">{catalog.title}</h3>
                  {catalog.description && (
                    <p className="text-sm text-muted-foreground mb-2">{catalog.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {catalog.category.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="HardDrive" size={14} />
                      {formatFileSize(catalog.file_size)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {formatDate(catalog.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDownload(catalog.id, catalog.file_name)}
                title="Скачать"
              >
                <Icon name="Download" size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(catalog.id)}
                title="Просмотреть"
              >
                <Icon name="Eye" size={16} />
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(catalog.id)}
                title="Удалить"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CatalogList;
