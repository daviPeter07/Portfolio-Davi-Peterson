import { z } from 'zod';
import { defaultLocale, locales, type Locale } from '@/src/lib/i18n-config';

const MAX_USER_CHARS = 500;
const MAX_ASSISTANT_CHARS = 4000;
const MAX_MESSAGES = 200;
const RECENT_MESSAGES = 6;

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const messageSchema = z.discriminatedUnion('role', [
  z.object({
    role: z.literal('user'),
    content: z.string().trim().min(1).max(MAX_USER_CHARS),
  }),
  // O histórico vem do cliente: cortar em vez de rejeitar evita prender o visitante na conversa
  z.object({
    role: z.literal('assistant'),
    content: z
      .string()
      .trim()
      .transform((text) => text.slice(0, MAX_ASSISTANT_CHARS)),
  }),
]);

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(MAX_MESSAGES),
  locale: z.enum(locales).catch(defaultLocale),
});

export function parseChatRequest(
  body: unknown
): { messages: ChatMessage[]; locale: Locale } | null {
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return null;
  }

  const messages = parsed.data.messages.filter((message) => message.content.length > 0);

  if (messages.at(-1)?.role !== 'user') {
    return null;
  }

  return { messages: messages.slice(-RECENT_MESSAGES), locale: parsed.data.locale };
}

export function isAllowedOrigin(origin: string | null, host: string | null): boolean {
  if (!origin || !host) {
    return false;
  }

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}
