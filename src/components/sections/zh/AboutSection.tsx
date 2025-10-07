import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">关于TechGlobal</h2>
          <p className="text-lg text-muted-foreground">
            我们专业从事中华人民共和国特种设备、工业机械和材料的厂家直供业务。拥有10年经验，成功完成众多大型项目，赢得客户信赖。
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">10+</h3>
            <p className="text-muted-foreground">年行业经验</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TrendingUp" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">30+</h3>
            <p className="text-muted-foreground">完成项目</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Handshake" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">20+</h3>
            <p className="text-muted-foreground">可靠合作伙伴</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
