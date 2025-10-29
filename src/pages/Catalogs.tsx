import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [viewPdf, setViewPdf] = useState<string | null>(null);

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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' Б';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
    return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
  };

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

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="https://cdn.poehali.dev/files/xcmg-logo.png" 
                alt="XCMG" 
                className="h-12 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <h2 className="text-3xl font-bold">XCMG</h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                <p className="mt-4 text-muted-foreground">Загрузка каталогов...</p>
              </div>
            ) : catalogs.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="FileText" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Каталогов пока нет</h3>
                <p className="text-muted-foreground">Каталоги появятся после загрузки через админ-панель</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalogs.filter(c => c.category === 'xcmg').map((catalog) => (
                  <div 
                    key={catalog.id} 
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Icon name="FileText" size={64} className="text-muted-foreground" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{catalog.title}</h3>
                      <p className="text-muted-foreground mb-2">{catalog.description}</p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Размер: {formatFileSize(catalog.file_size)}
                      </p>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setViewPdf(catalog.file_url)}
                          variant="outline"
                          className="flex-1 gap-2"
                        >
                          <Icon name="Eye" size={18} />
                          Просмотр
                        </Button>
                        <a 
                          href={catalog.file_url} 
                          download
                          className="flex-1"
                        >
                          <Button className="w-full gap-2">
                            <Icon name="Download" size={18} />
                            Скачать
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 TechGlobal Business. Все права защищены.
          </p>
        </div>
      </footer>

      <Dialog open={!!viewPdf} onOpenChange={() => setViewPdf(null)}>
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Просмотр каталога</DialogTitle>
            <DialogDescription>
              PDF документ открыт для просмотра
            </DialogDescription>
          </DialogHeader>
          {viewPdf && (
            <iframe
              src={viewPdf}
              className="w-full h-full rounded-md"
              title="PDF Viewer"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Catalogs;