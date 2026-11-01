export function isReplyMissing(messages: { role: string }[], isLoading: boolean): boolean {
  return !isLoading && messages.at(-1)?.role === 'user';
}
