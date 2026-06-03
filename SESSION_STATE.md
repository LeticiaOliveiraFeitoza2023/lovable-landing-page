# SESSION STATE — Landing Page FeelFlow
**Última sessão:** 2026-06-02 (caderno criado)
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

## Pendências / Bloqueios
- Instalar **Meta Pixel** (precisa do ID com a Letícia).
- "**Finalizar o site**" — bloqueia, no CRM, a variante de follow-up COM link (regra D-019 do CRM: cold sem link; link só em follow-up pós-site).
- Cena Spline iceberg 3D no hero /v3.

## Regras (herdadas da marca)
- **ZERO travessões (—)** em qualquer texto visível.
- Processo comercial: LP capta → Letícia recebe o bastão (1º contato) → Felipe Rocha conduz.

## Próximos 3 itens prioritários
1. Instalar Meta Pixel (ID + snippet) e validar disparo de eventos.
2. Resolver o WIP de `Index.tsx` (commitar ou descartar).
3. Finalizar o site (destrava o follow-up com link no CRM).

## Comandos de retomada
```
cd ~/Desktop/Projetos/LandingPage_FeelFlow
npm install && npm run dev    # Vite
# produção: Vercel
```
