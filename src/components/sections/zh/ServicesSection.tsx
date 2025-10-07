import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">我们的服务</h2>
          <p className="text-lg text-muted-foreground">
            全面的设备供应及支持服务
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Truck" className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">特种设备供应</h3>
            <p className="text-muted-foreground">
              挖掘机、推土机、装载机、起重机等来自中国领先制造商的工程机械设备
            </p>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Factory" className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">工业设备</h3>
            <p className="text-muted-foreground">
              各类工业领域的机械设备、生产线及配套设备
            </p>
          </Card>
          
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Package" className="text-primary" size={28} />
            </div>
            <h3 className="text-xl font-semibold mb-3">工业材料</h3>
            <p className="text-muted-foreground">
              工业设备所需的部件、耗材及备件
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
