import { useEffect, useRef, useState } from "react";
import Header from "@/components/sections/zh/Header";
import HeroSection from "@/components/sections/zh/HeroSection";
import AboutSection from "@/components/sections/zh/AboutSection";
import ServicesSection from "@/components/sections/zh/ServicesSection";
import GallerySection from "@/components/sections/zh/GallerySection";
import AdvantagesSection from "@/components/sections/zh/AdvantagesSection";
import OurAdvantagesSection from "@/components/sections/zh/OurAdvantagesSection";
import WorkflowSection from "@/components/sections/zh/WorkflowSection";
import ContactSection from "@/components/sections/zh/ContactSection";
import Footer from "@/components/sections/zh/Footer";
import FloatingButtons from "@/components/sections/zh/FloatingButtons";
import { updateMetaTags } from "@/utils/updateMetaTags";

const IndexZh = () => {
  useEffect(() => {
    updateMetaTags('zh');
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
        fileBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => {
            const base64 = reader.result as string;
            resolve(base64.split(',')[1]);
          };
          reader.onerror = reject;
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

      if (saveResponse.ok || emailResponse.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setSelectedFile(null);
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 10 * 1024 * 1024;
      
      if (file.size > maxSize) {
        alert('文件过大。最大文件大小为10MB。');
        e.target.value = '';
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  return (
    <div className="min-h-screen bg-background">
      <Header scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <AdvantagesSection />
      <OurAdvantagesSection />
      <WorkflowSection />
      <ContactSection 
        formData={formData}
        setFormData={setFormData}
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
      />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default IndexZh;