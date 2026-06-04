# Plano — Pass de Design/UX da LP (v2)
> Aprovado por Letícia em 2026-06-03. Trabalho na cópia v2 (`LandingPage_FeelFlow_v2`, porta 3031), sem deploy até concluir (D-005).
> Produzido por: Valentina Cruz (Direção Criativa), Laura Nogueira (UX/A11y), consolidado por Gabriela Lima + Rodrigo Freitas.

## Princípio norteador (Valentina)
**A jornada tonal É a metáfora:** iceberg (frio, topo) → mergulho (profundidade, meio) → **fluxo (luz e leveza, final)**. O final deve ser luminoso, não escuro.

## Diagnóstico (resumo)
- **Direção criativa:** ritmo tonal monótono (só 2 seções escuras, ~9 claras seguidas no miolo); metáfora front-loaded; CTA final escuro contradiz a promessa (clareza/leveza); repetição de "card grids"; página longa (~17,7 viewports); stats sem fonte.
- **UX/A11y (medido):** base sólida (1 h1, headings ok, alt/aria/skip link ok, reduced-motion tratado). **Achado principal: contraste AA reprova** nos cinzas pequenos (microcopy 12px ≈ 4.0:1; "antes" riscado ≈ 2.5–3:1; labels mono /40–/55). Foco do CTA (anel branco) some no claro. CTA com 3 rótulos diferentes. Hero scroll-jacking (240vh).

## Blocos (com dono, risco)
### Bloco 1 — Acessibilidade · baixo risco, alto impacto, rápido · Daniel + Fernanda
- Passada de contraste → WCAG AA (microcopy, labels mono, "detalhe", "antes" riscado).
- Foco visível consistente (anel com contraste em todos os fundos).
- Validar reduced-motion no hero + todas as animações.

### Bloco 2 — Consistência & fricção · rápido · Laura + Fernanda
- Padronizar o rótulo do CTA (1 variante, ex.: "Fazer o diagnóstico").
- CTA persistente na nav ao rolar.

### Bloco 3 — Jornada tonal + ritmo · o coração da direção · Valentina + Daniel + Fernanda
- Inverter o fim: CTA final luminoso/leve (fluxo), não escuro.
- Migrar o escuro pro meio: 1 pico imersivo no miolo (ex.: Solução ou "O que muda").
- Variar escala/layout entre os blocos de card.

### Bloco 4 — Consolidação de conteúdo · precisa de copy + gate · Laura + Ana + Rodrigo
- Avaliar fundir Cenários + O que muda + O que construímos (sobreposição) pra encurtar.
- Stats (3x/40%/12 meses): fonte real ou reframe.

### Bloco 5 — Responsividade · na implementação · Fernanda + Daniel
- Hero scroll-driven no mobile (hoje estático <768px) — validar.
- Breakpoints, touch targets, bentos em telas pequenas. (tráfego pago = mobile)

## Sequência aprovada
1. **Blocos 1 + 2** (quick wins) — começar por aqui.
2. Bloco 3 (jornada tonal).
3. Bloco 4 (consolidação, com gate de conteúdo).
4. Bloco 5 (responsividade).
Cada bloco com gate de Letícia antes de portar v2 → repo real + deploy.

## Decisões de Letícia ainda abertas (resolver nos blocos)
- Consolidar seções (encurtar) vs. manter todo o conteúdo — definir no Bloco 4.
- Stats: número real ou reframe — definir no Bloco 4 (com Ana).
- Princípio tonal "final luminoso / escuro no meio": **aprovado**.
