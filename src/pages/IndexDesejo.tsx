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
import icebergVideo from "@/assets/iceberg.mp4";
import { ChevronDown, Settings, Zap, Monitor, BarChart2, Link2, Bot, TrendingUp, RefreshCw, Building2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
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
  <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-ink-soft/55 mb-5 font-mono">
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
          <ChevronDown className="w-4 h-4 text-ink-soft/50" />
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
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ─── Navbar scroll state ─── */
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  /* ─── Hero vídeo scroll-driven ───
     Usa scrollY global + transform direta (evita bugs do useScroll target).
     Container = 240vh → scroll range = 140vh (240 - 100).
     Clampamos a 0-1 manualmente com useTransform de função.
  */
  const heroContainerRef = useRef<HTMLDivElement>(null);

  // Progress 0→1 ao longo dos 140vh de scroll do hero
  const heroProgress = useTransform(scrollY, (v) => {
    const el = heroContainerRef.current;
    if (!el) return 0;
    const range = el.offsetHeight - window.innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, v / range)) : 0;
  });

  // Vídeo: escala e translação vertical no scroll
  const videoScale   = useTransform(heroProgress, [0, 0.55, 1], [1, 1.22, 1.60]);
  const rawVideoY    = useTransform(heroProgress, [0, 0.45, 1], ["0%", "0%", "-22%"]);
  const videoY       = useSpring(rawVideoY, { stiffness: 28, damping: 22 });

  // Texto fase 1 some; fase 2 aparece
  const heroTextOp   = useTransform(heroProgress, [0, 0.16, 0.30], [1, 1, 0]);
  const scrollHintOp = useTransform(heroProgress, [0, 0.12], [1, 0]);
  const phase2Op     = useTransform(heroProgress, [0.38, 0.58], [0, 1]);
  const rawPhase2Y   = useTransform(heroProgress, [0.38, 0.62], [32, 0]);
  const phase2Y      = useSpring(rawPhase2Y, { stiffness: 28, damping: 22 });

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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img src={logo} alt="FeelFlow" className="h-14 w-auto" />
          </a>
          {/* Sem links de navegação — direto ao CTA */}
          <a
            href="/mergulho"
            onClick={() => trackEvent('click_cta_nav', { location: 'nav', label: 'Fazer Diagnóstico' })}
            className="hidden md:inline-flex group btn-shine items-center gap-2 text-[14px] font-semibold px-7 py-3.5 rounded-full bg-primary text-white hover:bg-primary-glow transition-all duration-300 hover:shadow-green"
          >
            Fazer Diagnóstico
          </a>
          {/* Mobile: só o CTA */}
          <a
            href="/mergulho"
            onClick={() => trackEvent('click_cta_nav', { location: 'nav_mobile', label: 'Diagnóstico' })}
            className="md:hidden inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-[13px] font-semibold"
          >
            Diagnóstico
          </a>
        </div>
      </nav>

      {/* ── Skip link acessibilidade ── */}
      <a href="#sinais" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
        Pular para o conteúdo
      </a>

      {/* ══════════════ 1. HERO — VÍDEO ICEBERG ══════════════
          Seção 1: iceberg completo, 1 CTA.
          Seção 2: zoom scroll-driven na ponta + metáfora acima/abaixo.
      */}
      <div ref={heroContainerRef} style={{ height: prefersReduced || isMobile ? "100svh" : "240vh" }} className="relative">
      <section className="sticky top-0 h-[100svh] overflow-hidden">

        {/* ── Vídeo fullscreen com zoom scroll-driven ── */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={prefersReduced ? {} : { scale: videoScale, y: videoY }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center 20%" }}
          >
            <source src={icebergVideo} type="video/mp4" />
          </video>
          {/* Overlay sutil — contraste em todos os frames */}
          <div className="absolute inset-0 bg-white/[0.10]" aria-hidden="true" />
        </motion.div>

        {/* ── Fase 1: texto hero — some no scroll ── */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pt-[68px]"
          style={{ opacity: prefersReduced ? 1 : heroTextOp }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}
            className="text-center"
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] uppercase tracking-[0.22em] font-medium text-ink/48 mb-6 font-mono"
            >
              Reconhecimento de fase
            </motion.p>

            <h1 className="text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.06] font-semibold tracking-tight max-w-[740px] mx-auto">
              {[
                <span key="l1">Empresas que crescem</span>,
                <span key="l2">
                  sem travar{" "}
                  <span className="font-serif italic font-normal text-primary-deep">têm operações</span>
                </span>,
                <span key="l3" className="font-serif italic font-normal text-primary-deep">
                  que trabalham por elas.
                </span>,
              ].map((line, i) => (
                <motion.span
                  key={i}
                  className="block overflow-hidden pb-1"
                  variants={{
                    hidden:  { opacity: 0, y: 72 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 md:mt-10 mx-auto max-w-[560px] text-[15px] md:text-[17px] text-ink/65 leading-[1.8]"
            >
              As melhores operações não surgem por acaso.{" "}
              <span className="text-ink font-medium">
                Elas são construídas com método, intenção e as ferramentas certas.
              </span>
            </motion.p>

            {/* CTA único */}
            <motion.div variants={fadeUp} className="mt-10">
              <motion.a
                href="/mergulho"
                onClick={() => trackEvent('click_cta_hero', { location: 'hero', label: 'Fazer Diagnóstico' })}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green hover:shadow-flow"
              >
                Fazer Diagnóstico
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Fase 2: metáfora iceberg — aparece no scroll (desktop) ── */}
        {!isMobile && !prefersReduced && (
          <motion.div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none"
            style={{ opacity: phase2Op, y: phase2Y }}
          >
            <div className="w-full max-w-[820px] mx-auto">
              <p className="text-center text-[11px] uppercase tracking-[0.22em] font-mono text-ink/38 mb-7">
                A metáfora do iceberg
              </p>
              <div className="grid grid-cols-2 gap-4">
                {/* Acima da linha d'água */}
                <div className="rounded-2xl bg-white/82 backdrop-blur-sm border border-white/55 p-7 shadow-soft">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-soft/55 mb-3">
                    O que todos veem
                  </p>
                  <p className="text-[1.2rem] font-semibold leading-[1.15] text-ink mb-5">
                    A ponta do iceberg.{" "}
                    <span className="font-serif italic font-normal text-ink/50">O sintoma.</span>
                  </p>
                  <ul className="space-y-2.5">
                    {["Atraso nas entregas", "Equipe sempre apagando incêndio", "Retrabalho constante", "Falta de dados para decidir"].map(s => (
                      <li key={s} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-ink-soft/30 shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Abaixo da linha d'água */}
                <div className="rounded-2xl bg-primary/[0.09] backdrop-blur-sm border border-primary/22 p-7 shadow-soft">
                  <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-primary-deep mb-3">
                    O que a FeelFlow vê
                  </p>
                  <p className="text-[1.2rem] font-semibold leading-[1.15] text-ink mb-5">
                    O que está debaixo.{" "}
                    <span className="font-serif italic font-normal text-primary-deep">A estrutura.</span>
                  </p>
                  <ul className="space-y-2.5">
                    {["Processos sem dono definido", "Informação presa em pessoas-chave", "Sistemas que não se comunicam", "Operação que trava quando alguém falta"].map(s => (
                      <li key={s} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Indicador de scroll ── */}
        {!prefersReduced && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
            style={{ opacity: scrollHintOp }}
          >
            <span className="text-[10px] font-mono text-ink/32 tracking-[0.2em]">scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-ink/28 to-transparent"
            />
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
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-soft/55 mb-3">O que todos veem</p>
            <p className="text-[1.35rem] font-semibold leading-[1.1] tracking-tight text-ink/90 mb-4">
              A ponta do iceberg. <span className="font-serif italic font-normal">O sintoma.</span>
            </p>
            <ul className="space-y-2.5">
              {["Atraso nas entregas", "Equipe sempre apagando incêndio", "Retrabalho constante", "Falta de dados para decidir"].map(s => (
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
            <motion.div variants={fadeUp} className="mb-6">
              {/* Label reencuadrado — não é "por que trava", é reconhecimento */}
              <Label>Reconhecimento de fase</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
                Toda empresa em crescimento
                <br />
                <span className="font-serif italic font-normal text-primary-deep">passa por isso.</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-16 grid sm:grid-cols-2 divide-y divide-border/40 border-t border-border/40">
              {[
                { icon: <IcBottleneck />, label: "A equipe espera respostas das mesmas pessoas" },
                { icon: <IcShuffle />,    label: "Processos mudam dependendo de quem executa" },
                { icon: <IcScatter />,    label: "Ninguém sabe onde está o histórico de decisões" },
                { icon: <IcRepeat />,     label: "O mesmo problema reaparece todo mês" },
                { icon: <IcAlert />,      label: "Urgências substituem prioridades" },
                { icon: <IcClock />,      label: "Você passa mais tempo resolvendo operação do que pensando no crescimento" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`group flex items-start gap-4 py-6 cursor-default
                    ${i % 2 === 0 ? "sm:pr-12 sm:border-r sm:border-border/40" : "sm:pl-12"}`}
                >
                  <span className="text-ink-soft/35 shrink-0 mt-0.5 group-hover:text-primary transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="text-[14px] text-ink/70 leading-snug group-hover:text-ink transition-colors duration-300">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* MUDANÇA 4b — fechamento positivo/aspiracional após a lista */}
            <motion.div
              variants={fadeUp}
              className="mt-12 border-l-2 border-primary/30 pl-6 max-w-2xl"
            >
              <p className="text-[15px] text-ink/70 leading-[1.8]">
                Se você se reconheceu em mais de um desses pontos, sua empresa não está com problemas.
              </p>
              <p className="text-[15px] text-ink font-medium leading-[1.8]">
                Ela chegou em um ponto que exige outro nível de estrutura. Esse passo é o que separa as empresas que continuam crescendo das que travam.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ 3. STATS — MUDANÇA 5 ══════════════
          De estatísticas alarmistas ("empresas travaram") para
          estatísticas de possibilidade ("o que a estrutura entrega").
      */}
      <section className="relative py-20 lg:py-24 px-6 lg:px-10 bg-surface-dark text-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-mono uppercase tracking-[0.22em] text-background/30 mb-16"
            >
              O que a estrutura muda
            </motion.p>

            {/* Stats aspiracionais — possibilidade, não alarme */}
            <div className="grid md:grid-cols-3 border-t border-background/10">
              {[
                {
                  counter: <><AnimatedNumber to={3} />x</>,
                  text: "mais rápido o crescimento de empresas com operação estruturada comparado a concorrentes que ainda operam no improviso.",
                },
                {
                  counter: <><AnimatedNumber to={40} suffix="%" /></>,
                  text: "do tempo operacional que pode ser recuperado quando automações e fluxos claros assumem o que a equipe não deveria estar fazendo.",
                },
                {
                  counter: <><AnimatedNumber to={12} />{" meses"}</>,
                  text: "tempo médio para uma empresa sair do improviso e ter uma operação que funciona com previsibilidade, com ou sem a presença do fundador.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex flex-col gap-6 py-14 lg:px-10 first:lg:pl-0 last:lg:pr-0 border-b border-background/10 lg:border-b-0 lg:border-r last:border-r-0 border-background/10"
                >
                  <span className="block w-5 h-[2px] bg-primary/60" />
                  <p className="text-[clamp(3.2rem,6vw,5.5rem)] font-semibold leading-none tracking-tight text-background tabular-nums">
                    {item.counter}
                  </p>
                  <p className="text-[13px] text-background/70 leading-[1.75] max-w-xs">
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

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
              <Label>O que acontece agora</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-2xl">
                O{" "}
                <span className="font-serif italic font-normal text-primary-deep">Mergulho Operacional™</span>
                {" "}começa aqui
              </h2>
              <p className="mt-5 max-w-xl text-[15px] text-ink/70 leading-[1.85]">
                Três perguntas rápidas. Sem burocracia. Nossa equipe analisa e entra em contato em até 24 horas.
              </p>
            </motion.div>

            <motion.div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  n: "01",
                  t: "Você responde",
                  d: "Perguntas objetivas sobre a operação da sua empresa. Menos de 5 minutos, sem formulário longo, sem compromisso.",
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
                  t: "Diagnóstico juntos",
                  d: "Uma conversa de 30 a 45 minutos focada só no que mais pesa na sua operação hoje. Sem pitch, sem venda forçada.",
                  detalhe: "Reunião · sem pressão · 100% gratuito",
                },
              ].map((step, i) => (
                <motion.div
                  key={step.n}
                  variants={{
                    hidden:  { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay: i * 0.1 } },
                  }}
                  className="relative flex flex-col rounded-2xl border border-border/50 bg-background p-8 shadow-soft"
                >
                  <span className="font-mono text-[11px] font-semibold text-primary-deep/50 tracking-widest mb-6">{step.n}</span>
                  <h3 className="text-[17px] font-semibold mb-3">{step.t}</h3>
                  <p className="text-[14px] text-ink/70 leading-[1.85] flex-1">{step.d}</p>
                  <div className="mt-6 pt-5 border-t border-border/40">
                    <p className="text-[12px] font-mono text-ink-soft/50 tracking-wide">{step.detalhe}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14 flex justify-center">
              <motion.a
                href="/mergulho"
                onClick={() => trackEvent('click_cta_como_funciona', { location: 'como_funciona', label: 'Quero meu Mergulho Operacional' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green"
              >
                Quero meu Mergulho Operacional
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M2 7h10M8 3l4 4-4 4"/>
                </svg>
              </motion.a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ 4. SOLUÇÃO — MUDANÇA 6 ══════════════
          Headline de desejo: "merece ter", não "já sabe que precisa mudar".
      */}
      <section id="solucao" className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="max-w-3xl">
              <Label>O que fazemos</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                A FeelFlow constrói a operação que{" "}
                <span className="font-serif italic font-normal text-primary-deep">
                  sua empresa merece ter.
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 max-w-2xl space-y-4 text-[15px] text-ink/70 leading-[1.85]">
              <p>Não começamos pela ferramenta. Começamos pela operação.</p>
              <p>
                Trabalhamos junto das lideranças para estruturar processos, alinhar áreas e{" "}
                transformar melhorias em funcionamento real.
              </p>
              <p>Com estrutura, qualquer crescimento se torna sustentável.</p>
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
                      <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-background/40">Estrutura</p>
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
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/50">Comercial</p>
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
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/50">Dados</p>
                  </div>
                  <h3 className="text-[1.3rem] font-semibold leading-tight tracking-tight mb-5">
                    Visibilidade total
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

              {/* Quote */}
              <div className="mt-6 border-l-2 border-primary/30 pl-6 py-1">
                <p className="text-[15px] text-ink-soft leading-[1.8]">
                  Cada empresa recebe uma combinação diferente.{" "}
                  <span className="text-ink/70">A solução nasce da operação, não de um pacote pronto.</span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* Cenários — mantido como está (funciona bem) */}
      <section id="cenarios" className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <Label>Cenários</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-2xl">
                Situações que encontramos{" "}
                <span className="font-serif italic font-normal text-primary-deep">com frequência</span>
              </h2>
            </motion.div>

            {/* ── Bento Grid Cenários ── */}
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

                {/* Card 1: Comercial — wide (col-span-3) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative lg:col-span-3 rounded-2xl bg-background border border-border/50 p-8 overflow-hidden shadow-soft"
                >
                  <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-primary/70 via-primary/30 to-transparent" />
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/50 mb-5">Comercial</p>
                  <h3 className="text-[1.45rem] font-semibold leading-tight tracking-tight mb-8 max-w-[300px]">
                    CRM que funciona{" "}
                    <span className="font-serif italic font-normal text-primary-deep">de verdade</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { antes: "CRM atualizado manualmente", depois: "CRM conectado" },
                      { antes: "follow-up perdido",           depois: "tarefas automáticas" },
                      { antes: "histórico espalhado",          depois: "visão em tempo real" },
                    ].map((item) => (
                      <div key={item.depois} className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <span className="text-[13px] text-ink-soft/38 line-through sm:w-[200px] shrink-0 leading-snug">{item.antes}</span>
                        <div className="shrink-0 flex items-center gap-1.5">
                          <div className="w-7 h-px bg-primary/35" />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/55" />
                        </div>
                        <span className="text-[13px] font-medium text-ink/80 leading-snug">{item.depois}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card 2: Gestão — tall (col-span-2, row-span-2) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="lg:col-span-2 lg:row-span-2 rounded-2xl bg-primary/[0.06] border border-primary/18 p-8 overflow-hidden"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep/65 mb-5">Gestão</p>
                  <h3 className="text-[1.55rem] font-semibold leading-tight tracking-tight mb-3">
                    Decisões com base{" "}
                    <span className="font-serif italic font-normal text-primary-deep">em dados reais</span>
                  </h3>
                  <p className="text-[13px] text-ink-soft leading-relaxed mb-10">
                    Do feeling para indicadores mensuráveis.
                  </p>

                  {/* Mini bar chart */}
                  <div className="flex items-end gap-[5px] h-[68px] mb-10 px-1">
                    {[32, 50, 40, 65, 75, 85, 94].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i >= 3
                            ? `hsl(158 64% 52% / ${0.38 + i * 0.13})`
                            : "hsl(220 9% 46% / 0.14)",
                        }}
                      />
                    ))}
                  </div>

                  <div className="w-full h-px bg-primary/14 mb-6" />

                  <div className="space-y-4">
                    {[
                      { antes: "decisões no feeling",        depois: "indicadores claros" },
                      { antes: "sem indicadores definidos",   depois: "acompanhamento real" },
                      { antes: "acompanhamento informal",     depois: "decisões baseadas em dados" },
                    ].map((item) => (
                      <div key={item.depois} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/65 shrink-0" />
                        <div className="min-w-0">
                          <span className="text-[12px] text-ink-soft/38 line-through leading-snug mr-2">{item.antes}</span>
                          <span className="text-[13px] font-medium text-ink/80 leading-snug">{item.depois}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card 3: Operação — medium (col-span-2) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="lg:col-span-2 rounded-2xl bg-secondary/55 border border-border/50 p-8 overflow-hidden shadow-soft"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/50 mb-5">Operação</p>
                  <h3 className="text-[1.45rem] font-semibold leading-tight tracking-tight mb-8 max-w-[260px]">
                    De sobrecarregada para{" "}
                    <span className="font-serif italic font-normal text-primary-deep">previsível</span>
                  </h3>
                  <div className="space-y-4">
                    {[
                      { antes: "atividades repetitivas",  depois: "fluxos automatizados" },
                      { antes: "equipe sobrecarregada",   depois: "menos dependência" },
                      { antes: "retrabalho constante",    depois: "mais previsibilidade" },
                    ].map((item) => (
                      <div key={item.depois} className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <span className="text-[13px] text-ink-soft/38 line-through sm:w-[180px] shrink-0 leading-snug">{item.antes}</span>
                        <div className="shrink-0 flex items-center gap-1.5">
                          <div className="w-7 h-px bg-primary/35" />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/55" />
                        </div>
                        <span className="text-[13px] font-medium text-ink/80 leading-snug">{item.depois}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card 4: CTA accent (col-span-1) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { scale: 1.025 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="lg:col-span-1 rounded-2xl bg-primary p-8 overflow-hidden relative grain flex flex-col justify-between min-h-[180px]"
                >
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/50 mb-4">Próximo passo</p>
                    <p className="text-[1.15rem] font-semibold text-white leading-[1.3]">
                      Identifique onde sua operação perde energia
                    </p>
                  </div>
                  <a
                    href="#cta-final"
                    className="relative z-10 mt-8 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 hover:text-white transition-colors group"
                  >
                    Fazer diagnóstico
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                </motion.div>

              </div>
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
            <motion.div variants={fadeUp} className="mb-16">
              <Label>Transformação</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-2xl">
                O que muda{" "}
                <span className="font-serif italic font-normal text-primary-deep">na prática</span>
              </h2>
            </motion.div>

            {/* ── Bento O que muda ── */}
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Card hero — Quando você sai de férias (wide, dark) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative lg:col-span-2 rounded-2xl bg-surface-dark text-background p-8 overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-primary/12 blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-background/35 mb-5">Antes → Depois</p>
                    <p className="text-[13px] text-background/45 line-through mb-2 leading-snug">Quando você sai de férias, a operação sente</p>
                    <h3 className="text-[1.45rem] font-semibold leading-tight tracking-tight text-background mb-6">
                      Processos que funcionam{" "}
                      <span className="font-serif italic font-normal text-primary">com ou sem a sua presença</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {["processos padronizados", "responsabilidades definidas", "autonomia da equipe"].map(s => (
                        <span key={s} className="text-[12px] px-3 py-1.5 rounded-full border border-background/14 text-background/65">{s}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Card — Leads + Operação (green accent, tall double-card) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="md:row-span-2 lg:row-span-2 rounded-2xl bg-primary/[0.07] border border-primary/18 p-8 overflow-hidden"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep/60 mb-5">Comercial</p>
                  <p className="text-[12px] text-ink-soft/40 line-through mb-2">Cada lead ignorado é uma oportunidade perdida</p>
                  <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight mb-5">
                    Cada oportunidade{" "}
                    <span className="font-serif italic font-normal text-primary-deep">acompanhada automaticamente</span>
                  </h3>
                  <div className="space-y-2.5 mb-8">
                    {["Automação de follow-up", "CRM integrado", "Histórico centralizado"].map(s => (
                      <div key={s} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/65 shrink-0" />
                        <span className="text-[13px] text-ink/75">{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-px bg-primary/15 my-6" />
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep/60 mb-5">Operação</p>
                  <p className="text-[12px] text-ink-soft/40 line-through mb-2">Urgências tomam o tempo de crescimento</p>
                  <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight mb-5">
                    Operação previsível que devolve o{" "}
                    <span className="font-serif italic font-normal text-primary-deep">espaço para pensar grande</span>
                  </h3>
                  <div className="space-y-2.5">
                    {["Prioridades no lugar", "Menos urgências", "Fundador estratégico"].map(s => (
                      <div key={s} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/65 shrink-0" />
                        <span className="text-[13px] text-ink/75">{s}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Card — Histórico espalhado (white, wide) */}
                <motion.div
                  whileHover={prefersReduced ? {} : { y: -3 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="lg:col-span-2 rounded-2xl bg-background border border-border/50 p-8 shadow-soft overflow-hidden"
                >
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/50 mb-5">Dados & Histórico</p>
                  <p className="text-[12px] text-ink-soft/40 line-through mb-2">O histórico da empresa existe só na cabeça das pessoas</p>
                  <h3 className="text-[1.35rem] font-semibold leading-tight tracking-tight mb-5">
                    Tudo registrado,{" "}
                    <span className="font-serif italic font-normal text-primary-deep">acessível e rastreável</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["histórico de decisões", "dashboards", "indicadores", "rastreabilidade"].map(s => (
                      <span key={s} className="text-[12px] px-3 py-1.5 rounded-full bg-secondary/70 border border-border/40 text-ink/60">{s}</span>
                    ))}
                  </div>
                </motion.div>

              </div>
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
              <Label>Método Clarear™</Label>
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
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft/40 mb-2">Entrega</p>
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
        <div className="max-w-2xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-14">
              <Label>Dúvidas frequentes</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                Dúvidas que aparecem antes de começar
              </h2>
            </motion.div>
            <motion.div variants={fadeIn}>
              <FaqItem id="1" q="Minha empresa ainda é pequena para pensar nisso?"         a="Quando processos começam a depender de pessoas-chave, urgências aumentam e a operação passa a consumir mais energia do que deveria. Já existem sinais suficientes para organizar a base." />
              <FaqItem id="2" q="Vou precisar parar a operação para implementar mudanças?" a="As melhorias acontecem dentro da realidade da empresa, respeitando a rotina da equipe. Nada é implementado de forma abrupta." />
              <FaqItem id="3" q="Isso vai criar mais burocracia?"                          a="O objetivo é o oposto. Estrutura bem desenhada elimina redundâncias, reduz ruído e faz a operação funcionar com menos esforço, não mais." />
              <FaqItem id="4" q="Vocês chegam com processos prontos?"                      a={`Não. Cada empresa tem uma dinâmica, pessoas e desafios diferentes.\n\nA construção acontece junto das lideranças para criar algo que faça sentido no dia a dia e que a equipe realmente consiga aplicar.`} />
              <FaqItem id="5" q="E tecnologia? Vou precisar mudar tudo?"                  a={`Não necessariamente. Tecnologia entra quando faz sentido.\n\nPrimeiro a operação precisa estar clara. Depois avaliamos onde automações e ferramentas realmente ajudam, sem trocar o que funciona.`} />
              <FaqItem id="6" q="Eu já sei exatamente o que está errado. Ainda faz sentido conversar?" a={`Sim. Muitas empresas já sabem o que precisa melhorar.\n\nO desafio está em transformar esse diagnóstico em mudanças estruturadas, sem travar a operação no processo.`} />
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
      <section id="cta-final" className="relative py-28 lg:py-40 px-6 lg:px-10 bg-secondary/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Label>Próximo passo</Label>
            </motion.div>

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
              As empresas que chegam até aqui já deram o passo mais importante: reconheceram que operação estruturada é vantagem competitiva, não custo.
            </motion.p>

            {/* MUDANÇA 10 — Elemento de exclusividade */}
            <motion.div
              variants={fadeUp}
              className="mt-8 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-primary/20 bg-primary/[0.06]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
              <p className="text-[12px] text-primary-deep/80 font-medium">
                A FeelFlow acompanha no máximo 8 projetos por trimestre para garantir atenção integral a cada empresa.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4">
              <div className="relative inline-flex">
                <motion.a
                  href="/mergulho"
                  onClick={() => trackEvent('click_cta_final', { location: 'cta_final', label: 'Iniciar meu Mergulho Operacional' })}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-flow"
                >
                  Iniciar meu Mergulho Operacional
                </motion.a>
              </div>
              <p className="text-[12px] text-ink-soft/50 font-mono tracking-wide">
                Perguntas rápidas&nbsp;•&nbsp;Sem burocracia&nbsp;•&nbsp;Menos de 5 minutos
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer — mantido */}
      <footer className="border-t border-border/40 py-10 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-3">
          {/* Método Clarear + fases numa linha só */}
          <div className="flex items-center gap-2 font-mono uppercase tracking-[0.22em] text-[10px] text-ink-soft/45">
            <span>Método Clarear™</span>
            <span className="text-border/60">·</span>
            <span>Imersão</span>
            <span className="text-border/60">·</span>
            <span>Mapeamento</span>
            <span className="text-border/60">·</span>
            <span>Clareza</span>
          </div>
          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 text-[12px] text-ink-soft/40">
            <a href="mailto:contato@feelflow.com.br" className="hover:text-ink-soft transition-colors">contato@feelflow.com.br</a>
            <span className="hidden sm:inline text-border">|</span>
            <a href="/privacidade" className="hover:text-ink-soft transition-colors">Política de Privacidade</a>
            <span className="hidden sm:inline text-border">|</span>
            <span>© {new Date().getFullYear()} FeelFlow</span>
          </div>
        </div>
      </footer>

      {/* WhatsApp flutuante — mantido */}
      <a
        href="https://wa.me/5511954388833"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale pelo WhatsApp (abre em nova aba)"
        onClick={() => trackEvent('click_whatsapp', { location: 'floating_button' })}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
