import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

// Bloco de inicialização de segurança para garantir a chave API
try {
  // @ts-ignore
  const viteKey = import.meta.env.LACOS_API_KEY;
  
  // @ts-ignore
  if (typeof process === 'undefined') {
    // @ts-ignore
    window.process = { env: { API_KEY: viteKey || '' } };
  } else {
    // @ts-ignore
    process.env = process.env || {};
    // @ts-ignore
    if (!process.env.API_KEY && viteKey) {
      // @ts-ignore
      process.env.API_KEY = viteKey;
    }
  }
} catch (e) {
  console.warn("Erro ao configurar variáveis de ambiente no chatService:", e);
}

const SYSTEM_PROMPT = `
Você é um assistente virtual especializado no projeto "Laços que Fortalecem", desenvolvido pela psicóloga escolar Kalyane Carvalho (CRP 17/7663) na 2ª DIREC.
Seu objetivo é responder dúvidas de forma cordial, acolhedora e informativa, com base nos dados reais do projeto.

DADOS GERAIS DO PROJETO:
- Nome: Projeto Preventivo "Laços que Fortalecem".
- Responsável: Kalyane Carvalho (Psicóloga Escolar).
- Contexto: Atuação na 2ª DIREC, Rio Grande do Norte.
- Período: Junho a Dezembro de 2025.
- Objetivo: Atuação preventiva e desmistificação do papel da psicologia na escola.

INDICADORES E RESULTADOS (2025):
- Escolas Atendidas: 20 das 41 escolas da rede.
- Municípios: 8 dos 12 da regional (Parnamirim, Goianinha, São José de Mipibu, Canguaretama, Arês, Vila Flor, Nísia Floresta, Baía Formosa).
- Intervenções: 82 ações.
- Maior Demanda: Setembro (19 ações).
- Público Estimado: 450+ pessoas.
- Público Principal: Alunos (71%), Funcionários (40%), Pais (25%).
- Motivação: 71% Preventiva.

TEMÁTICAS ABORDADAS:
1. Saúde Mental (68,3%)
2. Autocuidado (38,1%)
3. Comportamento Escolar (38,1%)
4. Ansiedade (23,8%)

URL: https://portfoliokalyane1.vercel.app/

DIRETRIZES:
1. Responda em português.
2. Use os dados percentuais para embasar respostas.
3. Destaque o caráter preventivo.
4. Contato: psicologakalyanecarvalho@gmail.com | Instagram: @kalyanecarvalho.psi
`;

export const sendMessageToApi = async (message: string): Promise<string> => {
  try {
    // Verificação final antes de chamar a API
    // @ts-ignore
    if (!process.env.API_KEY) {
      console.error("ERRO CRÍTICO: Chave da API não encontrada.");
      return "Erro de configuração: A chave da API não foi detectada. Verifique se LACOS_API_KEY está configurada no painel da Vercel.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    return response.text || "Não foi possível gerar uma resposta no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um problema técnico ao tentar responder. Tente novamente em alguns instantes.";
  }
};