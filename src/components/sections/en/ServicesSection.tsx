import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive equipment supply and support services
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Truck" className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Special Equipment Supply</h3>
            <p className="text-muted-foreground">
              Excavators, bulldozers, loaders, cranes, and other construction equipment from leading Chinese manufacturers
            </p>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Factory" className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Industrial Equipment</h3>
            <p className="text-muted-foreground">
              Machinery, production lines, and equipment for various industrial sectors
            </p>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Package" className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">Industrial Materials</h3>
            <p className="text-muted-foreground">
              Components, consumables, and spare parts for industrial equipment
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
