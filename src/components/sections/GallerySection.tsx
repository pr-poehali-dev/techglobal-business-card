import { Card } from "@/components/ui/card";

interface GallerySectionProps {
  visibleCards: Set<number>;
}

const GallerySection = ({ visibleCards }: GallerySectionProps) => {
  const galleryItems = [
    {
      index: 0,
      image: "https://cdn.poehali.dev/projects/58de4a73-eb2a-4a4e-b132-1fe940434eae/files/afb9b349-cf72-4dd6-8137-a503993af318.jpg",
      alt: "Экскаватор на стройплощадке",
      title: "Экскаваторы",
      description: "Современные экскаваторы для строительных и земляных работ любой сложности"
    },
    {
      index: 1,
      image: "https://cdn.poehali.dev/projects/58de4a73-eb2a-4a4e-b132-1fe940434eae/files/eb04b2a6-8f97-4409-b7c4-f931a43a7c47.jpg",
      alt: "Генераторное оборудование",
      title: "Генераторы",
      description: "Дизельные генераторы и электростанции для промышленных объектов"
    },
    {
      index: 2,
      image: "https://cdn.poehali.dev/projects/58de4a73-eb2a-4a4e-b132-1fe940434eae/files/72c23df5-9c2c-4a5f-8c7c-ffd540a9b3f5.jpg",
      alt: "Запасные части к грузовикам",
      title: "Запчасти для грузовиков",
      description: "Оригинальные и качественные запасные части для грузовой техники всех марок"
    },
    {
      index: 3,
      image: "https://cdn.poehali.dev/files/1e61a691-b34e-4b3a-85aa-cb911df07abd.jpeg",
      alt: "Грузовой тягач JAC",
      title: "Грузовая техника",
      description: "Тягачи, самосвалы и грузовики JAC, SHACMAN, FAW для логистики"
    },
    {
      index: 4,
      image: "https://cdn.poehali.dev/files/04c933b4-21d2-4676-9c16-78664b1bdc0f.jpeg",
      alt: "Погрузчик LiuGong",
      title: "Погрузчики",
      description: "Фронтальные и телескопические погрузчики для складов и строительных площадок"
    },
    {
      index: 5,
      image: "https://cdn.poehali.dev/files/6a84bba9-a7c8-49b2-a49b-5ac925118c26.jpeg",
      alt: "Автокран XCMG",
      title: "Грузоподъёмная техника",
      description: "Автокраны и подъёмное оборудование XCMG высокой грузоподъёмности"
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