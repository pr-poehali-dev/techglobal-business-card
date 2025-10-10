import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminLoginProps {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}

const AdminLogin = ({ username, setUsername, password, setPassword, handleLogin }: AdminLoginProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Админ-панель</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Имя пользователя</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Введите пароль"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;