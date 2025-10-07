import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">О компании ТехГлобал</h2>
          <p className="text-lg text-muted-foreground">
            Мы специализируемся на поставках спецтехники, промышленного оборудования и материалов напрямую от производителей из Китайской Народной Республики. За 10 лет работы мы реализовали множество крупных проектов и заслужили доверие наших клиентов.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">10+</h3>
            <p className="text-muted-foreground">лет на рынке</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TrendingUp" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">50+</h3>
            <p className="text-muted-foreground">реализованных проектов</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Handshake" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">30+</h3>
            <p className="text-muted-foreground">постоянных клиентов</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;