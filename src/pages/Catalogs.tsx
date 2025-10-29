import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { useState } from "react";

const Catalogs = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const xcmgCatalogs = [
    {
      title: "Экскаваторы XCMG",
      description: "Гусеничные и колесные экскаваторы",
      file: "/catalogs/xcmg/excavators.pdf",
      image: "https://cdn.poehali.dev/files/excavator-placeholder.png"
    },
    {
      title: "Автокраны XCMG",
      description: "Мобильные краны различной грузоподъемности",
      file: "/catalogs/xcmg/cranes.pdf",
      image: "https://cdn.poehali.dev/files/crane-placeholder.png"
    },
    {
      title: "Погрузчики XCMG",
      description: "Фронтальные погрузчики",
      file: "/catalogs/xcmg/loaders.pdf",
      image: "https://cdn.poehali.dev/files/loader-placeholder.png"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {xcmgCatalogs.map((catalog, index) => (
                <div 
                  key={index} 
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Icon name="FileText" size={64} className="text-muted-foreground" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{catalog.title}</h3>
                    <p className="text-muted-foreground mb-4">{catalog.description}</p>
                    <a 
                      href={catalog.file} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <Button className="w-full gap-2">
                        <Icon name="Download" size={18} />
                        Скачать PDF
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={24} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Как добавить PDF файлы?</h3>
                  <ol className="text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Создайте папку <code className="bg-blue-100 px-2 py-1 rounded">public/catalogs/xcmg/</code> в корне проекта</li>
                    <li>Поместите туда ваши PDF файлы (excavators.pdf, cranes.pdf, loaders.pdf)</li>
                    <li>Файлы автоматически станут доступны по ссылкам</li>
                  </ol>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Catalogs;
