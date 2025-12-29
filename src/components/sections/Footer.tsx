const Footer = () => {
  return (
    <footer className="py-12 border-t border-border-subtle">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground">EH Automation</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Business Automation & AI Systems
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EH Automation. כל הזכויות שמורות.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
