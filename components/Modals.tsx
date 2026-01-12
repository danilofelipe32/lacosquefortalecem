import React from 'react';

// Common overlay
const ModalOverlay: React.FC<{ onClick: () => void; transparent?: boolean }> = ({ onClick, transparent }) => (
  <div className={`absolute inset-0 ${transparent ? 'bg-black/90' : 'bg-slate-900/60 backdrop-blur-sm'} transition-opacity duration-300 z-40`} onClick={onClick}></div>
);

// --- Profile Modal ---
interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <ModalOverlay onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[85vh] overflow-y-auto custom-scrollbar transform transition-all duration-300 animate-fade-in-up z-50">
        <div className="h-32 bg-gradient-to-r from-psy-100 to-psy-50 sticky top-0 z-10">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/50 backdrop-blur-md rounded-full text-slate-600 hover:bg-white transition">
                <i className="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>
        <div className="px-8 pb-8 -mt-16 text-center">
            <img src="https://imgur.com/nIPT0Go.png" alt="Kalyane Carvalho" className="w-32 h-32 rounded-full border-[6px] border-white shadow-xl mx-auto object-cover bg-white relative z-20" />
            <div className="-mt-4 mb-4 relative z-20">
                <span className="inline-block bg-white text-psy-700 text-xs font-bold px-3 py-1 rounded-full shadow-md border border-psy-100">CRP: 17/7663</span>
            </div>
            <div>
                <h2 className="text-2xl font-serif font-bold text-slate-900">Kalyane Carvalho</h2>
                <p className="text-psy-600 font-medium">Psicóloga Escolar</p>
                <div className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 tracking-wide">2ª DIREC</div>
            </div>
            <p className="mt-6 text-sm text-slate-500 leading-relaxed px-1">
                Psicóloga escolar, com atuação também na clínica. Especialista em Psicologia Escolar e Educacional.
            </p>
            <div className="mt-8 space-y-3">
                <a href="mailto:psicologakalyanecarvalho@gmail.com" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition group text-left">
                    <div className="w-10 h-10 rounded-full bg-psy-50 text-psy-600 flex items-center justify-center group-hover:bg-psy-600 group-hover:text-white transition flex-shrink-0">
                        <i className="fa-regular fa-envelope"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-400 font-medium uppercase">Email</p>
                        <p className="text-xs font-semibold text-slate-700 break-all">psicologakalyanecarvalho@gmail.com</p>
                    </div>
                </a>
                <a href="https://instagram.com/kalyanecarvalho.psi" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition group text-left">
                    <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition flex-shrink-0">
                        <i className="fa-brands fa-instagram"></i>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 font-medium uppercase">Instagram</p>
                        <p className="text-sm font-semibold text-slate-700">@kalyanecarvalho.psi</p>
                    </div>
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Image Modal ---
interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}
export const ImageModal: React.FC<ImageModalProps> = ({ src, onClose }) => {
  if (!src) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <ModalOverlay onClick={onClose} transparent />
      <div className="relative max-w-7xl max-h-[95vh] w-auto h-auto flex justify-center items-center animate-fade-in-up z-50">
        <button onClick={onClose} className="absolute -top-10 right-0 z-50 text-white hover:text-psy-200 transition bg-black/20 rounded-full p-1 w-8 h-8 flex items-center justify-center">
            <i className="fa-solid fa-xmark text-lg"></i>
        </button>
        <img src={src} alt="Expanded" className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
      </div>
    </div>
  );
};

