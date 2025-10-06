const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="https://cdn.poehali.dev/files/e029a36d-cb18-4895-a0a6-5d31dc75c0d4.png" 
              alt="TechGlobal" 
              className="h-8 brightness-0 invert"
            />
          </div>
          <p className="text-sm text-white/80">© 2025 TechGlobal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
