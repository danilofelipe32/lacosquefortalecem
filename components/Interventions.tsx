import React from 'react';

interface InterventionsProps {
  onImageClick: (src: string) => void;
}

const Interventions: React.FC<InterventionsProps> = ({ onImageClick }) => {
  const images = [
    "https://imgur.com/ELn1QNK.png", "https://imgur.com/HWEvvym.png", "https://imgur.com/T8Ude0V.png",
    "https://imgur.com/J1fVsot.png", "https://imgur.com/u4WWzOV.png", "https://imgur.com/8xpGrOK.png",
    "https://imgur.com/WpGtyUN.png", "https://imgur.com/xuujluM.png", "https://imgur.com/W1ioZwG.png"
  ];

  const types = ["Reuniões", "Visitas Escolares", "Formações", "Rodas de Conversa", "Palestras", "Acolhimentos"];

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-10 border border-white/50 shadow-xl shadow-psy-200/20 hover:shadow-2xl hover:shadow-psy-200/30 transition duration-500">
            <div className="w-12 h-12 bg-psy-50 rounded-2xl flex items-center justify-center text-psy-600 text-xl mb-6">
              <i className="fa-solid fa-hand-holding-heart"></i>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Tipos de Intervenção</h3>
            <p className="text-slate-600 mb-8 font-light">Quebra da lógica de palestra como formato único, adotando estratégias participativas.</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {types.map((type, i) => (
                <span key={i} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-medium">{type}</span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {images.map((src, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden cursor-pointer group" onClick={() => onImageClick(src)}>
                  <img src={src} alt={`Intervenção ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 ease-in-out" />
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-10 border border-white/50 shadow-xl shadow-psy-200/20 hover:shadow-2xl hover:shadow-psy-200/30 transition duration-500">
            <div className="w-12 h-12 bg-psy-50 rounded-2xl flex items-center justify-center text-psy-600 text-xl mb-6">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-6">Público e Modalidade</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Quem Atendemos</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 border border-slate-200 rounded-lg text-slate-600 text-sm">Gestão Escolar</span>
                  <span className="px-3 py-1 border border-slate-200 rounded-lg text-slate-600 text-sm">Professores</span>
                  <span className="px-3 py-1 border border-slate-200 rounded-lg text-slate-600 text-sm">Alunos</span>
                  <span className="px-3 py-1 border border-slate-200 rounded-lg text-slate-600 text-sm">Famílias</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Níveis de Ensino</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-600 mb-6">
                  <span><i className="fa-solid fa-check text-green-500 mr-2 text-xs"></i> Fund. Iniciais</span>
                  <span><i className="fa-solid fa-check text-green-500 mr-2 text-xs"></i> Fund. Finais</span>
                  <span><i className="fa-solid fa-check text-green-500 mr-2 text-xs"></i> Ensino Médio</span>
                  <span><i className="fa-solid fa-check text-green-500 mr-2 text-xs"></i> EJA</span>
                </div>
                
                <div className="w-full rounded-xl overflow-hidden cursor-pointer group shadow-sm border border-slate-100" onClick={() => onImageClick('https://imgur.com/R9RHiTC.png')}>
                  <img src="https://imgur.com/R9RHiTC.png" alt="Dados de Público e Modalidade" className="w-full h-auto object-cover group-hover:scale-105 transition duration-500 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Interventions;