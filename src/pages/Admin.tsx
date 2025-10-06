import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface Lead {
  id: number;
  name: string;
  phone: string;
  message: string;
  file_name: string;
  created_at: string;
}

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "techglobal2024";

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

  useEffect(() => {
    if (!isAuthenticated) return;

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

    fetchLeads();
  }, [isAuthenticated]);

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

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Загрузка заявок...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.length === 0 ? (
              <Card className="p-8 text-center">
                <Icon name="Inbox" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Заявок пока нет</p>
              </Card>
            ) : (
              leads.map((lead) => (
                <Card key={lead.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{lead.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(lead.created_at).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    <div className="text-right">
                      <a 
                        href={`tel:${lead.phone}`}
                        className="text-primary font-medium hover:underline flex items-center gap-2"
                      >
                        <Icon name="Phone" size={16} />
                        {lead.phone}
                      </a>
                    </div>
                  </div>
                  
                  {lead.message && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-muted-foreground mb-1">Сообщение:</p>
                      <p className="text-base">{lead.message}</p>
                    </div>
                  )}
                  
                  {lead.file_name && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Paperclip" size={16} />
                      <span>Файл: {lead.file_name}</span>
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