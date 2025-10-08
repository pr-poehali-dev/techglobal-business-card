import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showWechatQR, setShowWechatQR] = useState(false);

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
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-14 h-14 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-110 animate-in fade-in slide-in-from-bottom-4 duration-300"
            aria-label="返回顶部"
          >
            <Icon name="ArrowUp" size={26} className="text-white" />
          </button>
        )}
        <button
          onClick={() => setShowWechatQR(!showWechatQR)}
          className="w-14 h-14 bg-[#07c160] hover:bg-[#06ad56] rounded-full flex items-center justify-center animate-pulse-soft hover:shadow-xl transition-all hover:scale-110"
          aria-label="微信"
        >
          <Icon name="MessageSquare" size={28} className="text-white" />
        </button>
      </div>

      {showWechatQR && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowWechatQR(false)}
        >
          <div 
            className="bg-white p-6 rounded-lg shadow-xl max-w-sm animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">扫码添加微信</h3>
              <button
                onClick={() => setShowWechatQR(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="关闭"
              >
                <Icon name="X" size={24} />
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
              <p className="text-center text-gray-600">
                微信号：+79959658000<br/>
                <span className="text-sm">请添加此号码为好友</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingButtons;