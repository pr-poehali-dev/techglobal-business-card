import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import * as XLSX from 'xlsx';
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminFilters from "@/components/admin/AdminFilters";
import AdminStatistics from "@/components/admin/AdminStatistics";
import LeadCard from "@/components/admin/LeadCard";
import ClearAllDialog from "@/components/admin/ClearAllDialog";

interface Lead {
  id: number;
  name: string;
  phone: string;
  message: string;
  file_name: string;
  file_data: string | null;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [clearAllPassword, setClearAllPassword] = useState("");
  const [showClearAll, setShowClearAll] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showStats, setShowStats] = useState(false);

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "Ktcybr21!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      localStorage.setItem('admin_username', username);
    } else {
      alert('Неверное имя пользователя или пароль');
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/1fc2cbd9-568a-4928-ae37-0cee42d9dcc3');
      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (leadId: number) => {
    if (!deletePassword) {
      alert('Введите пароль для удаления');
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/cd52d7e0-5ea1-4ea8-ba77-edb20dcc51c4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, password: deletePassword })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Заявка удалена!');
        setDeletePassword('');
        setDeletingId(null);
        fetchLeads();
      } else {
        alert(data.error || 'Ошибка удаления');
      }
    } catch (error) {
      alert('Ошибка удаления заявки');
    }
  };

  const handleClearAll = async () => {
    if (!clearAllPassword) {
      alert('Введите пароль для очистки');
      return;
    }

    if (!confirm(`Вы уверены? Это удалит все ${leads.length} заявок!`)) {
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/a11975fe-9361-4ac1-b328-9f59532b9dc4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clear_all: true, password: clearAllPassword })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Все заявки удалены!');
        setClearAllPassword('');
        setShowClearAll(false);
        fetchLeads();
      } else {
        alert(data.error || 'Ошибка очистки');
      }
    } catch (error) {
      alert('Ошибка очистки заявок');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchLeads();
  }, [isAuthenticated]);

  const getStatistics = () => {
    const byDate: Record<string, number> = {};
    const byHour: Record<number, number> = {};
    const withFiles = leads.filter(l => l.file_name).length;
    const withoutFiles = leads.length - withFiles;

    leads.forEach(lead => {
      const date = new Date(lead.created_at);
      const dateKey = date.toLocaleDateString('ru-RU');
      const hour = date.getHours();
      
      byDate[dateKey] = (byDate[dateKey] || 0) + 1;
      byHour[hour] = (byHour[hour] || 0) + 1;
    });

    const dateData = Object.entries(byDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date.split('.').reverse().join('-')).getTime() - new Date(b.date.split('.').reverse().join('-')).getTime())
      .slice(-14);

    const hourData = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      count: byHour[i] || 0
    }));

    const topHours = Object.entries(byHour)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([hour, count]) => ({ hour: `${hour}:00`, count }));

    const filesData = [
      { name: 'С файлами', value: withFiles },
      { name: 'Без файлов', value: withoutFiles }
    ];

    return { dateData, hourData, topHours, filesData };
  };

  const stats = getStatistics();

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchTerm === "" || 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const leadDate = new Date(lead.created_at);
    const matchesDateFrom = !dateFrom || leadDate >= new Date(dateFrom);
    const matchesDateTo = !dateTo || leadDate <= new Date(dateTo + 'T23:59:59');
    
    return matchesSearch && matchesDateFrom && matchesDateTo;
  });

  const exportToExcel = () => {
    const exportData = filteredLeads.map(lead => ({
      'ID': lead.id,
      'Имя': lead.name,
      'Телефон': lead.phone,
      'Сообщение': lead.message,
      'Файл': lead.file_name || 'Нет',
      'Дата создания': new Date(lead.created_at).toLocaleString('ru-RU')
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Заявки');
    
    const fileName = `Заявки_${new Date().toLocaleDateString('ru-RU').replace(/\./g, '-')}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AdminHeader
          showStats={showStats}
          setShowStats={setShowStats}
          filteredLeadsCount={filteredLeads.length}
          leadsCount={leads.length}
          exportToExcel={exportToExcel}
          setShowClearAll={setShowClearAll}
          showClearAll={showClearAll}
          setIsAuthenticated={setIsAuthenticated}
        />

        <AdminFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
        />

        {filteredLeads.length !== leads.length && (
          <Card className="p-4 mb-6 bg-primary/5">
            <p className="text-sm">
              Показано заявок: <strong>{filteredLeads.length}</strong> из <strong>{leads.length}</strong>
              {(searchTerm || dateFrom || dateTo) && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setDateFrom('');
                    setDateTo('');
                  }}
                  className="ml-2"
                >
                  Сбросить фильтры
                </Button>
              )}
            </p>
          </Card>
        )}

        {showStats && (
          <AdminStatistics leads={leads} stats={stats} />
        )}

        {showClearAll && !showStats && (
          <ClearAllDialog
            leadsCount={leads.length}
            clearAllPassword={clearAllPassword}
            setClearAllPassword={setClearAllPassword}
            handleClearAll={handleClearAll}
            setShowClearAll={setShowClearAll}
          />
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Загрузка заявок...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredLeads.length === 0 && leads.length > 0 ? (
              <Card className="p-8 text-center">
                <Icon name="Filter" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground mb-2">По вашим фильтрам ничего не найдено</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setDateFrom('');
                    setDateTo('');
                  }}
                >
                  Сбросить фильтры
                </Button>
              </Card>
            ) : filteredLeads.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="Inbox" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Заявок пока нет</p>
              </Card>
            ) : (
              filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  deletingId={deletingId}
                  deletePassword={deletePassword}
                  setDeletePassword={setDeletePassword}
                  setDeletingId={setDeletingId}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;