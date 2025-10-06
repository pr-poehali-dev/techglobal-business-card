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
      title: "Цена ниже на 30-50%",
      description: "По сравнению с европейскими и японскими аналогами при сопоставимом качестве и функционале"
    },
    {
      index: 11,
      icon: "Award",
      title: "Мировое признание",
      description: "Бренды XCMG, Sany, Zoomlion входят в топ-10 производителей строительной техники в мире"
    },
    {
      index: 12,
      icon: "Zap",
      title: "Современные технологии",
      description: "Передовые решения в электронике, автоматизации и экологичности двигателей"
    },
    {
      index: 13,
      icon: "Wrench",
      title: "Доступность запчастей",
      description: "Быстрая поставка оригинальных комплектующих и низкая стоимость обслуживания"
    },
    {
      index: 14,
      icon: "Clock",
      title: "Быстрые сроки",
      description: "Налаженная логистика позволяет доставить оборудование в течение 30-45 дней"
    },
    {
      index: 15,
      icon: "CheckCircle",
      title: "Адаптация к РФ",
      description: "Техника адаптирована к российским условиям эксплуатации и климату"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Преимущества китайской техники</h2>
          <p className="text-lg text-muted-foreground">
            Почему производители КНР — лучший выбор для вашего бизнеса
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
