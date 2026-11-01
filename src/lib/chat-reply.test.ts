import { describe, expect, it } from 'vitest';
import { isReplyMissing } from '@/src/lib/chat-reply';

const user = { role: 'user' };
const assistant = { role: 'assistant' };

describe('isReplyMissing', () => {
  it('is true when the request ended and the visitor got no reply', () => {
    expect(isReplyMissing([assistant, user], false)).toBe(true);
  });

  it('is false while the reply is loading', () => {
    expect(isReplyMissing([assistant, user], true)).toBe(false);
  });

  it('is false when the last message is a reply', () => {
    expect(isReplyMissing([assistant, user, assistant], false)).toBe(false);
  });
});
