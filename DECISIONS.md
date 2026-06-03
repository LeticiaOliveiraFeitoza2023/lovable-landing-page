# Landing Page FeelFlow — Registro de Decisões
> Fonte de verdade das decisões da LP. Antes de re-discutir, consulte aqui.
> Índice geral das frentes: `feelflow-os/crm/knowledge/FRONTS_INDEX.md`.

---

## ⚠️ Pendentes de decisão
*(nenhuma registrada — preencher conforme surgirem)*

---

## ✅ Decisões ativas

### D-001 — LP "Marketing de Desejo" como rota principal (`/`)
**Data:** 2026-06-02 (registro) | **Status:** `ativa` | **Responsável:** Letícia + Gabriela (Growth)
**Contexto:** Várias versões da LP coexistem (`/` IndexDesejo, `/v1` Index, `/v3` IndexDark).
**Decisão:** `/` = IndexDesejo (versão "Marketing de Desejo") é a principal; `/v1` e `/v3` mantidas como variações.
**Descartado:** —
**Implementado:** `src/App.tsx`, `src/pages/IndexDesejo.tsx`.

### D-002 — Funil: LP → Mergulho Operacional → CRM
**Data:** 2026-06-02 (registro) | **Status:** `ativa` | **Responsável:** Rodrigo (PM) + Bruno (CRM)
**Contexto:** A LP precisa qualificar e entregar leads ao CRM.
**Decisão:** Formulário "Mergulho Operacional" (`/mergulho`) faz POST para `${CRM_API}/api/leads/mergulho`, gerando lead com scoring no CRM.
**Descartado:** Captura simples sem qualificação.
**Implementado:** `src/pages/Mergulho.tsx`.

### D-003 — GA4 como tracking de conversão (Meta Pixel a seguir)
**Data:** 2026-06-02 (registro) | **Status:** `ativa` | **Responsável:** Letícia + Gabriela
**Contexto:** Necessário medir conversão para ligar tráfego pago.
**Decisão:** GA4 instalado (`G-6ST3X5DCV5`) com `trackEvent` (analytics.ts) nos CTAs. Meta Pixel entra na sequência (ainda sem ID/snippet).
**Descartado:** —
**Implementado:** `index.html` (gtag), `src/lib/analytics.ts`.

### D-004 — Cold sem link; link só em follow-up (espelha D-019 do CRM)
**Data:** 2026-06-02 (registro) | **Status:** `ativa` | **Responsável:** Letícia
**Contexto:** Regra de copy da marca (entregabilidade).
**Decisão:** Link do site só entra em follow-up no CRM **depois** do site finalizado. A finalização da LP é dependência desse fluxo.
**Implementado:** N/A (regra). Ver `feelflow-os/crm/DECISIONS.md` D-019.

---

## 📋 Template para nova decisão
```
### D-XXX — [Título]
**Data:** YYYY-MM-DD | **Status:** `ativa` | **Responsável:** [Nome]
**Contexto:** ...
**Decisão:** ...
**Descartado:** ...
**Implementado:** ...
```
