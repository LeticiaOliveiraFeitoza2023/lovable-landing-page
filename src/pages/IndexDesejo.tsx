/**
 * IndexDesejo.tsx — Versão 2 (Marketing de Desejo)
 *
 * Arquivo criado para comparação com o board.
 * NÃO altera Index.tsx original.
 *
 * Mudanças aplicadas vs. versão atual:
 *  1. NAV — removidos links de âncora; só logo + CTA (foco no funil)
 *  2. HERO — headline aspiracional, subtítulo de possibilidade, segundo CTA
 *  3. ICEBERG — metáfora nomeada explicitamente
 *  4. SINAIS — reencuadrado como fase de crescimento, não lista de falhas
 *  5. STATS — de alarmistas para inspiradoras / de possibilidade
 *  6. SOLUÇÃO — headline de desejo
 *  7. O QUE CONSTRUÍMOS — entregáveis → resultados que o cliente quer
 *  8. O QUE MUDA — cópia com emoção e aspiração
 *  9. PROVA SOCIAL — nova seção (placeholders para preencher com casos reais)
 * 10. CTA FINAL — linguagem de desejo + elemento de exclusividade
 */

import { useState, useEffect, useRef } from "react";
import logo from "@/assets/Horizontal_2.png";
import leticiaPhoto from "@/assets/leticia.jpg";
import heroPhoto from "@/assets/foto_hero.png";
import heroVideoP2 from "@/assets/hero_novo_novamente.mp4";
import { ChevronDown, Settings, Zap, Monitor, BarChart2, Link2, Bot, TrendingUp, RefreshCw, Building2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

/* ─── Motion presets ─── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease } },
};

/* ─── Label chip ─── */
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-ink-soft/72 mb-5 font-mono">
    {children}
  </p>
);

/* ─── Section rule ─── */
const Rule = () => (
  <hr className="border-none h-px bg-gradient-to-r from-transparent via-border to-transparent my-0" />
);

