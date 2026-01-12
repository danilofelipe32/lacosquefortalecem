import React, { useState } from 'react';

interface NavbarProps {
  onOpenProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenProfile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Início', href: '#inicio', icon: 'fa-house', color: 'blue', bg: 'rgba(59,130,246,0.15)' },
    { name: 'O Projeto', href: '#sobre', icon: 'fa-file-lines', iconType: 'fa-regular', color: 'orange', bg: 'rgba(249,115,22,0.15)' },
    { name: 'Metodologia', href: '#metodologia', icon: 'fa-list-check', color: 'green', bg: 'rgba(34,197,94,0.15)' },
    { name: 'Resultados', href: '#resultados', icon: 'fa-chart-pie', color: 'purple', bg: 'rgba(168,85,247,0.15)' },
    { name: 'Conclusão', href: '#conclusao', icon: 'fa-flag-checkered', color: 'red', bg: 'rgba(239,68,68,0.15)' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 pt-4 px-4">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300 relative">
        
        {/* Profile Trigger */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onOpenProfile}>
          <div className="relative">
            <img src="https://imgur.com/nIPT0Go.png" alt="Kalyane Carvalho" className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:scale-105 transition duration-300" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none group-hover:text-psy-600 transition">Kalyane Carvalho</p>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">Psicóloga Escolar</p>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="group relative px-2 py-1 rounded-xl">
              <div 
                className="glow-bg absolute inset-0 rounded-xl -z-10" 
                style={{ background: `radial-gradient(circle, ${item.bg} 0%, rgba(255,255,255,0) 100%)` }}
              ></div>
              <div className="glow-item-wrapper relative">
                <div className="invisible flex items-center gap-2 px-3 py-2">
                  <i className={`${item.iconType || 'fa-solid'} ${item.icon}`}></i> <span>{item.name}</span>
                </div>
                <div className="glow-item-front absolute inset-0 flex items-center justify-center gap-2 text-slate-500 px-3 py-2">
                  <i className={`${item.iconType || 'fa-solid'} ${item.icon}`}></i> <span>{item.name}</span>
                </div>
                <div className={`glow-item-back absolute inset-0 flex items-center justify-center gap-2 text-${item.color}-500 px-3 py-2`}>
                   <i className={`${item.iconType || 'fa-solid'} ${item.icon}`}></i> <span>{item.name}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-600 hover:text-psy-600 focus:outline-none p-2"
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-4 md:hidden flex flex-col gap-2 origin-top animate-fade-in-up z-40">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl hover:bg-psy-50 text-slate-600 font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;