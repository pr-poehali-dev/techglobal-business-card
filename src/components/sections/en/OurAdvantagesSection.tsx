import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const OurAdvantagesSection = () => {
  const advantages = [
    {
      icon: "MapPin",
      title: "Direct Supplies",
      description: "From manufacturers without intermediaries"
    },
    {
      icon: "DollarSign",
      title: "Competitive Prices",
      description: "Favorable terms thanks to direct contracts"
    },
    {
      icon: "Shield",
      title: "Quality Guarantee",
      description: "We work only with verified manufacturers"
    },
    {
      icon: "Settings",
      title: "Flexible Terms",
      description: "Individual approach to each client"
    }
  ];

  return (
    <section id="advantages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Advantages</h2>
          <p className="text-lg text-muted-foreground">
            Why choose TechGlobal
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={advantage.icon as any} className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">{advantage.title}</h3>
              <p className="text-sm text-muted-foreground">{advantage.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAdvantagesSection;
