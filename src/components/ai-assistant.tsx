'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import { useChat } from 'ai/react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/src/components/ui/dialog';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/src/components/ui/card';
import { useI18n } from '@/src/components/i18n-provider';

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const { dictionary, locale } = useI18n();
  const t = dictionary.aiAssistant;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
    body: { locale },
    onError: (err) => console.error("Chat Hook Error:", err),
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: t.botMessage,
      },
    ],
  });

  // Auto scroll para o final das mensagens
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Mostrar o botão apenas na primeira vez que o usuário interagir com a página
  useEffect(() => {
    let hasTriggered = false;

    const handleInteraction = () => {
      if (hasTriggered) return;
      hasTriggered = true;

      setIsVisible(true);
      setHasNotification(true);

      // Como o usuário acabou de interagir (clicar/tocar/digitar), o navegador PERMITE o som 100% das vezes!
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.6);
      } catch (e) {
        console.warn('Erro ao tocar áudio:', e);
      }

      // Remover ouvintes após o primeiro acionamento
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    // Escuta apenas por interações fortes que liberam o áudio
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    // Fallback: Se o usuário passar 10 segundos apenas lendo sem clicar em nada, mostra silenciosamente
    const fallbackTimer = setTimeout(() => {
      if (!hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
        setHasNotification(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
      <Dialog open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setHasNotification(false);
      }}>
        <DialogTrigger asChild>
          <Button
            className="h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 relative flex items-center justify-center p-0"
          >
            <Bot style={{ width: '32px', height: '32px' }} className="text-white" />
            {hasNotification && !isOpen && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-sm font-black text-white shadow-lg ring-4 ring-background animate-bounce">
                1
              </span>
            )}
          </Button>
        </DialogTrigger>

        <DialogContent 
          className="w-[95vw] max-w-[500px] h-[85vh] max-h-[700px] p-0 border-0 shadow-2xl rounded-2xl bg-background flex flex-col gap-0 outline-none overflow-hidden"
        >
          <DialogTitle className="sr-only">Chat com Davi AI</DialogTitle>
          <Card className="border-0 rounded-2xl overflow-hidden flex flex-col h-full shadow-none bg-transparent relative p-0 gap-0">
            
            <CardHeader className="bg-muted/50 border-b p-4 sm:p-5 relative z-10 m-0">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-tight text-foreground pr-8">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
                {t.title}
                <span className="text-[10px] sm:text-xs uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold ml-2">
                  {t.beta}
                </span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">
                {t.description}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-orange-500/10 border border-orange-500/20 text-xs sm:text-sm text-orange-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Respostas geradas por IA. Pode levar alguns segundos.
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-0 relative overflow-hidden flex flex-col m-0">
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 sm:p-4 rounded-2xl text-sm sm:text-base leading-relaxed max-w-[85%] sm:max-w-[80%] whitespace-pre-wrap ${
                      m.role === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                        : 'bg-muted border text-foreground rounded-tl-sm'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted border px-4 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex justify-center">
                    <div className="bg-destructive/10 text-destructive text-xs p-2 rounded-lg text-center max-w-[90%]">
                      Erro na conexão com a IA: {error.message || 'Falha ao enviar mensagem.'}
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            <CardFooter className="p-3 bg-background border-t relative z-10 m-0">
              <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <Input
                  type="text"
                  placeholder={t.placeholder}
                  value={input || ''}
                  onChange={(e) => handleInputChange && handleInputChange(e)}
                  className="flex-1 rounded-full bg-muted/50 border-transparent text-base sm:text-base py-5 sm:py-6"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading || !input?.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
            
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