/* ─── FAQ Accordion ─── */
function FaqItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  const paragraphs = a.split("\n\n");
  return (
    <div className={`border-b border-border/50 last:border-0 ${open ? "bg-primary/[0.015]" : ""} transition-colors duration-300`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        className="w-full flex items-center justify-between py-5 text-left gap-6 group"
      >
        <span className={`text-[15px] font-medium leading-snug transition-colors duration-300 ${open ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}>
          {q}
        </span>
        <span className={`shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4 text-ink-soft" />
        </span>
      </button>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? "max-h-96 pb-6" : "max-h-0"}`}
      >
        <div className="pr-10">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-ink/70 leading-[1.7] text-[14px]">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── SVG Icons ─── */
type IconProps = { className?: string };
const Ic = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
    stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"
    className={className}>
    {children}
  </svg>
);

const IcBottleneck = (p: IconProps) => <Ic {...p}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M6 9v3a3 3 0 0 0 3 3h6"/><polyline points="15 15 18 18 15 21"/></Ic>;
const IcShuffle    = (p: IconProps) => <Ic {...p}><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></Ic>;
const IcScatter    = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="2"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="12" y1="10" x2="5.4" y2="7.2"/><line x1="12" y1="10" x2="18.6" y2="7.2"/><line x1="12" y1="14" x2="5.4" y2="16.8"/><line x1="12" y1="14" x2="18.6" y2="16.8"/></Ic>;
const IcRepeat     = (p: IconProps) => <Ic {...p}><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></Ic>;
const IcAlert      = (p: IconProps) => <Ic {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></Ic>;
const IcClock      = (p: IconProps) => <Ic {...p}><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></Ic>;

/* ─── Animated counter ─── */
function AnimatedNumber({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, reduced]);

  return <span ref={ref} aria-live="polite" aria-atomic="true">{prefix}{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════
   PAGE — versão Marketing de Desejo
   ═══════════════════════════════════════════════════ */
export default function IndexDesejo() {
  const [scrolled,     setScrolled]     = useState(false);
  const [nearBottom,   setNearBottom]   = useState(false);
  const [isMobile,     setIsMobile]     = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ─── Navbar scroll state ─── */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 32);
    // Bloco 5 — recolhe o float ao chegar no CTA final/rodapé pra não competir com o CTA nem tapar links
    const dist = document.body.scrollHeight - (v + window.innerHeight);
    setNearBottom(dist < 620);
  });

  /* ─── Hero vídeo scroll-driven ───
     Usa scrollY global + transform direta (evita bugs do useScroll target).
     Container = 240vh → scroll range = 140vh (240 - 100).
     Clampamos a 0-1 manualmente com useTransform de função.
  */
  const heroContainerRef = useRef<HTMLDivElement>(null);
  const phase2VideoRef   = useRef<HTMLVideoElement>(null);

  // Progress 0→1 ao longo dos 140vh de scroll do hero
  const heroProgress = useTransform(scrollY, (v) => {
    const el = heroContainerRef.current;
    if (!el) return 0;
    const range = el.offsetHeight - window.innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, v / range)) : 0;
  });

  // ── Foto fade leve no scroll
  // Foto da Fase 1 some por completo ANTES do vídeo entrar (handoff limpo, sem dupla-exposição)
  const photoOp    = useTransform(heroProgress, [0, 0.30, 0.40], [1, 1, 0]);
  // ── Vídeo da Fase 2 entra só depois que a foto saiu
  const phase2BgOp = useTransform(heroProgress, [0.40, 0.50], [0, 1]);

  // Texto fase 1 some; fase 2 aparece
  const heroTextOp   = useTransform(heroProgress, [0, 0.16, 0.28], [1, 1, 0]);
  const scrollHintOp = useTransform(heroProgress, [0, 0.12], [1, 0]);
  const phase2Op     = useTransform(heroProgress, [0.42, 0.50], [0, 1]);

  // ── Progresso da DESCIDA = playback do vídeo (0→1), não o scroll.
  //    O scroll só dispara o play; o vídeo roda liso na própria timeline.
  const videoProgress = useMotionValue(0);

  // ── Texto acumulativo: superfície entra e PERMANECE; profundidade surge abaixo
  //    conforme a câmera submerge (sem fazer o primeiro bloco sumir)
  const structureOp = useTransform(videoProgress, [0.46, 0.56], [0, 1]);
  const structureY  = useTransform(videoProgress, [0.46, 0.56], [16, 0]);

  // ── Scroll dispara o play uma vez; ao sair pra cima, reseta pra remergulhar
  const videoStartedRef = useRef(false);
  useMotionValueEvent(heroProgress, "change", (p) => {
    const v = phase2VideoRef.current;
    if (!v || prefersReduced) return;
    if (p >= 0.42 && !videoStartedRef.current) {
      videoStartedRef.current = true;
      v.playbackRate = 0.8; // mergulho mais calmo → mais tempo de leitura
      v.play().catch(() => {});
    } else if (p < 0.36 && videoStartedRef.current) {
      videoStartedRef.current = false;
      v.pause();
      v.currentTime = 0;
      videoProgress.set(0);
    }
  });

  // ── Sincroniza o texto ao playback do vídeo (rAF = 60fps, suave) ──
  useEffect(() => {
    const v = phase2VideoRef.current;
    if (!v) return;
    let raf = 0;
    const tick = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) {
        videoProgress.set(v.currentTime / v.duration);
      }
      raf = requestAnimationFrame(tick);
    };
    const onPlay  = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); };
    const onPause = () => cancelAnimationFrame(raf);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onPause);
    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onPause);
    };
  }, [videoProgress]);

  return (
    <div className="min-h-screen bg-background text-ink" style={{ overflowX: "clip" }}>

      {/* ══════════════ NAV — MUDANÇA 1 ══════════════
          Removidos links de âncora. Apenas logo + CTA.
          LP de conversão não tem menu — cada link é uma saída do funil.
      */}
      <nav
        aria-label="Navegação principal"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-background/92 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_0_0_hsl(220_10%_88%/0.6)]"
            : "bg-transparent"
        }`}
      >
        <div className="px-6 lg:px-10 h-[76px] flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img src={logo} alt="FeelFlow" className="h-16 w-auto" />
          </a>
          {/* CTA persistente — surge ao rolar (Bloco 2) */}
          <a
            href="/mergulho"
            onClick={() => trackEvent('click_cta_nav', { location: 'nav', label: 'Fazer o diagnóstico' })}
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
            className={`btn-shine inline-flex items-center justify-center gap-2 min-h-[44px] bg-primary text-white px-5 py-2.5 rounded-full text-[13px] font-semibold hover:bg-primary-glow transition-all duration-500 ${
              scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
            }`}
          >
            Fazer o diagnóstico
          </a>
        </div>
      </nav>

      {/* ── Skip link acessibilidade ── */}
      <a href="#sinais" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
        Pular para o conteúdo
      </a>

      {/* ══════════════ 1. HERO — VÍDEO ICEBERG ══════════════
          Fase 1: foto fullbleed + texto à esquerda + CTA
          Fase 2: fundo sólido neutro + metáfora animada + mockup com vídeo
      */}
      <div ref={heroContainerRef} style={{ height: prefersReduced || isMobile ? "100svh" : "240vh" }} className="relative">
      <section className="sticky top-0 h-[100svh] overflow-hidden">

        {/* ── Background: foto hero com Ken Burns ── */}
        <motion.div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden"
          style={{ opacity: prefersReduced ? 1 : photoOp }}
        >
          <motion.img src={heroPhoto} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "8% 42%" }}
            animate={prefersReduced ? {} : { scale: [1, 1.07] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
          {/* Overlay creme leve — iceberg respira à direita, texto legível à esq */}
          <div aria-hidden="true" className="absolute inset-0" style={{
            background:
              "linear-gradient(to right, rgba(240,237,232,0.99) 0%, rgba(240,237,232,0.98) 40%, rgba(240,237,232,0.68) 52%, rgba(240,237,232,0.18) 66%, transparent 80%)",
          }} />
        </motion.div>

        {/* ── Fundo da Fase 2 — foto underwater + overlay creme ── */}
        {!prefersReduced && (
          <motion.div aria-hidden="true" className="absolute inset-0 z-[1]"
            style={{ opacity: phase2BgOp }}
          >
            {/* Base sólida para cobrir a foto da Fase 1 */}
            <div className="absolute inset-0 bg-[#e8e5e0]" />
            {/* Vídeo: iceberg vivo — água em movimento, bolhas, superfície real */}
            <video
              ref={phase2VideoRef}
              aria-hidden="true"
              muted playsInline preload="auto"
              poster={heroPhoto}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "10% center" }}
            >
              <source src={heroVideoP2} type="video/mp4" />
            </video>
            {/* Overlay creme leve — apenas para o texto esquerdo */}
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to right, rgba(240,237,232,0.98) 0%, rgba(240,237,232,0.97) 40%, rgba(240,237,232,0.66) 52%, rgba(240,237,232,0.16) 66%, transparent 80%)"
            }} />
          </motion.div>
        )}

        {/* ── Fase 1: texto hero à esquerda, tudo branco ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-center px-6 lg:px-10 pt-[76px]"
          style={{ opacity: prefersReduced ? 1 : heroTextOp }}
        >
          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}
            className="max-w-[820px]"
          >
            <h1 className="text-[clamp(2.1rem,4vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-stone-900">
              {([
                <span key="l1">Você fez sua empresa crescer.</span>,
                <span key="l2">A gente faz ela funcionar</span>,
                <span key="l3">como você imaginou.</span>,
              ] as React.ReactNode[]).map((line, i) => (
                <motion.span key={i} className="block overflow-hidden pb-1"
                  variants={{ hidden: { opacity: 0, y: 64 }, visible: { opacity: 1, y: 0, transition: { duration: 0.95, ease } } }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-[560px] text-[clamp(1rem,1.45vw,1.18rem)] text-stone-600 leading-[1.6]">
              Inteligência operacional pra sua empresa rodar com clareza e leveza, sem depender de você o tempo todo.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col items-start gap-2.5">
              <motion.a
                href="/mergulho"
                onClick={() => trackEvent('click_cta_hero', { location: 'hero', label: 'Fazer o diagnóstico' })}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green hover:shadow-flow"
              >
                Fazer o diagnóstico
              </motion.a>
              <span className="text-[12px] text-stone-600 font-medium pl-1">Online • Rápido • Sem burocracia.</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Fase 2: texto cross-fade sincronizado com a descida do vídeo ── */}
        {!isMobile && !prefersReduced && (
          <motion.div
            className="absolute inset-y-0 left-6 lg:left-10 z-10 flex items-center pointer-events-none"
            style={{ opacity: phase2Op }}
            initial={false}
          >
            <div className="w-[min(540px,48vw)]">

              {/* Superfície — o sintoma (entra e permanece) */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] font-mono text-stone-600 mb-3">
                  O que todos veem
                </p>
                <p className="text-[2.1rem] font-bold text-stone-900 leading-[1.12] tracking-tight mb-3.5">
                  A ponta do iceberg.{" "}
                  <span className="font-serif italic font-normal text-stone-600">O sintoma.</span>
                </p>
                <div className="space-y-1.5">
                  {["Atraso nas entregas", "Equipe sempre no operacional", "Retrabalho constante", "Dados que não chegam a tempo"].map((item) => (
                    <p key={item} className="flex items-center gap-3 text-[15px] font-medium text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 shrink-0" />{item}
                    </p>
                  ))}
                </div>
              </div>

              {/* Linha d'água — divisor que surge com a profundidade */}
              <motion.div
                aria-hidden="true"
                style={{ opacity: structureOp }}
                className="my-5 h-px bg-gradient-to-r from-primary-deep/50 via-primary-deep/20 to-transparent"
              />

              {/* Profundidade — a estrutura (surge abaixo conforme submerge) */}
              <motion.div style={{ opacity: structureOp, y: structureY }}>
                <p className="text-[11px] uppercase tracking-[0.3em] font-mono text-primary-deep mb-3">
                  O que a FeelFlow vê
                </p>
                <p className="text-[2.1rem] font-bold text-stone-900 leading-[1.12] tracking-tight mb-3.5">
                  O que está debaixo.{" "}
                  <span className="font-serif italic font-normal text-primary-deep">A estrutura.</span>
                </p>
                <div className="space-y-1.5">
                  {["Processos sem dono definido", "Informação presa em silos", "Sistemas que não se comunicam", "Gargalos invisíveis que travam o crescimento"].map((item) => (
                    <p key={item} className="flex items-center gap-3 text-[15px] font-medium text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-deep/60 shrink-0" />{item}
                    </p>
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}

      </section>
      </div>

      {/* ══════════════ 1B. METÁFORA MOBILE — cards inline após hero ══════════════ */}
      <div className="md:hidden bg-background px-6 pt-10 pb-16">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease }}
            className="relative p-6 rounded-2xl bg-secondary/60 border border-border/40 overflow-hidden"
          >
            <div className="absolute top-0 left-6 right-6 h-px bg-border/60" />
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-soft/72 mb-3">O que todos veem</p>
            <p className="text-[1.35rem] font-semibold leading-[1.1] tracking-tight text-ink/90 mb-4">
              A ponta do iceberg. <span className="font-serif italic font-normal">O sintoma.</span>
            </p>
            <ul className="space-y-2.5">
              {["Atraso nas entregas", "Equipe sempre no operacional", "Retrabalho constante", "Falta de dados para decidir"].map(s => (
                <li key={s} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-soft/30 shrink-0" />{s}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="flex justify-center py-1">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-5 bg-gradient-to-b from-border to-primary/40" />
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-primary/60">
                <path d="M6 8L0 0h12L6 8z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="relative p-6 rounded-2xl bg-primary/[0.07] border border-primary/20 overflow-hidden"
          >
            <div className="absolute top-0 left-6 right-6 h-px bg-primary/30" />
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary-deep mb-3">O que a FeelFlow vê</p>
            <p className="text-[1.45rem] font-semibold leading-[1.1] tracking-tight text-ink mb-5">
              O que está debaixo. <span className="font-serif italic font-normal text-primary-deep">A estrutura.</span>
            </p>
            <ul className="space-y-2.5">
              {["Processos sem dono definido", "Informação presa na cabeça de pessoas-chave", "Sistemas que não se comunicam", "Operação que trava quando alguém falta"].map(s => (
                <li key={s} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{s}
                </li>
              ))}
            </ul>
            {/* Metáfora — mobile */}
            <p className="mt-5 text-[11px] font-mono text-primary-deep/55 tracking-wide">
              O que aparece é sintoma. O que está embaixo é estrutura.
            </p>
          </motion.div>
        </div>
      </div>

      <Rule />

      {/* ══════════════ 2. METÁFORA DO ICEBERG ══════════════
      {/* ══════════════ 3. SINAIS — MUDANÇA 4 ══════════════
          Reencuadrado como reconhecimento de fase de crescimento,
          não lista de falhas. A pessoa se vê em transição, não em colapso.
      */}
      <section id="sinais" className="py-20 lg:py-32 px-6 lg:px-10 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
              {/* Esquerda: título + ponte (fixo no desktop) */}
              <motion.div variants={fadeUp} className="lg:sticky lg:top-28 self-start">
                <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
                  Toda empresa em crescimento
                  <br />
                  <span className="font-serif italic font-normal text-primary-deep">passa por isso.</span>
                </h2>
                <div className="mt-8 border-l-2 border-primary/30 pl-6 max-w-md">
                  <p className="text-[15px] text-ink/70 leading-[1.8]">
                    Se você se reconheceu em mais de um desses pontos, sua empresa não está com problemas. Ela chegou num ponto que pede outro nível de estrutura.
                  </p>
                  <p className="text-[15px] text-ink font-medium leading-[1.8] mt-2">
                    E se ela ainda não anda sem você, é exatamente com isso que a gente trabalha.
                  </p>
                </div>
              </motion.div>

              {/* Direita: os 6 sinais como lista */}
              <motion.div variants={fadeUp} className="divide-y divide-border/40 border-t border-border/40">
                {[
                  { icon: <IcBottleneck />, label: "A empresa só anda no ritmo certo quando você está por perto" },
                  { icon: <IcShuffle />,    label: "Cada decisão que importa ainda passa por você" },
                  { icon: <IcScatter />,    label: "O que faz a operação funcionar mora na cabeça de poucas pessoas" },
                  { icon: <IcRepeat />,     label: "Os mesmos problemas voltam todo mês, do mesmo jeito" },
                  { icon: <IcAlert />,      label: "O urgente sempre passa na frente do importante" },
                  { icon: <IcClock />,      label: "Você gasta mais energia tocando a operação do que pensando no crescimento" },
                ].map((item, i) => (
                  <div key={i} className="group flex items-center gap-4 py-4">
                    <span className="w-10 h-10 rounded-lg bg-primary/[0.08] flex items-center justify-center text-primary-deep shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                      {item.icon}
                    </span>
                    <span className="text-[15px] text-ink/80 leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ 4. SOLUÇÃO — MUDANÇA 6 ══════════════
          Headline de desejo: "merece ter", não "já sabe que precisa mudar".
      */}
      <section id="solucao" className="relative py-28 lg:py-40 px-6 lg:px-10 bg-surface-dark text-background overflow-hidden">
        {/* Pico de profundidade — o mergulho (Bloco 3, jornada tonal) */}
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-background/60 mb-5 font-mono">O que fazemos</p>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance text-background">
                A operação que você imaginou.{" "}
                <span className="font-serif italic font-normal text-primary">
                  Construída de verdade.
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 grid md:grid-cols-3 border-t border-background/10">
              {[
                { word: "Mergulho", text: "Antes de propor qualquer coisa, a gente mergulha fundo pra entender como a sua operação funciona de verdade." },
                { word: "Estrutura", text: "Nada de sistema pronto. A gente organiza o que ficou submerso e desenha pra sua realidade." },
                { word: "Fluxo", text: "O que fica é uma empresa que roda com clareza e leveza, com você no comando, não no operacional." },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-6 py-14 lg:px-10 first:lg:pl-0 last:lg:pr-0 border-b border-background/10 lg:border-b-0 lg:border-r last:border-r-0 border-background/10"
                >
                  <span className="block w-5 h-[2px] bg-primary/60" />
                  <p className="text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-none tracking-tight text-background">
                    {item.word}
                  </p>
                  <p className="text-[13px] text-background/70 leading-[1.75] max-w-xs">
                    {item.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ COMO FUNCIONA O MERGULHO ══════════════
          Explica o processo após o leitor sentir a dor — reduz fricção de conversão.
          → Substituir por depoimentos reais quando os primeiros clientes forem concluídos.
      */}
      <section className="py-28 lg:py-40 px-6 lg:px-10 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <Label>Como começa</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-4xl">
                Seu{" "}
                <span className="font-serif italic font-normal text-primary-deep">diagnóstico</span>
                {" "}começa aqui
              </h2>
              <p className="mt-5 max-w-xl text-[15px] text-ink/70 leading-[1.85]">
                Do briefing à entrega de um plano estratégico sob medida.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  t: "Você me conta o seu cenário",
                  d: "Antes da reunião, você responde um briefing com perguntas objetivas sobre a operação da sua empresa. Menos de 5 minutos, sem formulário longo.",
                  detalhe: "Segmento · tamanho · principal desafio",
                },
                {
                  n: "02",
                  t: "A gente analisa",
                  d: "Nossa equipe lê o contexto, identifica os sinais críticos e prepara um diagnóstico inicial personalizado.",
                  detalhe: "Retorno em até 24 horas",
                },
                {
                  n: "03",
                  t: "Construção prática",
                  d: "Uma conversa de 30 a 45 minutos sobre o que mais pesa hoje. Em até 48h, você recebe um plano estratégico completo, com o checklist de implementação em 3 passos.",
                  detalhe: "Plano estratégico + checklist em até 48h",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={{
                    hidden:  { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: i * 0.1 } },
                  }}
                  className="group relative flex flex-col rounded-2xl border border-border/50 bg-background p-8 hover:border-primary/40 hover:shadow-soft transition-all duration-300"
                >
                  <span className="font-mono text-[2.4rem] font-bold leading-none text-primary-deep mb-5">{step.n}</span>
                  <h3 className="text-[18px] font-semibold mb-3 text-ink">{step.t}</h3>
                  <p className="text-[14px] text-ink/70 leading-[1.85] flex-1">{step.d}</p>
                  <div className="mt-6 pt-5 border-t border-border/40 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <p className="text-[12px] font-mono text-ink-soft tracking-wide">{step.detalhe}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 flex flex-wrap justify-center gap-3">
              {["Diagnóstico profissional", "Construção sob medida", "Responsabilidade por resultado"].map((s) => (
                <span key={s} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/[0.08] border border-primary/20 text-[13px] font-medium text-ink">
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" className="text-primary-deep shrink-0"><path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {s}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex justify-center">
              <motion.a
                href="/mergulho"
                onClick={() => trackEvent('click_cta_como_funciona', { location: 'como_funciona', label: 'Fazer o diagnóstico' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green"
              >
                Fazer o diagnóstico
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ O QUE CONSTRUÍMOS — MUDANÇA 7 ══════════════
          Entregáveis técnicos → resultados que o cliente quer ter.
          A pessoa compra o resultado, não o nome da ferramenta.
      */}
      <section className="py-28 lg:py-40 px-6 lg:px-10 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-2xl mb-16">
              <Label>O que construímos</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                Resultados que{" "}
                <span className="font-serif italic font-normal text-primary-deep">ficam</span>
              </h2>
            </motion.div>

            {/* ── Bento Grid O que construímos ── */}
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Card A — Estrutura (dark, wide) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative lg:col-span-2 rounded-2xl bg-surface-dark text-background p-8 overflow-hidden"
                >
                  <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Settings className="w-4 h-4" />
                      </span>
                      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-background/60">Estrutura</p>
                    </div>
                    <h3 className="text-[1.45rem] font-semibold leading-tight tracking-tight mb-2">
                      Operação que{" "}
                      <span className="font-serif italic font-normal text-primary">funciona sem você</span>
                    </h3>
                    <p className="text-[13px] text-background/50 mb-7">A base que sustenta o crescimento.</p>
                    <div className="flex flex-wrap gap-2">
                      {["Processos padronizados", "Fluxos comerciais", "Centrais operacionais"].map(s => (
                        <span key={s} className="text-[12px] px-3 py-1.5 rounded-full border border-background/15 text-background/70">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card B — Automação (tall, row-span-2) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="md:row-span-2 lg:row-span-2 rounded-2xl bg-primary/[0.07] border border-primary/18 p-8 overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary-deep">
                      <Zap className="w-4 h-4" />
                    </span>
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep/60">Automação + IA</p>
                  </div>
                  <h3 className="text-[1.45rem] font-semibold leading-tight tracking-tight mb-3">
                    IA que trabalha{" "}
                    <span className="font-serif italic font-normal text-primary-deep">enquanto você decide</span>
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed mb-8">
                    Equipe focada no que importa. Ferramentas que conversam entre si.
                  </p>
                  <div className="flex flex-col gap-3 mb-8">
                    {[
                      { icon: <Zap className="w-3.5 h-3.5" />, label: "Automações de processo" },
                      { icon: <Link2 className="w-3.5 h-3.5" />, label: "Integrações entre ferramentas" },
                      { icon: <Bot className="w-3.5 h-3.5" />, label: "Agentes inteligentes" },
                    ].map((item, i) => (
                      <div key={item.label}>
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-primary/12">
                          <span className="text-primary/70">{item.icon}</span>
                          <span className="text-[13px] font-medium text-ink/75">{item.label}</span>
                        </div>
                        {i < 2 && <div className="w-px h-3 bg-primary/20 ml-[22px]" />}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card C — Comercial */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-2xl bg-background border border-border/50 p-8 shadow-soft overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-ink-soft">
                      <Monitor className="w-4 h-4" />
                    </span>
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft">Comercial</p>
                  </div>
                  <h3 className="text-[1.3rem] font-semibold leading-tight tracking-tight mb-5">
                    Nenhum lead se perde
                  </h3>
                  <div className="space-y-2.5">
                    {["CRM com previsibilidade", "Comercial sem retrabalho"].map(s => (
                      <div key={s} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/55 shrink-0" />
                        <span className="text-[13px] text-ink/70">{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card D — Dados */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-2xl bg-secondary/55 border border-border/50 p-8 shadow-soft overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <span className="w-8 h-8 rounded-lg bg-background border border-border/40 flex items-center justify-center text-ink-soft">
                      <BarChart2 className="w-4 h-4" />
                    </span>
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft">Dados</p>
                  </div>
                  <h3 className="text-[1.3rem] font-semibold leading-tight tracking-tight mb-5">
                    Clareza pra decidir
                  </h3>
                  <div className="space-y-2.5">
                    {["Dashboards operacionais", "Crescimento sem retrabalho"].map(s => (
                      <div key={s} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/55 shrink-0" />
                        <span className="text-[13px] text-ink/70">{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

              </div>

              {/* Quote repetitiva removida (Letícia) */}

              {/* Mockup — Portal do Cliente (o que o cliente vê) */}
              <motion.div variants={fadeUp} className="mt-14 relative rounded-2xl border border-border/60 bg-background shadow-soft overflow-hidden">
                <div className="flex items-center gap-2 px-4 h-10 border-b border-border/50 bg-secondary/40">
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <span className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="ml-3 h-5 px-3 flex items-center rounded-md bg-background border border-border/50 text-[10px] font-mono text-ink-soft">portal.feelflow.com.br</div>
                </div>
                {/* Header do portal */}
                <div className="px-6 pt-6 pb-5 border-b border-border/50 bg-secondary/30 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center text-primary-deep">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                    </span>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft">Portal do cliente</p>
                      <p className="text-[15px] font-semibold text-ink leading-tight">Acompanhe seu projeto</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5">
                    {["Projeto", "Documentos", "Mensagens"].map((t, i) => (
                      <span key={t} className={`text-[11px] px-3 py-1.5 rounded-full ${i === 0 ? "bg-primary text-white" : "text-ink-soft"}`}>{t}</span>
                    ))}
                  </div>
                </div>
                {/* Corpo: progresso + milestones | documento + mensagem */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]">
                  <div className="p-6 lg:border-r border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[12px] font-medium text-ink">Mergulho Operacional</p>
                      <p className="text-[12px] text-primary-deep font-semibold">68%</p>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden mb-6">
                      <div className="h-full rounded-full bg-primary" style={{ width: "68%" }} />
                    </div>
                    <div className="space-y-3.5">
                      {[["Diagnóstico da operação", "feito"], ["Desenho dos fluxos", "feito"], ["Implementação dos processos", "agora"], ["Acompanhamento contínuo", "proximo"]].map(([t, s]) => (
                        <div key={t} className="flex items-center gap-3">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${s === "feito" ? "bg-primary text-white" : s === "agora" ? "bg-primary/20 text-primary-deep border border-primary" : "bg-secondary border border-border"}`}>
                            {s === "feito" && <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </span>
                          <span className={`text-[13px] ${s === "proximo" ? "text-ink-soft" : "text-ink"}`}>{t}</span>
                          {s === "agora" && <span className="text-[10px] text-primary-deep font-medium ml-auto px-2 py-0.5 rounded-full bg-primary/10">em andamento</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 space-y-4 bg-secondary/20">
                    <div className="rounded-xl border border-border/50 bg-background p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft mb-2">Para aprovar</p>
                      <p className="text-[13px] font-medium text-ink mb-3">Plano estratégico v2</p>
                      <span className="inline-flex h-7 px-3 items-center rounded-full bg-primary text-white text-[11px] font-medium">Aprovar</span>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-background p-4">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft mb-2">Da equipe FeelFlow</p>
                      <p className="text-[12px] text-ink/70 leading-relaxed">Finalizamos o mapeamento da operação. Dá uma olhada no plano e a gente segue pra implementação.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />


      {/* ══════════════ O QUE MUDA — MUDANÇA 8 ══════════════
          Cards com emoção e linguagem de aspiração.
          "Quando você sai de férias, a operação sente" → cria identificação imediata.
      */}
      <section className="py-28 lg:py-40 px-6 lg:px-10 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16 max-w-2xl">
              <Label>Transformação</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                O que muda{" "}
                <span className="font-serif italic font-normal text-primary-deep">pra você</span>
              </h2>
              <p className="mt-5 text-[15px] text-ink/70 leading-[1.85]">
                Não é só a operação que muda. Muda o seu lugar nela.
              </p>
            </motion.div>

            {/* Jornada de transformação do dono (cards) */}
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  cat: "Seu dia",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>,
                  depois: <>Você decide o que importa, <span className="font-serif italic font-normal text-primary-deep">e o resto a operação resolve</span></>,
                  tags: ["processos com dono", "equipe autônoma", "menos interrupções"],
                },
                {
                  cat: "Seu papel",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>,
                  depois: <>Você volta a liderar, <span className="font-serif italic font-normal text-primary-deep">em vez de segurar tudo de pé</span></>,
                  tags: ["fundador no estratégico", "operação que anda só", "leveza"],
                },
                {
                  cat: "Sua cabeça",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg>,
                  depois: <>O que faz a empresa andar <span className="font-serif italic font-normal text-primary-deep">deixa de viver só em você</span></>,
                  tags: ["conhecimento registrado", "histórico acessível", "rastreabilidade"],
                },
                {
                  cat: "Seu tempo",
                  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 16 14"/></svg>,
                  depois: <>Sobra espaço pra você <span className="font-serif italic font-normal text-primary-deep">pensar grande de novo</span></>,
                  tags: ["foco no crescimento", "agenda mais leve", "visão de longo prazo"],
                },
              ].map((row, i) => (
                <div key={i} className="group relative rounded-2xl border border-border/60 bg-background p-7 overflow-hidden hover:border-primary/40 hover:shadow-soft transition-all duration-300">
                  <div aria-hidden="true" className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/[0.07] blur-2xl pointer-events-none" />
                  <div className="relative flex items-center gap-3 mb-5">
                    <span className="w-11 h-11 rounded-xl bg-primary/12 flex items-center justify-center text-primary-deep shrink-0">{row.icon}</span>
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep">{row.cat}</p>
                  </div>
                  <h3 className="relative text-[1.3rem] lg:text-[1.45rem] font-semibold leading-tight tracking-tight text-ink mb-4">{row.depois}</h3>
                  <div className="relative flex flex-wrap gap-2">
                    {row.tags.map(t => (
                      <span key={t} className="text-[12px] px-3 py-1.5 rounded-full bg-secondary/60 text-ink/70">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ COMO FUNCIONA — Método Clarear™ ══════════════ */}
      <section id="como-funciona" className="py-28 lg:py-40 px-6 lg:px-10 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-20">
              <Label>Etapa 2 · A implementação — Método Clarear™</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-xl">
                Um caminho claro para{" "}
                <span className="font-serif italic font-normal text-primary-deep">sair do improviso</span>
              </h2>
              <p className="mt-5 max-w-xl text-[15px] text-ink/70 leading-[1.85]">
                Três fases conectadas. Do diagnóstico à operação que funciona sem você precisar estar em tudo.
              </p>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="relative"
            >
              <div className="hidden lg:block absolute left-6 right-6 top-[18px] h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
              <div className="grid md:grid-cols-3 gap-10 lg:gap-12">
                {[
                  {
                    n: "01",
                    fase: "IMERSÃO",
                    t: "Entendemos a fundo",
                    d: "Diagnóstico da operação atual: processos, gargalos, fluxos de decisão e o que está consumindo energia sem gerar resultado.",
                    items: ["diagnóstico", "mapa operacional", "prioridades reais"],
                  },
                  {
                    n: "02",
                    fase: "MAPEAMENTO",
                    t: "Desenhamos o caminho",
                    d: "Arquitetura operacional estruturada: quem faz o quê, como, quando e com quais ferramentas. Processos que a equipe realmente segue.",
                    items: ["fluxos documentados", "responsabilidades", "plano de ação"],
                  },
                  {
                    n: "03",
                    fase: "CLAREZA",
                    t: "Colocamos em funcionamento",
                    d: "Implementação respeitando a rotina da equipe. Automações, sistemas e dashboards que mostram o que precisa de atenção, antes de virar problema.",
                    items: ["automações", "integrações", "dashboards", "IA"],
                  },
                ].map((step) => (
                  <motion.div
                    key={step.n}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                    className="relative"
                  >
                    <div className="relative flex items-center gap-3 mb-8">
                      <motion.div
                        variants={{ hidden: { scale: 0.5, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } } }}
                        className="w-8 h-8 rounded-full border border-primary/30 bg-background flex items-center justify-center shrink-0"
                      >
                        <span className="font-mono text-[11px] font-semibold text-primary-deep">{step.n}</span>
                      </motion.div>
                      <span className="font-mono text-[10px] font-semibold text-primary-deep/40 tracking-[0.2em] uppercase">{step.fase}</span>
                      <div className="flex-1 h-px bg-border/40 lg:hidden" />
                    </div>
                    <h3 className="text-[17px] font-semibold mb-3">{step.t}</h3>
                    <p className="text-[14px] text-ink/70 leading-[1.85] mb-5">{step.d}</p>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft mb-2">Entrega</p>
                      {step.items.map(item => (
                        <div key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                          <span className="text-[13px] text-ink/65">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* CTA intermediário removido (Letícia: não fazia sentido entre Etapa 2 e Quem faz) */}

      {/* Sobre a Letícia — mantido integralmente (excelente) */}
      <motion.section
        id="sobre"
        className="relative py-20 lg:py-40 overflow-hidden bg-background min-h-[820px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        <motion.div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-[68%] z-0"
          variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } } }}
        >
          <img src={leticiaPhoto} alt="Letícia Feitoza, fundadora da FeelFlow" loading="lazy" decoding="async" className="w-full h-full object-cover object-[center_22%]" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(150 8% 97%) 0%, hsl(150 8% 97% / 0.82) 14%, hsl(150 8% 97% / 0.32) 32%, hsl(150 8% 97% / 0.06) 48%, transparent 62%)" }} />
          <div className="absolute inset-x-0 top-0 h-64" style={{ background: "linear-gradient(to bottom, hsl(150 8% 97%) 0%, hsl(150 8% 97% / 0.88) 35%, hsl(150 8% 97% / 0.45) 65%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 h-36" style={{ background: "linear-gradient(to top, hsl(150 8% 97%), transparent)" }} />
        </motion.div>

        <motion.div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10" variants={stagger}>
          <div className="max-w-[560px]">
            <motion.div variants={fadeUp}><Label>Quem faz</Label></motion.div>
            <motion.h2 variants={fadeUp} className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance mb-8 text-ink">
              Durante anos eu vi{" "}
              <span className="font-serif italic font-normal text-primary-deep">a mesma cena acontecer.</span>
            </motion.h2>
          </div>

          <div className="max-w-[440px] mt-14">
            <motion.div variants={fadeUp} className="space-y-4 text-[15px] text-ink/70 leading-[1.75]">
              <p>Passei mais de 12 anos entre áreas comerciais, projetos, processos e tecnologia.</p>
              <p>E o mais curioso: independentemente do cargo, eu sempre acabava indo parar exatamente no mesmo lugar.<br /><span className="text-ink font-semibold">Os processos.</span></p>
              <div>
                <p>Foi assim no comercial.</p>
                <p>Foi assim em projetos.</p>
                <p>Foi assim na Globo.</p>
              </div>
              <p>Existia algo que sempre me incomodava:<br />ver empresas inteligentes sustentando retrabalho,<br />tarefas repetitivas e empresários presos na própria operação.</p>
              <p className="text-ink font-semibold">A FeelFlow nasceu daí.</p>
              <p>Da ideia de que crescimento deveria trazer mais clareza, não mais peso.</p>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-[15px] text-ink/70 leading-[1.75] font-medium border-l-2 border-primary/30 pl-4">
              Hoje ajudo empresas que cresceram, e perceberam que a operação começou a exigir energia demais para continuar evoluindo.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-14 pt-6 border-t border-border/40">
              <p className="text-[14px] font-semibold text-ink leading-tight">Letícia Feitoza</p>
              <p className="text-[12px] text-ink-soft mt-0.5">Fundadora, FeelFlow</p>
            </motion.div>
            <div className="h-24" />
          </div>
        </motion.div>
      </motion.section>

      <Rule />

      {/* FAQ — mantido */}
      <section id="faq" className="py-28 lg:py-40 px-6 lg:px-10 bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20">
            <motion.div variants={fadeUp} className="lg:sticky lg:top-28 self-start">
              <Label>Dúvidas frequentes</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                Dúvidas que aparecem antes de começar
              </h2>
            </motion.div>
            <motion.div variants={fadeIn}>
              <FaqItem id="1" q="Como sei se isso é pra mim?"         a="Se sua empresa cresceu e você sente que carrega muita coisa nas costas, é pra você. Quando a operação começa a depender de você e de poucas pessoas-chave, já existem sinais suficientes pra organizar a base com clareza." />
              <FaqItem id="2" q="Vou precisar parar a operação para implementar mudanças?" a="As melhorias acontecem dentro da realidade da empresa, respeitando a rotina da equipe. Nada é implementado de forma abrupta." />
              <FaqItem id="3" q="Isso vai criar mais burocracia?"                          a="O objetivo é o oposto: menos ruído, menos retrabalho, uma operação que anda com clareza e leveza, não com mais regras pra você administrar." />
              <FaqItem id="4" q="Vocês chegam com processos prontos?"                      a={`Não. Cada empresa tem uma dinâmica, pessoas e desafios diferentes.\n\nA construção acontece junto das lideranças para criar algo que faça sentido no dia a dia e que a equipe realmente consiga aplicar.`} />
              <FaqItem id="5" q="E tecnologia? Vou precisar mudar tudo?"                  a={`Não necessariamente. Tecnologia entra quando faz sentido.\n\nPrimeiro a operação precisa estar clara. Depois avaliamos onde automações e ferramentas realmente ajudam, sem trocar o que funciona.`} />
              <FaqItem id="6" q="Eu já sei exatamente o que está errado. Ainda faz sentido conversar?" a={`Sim. Muitas empresas já sabem o que precisa melhorar.\n\nO desafio está em transformar esse diagnóstico em mudanças estruturadas, sem travar a operação no processo.`} />
              <FaqItem id="8" q="Quanto custa?" a="Depende do que o diagnóstico revelar. O escopo é fechado e desenhado pra sua realidade. Você paga por uma operação funcionando, não por horas, e a conversa inicial mostra o tamanho certo, sem compromisso." />
              <FaqItem id="7" q="Quanto tempo leva?"                                       a={`Depende do momento da empresa e do que precisa ser estruturado.\n\nA proposta é sempre trabalhar em ciclos curtos, entregando valor antes de avançar para a próxima etapa.`} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ CTA FINAL — MUDANÇA 10 ══════════════
          Headline de desejo (não de alívio de dor).
          Elemento de exclusividade para posicionamento premium.
          Subtext que valoriza quem chegou até aqui.
      */}
      <section id="cta-final" className="relative py-28 lg:py-40 px-6 lg:px-10 bg-gradient-to-b from-secondary/30 to-background text-ink overflow-hidden">
        {/* Atmosfera — fluxo: resolução na luz, com motivo abstrato de correnteza (Valentina) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[760px] h-[760px] bg-primary/15 rounded-full blur-[150px]" />
          <div className="absolute -top-24 right-[-8%] w-[440px] h-[440px] bg-primary/10 rounded-full blur-[130px]" />
          <svg className="absolute bottom-0 right-0 w-[62%] max-w-[820px]" viewBox="0 0 600 220" fill="none" preserveAspectRatio="xMaxYMax meet">
            <path d="M0 130 C 120 100, 200 160, 320 130 S 520 100, 600 140" stroke="hsl(158 64% 52% / 0.20)" strokeWidth="1.5" />
            <path d="M0 160 C 140 130, 220 190, 340 160 S 520 130, 600 170" stroke="hsl(158 64% 52% / 0.13)" strokeWidth="1.5" />
            <path d="M0 100 C 100 80, 200 130, 320 100 S 520 70, 600 110" stroke="hsl(220 9% 46% / 0.10)" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-[11px] uppercase tracking-[0.22em] font-medium text-ink-soft mb-5 font-mono">
              Próximo passo
            </motion.p>

            {/* Headline de desejo — não de alívio de dor */}
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.0] text-ink text-balance tracking-tight"
            >
              Chegou a hora da sua operação{" "}
              <span className="font-serif italic font-normal text-primary-deep">trabalhar por você.</span>
            </motion.h2>

            {/* Subtext que valoriza o leitor e posiciona a FeelFlow como parceiro de crescimento */}
            <motion.p variants={fadeUp} className="mt-6 text-[17px] text-ink/70 leading-[1.75] max-w-lg">
              Se você chegou até aqui, é porque quer ver a empresa funcionando do jeito que imaginou, com você no comando, não no operacional.
            </motion.p>

            {/* Nota de capacidade — fora do container verde (Letícia) */}
            <motion.div variants={fadeUp} className="mt-8 max-w-md border-l-2 border-primary/30 pl-4">
              <p className="text-[12px] text-ink-soft leading-relaxed">
                Acompanhamos no máximo 8 projetos por trimestre para garantir atenção integral a cada empresa.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4">
              <div className="relative inline-flex">
                <motion.a
                  href="/mergulho"
                  onClick={() => trackEvent('click_cta_final', { location: 'cta_final', label: 'Fazer o diagnóstico' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-flow"
                >
                  Fazer o diagnóstico
                </motion.a>
              </div>
              <p className="text-[12px] text-ink-soft font-mono tracking-wide">
                Online&nbsp;•&nbsp;Rápido&nbsp;•&nbsp;Sem burocracia
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer — integrado ao CTA final (sem borda dura, contínuo no claro), compacto e simétrico à nav */}
      <footer className="px-6 lg:px-10 pt-2 pb-24 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <a href="#" className="inline-flex items-center min-h-[44px]" aria-label="FeelFlow — voltar ao topo">
            <img src={logo} alt="FeelFlow" className="h-9 w-auto opacity-80" />
          </a>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12px] text-ink-soft">
            <a href="mailto:contato@feelflow.com.br" className="inline-flex items-center min-h-[44px] hover:text-ink transition-colors">contato@feelflow.com.br</a>
            <span className="text-border" aria-hidden="true">|</span>
            <a href="/privacidade" className="inline-flex items-center min-h-[44px] hover:text-ink transition-colors">Política de Privacidade</a>
            <span className="text-border" aria-hidden="true">|</span>
            <span>© {new Date().getFullYear()} FeelFlow</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante — discreto e branded (matcha, não o verde padrão); surge ao rolar */}
      <a
        href="https://wa.me/551153048305"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        onClick={() => trackEvent('click_whatsapp', { location: 'float' })}
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        className={`fixed right-6 z-50 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-flow hover:bg-primary-glow transition-all duration-300 ${
          scrolled && !nearBottom ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01zM12.04 20.15h-.01c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01s-.43.06-.66.31c-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/>
        </svg>
      </a>

    </div>
  );
}
