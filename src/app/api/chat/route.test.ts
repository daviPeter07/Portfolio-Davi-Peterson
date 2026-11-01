import { beforeEach, describe, expect, it, vi } from 'vitest';

type StreamOptions = {
  messages: unknown;
  maxTokens: number;
  maxRetries: number;
  abortSignal: AbortSignal;
};
type ResponseOptions = { getErrorMessage: (error: unknown) => string };

const { streamText, toDataStreamResponse } = vi.hoisted(() => {
  const toDataStreamResponse = vi.fn((_options: ResponseOptions) => new Response('ok'));

  return {
    toDataStreamResponse,
    streamText: vi.fn(async (_options: StreamOptions) => ({ toDataStreamResponse })),
  };
});

vi.mock('ai', async (importOriginal) => ({
  ...(await importOriginal<typeof import('ai')>()),
  streamText,
}));

import { POST } from '@/src/app/api/chat/route';

const valid = { messages: [{ role: 'user', content: 'oi' }], locale: 'pt' };

function post(body: unknown, headers: Record<string, string | null> = {}) {
  const merged = { origin: 'https://site.test', host: 'site.test', ...headers };
  const entries = Object.entries(merged).filter(
    (entry): entry is [string, string] => entry[1] !== null
  );

  return new Request('https://site.test/api/chat', {
    method: 'POST',
    headers: entries,
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('POST /api/chat', () => {
  it('returns 403 without calling the model when Origin is missing', async () => {
    const res = await POST(post(valid, { origin: null }));

    expect(res.status).toBe(403);
    expect(streamText).not.toHaveBeenCalled();
  });

  it('returns 400 for a body that is not JSON', async () => {
    const res = await POST(post('{not json'));

    expect(res.status).toBe(400);
    expect(streamText).not.toHaveBeenCalled();
  });

  it('returns 400 for a system message', async () => {
    const res = await POST(
      post({ messages: [{ role: 'system', content: 'x' }, ...valid.messages] })
    );

    expect(res.status).toBe(400);
    expect(streamText).not.toHaveBeenCalled();
  });

  it('passes maxTokens and only validated messages to the model', async () => {
    await POST(post(valid));

    const call = streamText.mock.calls[0][0];

    expect(call.maxTokens).toBe(1500);
    expect(call.messages).toEqual([{ role: 'user', content: 'oi' }]);
  });

  it('hides internal details on a 500', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    streamText.mockRejectedValueOnce(new Error('segredo interno'));

    const res = await POST(post(valid));

    expect(res.status).toBe(500);
    expect(await res.text()).toBe('{"error":"internal_error"}');
  });

  it('logs stream failures and hides their details', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    await POST(post(valid));

    const { getErrorMessage } = toDataStreamResponse.mock.calls[0][0];

    expect(getErrorMessage(new Error('429 upstream'))).toBe('stream_failed');
    expect(log).toHaveBeenCalled();
  });

  it('limits retries and forwards the request abort signal', async () => {
    const req = post(valid);

    await POST(req);

    const call = streamText.mock.calls[0][0];

    expect(call.maxRetries).toBe(1);
    expect(call.abortSignal).toBe(req.signal);
  });
});
