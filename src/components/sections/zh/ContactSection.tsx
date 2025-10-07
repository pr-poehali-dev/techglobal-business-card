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
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">联系我们</h2>
            <p className="text-lg text-muted-foreground">
              随时为您解答问题并讨论合作条款
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-6">联系方式</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">地址</p>
                    <p className="text-sm text-muted-foreground">15/F Radio City 505 Hennesy Road<br />Causeway Bay, Hong Kong</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">电话</p>
                    <a href="tel:+8613165540208" className="text-sm text-primary hover:underline block">+86 131 6554 0208</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-medium mb-1">邮箱</p>
                    <a href="mailto:sales@tgtradehk.com" className="text-sm text-primary hover:underline">sales@tgtradehk.com</a>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="font-medium mb-3">即时通讯</p>
                  <div className="flex gap-3">
                    <a 
                      href="https://wa.me/8613165540208" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Icon name="MessageCircle" size={18} />
                      WhatsApp
                    </a>
                    <a 
                      href="https://t.me/8613165540208" 
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
              <h3 className="text-xl font-semibold mb-6">发送咨询</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium mb-2 block">您的姓名</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="张三"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">电话</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                    placeholder="+86 ___ ____ ____"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">留言</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none bg-background"
                    placeholder="请告诉我们您的项目信息..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">附件（可选）</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      id="file-upload"
                      className="hidden"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    />
                    <label 
                      htmlFor="file-upload"
                      className="w-full px-4 py-3 border border-input rounded-lg flex items-center gap-3 cursor-pointer hover:bg-accent transition-colors bg-background"
                    >
                      <Icon name="Paperclip" size={20} className="text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {selectedFile ? selectedFile.name : '选择文件（PDF、DOC、JPG、PNG）'}
                      </span>
                    </label>
                    {selectedFile && (
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        <Icon name="X" size={18} />
                      </button>
                    )}
                  </div>
                </div>
                
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm flex items-center gap-2">
                    <Icon name="CheckCircle" size={18} />
                    <span>咨询已成功发送！我们将尽快与您联系。</span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm flex items-center gap-2">
                    <Icon name="XCircle" size={18} />
                    <span>发送失败。请稍后再试或直接致电联系。</span>
                  </div>
                )}
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Icon name="Loader2" size={18} className="animate-spin" />
                      发送中...
                    </span>
                  ) : (
                    '发送咨询'
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