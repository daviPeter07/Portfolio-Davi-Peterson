import { describe, expect, it } from 'vitest';
import { isAllowedOrigin, parseChatRequest } from '@/src/lib/chat-request';

const user = (content: string) => ({ role: 'user', content });
const assistant = (content: string) => ({ role: 'assistant', content });

describe('parseChatRequest', () => {
  it('rejects a system message', () => {
    expect(
      parseChatRequest({ messages: [{ role: 'system', content: 'x' }, user('oi')] })
    ).toBeNull();
  });

  it('rejects non-string content', () => {
    expect(parseChatRequest({ messages: [{ role: 'user', content: 123 }] })).toBeNull();
  });

  it('drops attachments and unknown fields', () => {
    const parsed = parseChatRequest({
      messages: [
        { ...user('oi'), id: '1', experimental_attachments: [{ url: 'https://x.y/a.png' }] },
      ],
    });

    expect(parsed?.messages).toEqual([user('oi')]);
  });

  it('rejects a user message over 500 characters after trimming', () => {
    expect(parseChatRequest({ messages: [user('a'.repeat(501))] })).toBeNull();
    expect(parseChatRequest({ messages: [user(`  ${'a'.repeat(500)}  `)] })).not.toBeNull();
  });

  it('rejects a blank user message', () => {
    expect(parseChatRequest({ messages: [user('   ')] })).toBeNull();
  });

  it('rejects a conversation that does not end with the user', () => {
    expect(parseChatRequest({ messages: [user('oi'), assistant('olá')] })).toBeNull();
  });

  it('rejects more than 200 messages', () => {
    expect(parseChatRequest({ messages: Array(201).fill(user('oi')) })).toBeNull();
  });

  it('removes empty assistant messages instead of rejecting', () => {
    const parsed = parseChatRequest({ messages: [user('oi'), assistant('  '), user('tudo bem?')] });

    expect(parsed?.messages).toEqual([user('oi'), user('tudo bem?')]);
  });

  it('truncates long assistant messages to 4000 characters', () => {
    const parsed = parseChatRequest({ messages: [assistant('a'.repeat(5000)), user('oi')] });

    expect(parsed?.messages[0].content).toHaveLength(4000);
  });

  it('keeps only the last 6 messages', () => {
    const messages = Array.from({ length: 9 }, (_, i) => user(`m${i}`));

    expect(parseChatRequest({ messages })?.messages.map((m) => m.content)).toEqual([
      'm3',
      'm4',
      'm5',
      'm6',
      'm7',
      'm8',
    ]);
  });

  it('falls back to the default locale', () => {
    expect(parseChatRequest({ messages: [user('oi')], locale: 'fr' })?.locale).toBe('pt');
    expect(parseChatRequest({ messages: [user('oi')] })?.locale).toBe('pt');
    expect(parseChatRequest({ messages: [user('oi')], locale: 'en' })?.locale).toBe('en');
  });

  it('rejects a body that is not an object', () => {
    expect(parseChatRequest(null)).toBeNull();
  });
});

describe('isAllowedOrigin', () => {
  it('allows only a matching origin', () => {
    expect(isAllowedOrigin('https://davi-peterson.vercel.app', 'davi-peterson.vercel.app')).toBe(
      true
    );
    expect(isAllowedOrigin('http://localhost:3000', 'localhost:3000')).toBe(true);
    expect(isAllowedOrigin('https://evil.example', 'davi-peterson.vercel.app')).toBe(false);
    expect(isAllowedOrigin(null, 'davi-peterson.vercel.app')).toBe(false);
    expect(isAllowedOrigin('https://davi-peterson.vercel.app', null)).toBe(false);
    expect(isAllowedOrigin('not a url', 'davi-peterson.vercel.app')).toBe(false);
  });
});
