import { createOpenAI } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText, type Attachment, type ToolInvocation } from 'ai';

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

type Locale = 'pt' | 'en' | 'es';
type Dictionary = typeof ptDict;
type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'function' | 'data' | 'tool';
  content: string;
  toolInvocations?: ToolInvocation[];
  experimental_attachments?: Attachment[];
};
type ChatRequestBody = {
  messages: ChatMessage[];
  locale?: Locale;
};

function normalizeMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    ...message,
    content: message.content.trim(),
  }));
}

function getDictionary(locale?: Locale): Dictionary {
  if (locale === 'en') {
    return enDict;
  }

  if (locale === 'es') {
    return esDict;
  }

  return ptDict;
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Failed to process request';
}

function getErrorStack(error: unknown) {
  if (error instanceof Error) {
    return error.stack;
  }

  return undefined;
}

export async function POST(req: Request) {
  try {
    const { messages, locale } = (await req.json()) as ChatRequestBody;
    const normalizedMessages = normalizeMessages(messages);

    // Limitar o histórico para não enviar a conversa inteira e não deixar a API lenta
    const recentMessages = normalizedMessages.slice(-6);

    // Selecionar o dicionário correto com base no idioma atual do usuário
    const dict = getDictionary(locale);

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
5. ENGANJAMENTO CONTÍNUO: Sempre termine sua resposta devolvendo uma pergunta amigável e instigante para o usuário, incentivando-o a continuar a conversa e descobrir mais sobre o Davi (Ex: "Gostaria de saber mais sobre esse projeto?", "Quer que eu liste as habilidades dele nisso?", "Tem curiosidade sobre a formação dele?").

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
      messages: convertToCoreMessages(recentMessages),
      temperature: 0.7,
    });

    // O TypeScript acusa erro nesta linha dizendo que toDataStreamResponse não existe,
    // sugerindo toTextStreamResponse. No entanto, toTextStreamResponse envia texto puro,
    // o que faz o useChat (frontend) travar. Apenas toDataStreamResponse empacota o stream
    // no formato correto para o useChat v1.x+.
    return result.toDataStreamResponse();
  } catch (error: unknown) {
    console.error('Error handling chat request:', error);
    return new Response(
      JSON.stringify({ error: getErrorMessage(error), stack: getErrorStack(error) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
