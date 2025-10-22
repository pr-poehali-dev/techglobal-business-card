import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface GoogleAnalyticsData {
  configured: boolean;
  message?: string;
  period?: string;
  summary?: {
    total_users: number;
    total_sessions: number;
    total_pageviews: number;
    avg_session_duration: number;
  };
  visitors_by_date?: Array<{ date: string; visitors: number }>;
  top_countries?: Array<{ country: string; visitors: number }>;
}

interface GoogleAnalyticsWidgetProps {
  period: 'day' | 'week' | 'month';
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

const GoogleAnalyticsWidget = ({ period }: GoogleAnalyticsWidgetProps) => {
  const [data, setData] = useState<GoogleAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `https://functions.poehali.dev/396d6603-4c8e-4adc-adf2-847f9769ab1b?period=${period}`
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('Ошибка загрузки данных');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  if (loading) {
    return (
      <div className="w-full h-[600px] border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto" />
          <p className="text-muted-foreground">Загрузка данных Google Analytics...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full h-[600px] border rounded-lg bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <Icon name="AlertCircle" size={48} className="text-red-500 mx-auto" />
          <h4 className="text-xl font-semibold">Ошибка загрузки</h4>
          <p className="text-muted-foreground">{error || 'Не удалось загрузить данные'}</p>
        </div>
      </div>
    );
  }

  if (!data.configured) {
    return (
      <div className="w-full h-[600px] border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4 p-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Globe" size={32} className="text-primary" />
          </div>
          <h4 className="text-xl font-semibold">Google Analytics</h4>
          <p className="text-muted-foreground max-w-md">
            {data.message || 'Для отображения статистики Google Analytics необходимо добавить секреты'}
          </p>
          <a
            href="https://analytics.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all"
          >
            <Icon name="Settings" size={18} />
            Настроить интеграцию
            <Icon name="ExternalLink" size={16} />
          </a>
        </div>
      </div>
    );
  }

  const { summary, visitors_by_date, top_countries } = data;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Users" size={20} className="text-blue-500" />
            <p className="text-sm text-muted-foreground">Посетители</p>
          </div>
          <p className="text-2xl font-bold">{summary?.total_users || 0}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Activity" size={20} className="text-green-500" />
            <p className="text-sm text-muted-foreground">Сессии</p>
          </div>
          <p className="text-2xl font-bold">{summary?.total_sessions || 0}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Eye" size={20} className="text-purple-500" />
            <p className="text-sm text-muted-foreground">Просмотры</p>
          </div>
          <p className="text-2xl font-bold">{summary?.total_pageviews || 0}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Clock" size={20} className="text-orange-500" />
            <p className="text-sm text-muted-foreground">Ср. время (сек)</p>
          </div>
          <p className="text-2xl font-bold">{summary?.avg_session_duration?.toFixed(0) || 0}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visitors_by_date && visitors_by_date.length > 0 && (
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="TrendingUp" size={20} />
              Посетители по дням
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={visitors_by_date}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {top_countries && top_countries.length > 0 && (
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Icon name="Globe" size={20} />
              Топ-5 стран
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={top_countries}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ country, visitors }) => `${country}: ${visitors}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="visitors"
                >
                  {top_countries.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GoogleAnalyticsWidget;
