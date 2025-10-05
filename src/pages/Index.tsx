import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/f0e9eaf0-f813-41a1-bd09-80829adf3b3e.png" 
              alt="TechGlobal" 
              className="h-14 md:h-16 object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>
          <nav className="hidden md:flex items-center gap-4 lg:gap-6">
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">О компании</button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Услуги</button>
            <button onClick={() => scrollToSection('gallery')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Оборудование</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">Контакты</button>
          </nav>
          <Button onClick={() => scrollToSection('contact')} className="whitespace-nowrap">Связаться</Button>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary/5 via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="animate-fade-in order-2 lg:order-1">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 lg:mb-6 leading-tight">
                Поставка спецтехники и промышленного оборудования из КНР
              </h1>
              <p className="text-base md:text-lg text-muted-foreground mb-6 lg:mb-8">
                Прямые поставки от заводов-производителей. Гибкие условия и конкурентные цены. 10 лет успешной работы на рынке.
              </p>
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <Button size="lg" onClick={() => scrollToSection('contact')}>
                  Получить консультацию
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('services')}>
                  Узнать больше
                </Button>
              </div>
            </div>
            <div className="animate-fade-in order-1 lg:order-2">
              <img 
                src="https://cdn.poehali.dev/files/eeb50967-ac40-4f7e-8057-43d95d27d9ae.jpg" 
                alt="Спецтехника" 
                className="rounded-lg shadow-2xl w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">О компании ТехГлобал</h2>
            <p className="text-lg text-muted-foreground">
              Мы специализируемся на поставках спецтехники, промышленного оборудования и материалов напрямую от производителей из Китайской Народной Республики. За 10 лет работы мы реализовали множество крупных проектов и заслужили доверие наших клиентов.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" className="text-primary" size={32} />
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">10+</h3>
              <p className="text-muted-foreground">лет на рынке</p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="TrendingUp" className="text-primary" size={32} />
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">30+</h3>
              <p className="text-muted-foreground">реализованных проектов</p>
            </Card>
            
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Handshake" className="text-primary" size={32} />
              </div>
              <h3 className="text-5xl font-bold text-primary mb-2">20+</h3>
              <p className="text-muted-foreground">постоянных партнёров</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши услуги</h2>
            <p className="text-lg text-muted-foreground">
              Полный комплекс услуг по поставке и сопровождению оборудования
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Truck" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Поставка спецтехники</h3>
              <p className="text-muted-foreground">
                Экскаваторы, бульдозеры, погрузчики, краны и другая строительная техника от ведущих китайских производителей
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Factory" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Промышленное оборудование</h3>
              <p className="text-muted-foreground">
                Станки, производственные линии, оборудование для различных отраслей промышленности
              </p>
            </Card>
            
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Package" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Промышленные материалы</h3>
              <p className="text-muted-foreground">
                Комплектующие, расходные материалы и запасные части для промышленного оборудования
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наше оборудование</h2>
            <p className="text-lg text-muted-foreground">
              Современная спецтехника от ведущих производителей КНР
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/dd352148-f30b-4be1-8f2a-ffadcb5790ba.jpeg" 
                  alt="Дорожный каток XCMG" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Дорожная техника</h3>
                <p className="text-sm text-muted-foreground">Катки, асфальтоукладчики и дорожно-строительное оборудование</p>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/1e61a691-b34e-4b3a-85aa-cb911df07abd.jpeg" 
                  alt="Грузовой тягач JAC" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Грузовая техника</h3>
                <p className="text-sm text-muted-foreground">Тягачи, самосвалы и грузовики JAC, SHACMAN, FAW для логистики</p>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/13d5ed32-c0ee-4458-913c-e4b93c72092e.jpeg" 
                  alt="Строительная спецтехника" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Строительная техника</h3>
                <p className="text-sm text-muted-foreground">Экскаваторы, бульдозеры, погрузчики для любых строительных задач</p>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/6a84bba9-a7c8-49b2-a49b-5ac925118c26.jpeg" 
                  alt="Автокран XCMG" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Грузоподъёмная техника</h3>
                <p className="text-sm text-muted-foreground">Автокраны и подъёмное оборудование XCMG высокой грузоподъёмности</p>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img 
                  src="https://cdn.poehali.dev/files/cff960d3-bb8d-4972-b1a8-0d3414373563.jpeg" 
                  alt="Буровое оборудование" 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">Буровая техника</h3>
                <p className="text-sm text-muted-foreground">Буровые установки для геологоразведки и строительства</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Преимущества китайской техники</h2>
            <p className="text-lg text-muted-foreground">
              Почему производители КНР — лучший выбор для вашего бизнеса
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="TrendingDown" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Цена ниже на 30-50%</h3>
              <p className="text-muted-foreground">
                По сравнению с европейскими и японскими аналогами при сопоставимом качестве и функционале
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Award" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Мировое признание</h3>
              <p className="text-muted-foreground">
                Бренды XCMG, Sany, Zoomlion входят в топ-10 производителей строительной техники в мире
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Zap" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Современные технологии</h3>
              <p className="text-muted-foreground">
                Передовые решения в электронике, автоматизации и экологичности двигателей
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Wrench" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Доступность запчастей</h3>
              <p className="text-muted-foreground">
                Быстрая поставка оригинальных комплектующих и низкая стоимость обслуживания
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Clock" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Быстрые сроки</h3>
              <p className="text-muted-foreground">
                Налаженная логистика позволяет доставить оборудование в течение 30-45 дней
              </p>
            </Card>
            
            <Card className="p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name="CheckCircle" className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Адаптация к РФ</h3>
              <p className="text-muted-foreground">
                Техника адаптирована к российским условиям эксплуатации и климату
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="advantages" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наши преимущества</h2>
            <p className="text-lg text-muted-foreground">
              Почему выбирают ТехГлобал
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Прямые поставки</h3>
              <p className="text-sm text-muted-foreground">От заводов-производителей без посредников</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="DollarSign" className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Выгодные цены</h3>
              <p className="text-sm text-muted-foreground">Конкурентные условия благодаря прямым контрактам</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Гарантия качества</h3>
              <p className="text-sm text-muted-foreground">Работаем только с проверенными производителями</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Settings" className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Гибкие условия</h3>
              <p className="text-sm text-muted-foreground">Индивидуальный подход к каждому клиенту</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Этапы работы</h2>
            <p className="text-lg text-muted-foreground">
              Простой и прозрачный процесс от заявки до получения техники
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Заявка и консультация</h3>
                    <p className="text-muted-foreground">
                      Свяжитесь с нами любым удобным способом. Наши специалисты проконсультируют вас по подбору оборудования, техническим характеристикам и ценам.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Подбор оборудования</h3>
                    <p className="text-muted-foreground">
                      Изучаем ваши задачи и предлагаем оптимальные модели. Предоставляем детальные спецификации, фото и видео техники с завода.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Договор и оплата</h3>
                    <p className="text-muted-foreground">
                      Заключаем официальный договор поставки. Гибкие условия оплаты: предоплата, рассрочка, лизинг. Полное юридическое сопровождение.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">4</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Производство и отгрузка</h3>
                    <p className="text-muted-foreground">
                      Размещаем заказ на заводе. Контролируем производство и качество. Организуем доставку до вашего объекта или склада в РФ.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">5</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Доставка и пуско-наладка</h3>
                    <p className="text-muted-foreground">
                      Доставка техники в указанное место. При необходимости — пуско-наладочные работы, обучение персонала и гарантийное обслуживание.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                <span className="font-semibold text-foreground">Срок поставки:</span> от 30 до 60 дней с момента оплаты
              </p>
              <Button size="lg" onClick={() => scrollToSection('contact')}>
                Начать сотрудничество
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Свяжитесь с нами</h2>
              <p className="text-lg text-muted-foreground">
                Готовы ответить на ваши вопросы и обсудить условия сотрудничества
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Контактная информация</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="MapPin" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Адрес</p>
                      <p className="text-sm text-muted-foreground">РФ, г. Южно-Сахалинск,<br />пер. Солнечный, д.9А, оф. 307</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Телефоны</p>
                      <a href="tel:+79621250700" className="text-sm text-primary hover:underline block">+7 (962) 125-07-00</a>
                      <a href="tel:+79959658000" className="text-sm text-primary hover:underline block">+7 (995) 965-80-00</a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a href="mailto:sales@techglobal.ru" className="text-sm text-primary hover:underline">sales@techglobal.ru</a>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <p className="font-medium mb-3">Мессенджеры</p>
                    <div className="flex gap-3">
                      <a 
                        href="https://wa.me/79621250700" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Icon name="MessageCircle" size={18} />
                        WhatsApp
                      </a>
                      <a 
                        href="https://t.me/79621250700" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#0088cc] hover:bg-[#0077b5] text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Icon name="Send" size={18} />
                        Telegram
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Отправить заявку</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="+7 (___) ___-__-__"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Расскажите о вашем проекте..."
                    />
                  </div>
                  <Button type="submit" className="w-full">Отправить заявку</Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/e029a36d-cb18-4895-a0a6-5d31dc75c0d4.png" 
                alt="ТехГлобал" 
                className="h-8 brightness-0 invert"
              />
            </div>
            <p className="text-sm text-white/80">© 2025 ТехГлобал. Все права защищены.</p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <a 
          href="https://wa.me/79621250700" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full flex items-center justify-center animate-pulse-soft hover:shadow-xl transition-all hover:scale-110"
          aria-label="Написать в WhatsApp"
        >
          <Icon name="MessageCircle" size={28} className="text-white" />
        </a>
        <a 
          href="https://t.me/79621250700" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#0088cc] hover:bg-[#0077b5] rounded-full flex items-center justify-center animate-pulse-soft hover:shadow-xl transition-all hover:scale-110"
          aria-label="Написать в Telegram"
        >
          <Icon name="Send" size={26} className="text-white" />
        </a>
      </div>
    </div>
  );
};

export default Index;