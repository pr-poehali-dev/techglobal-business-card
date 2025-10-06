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
      title: "Request and Consultation",
      description: "Contact us in any convenient way. Our specialists will consult you on equipment selection, technical specifications, and prices."
    },
    {
      index: 21,
      number: 2,
      title: "Equipment Selection",
      description: "We study your requirements and offer optimal models. We provide detailed specifications, photos, and videos of equipment from the factory."
    },
    {
      index: 22,
      number: 3,
      title: "Contract and Payment",
      description: "We sign an official supply contract. Flexible payment terms: advance payment, installments. Full legal support."
    },
    {
      index: 23,
      number: 4,
      title: "Production and Shipment",
      description: "We place an order at the factory. We monitor production and quality. We organize delivery to your facility or warehouse."
    },
    {
      index: 24,
      number: 5,
      title: "Delivery and Commissioning",
      description: "Equipment delivery to the specified location. If necessary - commissioning works, staff training, and warranty service."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Work Process</h2>
          <p className="text-lg text-muted-foreground">
            Simple and transparent process from request to equipment delivery
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
              <span className="font-semibold text-foreground">Delivery time:</span> from 30 days after payment
            </p>
            <Button size="lg" onClick={() => scrollToSection('contact')}>
              Start Cooperation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
