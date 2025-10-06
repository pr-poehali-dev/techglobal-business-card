import Icon from "@/components/ui/icon";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a 
        href="https://wa.me/79621250700" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center animate-pulse-soft hover:shadow-xl transition-all hover:scale-110"
        aria-label="WhatsApp"
      >
        <Icon name="MessageCircle" size={28} className="text-white" />
      </a>
      <a 
        href="https://t.me/79621250700" 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#0088cc] hover:bg-[#0077b5] rounded-full flex items-center justify-center animate-pulse-soft hover:shadow-xl transition-all hover:scale-110"
        aria-label="Telegram"
      >
        <Icon name="Send" size={26} className="text-white" />
      </a>
    </div>
  );
};

export default FloatingButtons;
