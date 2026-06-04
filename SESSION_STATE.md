# SESSION STATE — Landing Page FeelFlow
**Última sessão:** 2026-06-04 (refinamentos de Letícia + elevação de UI na v2; ver `DESIGN_PASS_PLAN.md`)
**Repo:** `feelflow-solutions/feelflow-landing` · **Local:** `~/Desktop/Projetos/LandingPage_FeelFlow`

> Caderno de continuidade da LP (frente SEPARADA do CRM). Compacto, 1 página.
> Atualizar no fim de cada sessão; ler no começo da próxima.
> Índice geral das frentes: `feelflow-os/crm/knowledge/FRONTS_INDEX.md`.

## O que é
Landing Page de aquisição da FeelFlow ("Marketing de Desejo"). SPA Vite + React + shadcn/ui + TypeScript, deploy na Vercel. Fluxo: LP → **Mergulho Operacional** (formulário de qualificação) → CRM.

## Stack
- Vite 5 + React 18 + shadcn/ui + TypeScript. `react-router-dom` (BrowserRouter).
- Deploy: Vercel (`vercel.json`). Analytics: `src/lib/analytics.ts` (`trackEvent`, GA4/GTM).

## Rotas (`src/App.tsx`)
- `/` → `IndexDesejo` (LP principal, "Marketing de Desejo")
- `/v1` → `Index` (versão antiga)
- `/v3` → `IndexDark` (hero escuro / iceberg)
- `/mergulho` → `Mergulho` (formulário de qualificação)
- `/privacidade` → `Privacidade` (LGPD)
- `*` → `NotFound`

## Integração com o CRM
- Form do Mergulho faz **POST `${CRM_API}/api/leads/mergulho`** (`src/pages/Mergulho.tsx`) → cria lead no CRM com lead scoring.
- Campos: empresa, segmento, funcionários, desafio, urgência, investimento, contato.
- **Este é o ponto de integração LP → CRM.** O resultado (lead) sobrevive no CRM.

## Estado atual / Tracking
- ✅ **GA4 instalado e ativo:** `G-6ST3X5DCV5` (em `index.html`). *(Corrige suposição antiga do PMO do CRM que dizia "GA4 pendente".)*
- ✅ OG tags, Política de Privacidade LGPD (`/privacidade`), conversion tracking nos CTAs (`analytics.ts`).
- 🔴 **Meta Pixel: NÃO instalado** (só GA4 no index.html). Falta o ID + snippet `fbq`.
- 🟠 **Spline iceberg 3D (hero /v3):** pendente (responsável Daniel — item no PMO do CRM).
- 🔄 **WIP não commitado:** `src/pages/Index.tsx` modificado (alguém mexendo — verificar antes de commitar).

## Trilha B — LP no desejo (sessão 2026-06-03) ⭐
- Trabalhada numa **cópia duplicada**: `~/Desktop/Projetos/LandingPage_FeelFlow_v2`, porta **3031**, sem `.git`, node_modules próprio via `bun`. Original intacta (3030). **Sem deploy** (decisão D-005).
- **Copy revisada nas 7 seções** (Ana→Gabriela→aprovação Letícia→Fernanda), aplicando o Sistema de Mensagem (P0): Hero (promessa + sub + microcopy), Sinais (reescrita nos pilares + ponte), O que muda (4 linhas refinadas), Solução/O que construímos (reescrita + card "Clareza pra decidir"), Etapas (label "Como começa", card 3 enxuto), FAQ (Q1 espelho + "Quanto custa?"), CTA final (subtexto no desejo).
- Naming corrigido: "Mergulho Operacional™" do diagnóstico grátis → "diagnóstico" (nome Mergulho Operacional fica só pra oferta paga). `<title>`/OG atualizados.
- **Fonte da copy:** `feelflow-os/crm/knowledge/strategy/2026-06-03-A-sistema-de-mensagem.md` (Message House).
- **Próxima frente (antes do deploy):** pass de Direção Criativa (Valentina) + UX (Laura) + UI (Daniel) + Acessibilidade (Laura+Lucas Matos) + Responsividade (Fernanda+Daniel), coord. Rodrigo. Rodar na própria v2/3031.
- **Como rodar a v2:** `cd ~/Desktop/Projetos/LandingPage_FeelFlow_v2 && ./node_modules/.bin/vite --port 3031 --strictPort` (cacheDir próprio `.vite-cache-v2`).

