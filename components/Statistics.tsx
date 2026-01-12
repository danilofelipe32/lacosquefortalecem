import React, { useEffect, useState, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, AreaChart, Area, CartesianGrid, LabelList, Sector
} from 'recharts';

interface StatisticsProps {
  onOpenInstitution: () => void;
  onOpenMunicipality: () => void;
}

// --- DATA DEFINITIONS ---

const themeData = [
  { name: 'Saúde Mental', value: 43, fullValue: 68.3, color: '#38bdf8', icon: 'fa-brain' },
  { name: 'Autocuidado', value: 24, fullValue: 38.1, color: '#2dd4bf', icon: 'fa-wand-magic-sparkles' },
  { name: 'Comportamento Escolar', value: 24, fullValue: 38.1, color: '#fb923c', icon: 'fa-school' },
  { name: 'Ansiedade', value: 15, fullValue: 23.8, color: '#c084fc', icon: 'fa-cloud-bolt' },
  { name: 'Autoconhecimento', value: 14, fullValue: 22.2, color: '#6366f1' },
  { name: 'Família/Escola', value: 13, fullValue: 20.6, color: '#10b981' },
  { name: 'Com. Não Violenta', value: 13, fullValue: 20.6, color: '#ec4899' },
];

const interventionData = [
  { name: 'Roda de conversa', value: 31, color: '#a855f7' }, // Purple
  { name: 'Reunião', value: 23, color: '#3b82f6' }, // Blue
  { name: 'Acolhimento', value: 12, color: '#2dd4bf' }, // Teal
  { name: 'Palestra', value: 11, color: '#f97316' }, // Orange
  { name: 'Formação', value: 5, color: '#64748b' }, // Slate
];

const monthlyData = [
  { name: 'Jun', actions: 8 },
  { name: 'Jul', actions: 10 },
  { name: 'Ago', actions: 12 },
  { name: 'Set', actions: 19 },
  { name: 'Out', actions: 15 },
  { name: 'Nov', actions: 12 },
  { name: 'Dez', actions: 6 },
];

const modalityData = [
  { name: 'Fund. Finais', value: 53.5, color: '#4f46e5' },
  { name: 'Médio Regular', value: 25.6, color: '#6366f1' },
  { name: 'Médio Integral', value: 11.6, color: '#818cf8' },
  { name: 'Fund. Integral', value: 4.7, color: '#a5b4fc' },
  { name: 'Fund. Iniciais', value: 2.3, color: '#c7d2fe' },
  { name: 'EJA', value: 2.3, color: '#e0e7ff' },
];

const reachData = [
  { name: '20-30 pessoas', value: 27.4, color: '#f97316' },
  { name: '10-20 pessoas', value: 24.2, color: '#fb923c' },
  { name: '1-10 pessoas', value: 22.6, color: '#fdba74' },
];

const publicData = [
  { name: 'Alunos', value: 71, color: '#0ea5e9' },      
  { name: 'Funcionários', value: 40.3, color: '#38bdf8' }, 
  { name: 'Famílias', value: 25.8, color: '#7dd3fc' },     
];

const motivationData = [
  { name: 'Preventiva', value: 71, color: '#38bdf8' },
  { name: 'Restante', value: 29, color: 'rgba(255,255,255,0.1)' }
];

const municipalityChartData = [
  { name: 'Parnamirim', value: 30, color: '#3b82f6' },
  { name: 'Goianinha', value: 11, color: '#22c55e' },
  { name: 'S.J. Mipibu', value: 7, color: '#f97316' },
  { name: 'Canguaretama', value: 7, color: '#a855f7' },
  { name: 'Outros', value: 6, color: '#cbd5e1' },
];

// --- HELPER COMPONENTS ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm p-3 border border-slate-100 shadow-xl rounded-xl z-50 animate-fade-in-up">
        <p className="font-bold text-slate-800 text-sm mb-1">{label || payload[0].name}</p>
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].payload.color || payload[0].color }}></div>
            <p className="text-psy-700 font-semibold text-sm">
            {payload[0].value}{payload[0].unit || ''}
            </p>
        </div>
      </div>
    );
  }
  return null;
};

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={8}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 15}
        fill={fill}
        opacity={0.15}
        cornerRadius={12}
      />
    </g>
  );
};

