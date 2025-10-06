import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About TechGlobal</h2>
          <p className="text-lg text-muted-foreground">
            We specialize in supplying special equipment, industrial machinery, and materials directly from manufacturers in the People's Republic of China. With 10 years of experience, we have successfully completed numerous large-scale projects and earned the trust of our clients.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">10+</h3>
            <p className="text-muted-foreground">years in business</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="TrendingUp" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">30+</h3>
            <p className="text-muted-foreground">completed projects</p>
          </Card>
          
          <Card className="p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Handshake" className="text-primary" size={32} />
            </div>
            <h3 className="text-5xl font-bold text-primary mb-2">20+</h3>
            <p className="text-muted-foreground">trusted partners</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
