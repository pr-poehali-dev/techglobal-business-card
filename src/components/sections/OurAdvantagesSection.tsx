import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const OurAdvantagesSection = () => {
  const advantages = [
    {
      icon: "MapPin",
      title: "Прямые поставки",
      description: "От заводов-производителей без посредников"
    },
    {
      icon: "DollarSign",
      title: "Выгодные цены",
      description: "Конкурентные условия благодаря прямым контрактам"
    },
    {
      icon: "Shield",
      title: "Гарантия качества",
      description: "Работаем только с проверенными производителями"
    },
    {
      icon: "Settings",
      title: "Гибкие условия",
      description: "Индивидуальный подход к каждому клиенту"
    }
  ];

  return (
    <section id="advantages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши преимущества</h2>
          <p className="text-lg text-muted-foreground">
            Почему выбирают ТехГлобал
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
