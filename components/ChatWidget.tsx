import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToApi } from '../services/chatService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente virtual do projeto <strong>Laços que Fortalecem</strong>. Estou aqui para responder suas dúvidas sobre a atuação da psicologia escolar na 2ª DIREC. Como posso ajudar?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [showIcebreakers, setShowIcebreakers] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const icebreakers = [
    "Quais são os objetivos do projeto?",
    "Quais escolas foram atendidas?",
    "Como foi a metodologia utilizada?",
    "Quais foram os resultados alcançados?"
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if(isOpen) {
        inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setLoading(true);
    setShowIcebreakers(false);

    const reply = await sendMessageToApi(userMsg);
    
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleIcebreakerClick = (question: string) => {
    setInputValue(question);
    setShowIcebreakers(false);
    // Submit logically by creating a synthetic event or just calling logic
    setMessages(prev => [...prev, { role: 'user', content: question }]);
    setLoading(true);
    sendMessageToApi(question).then(reply => {
        setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        setLoading(false);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === '/') {
        setShowIcebreakers(true);
    } else {
        setShowIcebreakers(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div className={`bg-white w-80 sm:w-96 h-[500px] max-h-[80vh] rounded-2xl shadow-2xl border border-slate-100 mb-4 flex flex-col transition-all duration-300 origin-bottom-right pointer-events-auto ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 hidden'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-psy-600 to-psy-500 p-4 rounded-t-2xl flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h4 className="font-bold text-sm">Assistente Virtual</h4>
              <p className="text-[10px] opacity-80">Laços que Fortalecem</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-6 h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition">
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 custom-scrollbar text-sm">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
               {msg.role !== 'user' && (
                 <div className="w-8 h-8 rounded-full bg-psy-100 text-psy-600 flex items-center justify-center flex-shrink-0 border border-psy-200">
                    <i className="fa-solid fa-robot text-xs"></i>
                 </div>
               )}
               <div className={`${msg.role === 'user' ? 'bg-psy-600 text-white rounded-tr-none' : 'bg-white text-slate-600 rounded-tl-none border border-slate-100'} p-3 rounded-2xl shadow-sm max-w-[85%] chat-message`}>
                  {msg.role === 'user' ? <p>{msg.content}</p> : <div dangerouslySetInnerHTML={{ __html: msg.content }} />}
               </div>
               {msg.role === 'user' && (
                 <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 border border-slate-300">
                    <i className="fa-regular fa-user text-xs"></i>
                 </div>
               )}
            </div>
          ))}
          {loading && (
             <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-psy-100 text-psy-600 flex items-center justify-center flex-shrink-0 border border-psy-200">
                    <i className="fa-solid fa-robot text-xs"></i>
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-1 items-center h-10">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full typing-dot"></div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 rounded-b-2xl relative">
            {showIcebreakers && (
                <div className="absolute bottom-full left-0 w-full bg-white border-t border-slate-100 shadow-sm p-2 flex flex-col gap-2 rounded-t-xl z-10 max-h-48 overflow-y-auto custom-scrollbar animate-fade-in-up">
                    {icebreakers.map((q, i) => (
                        <button key={i} onClick={() => handleIcebreakerClick(q)} className="text-left text-sm text-slate-600 hover:bg-psy-50 hover:text-psy-600 p-2 rounded-lg transition w-full">
                            {q}
                        </button>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                    ref={inputRef}
                    type="text" 
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Digite sua pergunta (ou / para sugestões)..." 
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-psy-400 focus:ring-1 focus:ring-psy-400 transition" 
                    disabled={loading}
                    autoComplete="off"
                />
                <button type="submit" disabled={loading} className="bg-psy-600 text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-psy-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                    <i className="fa-solid fa-paper-plane text-xs"></i>
                </button>
            </form>
            <div className="text-[10px] text-center text-slate-400 mt-2">
                IA treinada com documentos do projeto
            </div>
        </div>

      </div>

      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="bg-psy-600 hover:bg-psy-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group pointer-events-auto relative"
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-message'} text-xl`}></i>
        {!isOpen && <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white flex items-center justify-center animate-bounce">1</span>}
      </button>
    </div>
  );
};

export default ChatWidget;