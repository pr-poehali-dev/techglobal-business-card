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
    <>
      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-300"
            aria-label="返回顶部"
          >
            <Icon name="ArrowUp" size={26} className="text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;