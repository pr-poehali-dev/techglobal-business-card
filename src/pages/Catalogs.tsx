import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Catalog {
  id: number;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_name: string;
  file_size: number;
  created_at: string;
}

const Catalogs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/ba11d4a2-3f01-402e-b27a-60f4e96dd305');
      const data = await response.json();
      setCatalogs(data.catalogs || []);
    } catch (error) {
      console.error('Error fetching catalogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (catalog: Catalog) => {
    try {
      fetch('https://functions.poehali.dev/763cc298-fef8-49ed-9aac-1ae3929a9e5d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ catalog_id: catalog.id })
      }).catch(() => {});
      
      const a = document.createElement('a');
      a.href = catalog.file_url;
      a.download = catalog.file_name;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  };

  const xcmgCatalogs = catalogs.filter(c => c.category === 'xcmg');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link 
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            aria-label="На главную"
          >
            <img 
              src="https://cdn.poehali.dev/files/f0e9eaf0-f813-41a1-bd09-80829adf3b3e.png" 
              alt="TechGlobal" 
              className="h-14 md:h-16 object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>
          
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <Link to="/" className="text-xl font-medium hover:text-primary transition-colors whitespace-nowrap">Главная</Link>
            <Link to="/catalogs" className="text-xl font-medium text-primary whitespace-nowrap">Каталоги</Link>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex gap-2">
              <Link to="/en">
                <Button variant="outline" size="sm" className="gap-2">
                  EN
                </Button>
              </Link>
              <Link to="/zh">
                <Button variant="outline" size="sm" className="gap-2">
                  中文
                </Button>
              </Link>
            </div>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Меню"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        <div 
          className={`md:hidden border-t border-border bg-white overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link 
              to="/" 
              className="text-left text-lg font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/catalogs" 
              className="text-left text-lg font-medium text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Каталоги
            </Link>
            <div className="flex gap-2 w-full">
              <Link to="/en" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="Globe" size={16} />
                  English
                </Button>
              </Link>
              <Link to="/zh" className="flex-1">
                <Button variant="outline" className="w-full gap-2">
                  <Icon name="Globe" size={16} />
                  中文
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Каталоги оборудования</h1>
            <p className="text-xl text-muted-foreground">Техническая документация и характеристики</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-muted-foreground">Загрузка каталогов...</p>
            </div>
          ) : selectedCategory === null ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <button
                onClick={() => setSelectedCategory('xcmg')}
                className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all hover:border-primary group"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name="FolderOpen" size={40} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">XCMG</h2>
                    <p className="text-muted-foreground">{xcmgCatalogs.length} каталогов</p>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <Button
                  onClick={() => setSelectedCategory(null)}
                  variant="outline"
                  className="gap-2 mb-6"
                >
                  <Icon name="ArrowLeft" size={18} />
                  Назад к категориям
                </Button>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">XCMG</h2>
                </div>
              </div>

              {xcmgCatalogs.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="FileText" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2">Каталогов пока нет</h3>
                  <p className="text-muted-foreground">Каталоги появятся после загрузки через админ-панель</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {xcmgCatalogs.map((catalog) => (
                    <div 
                      key={catalog.id} 
                      className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <Icon name="FileText" size={64} className="text-muted-foreground" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{catalog.title}</h3>
                        <p className="text-muted-foreground mb-2 line-clamp-2">{catalog.description}</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Размер: {formatFileSize(catalog.file_size)}
                        </p>
                        <Button 
                          onClick={() => handleDownload(catalog)}
                          className="w-full gap-2"
                        >
                          <Icon name="Download" size={18} />
                          Скачать
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 TechGlobal Business. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Catalogs;