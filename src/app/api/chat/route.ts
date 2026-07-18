import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Base de dados local (importando do próprio portfólio)
import ptDict from '@/src/locales/pt.json';
import enDict from '@/src/locales/en.json';
import esDict from '@/src/locales/es.json';
import { projects } from '@/src/constants/projects';
import { frontendUI, backendAPIs, coreLanguages, dataDevOps } from '@/src/constants/technologies';

// Instância customizada apontando para o OpenRouter
const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json();
    console.log(`[Chat API] Received request - Locale: ${locale}, Messages: ${messages.length}`);

    // Limitar o histórico para não enviar a conversa inteira e não deixar a API lenta
    const recentMessages = messages.slice(-6);

    // Selecionar o dicionário correto com base no idioma atual do usuário
    let dict = ptDict;
    if (locale === 'en') dict = enDict as any;
    else if (locale === 'es') dict = esDict as any;

    // Serializando as tecnologias
    const techFrontend = frontendUI.map((t) => t.name).join(', ');
    const techBackend = backendAPIs.map((t) => t.name).join(', ');
    const techCore = coreLanguages.map((t) => t.name).join(', ');
    const techData = dataDevOps.map((t) => t.name).join(', ');

    // Serializando as experiências do dict selecionado
    const experiencesList = Object.values(dict.experience.items)
      .map(
        (exp) =>
          `- ${exp.title} (${exp.period}): ${exp.description}\n  Conquistas:\n  * ${exp.achievements.join('\n  * ')}`
      )
      .join('\n\n');

    // Serializando os projetos juntando o dict com as tecnologias do projects.ts
    const projectsList = projects
      .map((p) => {
        // Ignorar possíveis tipagens que não batam perfeitamente na hora de fazer o cast
        const localeData = (dict.projects.items as any)[p.id];
        if (!localeData) return '';
        return `- ${localeData.title}: ${localeData.description}\n  Tecnologias: ${p.technologies.join(', ')}\n  Link: ${p.demo || p.code || 'Privado'}`;
      })
      .filter(Boolean)
      .join('\n\n');

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
INFORMAÇÕES PESSOAIS (Revelar APENAS se perguntarem):
- Idade: 19 anos (Aniversário: 12 de outubro).
- Relacionamento: Namora com a Alice.
- Time do coração: Corinthians.
- Bebida favorita: Monster branco (energético).

RESUMO TÉCNICO DAS HABILIDADES DO DAVI:
- Frontend: ${techFrontend}
- Backend: ${techBackend}
- Core Languages: ${techCore}
- Data & DevOps: ${techData}

HISTÓRICO PROFISSIONAL (Do mais antigo para o mais recente / atual):
${experiencesList}

PROJETOS DE DESTAQUE NO PORTFÓLIO:
${projectsList}`;

    const result = await streamText({
      model: openrouter(process.env.OPENROUTER_MODEL || 'openrouter/free'),
      system: systemPrompt,
      messages: recentMessages,
      temperature: 0.7,
    });

    // O TypeScript acusa erro nesta linha dizendo que toDataStreamResponse não existe, 
    // sugerindo toTextStreamResponse. No entanto, toTextStreamResponse envia texto puro, 
    // o que faz o useChat (frontend) travar. Apenas toDataStreamResponse empacota o stream 
    // no formato correto para o useChat v1.x+.
    return (result as any).toDataStreamResponse();
  } catch (error: any) {
    console.error('Error handling chat request:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to process request', stack: error.stack }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
