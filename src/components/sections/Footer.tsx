import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/e029a36d-cb18-4895-a0a6-5d31dc75c0d4.png" 
              alt="ТехГлобал" 
              className="h-8 brightness-0 invert"
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="text-sm text-white/80">© 2025 ТехГлобал. Все права защищены.</p>
            <a 
              href="/admin" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              <Icon name="Shield" size={16} />
              Админ-панель
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;