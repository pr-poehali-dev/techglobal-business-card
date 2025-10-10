import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AdminHeaderProps {
  showStats: boolean;
  setShowStats: (value: boolean) => void;
  filteredLeadsCount: number;
  leadsCount: number;
  exportToExcel: () => void;
  setShowClearAll: (value: boolean) => void;
  showClearAll: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AdminHeader = ({
  showStats,
  setShowStats,
  filteredLeadsCount,
  leadsCount,
  exportToExcel,
  setShowClearAll,
  showClearAll,
  setIsAuthenticated
}: AdminHeaderProps) => {
  const adminUsername = localStorage.getItem('admin_username') || 'admin';
  
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Заявки с сайта</h1>
        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
          <Icon name="User" size={16} />
          Пользователь: <span className="font-medium">{adminUsername}</span>
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          variant={showStats ? "default" : "outline"}
          onClick={() => setShowStats(!showStats)}
        >
          <Icon name={showStats ? "List" : "BarChart3"} size={20} className="mr-2" />
          {showStats ? 'Список заявок' : 'Статистика'}
        </Button>
        {filteredLeadsCount > 0 && (
          <Button
            variant="default"
            onClick={exportToExcel}
          >
            <Icon name="Download" size={20} className="mr-2" />
            Экспорт в Excel
          </Button>
        )}
        {leadsCount > 0 && (
          <Button
            variant="destructive"
            onClick={() => setShowClearAll(!showClearAll)}
          >
            <Icon name="Trash2" size={20} className="mr-2" />
            Очистить всё
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => window.location.href = '/'}
        >
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          На сайт
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            localStorage.removeItem('admin_auth');
            localStorage.removeItem('admin_username');
            setIsAuthenticated(false);
          }}
        >
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;