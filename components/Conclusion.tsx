import React from 'react';

const Conclusion: React.FC = () => {
  const cards = [
    {
      title: "Objetivos Alcançados",
      description: "O projeto fortaleceu a atuação preventiva e demonstrou viabilidade técnica e relevância institucional.",
      icon: "fa-check",
      iconColor: "text-emerald-500",
      bgIcon: "bg-emerald-100",
    },
    {
      title: "Desafios Enfrentados",
      description: "Alcançar todas as escolas da regional ainda é uma meta em construção, dado o volume de demandas e a extensão territorial.",
      icon: "fa-triangle-exclamation",
      iconColor: "text-amber-600",
      bgIcon: "bg-amber-100",
    },
    {
      title: "Aprendizados",
      description: "A presença constante e a escuta ativa são ferramentas poderosas para desmistificar a psicologia e criar vínculos.",
      icon: "fa-lightbulb",
      iconColor: "text-sky-500",
      bgIcon: "bg-sky-100",
    },
    {
      title: "Próximos Passos",
      description: "Expandir a rede de atendimento, documentar boas práticas e mensurar impactos a longo prazo.",
      icon: "fa-rocket",
      iconColor: "text-purple-500",
      bgIcon: "bg-purple-100",
    }
  ];

  return (
    <section id="conclusao" className="py-24 bg-sky-50 relative overflow-hidden">
      {/* Background Pattern (Plus signs) */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 11H5v2h6v6h2v-6h6v-2h-6V5h-2v6z' fill='%23bae6fd' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }}></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-12 text-center">Considerações Finais</h2>
        
        <div className="space-y-6">
          {cards.map((card, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[2rem] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row gap-6 items-start md:items-center"
            >
              <div className={`w-14 h-14 rounded-full ${card.bgIcon} ${card.iconColor} flex items-center justify-center flex-shrink-0 text-xl shadow-sm`}>
                <i className={`fa-solid ${card.icon}`}></i>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{card.title}</h4>
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conclusion;