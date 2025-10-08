import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollY: number;
  scrollToSection: (id: string) => void;
}

const HeroSection = ({ scrollY, scrollToSection }: HeroSectionProps) => {
  return (
    <section id="hero" className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://cdn.poehali.dev/files/eeb50967-ac40-4f7e-8057-43d95d27d9ae.jpg" 
          alt="Special Equipment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 text-center max-w-5xl">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            中国特种设备及工业机械供应
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            厂家直供，灵活条款，价格优惠。成功运营10年以上。
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
            <Button size="lg" onClick={() => scrollToSection('contact')} className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform shadow-lg">
              获取咨询
            </Button>
            <Button size="lg" onClick={() => scrollToSection('services')} className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-transform shadow-lg">
              了解更多
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;