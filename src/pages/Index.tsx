import { useState, useEffect, useRef } from "react";
import logo from "@/assets/Horizontal_2.png";
import leticiaPhoto from "@/assets/leticia.jpg";
import icebergImg from "@/assets/iceberg.jpeg";
import { ChevronDown, Menu, X, Settings, Zap, Monitor, BarChart2, Link2, Bot, TrendingUp, RefreshCw, Building2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

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
  <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-ink-soft/55 mb-8 font-mono">
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
            <p key={i} className="text-ink-soft leading-[1.7] text-[14px]">{p}</p>
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

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showMaioria, setShowMaioria] = useState(false);
  const [showFeel, setShowFeel] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const prefersReduced = useReducedMotion();

  /* ─── Detectar mobile e reagir a resize ─── */
  useEffect(() => {
    const update = () => {
      setVh(window.innerHeight);
      setIsMobile(window.innerWidth < 768);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ─── Scrollytelling hero ─── */
  const { scrollY } = useScroll();
  const HERO_END      = vh * 1.8;
  const HERO_TOTAL    = vh * 2.6;
  const HERO_EXTENDED = vh * 3.4;

  // Iceberg: zoom out → centraliza → zoom in suave no final (dá tempo de ler)
  const rawIceX       = useTransform(scrollY, [0, HERO_END * 0.65, HERO_TOTAL * 0.84, HERO_EXTENDED * 0.94], ["16%", "8%", "0%", "0%"]);
  const rawIceScale   = useTransform(scrollY, [0, HERO_END * 0.65, HERO_TOTAL * 0.84, HERO_EXTENDED * 0.94], [2.3, 1.95, 1.65, 1.55]);
  const rawIceY       = useTransform(scrollY, [0, HERO_END * 0.65], ["34%", "0%"]);
  const rawIceOpacity = useTransform(scrollY, [0, HERO_END * 0.55], [0.52, 1.0]);
  const iceX          = useSpring(rawIceX,       { stiffness: 40, damping: 18 });
  const iceScale      = useSpring(rawIceScale,   { stiffness: 40, damping: 18 });
  const iceY          = useSpring(rawIceY,       { stiffness: 40, damping: 18 });
  const iceOpacity    = useSpring(rawIceOpacity, { stiffness: 40, damping: 18 });

  // Hero text fades out — acontece cedo, deixa espaço para os 3 elementos TESE
  const heroOpacity  = useTransform(scrollY, [HERO_END * 0.08, HERO_END * 0.28], [1, 0]);
  const scrollHintOp = useTransform(scrollY, [0, HERO_END * 0.07], [1, 0]);

  // ── Elemento 1: "O que a maioria vê" — aparece no 2º scroll
  const maioriaOpacity = useTransform(scrollY, [HERO_END * 0.56, HERO_END * 0.72], [0, 1]);
  const rawMaioriaY    = useTransform(scrollY, [HERO_END * 0.56, HERO_END * 0.72], [36, 0]);
  const maioriaY       = useSpring(rawMaioriaY, { stiffness: 28, damping: 30 });

  // ── Elemento 3: "O que a FeelFlow mapeia" — aparece no 3º scroll
  const feelOpacity    = useTransform(scrollY, [HERO_TOTAL * 0.58, HERO_TOTAL * 0.72], [0, 1]);
  const rawFeelY       = useTransform(scrollY, [HERO_TOTAL * 0.58, HERO_TOTAL * 0.72], [36, 0]);
  const feelY          = useSpring(rawFeelY, { stiffness: 28, damping: 30 });

  useMotionValueEvent(maioriaOpacity, "change", (v) => {
    if (v > 0.5 && !showMaioria) setShowMaioria(true);
    if (v < 0.15) setShowMaioria(false);
  });
  useMotionValueEvent(feelOpacity, "change", (v) => {
    if (v > 0.5 && !showFeel) setShowFeel(true);
    if (v < 0.15) setShowFeel(false);
  });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 32));

  /* Active nav section — IntersectionObserver */
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-ink" style={{ overflowX: "clip" }}>

      {/* ══════════════ NAV ══════════════ */}
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
            <img src={logo} alt="FeelFlow" className="h-10 w-auto" />
          </a>
          {/* Links desktop */}
          <div className="hidden md:flex items-center gap-10 text-[13px] text-ink-soft font-medium tracking-wide">
            {[
              { href: "#como-funciona", label: "Como Funciona" },
              { href: "#solucao",       label: "Soluções" },
              { href: "#cenarios",      label: "Cenários" },
              { href: "#sobre",         label: "Sobre" },
            ].map(link => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-primary after:transition-all after:duration-300
                    ${isActive ? "text-ink after:w-full" : "text-ink-soft hover:text-ink after:w-0 hover:after:w-full"}`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          {/* CTA desktop */}
          <a
            href="#cta-final"
            className="hidden md:inline-flex group btn-shine items-center gap-2 text-[14px] font-semibold px-7 py-3.5 rounded-full bg-primary text-white hover:bg-primary-glow transition-all duration-300 hover:shadow-green"
          >
            Fazer Diagnóstico
          </a>
          {/* Hambúrguer mobile */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink-soft hover:text-ink transition-colors"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(o => !o)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* ── Menu mobile overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease }}
            className="fixed inset-x-0 top-[68px] z-40 bg-background/97 backdrop-blur-xl border-b border-border/40 shadow-lg md:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {[
                { href: "#como-funciona", label: "Como Funciona" },
                { href: "#solucao",       label: "Soluções" },
                { href: "#cenarios",      label: "Cenários" },
                { href: "#sobre",         label: "Sobre" },
                { href: "#faq",           label: "Dúvidas" },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-[16px] font-medium text-ink-soft hover:text-ink border-b border-border/30 last:border-0 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta-final"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 inline-flex justify-center items-center px-7 py-3.5 rounded-full bg-primary text-white text-[14px] font-semibold"
              >
                Fazer Diagnóstico
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Skip link acessibilidade ── */}
      <a href="#sinais" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
        Pular para o conteúdo
      </a>

      {/* ══════════════ 1. HERO + TESE — SCROLLYTELLING ══════════════ */}
      <div style={{ minHeight: isMobile || prefersReduced ? "100svh" : "440vh" }} className="relative bg-background">
      <section className="sticky top-0 h-[100svh] overflow-hidden flex items-center pt-[68px] bg-background">

        {/* Backgrounds */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute left-0 right-0 top-[30%] h-px bg-border/20" />
          <div className="absolute left-0 right-0 top-[65%] h-px bg-border/15" />
        </div>

        {/* Iceberg — começa direita/pequeno, cresce e centraliza no scroll */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={isMobile || prefersReduced
            ? { y: "-12%", scale: 1.15, opacity: 0.78 }
            : { x: iceX, scale: iceScale, y: iceY, opacity: iceOpacity }
          }
        >
          <motion.img
            src={icebergImg}
            alt=""
            aria-hidden="true"
            className="w-full max-w-[640px] object-contain select-none"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            draggable={false}
          />
        </motion.div>

        {/* Vinheta fixa no viewport — não escala com o iceberg */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: isMobile
              ? [
                  "radial-gradient(ellipse 90% 55% at 50% 36%, transparent 0%, transparent 35%, rgba(247,248,247,0.25) 52%, rgba(247,248,247,0.55) 65%, transparent 80%)",
                  "linear-gradient(to bottom, transparent 0%, transparent 42%, rgba(247,248,247,0.82) 62%, #F7F8F7 78%)",
                ].join(", ")
              : "radial-gradient(ellipse 72% 68% at 50% 50%, transparent 0%, transparent 50%, rgba(247,248,247,0.5) 64%, rgba(247,248,247,0.88) 77%, #F7F8F7 88%)",
          }}
        />

        {/* ── FASE 1: Hero text (fades out ao scrollar) ── */}
        <motion.div
          className={`z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 ${
            isMobile ? "absolute bottom-0 left-0 right-0 pb-12" : "relative pt-6 pb-4"
          }`}
          style={{ opacity: isMobile ? 1 : heroOpacity }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}
          >
            <h1 className="text-[clamp(1.85rem,5.5vw,4.2rem)] leading-[1.0] md:leading-[0.96] font-semibold tracking-tight text-balance max-w-[600px]">
              {[
                <span key="l1">Sua empresa cresceu,</span>,
                <span key="l2" className="block font-serif italic font-normal text-ink/80 mt-1">
                  mas a operação começou a cobrar o preço
                </span>,
              ].map((line, i) => (
                <motion.span
                  key={i}
                  className="block overflow-hidden"
                  variants={{
                    hidden:  { opacity: 0, y: 72 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p variants={fadeUp} className="mt-5 md:mt-8 max-w-[480px] text-[15px] md:text-[17px] text-ink-soft leading-[1.75] md:leading-[1.85]">
              Crescimento deveria trazer clareza,{" "}
              <span className="text-ink font-medium">
                não mais dependência, urgências e retrabalho
              </span>
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 md:mt-9">
              <motion.a
                href="#cta-final"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green hover:shadow-flow"
              >
                Fazer Diagnóstico
              </motion.a>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* ── FASE 2b: "O que a maioria vê" — aparece no 2º scroll ── */}
        <motion.div
          className="absolute inset-0 z-10 flex-col justify-start pointer-events-none hidden md:flex"
          style={{ opacity: maioriaOpacity, y: maioriaY }}
        >
          <div className="w-full max-w-[1140px] mx-auto px-6 pt-[100px] flex justify-start">
            <div className="max-w-[300px] text-left ml-8 lg:ml-14">
              {showMaioria && (
                <>
                  <motion.p
                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/70 mb-4"
                    initial="hidden" animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                  >
                    {"O que a maioria vê".split("").map((char, i) => (
                      <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.06 } } }}>{char}</motion.span>
                    ))}
                  </motion.p>
                  <p className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-ink/90">
                    <motion.span
                      initial="hidden" animate="visible"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.6 } } }}
                    >
                      {"Empresas enxergam sintomas".split("").map((char, i) => (
                        <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.08 } } }}>{char}</motion.span>
                      ))}
                      <motion.span
                        className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 3.0 }}
                      />
                    </motion.span>
                  </p>
                  <motion.ul
                    className="mt-4 space-y-1.5 text-[13px] text-ink-soft/80"
                    initial="hidden" animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 2.2 } } }}
                  >
                    {["Urgências constantes", "Gargalos visíveis", "Retrabalho frequente"].map(s => (
                      <motion.li key={s} variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}>{s}</motion.li>
                    ))}
                  </motion.ul>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── FASE 2c: "O que a FeelFlow mapeia" — aparece no 3º scroll ── */}
        <motion.div
          className="absolute inset-0 z-10 flex-col justify-end pointer-events-none hidden md:flex"
          style={{ opacity: feelOpacity, y: feelY }}
        >
          <div className="w-full max-w-[1140px] mx-auto px-6 pb-14 flex justify-end">
            <div className="max-w-[300px] text-right mr-8 lg:mr-14">
              {showFeel && (
                <>
                  <motion.p
                    className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep mb-4"
                    initial="hidden" animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                  >
                    {"O que a FeelFlow mapeia".split("").map((char, i) => (
                      <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.06 } } }}>{char}</motion.span>
                    ))}
                  </motion.p>
                  <p className="text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-ink">
                    <motion.span
                      initial="hidden" animate="visible"
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } } }}
                    >
                      {"A FeelFlow enxerga estruturas".split("").map((char, i) => (
                        <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.08 } } }}>{char}</motion.span>
                      ))}
                      <motion.span
                        className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-0.5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0, 1] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 3.5 }}
                      />
                    </motion.span>
                  </p>
                  <motion.ul
                    className="mt-4 space-y-1.5 text-[13px] text-ink-soft"
                    initial="hidden" animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 2.5 } } }}
                  >
                    {["Processos que sustentam o problema", "Decisões que criam dependência", "Automações que eliminam o retrabalho"].map(s => (
                      <motion.li key={s} variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4 } } }}>{s}</motion.li>
                    ))}
                  </motion.ul>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator — fades out conforme rola */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ opacity: scrollHintOp }}
        >
          <motion.div
            className="flex flex-col items-center gap-1.5 text-ink-soft/40"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

      </section>
      </div>

      {/* ══════════════ 1B. TESE — MOBILE ONLY ══════════════ */}
      <div className="md:hidden bg-background px-6 pt-10 pb-16">
        <div className="space-y-4">

          {/* Card: O que a maioria vê */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease }}
            className="relative p-6 rounded-2xl bg-secondary/60 border border-border/40 overflow-hidden"
          >
            {/* Subtle top accent */}
            <div className="absolute top-0 left-6 right-6 h-px bg-border/60" />
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-ink-soft/55 mb-3">
              O que a maioria vê
            </p>
            <p className="text-[1.45rem] font-semibold leading-[1.1] tracking-tight text-ink/90 mb-5">
              Empresas enxergam{" "}
              <span className="font-serif italic font-normal">sintomas</span>
            </p>
            <ul className="space-y-2.5">
              {["Urgências constantes", "Gargalos visíveis", "Retrabalho frequente"].map(s => (
                <li key={s} className="flex items-center gap-2.5 text-[13px] text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-soft/30 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connector arrow */}
          <div className="flex justify-center py-1">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-5 bg-gradient-to-b from-border to-primary/40" />
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-primary/60">
                <path d="M6 8L0 0h12L6 8z" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* Card: O que a FeelFlow mapeia */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
            className="relative p-6 rounded-2xl bg-primary/[0.07] border border-primary/20 overflow-hidden"
          >
            {/* Green top accent */}
            <div className="absolute top-0 left-6 right-6 h-px bg-primary/30" />
            <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-primary-deep mb-3">
              O que a FeelFlow mapeia
            </p>
            <p className="text-[1.45rem] font-semibold leading-[1.1] tracking-tight text-ink mb-5">
              A FeelFlow enxerga{" "}
              <span className="font-serif italic font-normal text-primary-deep">estruturas</span>
            </p>
            <ul className="space-y-2.5">
              {["Processos que sustentam o problema", "Decisões que criam dependência", "Automações que eliminam o retrabalho"].map(s => (
                <li key={s} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      <Rule />

      {/* ══════════════ 2. SINAIS ══════════════ */}
      <section id="sinais" className="py-20 lg:py-32 px-6 lg:px-10 bg-secondary/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-6">
              <Label>Por que sua operação trava</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight">
                Esses sinais
                <br />
                <span className="font-serif italic font-normal text-primary-deep">já apareceram antes.</span>
              </h2>
            </motion.div>

            {/* Lista editorial — 2 colunas, sem fundo */}
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

          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ 3. QUEBRA DE CRENÇA ══════════════ */}
      <section className="relative py-20 lg:py-24 px-6 lg:px-10 bg-surface-dark text-background overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/12 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {/* Label */}
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-mono uppercase tracking-[0.22em] text-background/30 mb-16"
            >
              O que os dados mostram
            </motion.p>

            {/* 3 stats — impacto tipográfico com counter animado */}
            <div className="grid md:grid-cols-3 border-t border-background/10">
              {[
                {
                  counter: <AnimatedNumber to={70} suffix="%" />,
                  text: "das empresas em crescimento travaram por ineficiência operacional, não por falta de demanda ou de liderança.",
                },
                {
                  counter: <>20–<AnimatedNumber to={30} suffix="%" /></>,
                  text: "da receita perdida todo ano com retrabalho, processos mal definidos e comunicação fragmentada.",
                },
                {
                  counter: <>3 a <AnimatedNumber to={4} suffix="h" /></>,
                  text: "do dia da equipe consumidas por tarefas manuais e repetitivas que poderiam não existir nesse formato.",
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

      {/* ══════════════ 4. SOLUÇÃO ══════════════ */}
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
                A FeelFlow organiza o que sua empresa{" "}
                <span className="font-serif italic font-normal text-primary-deep">
                  já sabe que precisa mudar.
                </span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 max-w-2xl space-y-4 text-[15px] text-ink-soft leading-[1.85]">
              <p>Não começamos pela ferramenta. Começamos pela operação.</p>
              <p>
                Trabalhamos junto das lideranças para estruturar processos, alinhar áreas e{" "}
                transformar melhorias em funcionamento real.
              </p>
              <p>Sem estrutura, qualquer sistema só mascara o problema.</p>
            </motion.div>

            {/* 4 pilares — grade editorial com divisores */}
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ O QUE CONSTRUÍMOS ══════════════ */}
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
                O que normalmente{" "}
                <span className="font-serif italic font-normal text-primary-deep">implementamos</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-14">
              {[
                { icon: <Settings className="w-4 h-4" />, label: "Estruturação operacional" },
                { icon: <Zap className="w-4 h-4" />, label: "Automações" },
                { icon: <Monitor className="w-4 h-4" />, label: "Sistemas internos" },
                { icon: <BarChart2 className="w-4 h-4" />, label: "CRM personalizado" },
                { icon: <Link2 className="w-4 h-4" />, label: "Integrações" },
                { icon: <Bot className="w-4 h-4" />, label: "Agentes inteligentes" },
                { icon: <TrendingUp className="w-4 h-4" />, label: "Dashboards" },
                { icon: <RefreshCw className="w-4 h-4" />, label: "Fluxos comerciais" },
                { icon: <Building2 className="w-4 h-4" />, label: "Centrais operacionais" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl border border-border/50 bg-background hover:border-primary/30 hover:bg-primary/[0.03] transition-all duration-200 group card-hover"
                >
                  <span className="text-primary/60 shrink-0 group-hover:text-primary transition-colors">{item.icon}</span>
                  <span className="text-[14px] font-medium text-ink/75 leading-snug">{item.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="max-w-xl border-l-2 border-primary/30 pl-6">
              <p className="text-[15px] text-ink-soft leading-[1.8]">
                Cada empresa recebe uma combinação diferente.
              </p>
              <p className="text-[15px] text-ink-soft leading-[1.8]">
                A solução nasce da operação, e não de um pacote pronto.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ CENÁRIOS OPERACIONAIS ══════════════ */}
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

            <motion.div variants={fadeUp} className="grid md:grid-cols-3 gap-8">
              {[
                {
                  area: "Comercial",
                  antes: ["CRM atualizado manualmente", "follow-up perdido", "histórico espalhado"],
                  depois: ["CRM conectado", "tarefas automáticas", "visão em tempo real"],
                },
                {
                  area: "Operação",
                  antes: ["atividades repetitivas", "equipe sobrecarregada", "retrabalho"],
                  depois: ["fluxos automatizados", "menos dependência", "mais previsibilidade"],
                },
                {
                  area: "Gestão",
                  antes: ["decisões no feeling", "sem indicadores definidos", "acompanhamento informal"],
                  depois: ["indicadores claros", "acompanhamento real", "decisões baseadas em dados"],
                },
              ].map((c) => (
                <div key={c.area} className="rounded-2xl border border-border/50 overflow-hidden bg-background shadow-soft">
                  <div className="px-6 pt-6 pb-4 border-b border-border/40">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink-soft/50">{c.area}</span>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft/40 mb-3">Antes</p>
                      <ul className="space-y-2">
                        {c.antes.map(item => (
                          <li key={item} className="flex items-start gap-2 text-[13px] text-ink-soft/60 leading-snug">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-ink-soft/25 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary-deep/60 mb-3">Depois</p>
                      <ul className="space-y-2">
                        {c.depois.map(item => (
                          <li key={item} className="flex items-start gap-2 text-[13px] text-ink/75 leading-snug">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ O QUE MUDA NA PRÁTICA ══════════════ */}
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

            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  problema: "Equipe depende sempre das mesmas pessoas",
                  solucao: "Fluxos claros + responsabilidades + processos padronizados",
                },
                {
                  problema: "Leads esquecidos",
                  solucao: "Automação + acompanhamento + CRM integrado",
                },
                {
                  problema: "Informações espalhadas",
                  solucao: "Dados centralizados + histórico acessível",
                },
                {
                  problema: "Equipe apagando incêndio",
                  solucao: "Operação previsível + visibilidade",
                },
              ].map((card) => (
                <div
                  key={card.problema}
                  className="rounded-2xl border border-border/50 bg-background p-7 card-hover shadow-soft"
                >
                  <p className="text-[14px] text-ink-soft/60 leading-snug mb-4 flex items-start gap-2">
                    <span className="mt-0.5 text-ink-soft/30 text-[16px] shrink-0">→</span>
                    {card.problema}
                  </p>
                  <div className="h-px bg-gradient-to-r from-primary/30 to-transparent mb-4" />
                  <p className="text-[14px] font-medium text-ink/80 leading-snug">{card.solucao}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ 6. COMO FUNCIONA ══════════════ */}
      <section id="como-funciona" className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-20">
              <Label>Como funciona</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance max-w-xl">
                Um caminho claro para{" "}
                <span className="font-serif italic font-normal text-primary-deep">sair do improviso</span>
              </h2>
            </motion.div>

            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
              className="relative"
            >
              <div className="hidden lg:block absolute left-6 right-6 top-4 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                {[
                  {
                    n: "01", t: "Priorizamos",
                    d: "Entendemos e priorizamos o que mais pesa na operação.",
                    items: ["diagnóstico", "mapa operacional", "prioridades"],
                  },
                  {
                    n: "02", t: "Estruturamos",
                    d: "Construímos e organizamos processos, junto com quem executa.",
                    items: ["fluxos", "responsabilidades", "padronização"],
                  },
                  {
                    n: "03", t: "Implementamos",
                    d: "Colocamos para funcionar respeitando a rotina da equipe, sem parar a operação.",
                    items: ["automações", "integrações", "sistemas", "IA"],
                  },
                  {
                    n: "04", t: "Evoluímos",
                    d: "Acompanhamento contínuo com base no que os dados mostram.",
                    items: ["dashboards", "indicadores", "melhorias"],
                  },
                ].map((step) => (
                  <motion.div
                    key={step.n}
                    variants={{
                      hidden:  { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                    }}
                    className="relative"
                  >
                    <div className="relative flex items-center gap-3 mb-8">
                      <motion.div
                        variants={{
                          hidden:  { scale: 0.5, opacity: 0 },
                          visible: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] } },
                        }}
                        className="w-8 h-8 rounded-full border border-primary/30 bg-background flex items-center justify-center shrink-0"
                      >
                        <span className="font-mono text-[11px] font-semibold text-primary-deep">{step.n}</span>
                      </motion.div>
                      <div className="flex-1 h-px bg-border/40 lg:hidden" />
                    </div>
                    <h3 className="text-[17px] font-semibold mb-3">{step.t}</h3>
                    <p className="text-[14px] text-ink-soft leading-[1.85] mb-5">{step.d}</p>
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft/40 mb-2">Entrega</p>
                      {step.items.map(item => (
                        <div key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                          <span className="text-[13px] text-ink-soft/70">{item}</span>
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

      {/* ══════════════ 7. SOBRE A LETÍCIA ══════════════ */}
      <motion.section
        id="sobre"
        className="relative py-20 lg:py-40 overflow-hidden bg-background min-h-[820px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
      >
        {/* Foto — desktop: absoluta direita; mobile: oculta */}
        <motion.div
          className="hidden md:block absolute right-0 top-0 bottom-0 w-[68%] z-0"
          variants={{
            hidden:  { clipPath: "inset(0 0 100% 0)" },
            visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <img
            src={leticiaPhoto}
            alt="Letícia Feitoza, fundadora da FeelFlow"
            className="w-full h-full object-cover object-[center_22%]"
          />
          {/* Fade esquerda — suave, sem linha visível */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, hsl(150 8% 97%) 0%, hsl(150 8% 97% / 0.82) 14%, hsl(150 8% 97% / 0.32) 32%, hsl(150 8% 97% / 0.06) 48%, transparent 62%)" }} />
          {/* Fade topo — cobre o fundo cinza do estúdio */}
          <div className="absolute inset-x-0 top-0 h-64" style={{ background: "linear-gradient(to bottom, hsl(150 8% 97%) 0%, hsl(150 8% 97% / 0.88) 35%, hsl(150 8% 97% / 0.45) 65%, transparent 100%)" }} />
          {/* Fade base */}
          <div className="absolute inset-x-0 bottom-0 h-36" style={{ background: "linear-gradient(to top, hsl(150 8% 97%), transparent)" }} />
        </motion.div>

        {/* Conteúdo — coluna esquerda */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10"
          variants={stagger}
        >
          {/* Label + Headline — coluna larga para 2 linhas */}
          <div className="max-w-[560px]">
            <motion.div variants={fadeUp}><Label>Quem faz</Label></motion.div>
            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance mb-8 text-ink"
            >
              Durante anos eu vi{" "}
              <span className="font-serif italic font-normal text-primary-deep">a mesma cena acontecer.</span>
            </motion.h2>
          </div>

          {/* Bio + Assinatura — coluna estreita */}
          <div className="max-w-[440px] mt-14">

            {/* Bio */}
            <motion.div variants={fadeUp} className="space-y-4 text-[15px] text-ink-soft leading-[1.75]">
              <p>Passei mais de 12 anos entre áreas comerciais, projetos, processos e tecnologia.</p>
              <p>
                E o mais curioso: independentemente do cargo, eu sempre acabava indo parar exatamente no mesmo lugar.
                <br />
                <span className="text-ink font-semibold">Os processos.</span>
              </p>
              <div>
                <p>Foi assim no comercial.</p>
                <p>Foi assim em projetos.</p>
                <p>Foi assim na Globo.</p>
              </div>
              <p>
                Existia algo que sempre me incomodava:<br />
                ver empresas inteligentes sustentando retrabalho,<br />
                tarefas repetitivas e empresários presos na própria operação.
              </p>
              <p className="text-ink font-semibold">A FeelFlow nasceu daí.</p>
              <p>Da ideia de que crescimento deveria trazer mais clareza, não mais peso.</p>
            </motion.div>

            {/* Fechamento */}
            <motion.p
              variants={fadeUp}
              className="mt-8 text-[15px] text-ink/70 leading-[1.75] font-medium border-l-2 border-primary/40 pl-4"
            >
              Hoje ajudo empresas que cresceram, e perceberam que a operação começou a exigir energia demais para continuar evoluindo.
            </motion.p>

            {/* Assinatura */}
            <motion.div variants={fadeUp} className="mt-14 pt-6 border-t border-border/40">
              <p className="text-[14px] font-semibold text-ink leading-tight">Letícia Feitoza</p>
              <p className="text-[12px] text-ink-soft mt-0.5">Fundadora, FeelFlow</p>
            </motion.div>

            {/* Espaçador — mantém altura da seção para a foto não cortar */}
            <div className="h-24" />

          </div> {/* fim max-w-[440px] */}
        </motion.div>
      </motion.section>

      <Rule />

      {/* ══════════════ 8. FAQ ══════════════ */}
      <section id="faq" className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-14">
              <Label>Dúvidas frequentes</Label>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                Dúvidas que aparecem antes de começar
              </h2>
            </motion.div>

            <motion.div variants={fadeIn}>
              <FaqItem id="1"
                q="Minha empresa ainda é pequena para pensar nisso?"
                a={`Quando processos começam a depender de pessoas-chave, urgências aumentam e a operação passa a consumir mais energia do que deveria. Já existem sinais suficientes para organizar a base.`}
              />
              <FaqItem id="2"
                q="Vou precisar parar a operação para implementar mudanças?"
                a={`As melhorias acontecem dentro da realidade da empresa, respeitando a rotina da equipe. Nada é implementado de forma abrupta.`}
              />
              <FaqItem id="3"
                q="Isso vai criar mais burocracia?"
                a={`O objetivo é o oposto. Estrutura bem desenhada elimina redundâncias, reduz ruído e faz a operação funcionar com menos esforço, não mais.`}
              />
              <FaqItem id="4"
                q="Vocês chegam com processos prontos?"
                a={`Não. Cada empresa tem uma dinâmica, pessoas e desafios diferentes.\n\nA construção acontece junto das lideranças para criar algo que faça sentido no dia a dia e que a equipe realmente consiga aplicar.`}
              />
              <FaqItem id="5"
                q="E tecnologia? Vou precisar mudar tudo?"
                a={`Não necessariamente. Tecnologia entra quando faz sentido.\n\nPrimeiro a operação precisa estar clara. Depois avaliamos onde automações e ferramentas realmente ajudam, sem trocar o que funciona.`}
              />
              <FaqItem id="6"
                q="Eu já sei exatamente o que está errado. Ainda faz sentido conversar?"
                a={`Sim. Muitas empresas já sabem o que precisa melhorar.\n\nO desafio está em transformar esse diagnóstico em mudanças estruturadas, sem travar a operação no processo.`}
              />
              <FaqItem id="7"
                q="Quanto tempo leva?"
                a={`Depende do momento da empresa e do que precisa ser estruturado.\n\nA proposta é sempre trabalhar em ciclos curtos, entregando valor antes de avançar para a próxima etapa.`}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ 9. CTA FINAL ══════════════ */}
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

            <motion.h2
              variants={fadeUp}
              className="text-[clamp(2.2rem,6vw,4.5rem)] font-semibold leading-[1.0] text-ink text-balance tracking-tight"
            >
              Sua empresa não precisa crescer{" "}
              <span className="font-serif italic font-normal text-primary-deep">carregando mais peso.</span>
            </motion.h2>

            <motion.p variants={fadeUp} className="mt-6 text-[17px] text-ink-soft leading-[1.75] max-w-lg">
              Identifique o que está consumindo energia da sua operação, antes que vire um problema maior.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-start gap-4">
              <div className="relative inline-flex">
                <motion.a
                  href={import.meta.env.VITE_QUIZ_URL || "https://wa.me/5511954388833"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group btn-shine inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-flow"
                >
                  Fazer Diagnóstico
                </motion.a>
              </div>
              <p className="text-[12px] text-ink-soft/50 font-mono tracking-wide">
                Perguntas rápidas&nbsp;•&nbsp;Sem burocracia&nbsp;•&nbsp;Menos de 5 minutos
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t border-border/40 py-10 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-[12px] text-ink-soft/50">
          <span className="font-mono uppercase tracking-widest">Inteligência Operacional</span>
          <span className="hidden sm:inline text-border">|</span>
          <a href="mailto:contato@feelflow.com.br" className="hover:text-ink-soft transition-colors">contato@feelflow.com.br</a>
          <span className="hidden sm:inline text-border">|</span>
          <span>© {new Date().getFullYear()} FeelFlow</span>
        </div>
      </footer>

      {/* ── WhatsApp flutuante ── */}
      <a
        href="https://wa.me/5511954388833"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale pelo WhatsApp (abre em nova aba)"
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
