import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  scrollToSection: (id: string) => void;
}

const Header = ({ scrollToSection }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          aria-label="Home"
        >
          <img 
            src="https://cdn.poehali.dev/files/f0e9eaf0-f813-41a1-bd09-80829adf3b3e.png" 
            alt="TechGlobal" 
            className="h-14 md:h-16 object-contain"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </button>
        
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <button onClick={() => scrollToSection('about')} className="text-xl font-medium hover:text-primary transition-colors whitespace-nowrap">About</button>
          <button onClick={() => scrollToSection('services')} className="text-xl font-medium hover:text-primary transition-colors whitespace-nowrap">Services</button>
          <button onClick={() => scrollToSection('gallery')} className="text-xl font-medium hover:text-primary transition-colors whitespace-nowrap">Equipment</button>
          <button onClick={() => scrollToSection('contact')} className="text-xl font-medium hover:text-primary transition-colors whitespace-nowrap">Contact</button>
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                RU
              </Button>
            </Link>
            <Link to="/zh">
              <Button variant="outline" size="sm" className="gap-2">
                中文
              </Button>
            </Link>
          </div>
          <Button onClick={() => scrollToSection('contact')} className="hidden md:inline-flex whitespace-nowrap">Contact Us</Button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Menu"
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
          <button 
            onClick={() => handleMenuClick('about')} 
            className="text-left text-lg font-medium hover:text-primary transition-colors py-2 animate-in slide-in-from-top-2 duration-300"
            style={{ animationDelay: '50ms' }}
          >
            About
          </button>
          <button 
            onClick={() => handleMenuClick('services')} 
            className="text-left text-lg font-medium hover:text-primary transition-colors py-2 animate-in slide-in-from-top-2 duration-300"
            style={{ animationDelay: '100ms' }}
          >
            Services
          </button>
          <button 
            onClick={() => handleMenuClick('gallery')} 
            className="text-left text-lg font-medium hover:text-primary transition-colors py-2 animate-in slide-in-from-top-2 duration-300"
            style={{ animationDelay: '150ms' }}
          >
            Equipment
          </button>
          <button 
            onClick={() => handleMenuClick('contact')} 
            className="text-left text-lg font-medium hover:text-primary transition-colors py-2 animate-in slide-in-from-top-2 duration-300"
            style={{ animationDelay: '200ms' }}
          >
            Contact
          </button>
          <div className="flex gap-2 w-full">
            <Link to="/" className="flex-1">
              <Button 
                variant="outline"
                className="w-full animate-in slide-in-from-top-2 duration-300 gap-2"
                style={{ animationDelay: '250ms' }}
              >
                <Icon name="Globe" size={16} />
                Русский
              </Button>
            </Link>
            <Link to="/zh" className="flex-1">
              <Button 
                variant="outline"
                className="w-full animate-in slide-in-from-top-2 duration-300 gap-2"
                style={{ animationDelay: '275ms' }}
              >
                <Icon name="Globe" size={16} />
                中文
              </Button>
            </Link>
          </div>
          <Button 
            onClick={() => handleMenuClick('contact')} 
            className="w-full animate-in slide-in-from-top-2 duration-300"
            style={{ animationDelay: '300ms' }}
          >
            Contact Us
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;