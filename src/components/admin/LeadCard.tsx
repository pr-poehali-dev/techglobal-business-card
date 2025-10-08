import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Lead {
  id: number;
  name: string;
  phone: string;
  message: string;
  file_name: string;
  file_data: string | null;
  created_at: string;
}

interface LeadCardProps {
  lead: Lead;
  deletingId: number | null;
  deletePassword: string;
  setDeletePassword: (value: string) => void;
  setDeletingId: (id: number | null) => void;
  handleDelete: (id: number) => void;
}

const LeadCard = ({
  lead,
  deletingId,
  deletePassword,
  setDeletePassword,
  setDeletingId,
  handleDelete
}: LeadCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">
            {new Date(lead.created_at).toLocaleString('ru-RU')}
          </p>
        </div>
        <div className="text-right flex items-center gap-3">
          <a 
            href={`tel:${lead.phone}`}
            className="text-primary font-medium hover:underline flex items-center gap-2"
          >
            <Icon name="Phone" size={16} />
            {lead.phone}
          </a>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setDeletingId(lead.id)}
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      
      {lead.message && (
        <div className="mb-3">
          <p className="text-sm font-medium text-muted-foreground mb-1">Сообщение:</p>
          <p className="text-base">{lead.message}</p>
        </div>
      )}
      
      {lead.file_name && lead.file_data && (
        <div className="mb-3">
          <p className="text-sm font-medium text-muted-foreground mb-1">Прикрепленный файл:</p>
          <a 
            href={lead.file_data}
            download={lead.file_name}
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <Icon name="Paperclip" size={16} />
            <span>{lead.file_name}</span>
            <Icon name="Download" size={16} />
          </a>
        </div>
      )}

      {deletingId === lead.id && (
        <div className="mt-4 p-4 border border-destructive rounded-lg bg-destructive/5">
          <p className="text-sm font-medium mb-2">Введите пароль администратора для удаления:</p>
          <div className="flex gap-2">
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Пароль"
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleDelete(lead.id)}
            />
            <Button
              variant="destructive"
              onClick={() => handleDelete(lead.id)}
            >
              Удалить
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDeletingId(null);
                setDeletePassword('');
              }}
            >
              Отмена
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LeadCard;
