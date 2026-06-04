# SESSION STATE — Landing Page FeelFlow
**Última sessão:** 2026-06-03 (parte 4 — pass de design: direção criativa + UX/A11y + plano aprovado, ver `DESIGN_PASS_PLAN.md`)
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
1. **Implementar Blocos 1+2** do `DESIGN_PASS_PLAN.md` na v2/3031: passada de contraste→AA + foco visível (Daniel+Fernanda) e padronizar rótulo do CTA + CTA persistente na nav (Laura+Fernanda). Quick wins aprovados.
2. **Bloco 3 — jornada tonal** (final luminoso + pico escuro no meio + variar layouts dos cards) — Valentina+Daniel+Fernanda.
3. **Bloco 4 — consolidação** (fundir Cenários/O que muda/O que construímos; stats com fonte ou reframe) com gate de conteúdo; depois **Bloco 5 — responsividade** → portar v2→repo real + deploy.

## Comandos de retomada
```
cd ~/Desktop/Projetos/LandingPage_FeelFlow
npm install && npm run dev    # Vite
# produção: Vercel
```
