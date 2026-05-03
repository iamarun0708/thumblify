const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-400 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Thumblify. All rights reserved.</p>
        <div className="flex flex-wrap gap-3">
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs">AI Powered</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs">Groq LLM</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs">Pollinations</span>
          <span className="rounded-full bg-white/5 px-3 py-1 text-xs">React + Vite</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;