import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/src/app/api/chat/route';

vi.mock('@/src/lib/github-repos', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@/src/lib/github-repos')>()),
  getGithubRepos: async () => [],
}));

const baseChunk = { id: '1', created: 1, model: 'test/model', object: 'chat.completion.chunk' };

function sse(chunks: unknown[]) {
  const body = chunks.map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`).join('');

  return new Response(`${body}data: [DONE]\n\n`, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}

function send() {
  return POST(
    new Request('https://site.test/api/chat', {
      method: 'POST',
      headers: { origin: 'https://site.test', host: 'site.test' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'segredo do visitante' }] }),
    })
  );
}

beforeEach(() => {
  vi.stubEnv('OPENAI_API_KEY', 'test-key');
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('POST /api/chat with the real provider', () => {
  it('logs the error chunk OpenRouter sends mid-stream', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        sse([
          {
            ...baseChunk,
            error: { code: 429, message: 'Rate limited' },
            choices: [{ index: 0, delta: { content: '' }, finish_reason: 'error' }],
          },
        ])
      )
    );

    await (await send()).text();

    expect(log).toHaveBeenCalledWith('Chat reply ended abnormally', {
      finishReason: 'unknown',
      textLength: 0,
    });
  });

  it('does not log a normal reply', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        sse([
          { ...baseChunk, choices: [{ index: 0, delta: { content: 'Olá' } }] },
          { ...baseChunk, choices: [{ index: 0, delta: {}, finish_reason: 'stop' }] },
        ])
      )
    );

    await (await send()).text();

    expect(log).not.toHaveBeenCalled();
  });

  it('never logs visitor text from a refused call', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({
              error: {
                code: 403,
                message: 'moderation',
                metadata: { flagged_input: 'segredo do visitante' },
              },
            }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          )
      )
    );

    const res = await send();
    await res.text();

    const logged = JSON.stringify(log.mock.calls.map((call) => call.map(String)));
    const loggedRaw = log.mock.calls
      .flat()
      .map((value) => JSON.stringify(value, Object.getOwnPropertyNames(value ?? {})))
      .join(' ');

    expect(fetch).toHaveBeenCalled();
    expect(log).toHaveBeenCalled();
    expect(`${logged} ${loggedRaw}`).not.toContain('segredo do visitante');
  });
});
