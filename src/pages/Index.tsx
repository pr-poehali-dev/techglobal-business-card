import { useEffect, useRef, useState } from "react";
import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import GallerySection from "@/components/sections/GallerySection";
import AdvantagesSection from "@/components/sections/AdvantagesSection";
import OurAdvantagesSection from "@/components/sections/OurAdvantagesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import FloatingButtons from "@/components/sections/FloatingButtons";
import { updateMetaTags } from "@/utils/updateMetaTags";

const Index = () => {
  useEffect(() => {
    updateMetaTags('ru');
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let fileBase64 = '';
      let fileName = '';
      
      if (selectedFile) {
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(selectedFile);
        });
        fileName = selectedFile.name;
      }

      const requestBody = {
        ...formData,
        file: fileBase64,
        fileName: fileName
      };

      const [saveResponse, emailResponse] = await Promise.all([
        fetch('https://functions.poehali.dev/a1f9e107-650b-48e2-b7c0-88cf2e63eed4', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }),
        fetch('https://functions.poehali.dev/8c7c76e3-ebf6-4218-b8b2-4d00a0f3ccfc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        })
      ]);

      console.log('Save response:', saveResponse.ok);
      console.log('Email response:', emailResponse.ok);

      if (saveResponse.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
        setSelectedFile(null);
        
        if (!emailResponse.ok) {
          const emailError = await emailResponse.json();
          console.error('Email error:', emailError);
        }
        
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('[data-animate]');
    cards.forEach((card) => observerRef.current?.observe(card));

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header scrollToSection={scrollToSection} />
      <HeroSection scrollY={scrollY} scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection />
      <GallerySection visibleCards={visibleCards} />
      <AdvantagesSection visibleCards={visibleCards} />
      <OurAdvantagesSection />
      <TestimonialsSection visibleCards={visibleCards} />
      <WorkflowSection visibleCards={visibleCards} scrollToSection={scrollToSection} />
      <ContactSection 
        formData={formData}
        setFormData={setFormData}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        handleSubmit={handleSubmit}
      />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Index;