// --- Institution Modal ---
interface InstitutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const InstitutionModal: React.FC<InstitutionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const institutions = [
      { name: "EE Moreira Brandão", pct: "17,7%", count: 11, color: "blue" },
      { name: "EE P. Maria Araújo", pct: "9,7%", count: 6, color: "red" },
      { name: "EE Roberto R. Krause", pct: "9,7%", count: 6, color: "orange" },
      { name: "EE Fabrício Maranhão", pct: "8,1%", count: 5, color: "green" },
      { name: "EE Maria Cristina", pct: "8,1%", count: 5, color: "purple" },
      { name: "EE Arnaldo Arsênio", pct: "6,5%", count: 4, color: "yellow" },
      { name: "EE Francisco Barbosa", pct: "6,5%", count: 4, color: "cyan" },
      { name: "2ª DIREC", pct: "6,5%", count: 4, color: "pink" },
      { name: "EE Tancredo Neves", pct: "3,2%", count: 2, color: "slate" },
      { name: "CEEP Lurdinha Guerra", pct: "3,2%", count: 2, color: "slate" },
      { name: "EE Barão de Mipibu", pct: "3,2%", count: 2, color: "slate" },
      { name: "EE Jacumaúma", pct: "3,2%", count: 2, color: "slate" },
      { name: "EE Águida Sucupira", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE 4 de Março", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE Felipe Ferreira", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE de Emaús", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE Santos Dumont", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE P. Antonio Basílio", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE P. Apolinário Barbosa", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE Laranjeiras do Abdias", pct: "1,6%", count: 1, color: "slate" },
      { name: "EE Nísia Floresta", pct: "1,6%", count: 1, color: "slate" },
  ];
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
        <ModalOverlay onClick={onClose} />
        <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up z-50">
            <div className="bg-psy-50 p-6 border-b border-psy-100 flex justify-between items-center sticky top-0 z-10">
                <div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-3">
                        <i className="fa-solid fa-school text-psy-600"></i> Instituições Atendidas
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 ml-9">Total: 21 Instituições</p>
                </div>
                <button onClick={onClose} className="text-slate-400 hover:text-psy-600 transition bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    <i className="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-4">
                {institutions.map((inst, i) => (
                    <div key={i} className="group">
                        <div className="flex justify-between text-sm font-bold text-slate-700 mb-1 group-hover:text-psy-700 transition-colors">
                            <span>{i+1}. {inst.name}</span>
                            <span className={inst.color === 'slate' ? 'text-slate-500' : 'text-psy-600'}>{inst.pct} ({inst.count})</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3">
                            <div className={`bg-${inst.color === 'slate' ? 'slate-400' : inst.color + '-500'} h-3 rounded-full`} style={{width: inst.pct.replace(',','.')}}></div>
                        </div>
                    </div>
                ))}
                <div className="bg-slate-50 p-3 rounded-lg text-[10px] text-slate-500 mt-4 text-center">* Dados consolidados de 2025</div>
            </div>
        </div>
    </div>
  );
};

// --- Municipality Modal ---
interface MunicipalityModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const MunicipalityModal: React.FC<MunicipalityModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    const cities = [
        { name: "Parnamirim", pct: "49.2%", count: 30, color: "blue" },
        { name: "Goianinha", pct: "18%", count: 11, color: "green" },
        { name: "São José de Mipibu", pct: "11.5%", count: 7, color: "orange" },
        { name: "Canguaretama", pct: "11.5%", count: 7, color: "purple" },
        { name: "Arês", pct: "3.3%", count: 2, color: "slate" },
        { name: "Vila Flor", pct: "3.3%", count: 2, color: "slate" },
        { name: "Nísia Floresta", pct: "1.6%", count: 1, color: "slate" },
        { name: "Baía Formosa", pct: "1.6%", count: 1, color: "slate" },
    ];
    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <ModalOverlay onClick={onClose} />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col animate-fade-in-up z-50">
                 <div className="bg-psy-50 p-6 border-b border-psy-100 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900 flex items-center gap-3">
                            <i className="fa-solid fa-map-location-dot text-psy-600"></i> Municípios
                        </h3>
                         <p className="text-xs text-slate-500 mt-1 ml-9">Total: 8 Municípios</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-psy-600 transition bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                        <i className="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>
                <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-5">
                    {cities.map((city, i) => (
                        <div key={i} className="group">
                            <div className="flex justify-between text-sm font-bold text-slate-700 mb-1 group-hover:text-psy-700 transition-colors">
                                <span>{i+1}. {city.name}</span>
                                <span className={city.color === 'slate' ? 'text-slate-500' : 'text-psy-600'}>{city.pct} ({city.count})</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-4">
                                <div className={`bg-${city.color === 'slate' ? 'slate-400' : city.color + '-500'} h-4 rounded-full`} style={{width: city.pct.replace('%','') + '%'}}></div>
                            </div>
                        </div>
                    ))}
                    <div className="bg-slate-50 p-3 rounded-lg text-[10px] text-slate-500 mt-4 text-center">* 8 dos 12 municípios da 2ª DIREC</div>
                </div>
            </div>
        </div>
    );
};