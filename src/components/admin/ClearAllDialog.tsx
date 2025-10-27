import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClearAllDialogProps {
  leadsCount: number;
  clearAllPassword: string;
  setClearAllPassword: (value: string) => void;
  handleClearAll: () => void;
  setShowClearAll: (value: boolean) => void;
  dateFrom: string;
  dateTo: string;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
}

const ClearAllDialog = ({
  leadsCount,
  clearAllPassword,
  setClearAllPassword,
  handleClearAll,
  setShowClearAll,
  dateFrom,
  dateTo,
  setDateFrom,
  setDateTo
}: ClearAllDialogProps) => {
  return (
    <Card className="p-6 mb-6 border-destructive bg-destructive/5">
      <h3 className="text-lg font-semibold mb-4 text-destructive">⚠️ Массовое удаление заявок</h3>
      
      <div className="mb-4 space-y-3">
        <p className="text-sm font-medium">Фильтр по датам (опционально):</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">От:</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">До:</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        {(dateFrom || dateTo) && (
          <p className="text-xs text-muted-foreground">
            {dateFrom && dateTo ? `Будут удалены заявки с ${new Date(dateFrom).toLocaleDateString('ru-RU')} по ${new Date(dateTo).toLocaleDateString('ru-RU')}` : 
             dateFrom ? `Будут удалены заявки начиная с ${new Date(dateFrom).toLocaleDateString('ru-RU')}` :
             `Будут удалены заявки до ${new Date(dateTo).toLocaleDateString('ru-RU')}`}
          </p>
        )}
      </div>

      <p className="text-sm mb-4">
        Введите пароль администратора для удаления {leadsCount} {leadsCount === 1 ? 'заявки' : leadsCount < 5 ? 'заявок' : 'заявок'}:
      </p>
      
      <div className="flex gap-2">
        <input
          type="password"
          value={clearAllPassword}
          onChange={(e) => setClearAllPassword(e.target.value)}
          placeholder="Пароль администратора"
          className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-destructive"
          onKeyDown={(e) => e.key === 'Enter' && handleClearAll()}
        />
        <Button
          variant="destructive"
          onClick={handleClearAll}
        >
          Удалить
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setShowClearAll(false);
            setClearAllPassword('');
            setDateFrom('');
            setDateTo('');
          }}
        >
          Отмена
        </Button>
      </div>
    </Card>
  );
};

export default ClearAllDialog;