const Counter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = target / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

const SectionTitle = ({ icon, title, subtitle }: { icon: string, title: string, subtitle?: string }) => (
    <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-psy-50 text-psy-600 flex items-center justify-center text-lg shadow-sm">
                    <i className={icon}></i>
                </div>
                {title}
            </h3>
        </div>
        {subtitle && <p className="text-xs text-slate-400 font-medium pl-[52px]">{subtitle}</p>}
    </div>
);

// --- MAIN COMPONENT ---

const Statistics: React.FC<StatisticsProps> = ({ onOpenInstitution, onOpenMunicipality }) => {
  const [activeInterventionIndex, setActiveInterventionIndex] = useState(-1);
  const [activeMunicipalityIndex, setActiveMunicipalityIndex] = useState(-1);

  const onInterventionEnter = (_: any, index: number) => {
    setActiveInterventionIndex(index);
  };

  const onMunicipalityEnter = (_: any, index: number) => {
    setActiveMunicipalityIndex(index);
  };

  const totalInterventions = interventionData.reduce((acc, curr) => acc + curr.value, 0);
  const totalMunicipalities = municipalityChartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <>
      {/* SECTION 1: DETAILED MONITORING (Light BG) */}
      <section id="resultados" className="py-24 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block py-1.5 px-4 rounded-full bg-white text-psy-700 text-xs font-bold tracking-widest uppercase mb-4 border border-psy-100 shadow-sm">
              Indicadores 2025
            </span>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Monitoramento das Ações</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg font-light">
              Visualização quantitativa do alcance e impacto do projeto "Laços que Fortalecem" na rede estadual.
            </p>
          </div>

          {/* Row 1: Thematics & Types */}
          <div className="grid md:grid-cols-12 gap-6 mb-6">
            {/* Chart 1: Temáticas (7 cols) */}
            <div className="md:col-span-7 bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group">
              <SectionTitle icon="fa-solid fa-chart-bar" title="Temáticas Abordadas" subtitle="Porcentagem de ocorrência por intervenção" />
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={themeData} margin={{ top: 0, right: 40, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 8}} />
                    <Bar dataKey="fullValue" radius={[0, 6, 6, 0]} barSize={28} unit="%">
                      {themeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList dataKey="fullValue" position="right" style={{ fontSize: '12px', fill: '#64748b', fontWeight: 'bold' }} formatter={(val: number) => `${val}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Tipos (5 cols) */}
            <div className="md:col-span-5 bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group flex flex-col">
              <SectionTitle icon="fa-solid fa-chart-pie" title="Tipos de Intervenção" />
              
              <div className="flex-1 relative flex items-center justify-center -mt-4">
                  <div className="h-[280px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={interventionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="white"
                            strokeWidth={2}
                            activeIndex={activeInterventionIndex}
                            activeShape={renderActiveShape}
                            onMouseEnter={onInterventionEnter}
                        >
                            {interventionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                        <span className="text-4xl font-bold text-slate-800 tracking-tight">{totalInterventions}</span>
                        <span className="text-[10px] uppercase text-slate-400 tracking-widest font-bold">Ações</span>
                    </div>
                  </div>
              </div>

              {/* Legend Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-2 px-2">
                  {interventionData.map((d, i) => (
                      <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: d.color}}></div>
                          <span className="text-sm text-slate-600 font-medium truncate">
                            {d.name} <span className="text-slate-400">({((d.value / totalInterventions) * 100).toFixed(1)}%)</span>
                          </span>
                      </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Row 2: Timeline & Institution */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
             {/* Chart 3: Evolução Mensal */}
             <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group h-[420px]">
                <SectionTitle icon="fa-regular fa-calendar-check" title="Evolução Mensal" subtitle="Volume de ações realizadas (Jun - Dez)" />
                <ResponsiveContainer width="100%" height="75%">
                  <AreaChart data={monthlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorActions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 500}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="actions" 
                        stroke="#0ea5e9" 
                        strokeWidth={4} 
                        fillOpacity={1} 
                        fill="url(#colorActions)" 
                        unit=" ações"
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#0ea5e9' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-psy-600 bg-psy-50 py-2 rounded-lg mx-auto w-fit px-4">
                    <i className="fa-solid fa-arrow-trend-up"></i>
                    <span className="font-medium">Pico de 19 ações em Setembro</span>
                </div>
            </div>

            {/* Chart 4: Instituição (Card with Visual List) */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group cursor-pointer relative overflow-hidden h-[420px] flex flex-col" onClick={onOpenInstitution}>
                <div className="flex justify-between items-start">
                    <SectionTitle icon="fa-solid fa-school" title="Instituição" subtitle="Principais escolas atendidas" />
                    <button className="text-slate-400 hover:text-psy-600 transition bg-slate-50 p-2 rounded-full transform group-hover:scale-110">
                        <i className="fa-solid fa-expand"></i>
                    </button>
                </div>
                
                <div className="space-y-6 flex-1 pr-2">
                    {[
                        { name: "EE Moreira Brandão", pct: 17.7, color: "bg-blue-600" },
                        { name: "EE P. Maria Araújo", pct: 9.7, color: "bg-red-500" },
                        { name: "EE Roberto R. Krause", pct: 9.7, color: "bg-orange-500" },
                        { name: "EE Fabrício Maranhão", pct: 8.1, color: "bg-green-500" }
                    ].map((item, i) => (
                        <div key={i} className="relative">
                            <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                                <span>{item.name}</span>
                                <span className="text-slate-500">{item.pct}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div className={`${item.color} h-2.5 rounded-full transition-all duration-1000 ease-out`} style={{width: `${item.pct}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center group/link">
                    <span className="text-xs text-slate-400 font-medium italic">21 escolas no total</span>
                    <span className="text-xs text-psy-600 font-bold flex items-center gap-1 group-hover/link:translate-x-1 transition-transform">
                       Ver lista completa <i className="fa-solid fa-arrow-right"></i>
                    </span>
                </div>
            </div>
          </div>

          {/* Row 3: Municipality & Modality */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Chart 5: Município (Pie Chart) */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group cursor-pointer relative overflow-hidden h-[450px] flex flex-col" onClick={onOpenMunicipality}>
                 <div className="flex justify-between items-start">
                    <SectionTitle icon="fa-solid fa-map-location-dot" title="Municípios" />
                    <button className="text-slate-400 hover:text-psy-600 transition bg-slate-50 p-2 rounded-full transform group-hover:scale-110">
                        <i className="fa-solid fa-expand"></i>
                    </button>
                </div>
                
                <div className="flex-1 relative flex items-center justify-center -mt-4">
                    <div className="h-[280px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={municipalityChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="white"
                                    strokeWidth={2}
                                    activeIndex={activeMunicipalityIndex}
                                    activeShape={renderActiveShape}
                                    onMouseEnter={onMunicipalityEnter}
                                >
                                     {municipalityChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                            <span className="text-4xl font-bold text-slate-800 tracking-tight">8</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Municípios</span>
                        </div>
                    </div>
                </div>
                
                {/* Legend Grid */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-2 px-2">
                    {municipalityChartData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: d.color}}></div>
                            <span className="text-sm text-slate-600 font-medium truncate">
                              {d.name} <span className="text-slate-400">({((d.value / totalMunicipalities) * 100).toFixed(1)}%)</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart 6: Modality */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group h-[450px]">
                <SectionTitle icon="fa-solid fa-graduation-cap" title="Modalidade de Ensino" subtitle="Distribuição por segmento escolar" />
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart layout="vertical" data={modalityData} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#f1f5f9" />
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 6}} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24} unit="%">
                      {modalityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList dataKey="value" position="right" style={{ fontSize: '11px', fill: '#64748b', fontWeight: 600 }} formatter={(val: number) => `${val}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
            </div>
          </div>

          {/* Row 4: Public & Reach */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
             {/* Chart 7: Público Alvo */}
             <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group h-[380px]">
                <SectionTitle icon="fa-solid fa-people-group" title="Público Alvo" subtitle="Foco das intervenções" />
                 <div className="flex items-end gap-6 h-[200px] justify-center pb-4 border-b border-slate-50 w-full px-8 mt-8">
                    {publicData.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-3 w-1/3 group/bar h-full justify-end">
                            <div className="text-sm font-bold text-slate-700 opacity-0 group-hover/bar:opacity-100 transition-opacity -mb-1 transform translate-y-2 group-hover/bar:translate-y-0 duration-300">{item.value}%</div>
                            <div 
                                className="w-full rounded-t-xl relative transition-all duration-1000 ease-out hover:brightness-110 cursor-pointer shadow-md" 
                                style={{ height: `${item.value * 2.2}px`, backgroundColor: item.color }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-t-xl"></div>
                            </div>
                            <span className="text-[11px] text-slate-500 uppercase font-bold tracking-wide">{item.name}</span>
                        </div>
                    ))}
                 </div>
                 <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#0ea5e9]"></div> Principal</span>
                    <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#38bdf8]"></div> Secundário</span>
                 </div>
            </div>

            {/* Chart 8: Alcance por Ação */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group h-[380px]">
                <SectionTitle icon="fa-solid fa-users-viewfinder" title="Alcance por Ação" subtitle="Pessoas impactadas simultaneamente" />
                <ResponsiveContainer width="100%" height="70%">
                  <BarChart layout="vertical" data={reachData} margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 6}} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32} unit="%">
                      {reachData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList dataKey="value" position="right" style={{ fontSize: '11px', fill: '#64748b', fontWeight: 600 }} formatter={(val: number) => `${val}%`} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg text-xs font-semibold text-center w-fit mx-auto border border-orange-100">
                    Média estimada: ~450 pessoas impactadas
                </div>
            </div>
          </div>

          {/* Row 5: Badges & Counters */}
          <div className="grid md:grid-cols-2 gap-6">
             {/* Chart 9: Turma (Badges) */}
             <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group">
                <SectionTitle icon="fa-solid fa-chalkboard-user" title="Detalhamento por Turma" subtitle="Anos escolares com maior adesão" />
                
                <div className="flex gap-3 flex-wrap justify-center py-8">
                    <div className="px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition transform cursor-default">
                        <span className="block text-xs opacity-80 mb-0.5">Maior Alcance</span>
                        <span className="font-bold text-lg">9º Ano (35%)</span>
                    </div>
                    <div className="px-4 py-3 bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-200 hover:scale-105 transition transform cursor-default">
                        <span className="block text-xs opacity-80 mb-0.5">Ensino Médio</span>
                        <span className="font-bold text-lg">1º Ano (28%)</span>
                    </div>
                    <div className="px-4 py-3 bg-indigo-400 text-white rounded-xl shadow-md hover:scale-105 transition transform cursor-default flex items-center">
                        <span className="font-bold">6º Ano (26%)</span>
                    </div>
                    <div className="px-4 py-3 bg-indigo-400 text-white rounded-xl shadow-md hover:scale-105 transition transform cursor-default flex items-center">
                        <span className="font-bold">2º Médio (26%)</span>
                    </div>
                    <div className="px-4 py-3 bg-indigo-300 text-white rounded-xl shadow-md hover:scale-105 transition transform cursor-default flex items-center">
                        <span className="font-bold">3º Médio (23%)</span>
                    </div>
                </div>
             </div>

             {/* Chart 10: Reunião (Stat) */}
             <div className="bg-white rounded-3xl p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[100px] -mr-6 -mt-6"></div>
                <SectionTitle icon="fa-solid fa-handshake" title="Planejamento" subtitle="Reuniões institucionais prévias" />
                
                <div className="flex items-center justify-center gap-8 py-8 relative z-10">
                    <div className="text-center">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-teal-700 tracking-tighter">
                            <Counter target={19} />
                        </div>
                        <span className="text-xs uppercase text-teal-600 font-bold tracking-widest bg-teal-50 px-3 py-1 rounded-full mt-2 inline-block">Escolas</span>
                    </div>
                    <div className="h-16 w-px bg-slate-100"></div>
                    <div className="text-sm text-slate-500 max-w-[180px] leading-relaxed">
                        <strong className="text-slate-700 block mb-1">Passo Crucial</strong>
                        Realizaram reuniões de alinhamento antes das intervenções.
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SYNTHESIS (Dark BG) */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-psy-600/20 rounded-full blur-[128px]"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">Impacto Real</h2>
                    <p className="text-slate-400 font-light text-lg">Consolidado do Ciclo Junho - Dezembro 2025</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs uppercase tracking-widest text-white/80 font-semibold">Dados Atualizados</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                    { val: 20, label: "Escolas Atendidas", color: "text-psy-300" },
                    { val: 8, label: "Municípios", color: "text-emerald-300" },
                    { val: 82, label: "Intervenções", color: "text-violet-300" },
                    { val: 450, label: "Público Estimado", color: "text-amber-300" },
                ].map((stat, i) => (
                    <div key={i} className="p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/5 hover:bg-white/10 transition duration-300 group hover:-translate-y-1 hover:border-white/20 hover:shadow-2xl hover:shadow-psy-900/50">
                        <div className={`text-5xl font-bold ${stat.color} mb-2 tracking-tight`}><Counter target={stat.val} /></div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Detailed Stats Layout */}
            <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Main Themes Summary */}
                <div className="lg:col-span-2 bg-white text-slate-800 rounded-3xl p-10 shadow-2xl shadow-black/50 relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03]">
                        <i className="fa-solid fa-layer-group text-9xl text-slate-900"></i>
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-10 relative z-10 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-psy-600 flex items-center justify-center text-lg shadow-sm">
                            <i className="fa-solid fa-layer-group"></i>
                        </div>
                        Temáticas Recorrentes
                    </h3>
                    
                    <div className="space-y-8 relative z-10">
                       {themeData.slice(0, 4).map((item, index) => (
                           <div key={index} className="group relative">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-base font-bold text-slate-700 flex items-center gap-3">
                                        <i className={`fa-solid ${item.icon} text-slate-400 text-sm w-5`}></i>
                                        {item.name}
                                    </span>
                                    <span className="text-sm font-bold text-psy-600 bg-psy-50 px-2 py-0.5 rounded-md">{item.fullValue}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                    <div className="h-full rounded-full transition-all duration-[2000ms] ease-out relative group-hover:brightness-110" style={{width: `${item.fullValue}%`, backgroundColor: item.color}}>
                                    </div>
                                </div>
                           </div>
                       ))}
                    </div>
                </div>

                {/* Circular Stat (Donut) */}
                <div className="bg-[#005f8f] text-white rounded-3xl p-10 flex flex-col justify-between shadow-2xl shadow-black/50 relative overflow-hidden group border border-white/5">
                    
                    <h3 className="text-2xl font-serif font-bold relative z-10 mb-6 text-center">
                        Motivação da Ação
                    </h3>
                    
                    <div className="flex-1 flex flex-col items-center justify-center relative my-4">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={motivationData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                    startAngle={90}
                                    endAngle={-270}
                                    cornerRadius={10}
                                >
                                    {motivationData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-6xl font-bold tracking-tight text-white">71%</span>
                            <span className="text-xs uppercase tracking-widest text-white/80 mt-1 font-semibold">Preventiva</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 space-y-4 relative z-10 border-t border-white/10 pt-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-3 text-white/90 font-medium">
                                <div className="w-3 h-3 rounded-full bg-[#38bdf8]"></div> 
                                Preventiva
                            </span>
                            <span className="font-bold text-white">71%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                             <span className="flex items-center gap-3 text-white/60 font-medium">
                                <div className="w-3 h-3 rounded-full bg-white/20"></div> 
                                Emergencial
                            </span>
                            <span className="text-white/60">25.8%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </>
  );
};

export default Statistics;