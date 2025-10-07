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
      title: "价格低30-50%",
      description: "与欧洲和日本同类设备相比，质量和功能相当"
    },
    {
      index: 11,
      icon: "Award",
      title: "全球认可",
      description: "徐工、三一、中联重科等品牌跻身全球工程机械制造商前十"
    },
    {
      index: 12,
      icon: "Zap",
      title: "现代化技术",
      description: "电子、自动化和环保发动机领域的先进解决方案"
    },
    {
      index: 13,
      icon: "Wrench",
      title: "零件供应充足",
      description: "原装部件快速交付，维护成本低"
    },
    {
      index: 14,
      icon: "Clock",
      title: "快速交货",
      description: "完善的物流体系确保30-45天内交付设备"
    },
    {
      index: 15,
      icon: "CheckCircle",
      title: "适应性强",
      description: "设备经适配，适应当地运营条件和气候"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">中国设备的优势</h2>
          <p className="text-lg text-muted-foreground">
            为什么中国制造商是您业务的最佳选择
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
