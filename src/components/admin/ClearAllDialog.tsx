import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ClearAllDialogProps {
  leadsCount: number;
  clearAllPassword: string;
  setClearAllPassword: (value: string) => void;
  handleClearAll: () => void;
  setShowClearAll: (value: boolean) => void;
}

const ClearAllDialog = ({
  leadsCount,
  clearAllPassword,
  setClearAllPassword,
  handleClearAll,
  setShowClearAll
}: ClearAllDialogProps) => {
  return (
    <Card className="p-6 mb-6 border-destructive bg-destructive/5">
      <h3 className="text-lg font-semibold mb-4 text-destructive">⚠️ Очистка всех заявок</h3>
      <p className="text-sm mb-4">Введите пароль администратора для удаления всех {leadsCount} заявок:</p>
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
          Удалить все
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setShowClearAll(false);
            setClearAllPassword('');
          }}
        >
          Отмена
        </Button>
      </div>
    </Card>
  );
};

export default ClearAllDialog;
