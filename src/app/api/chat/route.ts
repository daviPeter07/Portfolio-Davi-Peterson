import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Base de dados local (importando do próprio portfólio)
import ptDict from '@/src/locales/pt.json';
import enDict from '@/src/locales/en.json';
import esDict from '@/src/locales/es.json';

// Importando as "Skills" e bases de conhecimento da IA
import { personalInfo } from '@/src/ai-skills/personal';
import { githubInfo } from '@/src/ai-skills/github';
import { getResumeInfo } from '@/src/ai-skills/resume';

// Instância customizada apontando para o OpenRouter
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

type ChatMessage = {
  role?: string;
  content?: unknown;
  [key: string]: unknown;
};

function normalizeMessageContent(content: unknown) {
  if (typeof content === 'string') {
    return content.trim();
  }

  return content;
}

function normalizeMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    ...message,
    content: normalizeMessageContent(message.content),
  }));
}

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json();
    const normalizedMessages = normalizeMessages(messages);

    // Limitar o histórico para não enviar a conversa inteira e não deixar a API lenta
    const recentMessages = normalizedMessages.slice(-6);

    // Selecionar o dicionário correto com base no idioma atual do usuário
    let dict = ptDict;
    if (locale === 'en') dict = enDict as any;
    else if (locale === 'es') dict = esDict as any;

    // Processar o currículo com base no idioma atual
    const resumeInfo = getResumeInfo(dict);

    const systemPrompt = `### IDENTITY AND ROLE ###
Você é o assistente virtual oficial do portfólio do Davi Peterson. 
Sua função é fornecer respostas extremamente curtas e precisas sobre o Davi, agindo como um colega de equipe ajudando um recrutador.

### TONE AND PERSONALITY ###
- Amigável, humilde, rápido e muito objetivo.
- Fale de si mesmo na primeira pessoa ("Eu sou o assistente...").
- Fale do Davi SEMPRE na terceira pessoa ("O Davi é desenvolvedor...").

### STRICT RULES ###
1. MAXIMO DE 2 FRASES POR RESPOSTA. Esta é uma regra absoluta.
2. NUNCA liste projetos, habilidades ou informações pessoais a menos que o usuário pergunte especificamente por isso.
3. Se o usuário mandar apenas uma saudação ("Oi", "Tudo bem?", "Olá"), NÃO faça resumos do Davi. Responda apenas com uma saudação amigável.
4. Responda no idioma que o usuário usar.

### EXAMPLES (FEW-SHOT) ###
User: Oi
Assistant: Olá! Tudo bem? Como posso te ajudar a conhecer o trabalho do Davi?
User: Tudo bem com vc ???
Assistant: Tudo ótimo por aqui! O que você gostaria de saber sobre as experiências do Davi?
User: O que o Davi sabe de frontend?
Assistant: O Davi é focado em React, Next.js e TailwindCSS para criar interfaces modernas. Posso te falar sobre os projetos dele com essas ferramentas, se quiser.

### CONTEXT (DAVI'S DATA) ###
${personalInfo}

${githubInfo}

${resumeInfo}`;

    const result = await streamText({
      model: openrouter(process.env.OPENROUTER_MODEL || 'openrouter/free'),
      system: systemPrompt,
      messages: recentMessages as any,
      temperature: 0.7,
    } as any);

    // O TypeScript acusa erro nesta linha dizendo que toDataStreamResponse não existe,
    // sugerindo toTextStreamResponse. No entanto, toTextStreamResponse envia texto puro,
    // o que faz o useChat (frontend) travar. Apenas toDataStreamResponse empacota o stream
    // no formato correto para o useChat v1.x+.
    return (result as any).toDataStreamResponse();
  } catch (error: any) {
    console.error('Error handling chat request:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to process request', stack: error.stack }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
