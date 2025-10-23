import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface ContactSectionProps {
  formData: { name: string; phone: string; message: string };
  setFormData: (data: { name: string; phone: string; message: string }) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  handleSubmit: (e: React.FormEvent) => void;
}

const ContactSection = ({
  formData,
  setFormData,
  selectedFile,
  setSelectedFile,
  isSubmitting,
  submitStatus,
  handleSubmit
}: ContactSectionProps) => {
  const [wechatCopied, setWechatCopied] = useState(false);

  const handleWeChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('KMCi05').then(() => {
      setWechatCopied(true);
      setTimeout(() => setWechatCopied(false), 2000);
    });
    window.open('weixin://dl/chat?KMCi05', '_blank');
  };

  return (
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
                    <button
                      onClick={handleWeChatClick}
                      className="flex items-center gap-2 px-4 py-2 bg-[#09B83E] hover:bg-[#07A035] text-white rounded-lg transition-colors text-sm font-medium relative"
                    >
                      <Icon name="MessageSquare" size={18} />
                      WeChat
                      {wechatCopied && (
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded whitespace-nowrap">
                          ID скопирован: KMCi05
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">Отправить заявку</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium mb-2 block">Ваше имя</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-background"
                    placeholder="Расскажите о вашем проекте..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Прикрепить файл (необязательно)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      id="file-upload"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedFile(file);
                        }
                      }}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip,.rar"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="w-full px-4 py-3 border-2 border-dashed border-input rounded-lg flex items-center gap-3 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all bg-background"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Upload" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        {selectedFile ? (
                          <div>
                            <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium text-foreground">Нажмите для выбора файла</p>
                            <p className="text-xs text-muted-foreground">
                              PDF, DOC, JPG, PNG (макс. 10 МБ)
                            </p>
                          </div>
                        )}
                      </div>
                    </label>
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedFile(null);
                          const input = document.getElementById('file-upload') as HTMLInputElement;
                          if (input) input.value = '';
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-full flex items-center justify-center transition-colors"
                      >
                        <Icon name="X" size={16} />
                      </button>
                    )}
                  </div>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-center gap-2">
                    <Icon name="CheckCircle" size={18} />
                    <span>Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.</span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center gap-2">
                    <Icon name="XCircle" size={18} />
                    <span>Ошибка отправки. Попробуйте позже или свяжитесь по телефону.</span>
                  </div>
                )}
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Icon name="Loader2" size={18} className="animate-spin" />
                      Отправка...
                    </span>
                  ) : (
                    'Отправить заявку'
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;