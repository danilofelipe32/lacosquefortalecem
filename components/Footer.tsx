import React from 'react';

const Footer: React.FC = () => {
  const sharePortfolio = async () => {
    const url = "https://portfoliokalyane1.vercel.app/";
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kalyane Carvalho | Psicologia Escolar',
          text: 'Conheça o projeto Laços que Fortalecem',
          url: url
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        alert('Link copiado para a área de transferência!');
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <footer className="bg-white/80 backdrop-blur-md border-t border-slate-100 py-16">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Compromisso Profissional</h3>
        <p className="text-slate-500 italic text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          "Esse trabalho representa minha atuação como psicóloga escolar, presente, orientada pela prevenção, pela escuta e fortalecimento das práticas educativas. Sigo à disposição para continuidade das ações institucionais."
        </p>
        
        <div className="flex justify-center gap-6 mb-8">
          <a href="mailto:psicologakalyanecarvalho@gmail.com" className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-psy-600 hover:text-white transition duration-300 shadow-sm hover:shadow-md" title="Enviar E-mail">
            <i className="fa-regular fa-envelope text-xl"></i>
          </a>
          <a href="https://instagram.com/kalyanecarvalho.psi" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-pink-500 hover:text-white transition duration-300 shadow-sm hover:shadow-md" title="Instagram">
            <i className="fa-brands fa-instagram text-xl"></i>
          </a>
          <button onClick={sharePortfolio} className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 hover:text-psy-600 hover:bg-slate-50 transition duration-300 shadow-sm hover:shadow-md" title="Compartilhar Link">
            <i className="fa-solid fa-share-nodes text-xl"></i>
          </button>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          &copy; 2025 Projeto Preventivo - Psicologia nas Escolas. 2ª DIREC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;