import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const WorkflowSection = () => {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  const steps = [
    {
      index: 20,
      number: 1,
      title: "咨询与需求",
      description: "通过任何方便的方式联系我们。我们的专家将就设备选型、技术规格和价格为您提供咨询。"
    },
    {
      index: 21,
      number: 2,
      title: "设备选型",
      description: "我们研究您的需求并提供最佳型号。提供详细的技术规格、工厂设备照片和视频。"
    },
    {
      index: 22,
      number: 3,
      title: "合同与付款",
      description: "签订正式供货合同。灵活的付款条件：预付款、分期付款。全程法律支持。"
    },
    {
      index: 23,
      number: 4,
      title: "生产与发货",
      description: "向工厂下订单。监控生产和质量。组织设备运输至您的工地或仓库。"
    },
    {
      index: 24,
      number: 5,
      title: "交付与调试",
      description: "设备交付至指定地点。必要时提供调试工作、人员培训和保修服务。"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">工作流程</h2>
          <p className="text-lg text-muted-foreground">
            从需求到设备交付的简单透明流程
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
              <span className="font-semibold text-foreground">交货时间：</span>付款后30天起
            </p>
            <Button size="lg" onClick={() => scrollToSection('contact')}>
              开始合作
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;