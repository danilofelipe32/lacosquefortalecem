import React from 'react';

const About: React.FC = () => {
  const specificObjectives = [
    "Tornar visível o trabalho da psicologia escolar na 2ª DIREC.",
    "Construir vínculos sólidos com a comunidade escolar.",
    "Fortalecer a saúde mental no contexto educativo.",
    "Prevenir agravamento de conflitos e sofrimento psíquico.",
    "Humanizar práticas educativas e pedagógicas."
  ];

  return (
    <section id="sobre" className="py-24 bg-white/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Por que <br />Psicologia Escolar?</h2>
            <div className="prose prose-slate text-lg text-slate-600 leading-loose">
              <p className="mb-6">
                Historicamente, a atuação era restrita a crises. O projeto <strong>"Laços que Fortalecem"</strong> subverte essa lógica, inserindo a prevenção no centro da pauta.
              </p>
              <p>
                Buscamos fortalecer a rede escolar antes que os problemas se cronifiquem, desconstruindo o estigma de que "psicólogo é apenas para problemas graves".
              </p>
            </div>
            <div className="mt-10 p-8 bg-white/60 backdrop-blur-sm border border-white/50 rounded-3xl shadow-sm">
              <p className="text-psy-800 font-serif text-xl italic leading-relaxed">
                "Ampliar a compreensão sobre o papel da psicologia na escola, para além de demandas emergenciais."
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-sm font-bold text-psy-600 uppercase tracking-widest mb-4">Objetivo Geral</h3>
              <p className="text-xl text-slate-800 font-medium leading-relaxed">
                Atuação preventiva e compreensão sobre o papel da psicologia no contexto educacional, rompendo o estereótipo sobre psicólogo ser para doido ou só aparecer quando houver problemas graves.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Objetivos Específicos</h3>
              <ul className="space-y-4">
                {specificObjectives.map((obj, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 flex-shrink-0 text-xs">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <span className="text-slate-700">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;