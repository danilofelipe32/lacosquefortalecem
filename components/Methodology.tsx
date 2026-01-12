import React, { useEffect, useRef } from 'react';

const Methodology: React.FC = () => {
  const steps = [
    { title: "Estruturação e planejamento do projeto", side: "left", color: "psy-600" },
    { title: "Divulgação da proposta e convite às escolas", side: "right", color: "psy-600" },
    { title: "Inscrição preventiva das escolas", side: "left", color: "psy-600" },
    { title: "Contato e agendamento institucional", side: "right", color: "psy-600" },
    { title: "Reunião institucional", side: "left", color: "psy-600" },
    { title: "Planejamento das ações e formalização", side: "right", color: "psy-600" },
    { title: "Execução das intervenções", side: "left", color: "psy-500" },
    { title: "Devolutiva e registro documental", side: "right", color: "psy-400" },
    { title: "Acompanhamento e rearticulação contínua", side: "left", color: "psy-300" },
    { title: "Avaliação institucional e análise dos efeitos", side: "right", color: "psy-200" },
  ];

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => observerRef.current?.observe(item));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section id="metodologia" className="py-24 relative bg-slate-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-serif font-bold text-slate-900">Metodologia Processual</h2>
          <p className="text-slate-500 mt-4">Fluxo contínuo de junho a dezembro.</p>
        </div>

        <div className="relative timeline-line space-y-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col md:flex-row items-center md:items-start group timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out delay-[${index * 100}ms]`}
            >
              <div className={`order-1 md:w-1/2 ${step.side === 'left' ? 'text-center md:text-right md:pr-12' : 'md:pr-12'}`}>
                {step.side === 'left' && <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>}
              </div>
              
              <div className={`order-2 z-10 flex items-center justify-center w-10 h-10 bg-${step.color} text-white rounded-full border-4 border-white shadow-sm my-4 md:my-1.5 md:-ml-2 bg-psy-600`}>
                <span className="font-bold text-sm">{index + 1}</span>
              </div>
              
              <div className={`order-3 md:w-1/2 ${step.side === 'right' ? 'text-center md:text-left md:pl-12' : 'md:pl-12'}`}>
                 {step.side === 'right' && <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;