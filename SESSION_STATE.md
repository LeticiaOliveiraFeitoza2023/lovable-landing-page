# SESSION STATE — Landing Page FeelFlow
**Última sessão:** 2026-06-12 (Bloco 5 mobile + **deploy do design pass B1-B5 em produção** + WhatsApp oficial)
**Repo:** `feelflow-solutions/feelflow-landing` · **Local:** `~/Desktop/Projetos/LandingPage_FeelFlow`
**Commit:** `aac3a0a` · **Deploy Vercel:** `dpl_3okQajD…` READY (produção)

> Caderno de continuidade da LP (frente SEPARADA do CRM). Compacto, 1 página.
> Índice geral das frentes: `feelflow-os/crm/knowledge/FRONTS_INDEX.md`.

## O que é
Landing Page de aquisição da FeelFlow ("Marketing de Desejo"). SPA Vite + React + shadcn/ui + TS, deploy Vercel. Funil: LP → **Mergulho** (`/mergulho`, qualificação) → POST `${CRM_API}/api/leads/mergulho` → lead no CRM.

## 🎉 Marco desta sessão — design pass NO AR
A LP que vivia só na cópia v2 foi **portada pro repo real e deployada**. `feelflow.com.br` agora serve a versão nova (Sistema de Mensagem P0), responsiva e premium. Verificado ao vivo (375/390/320px), console limpo.
- **Bloco 5 (mobile) ✅:** touch targets ≥44px (nav CTA, logo/links rodapé), `scroll-margin-top: 88px` nos `[id]`, WhatsApp float com `safe-area-inset` + recolhe no rodapé, **sem overflow a 375 e 320px**. Hero `240vh` é `lg:` (desktop) → no mobile é `sticky h-100svh` limpo.
- **Design pass B1-B4 + elevação de UI:** já estavam feitos na v2; agora em produção.
- **WhatsApp oficial:** `wa.me/551153048305` (era placeholder).
- Só `IndexDesejo.tsx`, `index.css`, `index.html` mudaram (diff limpo). `public/` idêntico.

## Rotas (`src/App.tsx`)
`/` → IndexDesejo (principal) · `/v1` → Index (antiga) · `/v3` → IndexDark · `/mergulho` · `/privacidade` · `*` → NotFound

## Estado / Tracking
- ✅ **GA4 ativo:** `G-6ST3X5DCV5` (index.html) + `trackEvent` (analytics.ts) nos CTAs.
- ⏸️ **Meta Pixel: ADIADO (D-006).** Bloqueio: Meta exige **Portfólio Empresarial** antes de criar pixel. Só necessário com mídia paga (não é o estágio atual). Retomar quando ligar tráfego pago. Ver [[project-meta-pixel-deferred]] na memória.
- 🟠 **WIP `/v1` (`src/pages/Index.tsx`) não-commitado:** alguém portando bentos pra página antiga. **Preservado, fora do deploy.** Verificar antes de commitar.

## Regras (marca)
- **ZERO travessões (—)** em texto visível. Cold sem link; link só em follow-up pós-site (D-004 / D-019 do CRM).
- Copy passa por Ana → Gabriela → gate Letícia → Fernanda → verificação (D-005).

## Build / Deploy — ⚠️ gotcha
- **`vite build` local TRAVA** (0% CPU em "transforming…") — `~/Desktop` é iCloud. Verificar via dev server + `tsc`, e **deixar a Vercel buildar** (Linux, sem iCloud — é o build autoritativo). Ver [[reference-lp-build-icloud]].
- `git push origin main` publica nos 2 repos (lovable + feelflow-solutions) e dispara a Vercel. Projeto `feelflow-landing` / team `team_BgRXApDAgipbyhhEj9yHIb5d`.

## Próximos itens
1. **Revisão da Letícia em produção** (`feelflow.com.br` no celular) — apontar ajustes finos, se houver.
2. **Meta Pixel** — só quando for ligar mídia paga (criar Portfólio Empresarial primeiro).
3. **Decidir o WIP `/v1`** — commitar (terminar os bentos) ou descartar.

## Comandos de retomada
```
cd ~/Desktop/Projetos/LandingPage_FeelFlow && npm run dev   # original (porta 3030)
# cópia de trabalho v2: ~/Desktop/Projetos/LandingPage_FeelFlow_v2 (porta 3031)
#   ./node_modules/.bin/vite --port 3031 --strictPort
```
