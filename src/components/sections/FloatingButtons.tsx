import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-300"
          aria-label="Наверх"
        >
          <Icon name="ArrowUp" size={26} className="text-white" />
        </button>
      )}
      <a 
        href="https://wa.me/79959658000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center animate-pulse-soft hover:shadow-xl transition-all hover:scale-110"
        aria-label="Написать в WhatsApp"
      >
        <Icon name="MessageCircle" size={28} className="text-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;