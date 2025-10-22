import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface TestimonialsSectionProps {
  visibleCards: Set<number>;
}

const TestimonialsSection = ({ visibleCards }: TestimonialsSectionProps) => {
  const testimonials = [
    {
      company: "ООО Вега +",
      text: "Отличная работа! Быстро и качественно выполнили все наши требования. Результатом очень довольны.",
      author: "Директор компании"
    },
    {
      company: "ООО СахСервис",
      text: "Профессиональный подход к делу. Все сроки соблюдены, коммуникация на высшем уровне. Рекомендуем!",
      author: "Руководитель отдела"
    },
    {
      company: "ООО БСБС",
      text: "Сотрудничаем уже не первый год. Всегда высокое качество услуг и индивидуальный подход к каждому проекту.",
      author: "Генеральный директор"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Отзывы наших клиентов</h2>
          <p className="text-muted-foreground text-lg">
            Нам доверяют ведущие компании
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              data-animate
              data-index={index + 100}
              className={`p-8 transition-all duration-700 hover:shadow-lg ${
                visibleCards.has(index + 100)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="flex items-start gap-2 mb-4">
                <Icon name="Quote" size={32} className="text-primary flex-shrink-0" />
              </div>
              
              <p className="text-foreground/90 mb-6 min-h-[80px]">
                {testimonial.text}
              </p>
              
              <div className="border-t pt-4">
                <div className="font-bold text-lg text-primary mb-1">
                  {testimonial.company}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.author}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
