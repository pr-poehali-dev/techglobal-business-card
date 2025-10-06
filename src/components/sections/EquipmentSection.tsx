import { Card, CardContent } from "@/components/ui/card";

const EquipmentSection = () => {
  const equipment = [
    {
      id: 1,
      title: "Вибропогружатель",
      image: "https://cdn.poehali.dev/files/34a3f06a-c82d-4d74-926d-ba3d82a730da.png",
      description: "Высокоэффективное оборудование для погружения свай и шпунтов",
      features: [
        "Низкий уровень шума и вибрации",
        "Высокая производительность",
        "Надежная конструкция",
        "Простота в эксплуатации"
      ]
    }
  ];

  return (
    <section id="equipment" className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Наше оборудование
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Современная техника от ведущих производителей КНР
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item) => (
            <Card 
              key={item.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card"
            >
              <div className="relative h-64 overflow-hidden bg-white">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-contain p-4 hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-primary mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