## Pendências / Bloqueios
- Instalar **Meta Pixel** (precisa do ID com a Letícia).
- "**Finalizar o site**" — bloqueia, no CRM, a variante de follow-up COM link (regra D-019 do CRM: cold sem link; link só em follow-up pós-site).
- Cena Spline iceberg 3D no hero /v3.

## Regras (herdadas da marca)
- **ZERO travessões (—)** em qualquer texto visível.
- Processo comercial: LP capta → Letícia recebe o bastão (1º contato) → Felipe Rocha conduz.

## Próximos 3 itens prioritários
1. **Revisão final de Letícia** da página inteira (hard-refresh na 3031) — UI elevada nas 5 seções; apontar o que ainda pedir ajuste.
2. **Bloco 5 — responsividade (mobile)** na v2/3031 (hero scroll-driven, bentos, touch targets, breakpoints) — ainda **NÃO feito**, é o que falta antes do deploy.
3. **Trocar o número do WhatsApp** (placeholder `wa.me/5500000000000`) + Meta Pixel ID; depois **portar v2 → repo real + deploy** (gate).

## Blocos 1-4 do design pass — FEITOS na v2 (2026-06-03, sem deploy)
- **B1 a11y:** contraste→AA (token `--ink-soft` escurecido p/ 220 13% 36%; labels mono pequenos em opacidade cheia); `:focus-visible` de alto contraste na `index.css`.
- **B2 consistência:** CTA único "Fazer o diagnóstico" (todos); CTA persistente na nav (surge ao rolar).
- **B3 jornada tonal:** Solução virou escura (mergulho) e CTA final virou claro/luminoso (fluxo). Stats segue escura.
- **B4 consolidação:** removida a seção "Cenários" (−1,6 viewports → ~16); mini-gráfico resgatado no header de "O que muda" (2 colunas); stats sem número → Clareza/Leveza/Comando.
- **Extra:** Solução com layout 3-colunas da stats → Mergulho · Estrutura · Fluxo.

## Refinamentos + Elevação de UI (sessão 2026-06-04) — na v2, sem deploy
Após os Blocos 1-4, Letícia fez várias rodadas de ajuste fino e o time elevou a UI. Feitos:
- **Reestruturação do miolo (Valentina):** cortada a stats redundante "O que a estrutura muda"; "O que fazemos" (escuro/mergulho) movido pra logo após Sinais; narrativa de 6 batidas. Página ~12,5 viewports.
- **Hero:** imagem pra direita (object-position invertido) + headline 3 linhas + **tudo bold** (sem serif-italic); alinhamento global em 40px (nav+hero+seções); microcopy "Online • Rápido • Sem burocracia".
- **Rodapé** integrado (sem borda dura, compacto, logo+links simétrico à nav, © fora do float).
- **WhatsApp flutuante** discreto branded (matcha, logo do Zap) — ⚠️ **número placeholder, trocar pelo real**.
- **FAQ** em 2 colunas (título fixo à esquerda + accordion à direita) — Letícia amou, virou referência de tratamento.
- **Elevação de UI (Daniel)** — matcha como acento estratégico, cards variados, ícones em chip:
  - Sinais → 2 colunas + 6 sinais com ícone em chip matcha.
  - Como começa → número grande matcha + frase final em 3 selos com check.
  - O que construímos → **Portal do Cliente** (não OS interno): header tintado, progresso+milestones, doc "Para aprovar", msg da equipe; sem nome fictício. Quote repetitiva cortada.
  - O que muda → **transformação do dono** (Seu dia/papel/cabeça/tempo) em cards com ícone (sol/pessoa/lâmpada/relógio); removido o "antes".
  - CTA final → motivo abstrato de correnteza + 2º glow (premium com vida).
- **Aprendizado técnico:** pra screenshot das seções de baixo, neutralizar via JS a dobra sticky de 240vh do hero (senão o scroll-jacking captura o hero). O 240vh do hero é tema de UX a revisar no mobile (Bloco 5).

## Comandos de retomada
```
cd ~/Desktop/Projetos/LandingPage_FeelFlow_v2
./node_modules/.bin/vite --port 3031 --strictPort   # a v2 (cópia de trabalho, sem deploy)
# original: ~/Desktop/Projetos/LandingPage_FeelFlow (npm run dev)
```
