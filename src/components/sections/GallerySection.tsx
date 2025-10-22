import { Card } from "@/components/ui/card";

interface GallerySectionProps {
  visibleCards: Set<number>;
}

const GallerySection = ({ visibleCards }: GallerySectionProps) => {
  const galleryItems = [
    {
      index: 0,
      image: "https://cdn.poehali.dev/files/dd352148-f30b-4be1-8f2a-ffadcb5790ba.jpeg",
      alt: "Дорожный каток XCMG",
      title: "Дорожная техника",
      description: "Катки, асфальтоукладчики и дорожно-строительное оборудование"
    },
    {
      index: 1,
      image: "https://cdn.poehali.dev/files/1e61a691-b34e-4b3a-85aa-cb911df07abd.jpeg",
      alt: "Грузовой тягач JAC",
      title: "Грузовая техника",
      description: "Тягачи, самосвалы и грузовики JAC, SHACMAN, FAW для логистики"
    },
    {
      index: 2,
      image: "https://cdn.poehali.dev/files/04c933b4-21d2-4676-9c16-78664b1bdc0f.jpeg",
      alt: "Погрузчик LiuGong",
      title: "Строительная техника",
      description: "Экскаваторы, бульдозеры, погрузчики для любых строительных задач"
    },
    {
      index: 3,
      image: "https://cdn.poehali.dev/files/6a84bba9-a7c8-49b2-a49b-5ac925118c26.jpeg",
      alt: "Автокран XCMG",
      title: "Грузоподъёмная техника",
      description: "Автокраны и подъёмное оборудование XCMG высокой грузоподъёмности"
    },
    {
      index: 4,
      image: "https://cdn.poehali.dev/files/cff960d3-bb8d-4972-b1a8-0d3414373563.jpeg",
      alt: "Буровое оборудование",
      title: "Буровая техника",
      description: "Буровые установки для геологоразведки и строительства"
    },
    {
      index: 5,
      image: "https://cdn.poehali.dev/files/8430ac0a-38db-4560-bb9f-63944e187cb4.png",
      alt: "Генераторное оборудование",
      title: "Генераторное оборудование",
      description: "Дизельные генераторы и электростанции для промышленных объектов"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Наше оборудование</h2>
          <p className="text-lg text-muted-foreground">
            Современная спецтехника от ведущих производителей КНР
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card 
              key={item.index}
              className={`overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 group ${visibleCards.has(item.index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              data-animate
              data-index={item.index}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;