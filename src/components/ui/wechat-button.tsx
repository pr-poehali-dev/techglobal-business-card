import { useState } from 'react';
import Icon from '@/components/ui/icon';

const WeChatButton = () => {
  const [wechatCopied, setWechatCopied] = useState(false);

  const handleWeChatClick = () => {
    navigator.clipboard.writeText('KMCi05').then(() => {
      setWechatCopied(true);
      setTimeout(() => setWechatCopied(false), 2000);
    });
    window.open('weixin://dl/chat?KMCi05', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/79959658000', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={24} />
        
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WhatsApp
        </span>
      </button>

      <button
        onClick={handleWeChatClick}
        className="flex items-center justify-center w-14 h-14 bg-[#09B83E] hover:bg-[#07A035] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="WeChat"
      >
        <Icon name="MessageSquare" size={24} />
        
        {wechatCopied && (
          <span className="absolute -top-12 right-0 bg-black text-white text-xs px-3 py-2 rounded whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-2">
            ID: KMCi05 ✓
          </span>
        )}
        
        <span className="absolute -top-12 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          WeChat
        </span>
      </button>
    </div>
  );
};

export default WeChatButton;