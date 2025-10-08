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
