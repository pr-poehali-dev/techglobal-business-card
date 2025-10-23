import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface TestimonialsSectionProps {
  visibleCards: Set<number>;
}

const TestimonialsSection = ({ visibleCards }: TestimonialsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [reviewData, setReviewData] = useState({
    company: '',
    author: '',
    position: '',
    text: ''
  });
  const testimonials = [
    {
      company: 'ООО "Вега+"',
      text: "Заказывали запасные части к грузовикам. Отличная работа! Быстро подобрали всё необходимое, качество деталей на высоте. Результатом очень довольны.",
      author: "Директор"
    },
    {
      company: 'ООО "СахСервис"',
      text: "Покупали генераторы для производства. Профессиональный подход к делу, помогли с выбором оборудования. Все сроки соблюдены, коммуникация на высшем уровне. Рекомендуем!",
      author: "Директор"
    },
    {
      company: 'ООО "БСБС"',
      text: "Заказывали экскаватор для строительных работ. Техника в отличном состоянии, всё оформили быстро и без проблем. Сотрудничаем уже не первый год!",
      author: "Генеральный директор"
    }
  ];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://functions.poehali.dev/a1f9e107-650b-48e2-b7c0-88cf2e63eed4', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'review',
          ...reviewData
        })
      });

      if (response.ok) {
        toast({
          title: "Спасибо за отзыв!",
          description: "Ваш отзыв был успешно отправлен и будет опубликован после модерации.",
        });
        setReviewData({ company: '', author: '', position: '', text: '' });
        setIsOpen(false);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить отзыв. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

        <div className="text-center mt-12">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Icon name="MessageSquarePlus" size={20} />
                Оставить отзыв
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Оставить отзыв</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Название компании *</Label>
                  <Input
                    id="company"
                    required
                    value={reviewData.company}
                    onChange={(e) => setReviewData({ ...reviewData, company: e.target.value })}
                    placeholder="ООО Компания"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="author">Ваше имя *</Label>
                  <Input
                    id="author"
                    required
                    value={reviewData.author}
                    onChange={(e) => setReviewData({ ...reviewData, author: e.target.value })}
                    placeholder="Иван Иванов"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Должность *</Label>
                  <Input
                    id="position"
                    required
                    value={reviewData.position}
                    onChange={(e) => setReviewData({ ...reviewData, position: e.target.value })}
                    placeholder="Генеральный директор"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="text">Текст отзыва *</Label>
                  <Textarea
                    id="text"
                    required
                    value={reviewData.text}
                    onChange={(e) => setReviewData({ ...reviewData, text: e.target.value })}
                    placeholder="Расскажите о вашем опыте сотрудничества..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;