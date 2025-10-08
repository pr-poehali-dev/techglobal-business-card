import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import * as XLSX from 'xlsx';

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
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [clearAllPassword, setClearAllPassword] = useState("");
  const [showClearAll, setShowClearAll] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const ADMIN_PASSWORD = "Ktcybr21!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Неверный пароль');
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
      const response = await fetch('https://functions.poehali.dev/cce71dc9-c0a4-48cf-b2fe-4cfa3d97dfe5');
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

  const handleClearAll = async () => {
    if (!clearAllPassword) {
      alert('Введите пароль для очистки');
      return;
    }

    if (!confirm(`Вы уверены? Это удалит все ${leads.length} заявок!`)) {
      return;
    }

    try {
      const response = await fetch('https://functions.poehali.dev/cd52d7e0-5ea1-4ea8-ba77-edb20dcc51c4', {
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
        <Card className="w-full max-w-md p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Админ-панель</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Введите пароль"
              />
            </div>
            <Button type="submit" className="w-full">
              Войти
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Заявки с сайта</h1>
          <div className="flex gap-4">
            {filteredLeads.length > 0 && (
              <Button
                variant="default"
                onClick={exportToExcel}
              >
                <Icon name="Download" size={20} className="mr-2" />
                Экспорт в Excel
              </Button>
            )}
            {leads.length > 0 && (
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
                setIsAuthenticated(false);
              }}
            >
              <Icon name="LogOut" size={20} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Поиск</label>
            <div className="relative">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Имя, телефон, сообщение..."
                className="w-full pl-10 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">С даты</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">По дату</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

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

        {showClearAll && (
          <Card className="p-6 mb-6 border-destructive bg-destructive/5">
            <h3 className="text-lg font-semibold mb-4 text-destructive">⚠️ Очистка всех заявок</h3>
            <p className="text-sm mb-4">Введите пароль администратора для удаления всех {leads.length} заявок:</p>
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
                <Card key={lead.id} className="p-6 hover:shadow-lg transition-shadow">
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;