import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface AdvantagesSectionProps {
  visibleCards: Set<number>;
}

const AdvantagesSection = ({ visibleCards }: AdvantagesSectionProps) => {
  const advantages = [
    {
      index: 10,
      icon: "TrendingDown",
      title: "30-50% Lower Price",
      description: "Compared to European and Japanese alternatives with similar quality and functionality"
    },
    {
      index: 11,
      icon: "Award",
      title: "Global Recognition",
      description: "Brands like XCMG, Sany, and Zoomlion are among the top 10 construction equipment manufacturers worldwide"
    },
    {
      index: 12,
      icon: "Zap",
      title: "Modern Technology",
      description: "Advanced solutions in electronics, automation, and eco-friendly engines"
    },
    {
      index: 13,
      icon: "Wrench",
      title: "Parts Availability",
      description: "Fast delivery of original components and low maintenance costs"
    },
    {
      index: 14,
      icon: "Clock",
      title: "Fast Delivery",
      description: "Established logistics allow equipment delivery within 30-45 days"
    },
    {
      index: 15,
      icon: "CheckCircle",
      title: "Adaptation",
      description: "Equipment adapted to local operating conditions and climate"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Advantages of Chinese Equipment</h2>
          <p className="text-lg text-muted-foreground">
            Why Chinese manufacturers are the best choice for your business
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage) => (
            <Card 
              key={advantage.index}
              className={`p-6 shadow-lg hover:shadow-xl transition-all duration-700 ${visibleCards.has(advantage.index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              data-index={advantage.index}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name={advantage.icon as any} className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
