'use client';

import { Accessibility, Gauge, GitPullRequest, Layers3 } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div
          data-reveal
          className="transition-all duration-1000 opacity-0 translate-y-10 data-[revealed=true]:opacity-100 data-[revealed=true]:translate-y-0"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Sobre <span className="text-primary">Mim</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Desenvolvedor de Software Júnior com 2 anos de experiência no ecossistema JavaScript
                e TypeScript. Gosto de construir aplicações web que sejam rápidas, bem resolvidas e
                agradáveis de usar no dia a dia.
              </p>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Atualmente curso Análise e Desenvolvimento de Sistemas na UniNorte e venho atuando
                em projetos como CRM, landing pages e plataformas web, sempre com atenção à
                organização do código, manutenção e escalabilidade do produto. Recentemente tenho
                aprofundado meus estudos no ecossistema Laravel para ampliar minha base no
                desenvolvimento full stack.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">Júnior</div>
                  <div className="text-sm text-muted-foreground">Senioridade atual</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">2+</div>
                  <div className="text-sm text-muted-foreground">Anos de experiência</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <Gauge className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Performance</h3>
                <p className="text-sm text-muted-foreground">
                  Desenvolvimento com foco em fluidez, otimização e experiência consistente.
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <Accessibility className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Acessibilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Interfaces mais inclusivas e preparadas para uma melhor experiência de uso.
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <Layers3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Escalabilidade</h3>
                <p className="text-sm text-muted-foreground">
                  Código pensado para manutenção, evolução do produto e trabalho em equipe.
                </p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow">
                <GitPullRequest className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Colaboração</h3>
                <p className="text-sm text-muted-foreground">
                  Experiência com PRs, comunicação clara e alinhamento entre código e negócio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
