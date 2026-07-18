'use client';

import { useState } from 'react';
import { Bot, Send } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/src/components/ui/card';
import { useI18n } from '@/src/components/i18n-provider';

export function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { dictionary } = useI18n();
  const t = dictionary.aiAssistant;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="size-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </PopoverTrigger>

        <PopoverContent side="top" align="end" className="w-[320px] sm:w-[380px] p-0 border-0 shadow-2xl rounded-2xl mb-4 bg-background">
          <Card className="border rounded-2xl overflow-hidden flex flex-col h-[450px] shadow-none bg-transparent relative p-0 gap-0">
            
            <CardHeader className="bg-muted/50 border-b p-4 relative z-10 m-0">
              <CardTitle className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
                <Bot className="h-5 w-5" />
                {t.title}
                <span className="text-[10px] uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold ml-auto">
                  {t.beta}
                </span>
              </CardTitle>
              <p className="text-xs text-muted-foreground font-medium mt-1">
                {t.description}
              </p>
            </CardHeader>

            <CardContent className="flex-1 p-0 relative overflow-hidden flex flex-col m-0">
              
              {/* Overlay Em Breve */}
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-[2px]">
                <span className="text-xl font-bold tracking-widest text-foreground uppercase">
                  {t.comingSoon}
                </span>
              </div>

              {/* Chat Fake (Opaque/Blurred Background) */}
              <div className="flex-1 p-4 opacity-30 select-none pointer-events-none flex flex-col gap-4">
                <div className="flex justify-start">
                  <div className="bg-muted border p-3 rounded-2xl rounded-tl-sm text-sm max-w-[85%] text-foreground">
                    {t.botMessage}
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%]">
                    {t.userMessage}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-3 bg-background border-t relative z-10 opacity-50 pointer-events-none m-0">
              <div className="flex w-full items-center gap-2">
                <Input
                  type="text"
                  placeholder={t.placeholder}
                  className="flex-1 rounded-full bg-muted/50 border-transparent"
                  readOnly
                />
                <Button size="icon" className="rounded-full shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
            
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
