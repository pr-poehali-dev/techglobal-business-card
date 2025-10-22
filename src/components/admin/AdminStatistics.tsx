import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Lead {
  id: number;
  name: string;
  phone: string;
  message: string;
  file_name: string;
  file_data: string | null;
  created_at: string;
}

interface Statistics {
  dateData: { date: string; count: number }[];
  hourData: { hour: string; count: number }[];
  topHours: { hour: string; count: number }[];
  filesData: { name: string; value: number }[];
}

interface AdminStatisticsProps {
  leads: Lead[];
  stats: Statistics;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

const AdminStatistics = ({ leads, stats }: AdminStatisticsProps) => {
  return (
    <div className="space-y-6 mb-6">
      <Card className="p-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-2 border-primary/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Icon name="Users" size={28} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Счетчик посещений сайта
                </h3>
                <p className="text-sm text-muted-foreground">
                  Полная статистика в Яндекс.Метрике
                </p>
              </div>
            </div>
            <a
              href="https://metrika.yandex.ru/dashboard?id=101026698"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all hover:shadow-lg font-medium"
            >
              <Icon name="BarChart3" size={18} />
              Открыть статистику
              <Icon name="ExternalLink" size={16} />
            </a>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wider">ID счетчика</div>
            <div className="text-3xl font-bold text-primary">101026698</div>
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              <Icon name="CheckCircle2" size={14} />
              Активен
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего заявок</p>
              <p className="text-2xl font-bold">{leads.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="Paperclip" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">С файлами</p>
              <p className="text-2xl font-bold">{stats.filesData[0].value}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">За последние 7 дней</p>
              <p className="text-2xl font-bold">
                {leads.filter(l => {
                  const diff = Date.now() - new Date(l.created_at).getTime();
                  return diff < 7 * 24 * 60 * 60 * 1000;
                }).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="TrendingUp" size={20} />
            Заявки по дням (последние 14 дней)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Clock" size={20} />
            Топ-5 часов по заявкам
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.topHours} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="hour" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="PieChart" size={20} />
            Заявки с файлами
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.filesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.filesData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon name="Activity" size={20} />
            Активность по часам (24ч)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.hourData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={2} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default AdminStatistics;