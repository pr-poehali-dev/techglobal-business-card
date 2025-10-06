import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WorkflowSectionProps {
  visibleCards: Set<number>;
  scrollToSection: (id: string) => void;
}

const WorkflowSection = ({ visibleCards, scrollToSection }: WorkflowSectionProps) => {
  const steps = [
    {
      index: 20,
      number: 1,
      title: "Заявка и консультация",
      description: "Свяжитесь с нами любым удобным способом. Наши специалисты проконсультируют вас по подбору оборудования, техническим характеристикам и ценам."
    },
    {
      index: 21,
      number: 2,
      title: "Подбор оборудования",
      description: "Изучаем ваши задачи и предлагаем оптимальные модели. Предоставляем детальные спецификации, фото и видео техники с завода."
    },
    {
      index: 22,
      number: 3,
      title: "Договор и оплата",
      description: "Заключаем официальный договор поставки. Гибкие условия оплаты: предоплата, рассрочка. Полное юридическое сопровождение."
    },
    {
      index: 23,
      number: 4,
      title: "Производство и отгрузка",
      description: "Размещаем заказ на заводе. Контролируем производство и качество. Организуем доставку до вашего объекта или склада в РФ."
    },
    {
      index: 24,
      number: 5,
      title: "Доставка и пуско-наладка",
      description: "Доставка техники в указанное место. При необходимости — пуско-наладочные работы, обучение персонала и гарантийное обслуживание."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Этапы работы</h2>
          <p className="text-lg text-muted-foreground">
            Простой и прозрачный процесс от заявки до получения техники
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {steps.map((step) => (
              <Card 
                key={step.index}
                className={`p-6 shadow-lg hover:shadow-xl transition-all duration-700 ${visibleCards.has(step.index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                data-animate
                data-index={step.index}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              <span className="font-semibold text-foreground">Срок поставки:</span> от 30 дней с момента оплаты
            </p>
            <Button size="lg" onClick={() => scrollToSection('contact')}>
              Начать сотрудничество
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
