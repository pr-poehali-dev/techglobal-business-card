import { Card } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";

const GallerySection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => new Set(prev).add(index));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-animate]');
    cards.forEach(card => observerRef.current?.observe(card));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
  const galleryItems = [
    {
      index: 0,
      image: "https://cdn.poehali.dev/files/dd352148-f30b-4be1-8f2a-ffadcb5790ba.jpeg",
      alt: "XCMG Road Roller",
      title: "筑路设备",
      description: "压路机、摊铺机及其他筑路机械"
    },
    {
      index: 1,
      image: "https://cdn.poehali.dev/files/1e61a691-b34e-4b3a-85aa-cb911df07abd.jpeg",
      alt: "JAC Truck Tractor",
      title: "重型卡车",
      description: "牵引车、自卸车，JAC、陕汽、一汽等物流运输车辆"
    },
    {
      index: 2,
      image: "https://cdn.poehali.dev/files/04c933b4-21d2-4676-9c16-78664b1bdc0f.jpeg",
      alt: "LiuGong Loader",
      title: "工程机械",
      description: "挖掘机、推土机、装载机，适用于各类工程任务"
    },
    {
      index: 3,
      image: "https://cdn.poehali.dev/files/6a84bba9-a7c8-49b2-a49b-5ac925118c26.jpeg",
      alt: "XCMG Mobile Crane",
      title: "起重设备",
      description: "徐工移动式起重机及高承载能力吊装设备"
    },
    {
      index: 4,
      image: "https://cdn.poehali.dev/files/cff960d3-bb8d-4972-b1a8-0d3414373563.jpeg",
      alt: "Drilling Equipment",
      title: "钻探机械",
      description: "地质勘探及建筑工程钻机"
    },
    {
      index: 5,
      image: "https://cdn.poehali.dev/files/8430ac0a-38db-4560-bb9f-63944e187cb4.png",
      alt: "Generator Equipment",
      title: "发电设备",
      description: "工业设施用柴油发电机及电站"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">我们的设备</h2>
          <p className="text-lg text-muted-foreground">
            来自中国领先制造商的现代化特种设备
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