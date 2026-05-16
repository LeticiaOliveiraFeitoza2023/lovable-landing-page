import { useState, useEffect, useRef } from "react";
import logo from "@/assets/Horizontal_2.png";
import leticiaPhoto from "@/assets/leticia.jpg";
import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import IcebergSculpture from "@/components/IcebergSculpture";

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
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const paragraphs = a.split("\n\n");
  return (
    <div className={`border-b border-border/50 last:border-0 ${open ? "bg-primary/[0.015]" : ""} transition-colors duration-300`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-6 group"
      >
        <span className={`text-[15px] font-medium leading-snug transition-colors duration-300 ${open ? "text-ink" : "text-ink-soft group-hover:text-ink"}`}>
          {q}
        </span>
        <span className={`shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <ChevronDown className="w-4 h-4 text-ink-soft/50" />
        </span>
      </button>
      <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? "max-h-96 pb-6" : "max-h-0"}`}>
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
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

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
    <div className="min-h-screen bg-background text-ink overflow-x-hidden">

      {/* ══════════════ NAV ══════════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-background/92 backdrop-blur-xl border-b border-border/40 shadow-[0_1px_0_0_hsl(220_10%_88%/0.6)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img src={logo} alt="FeelFlow" className="h-12 w-auto" style={{ transform: "scale(1.5)", transformOrigin: "left center" }} />
          </a>
          <div className="hidden md:flex items-center gap-10 text-[13px] text-ink-soft font-medium tracking-wide">
            {[
              { href: "#sinais",  label: "Por que trava" },
              { href: "#solucao", label: "O que fazemos" },
              { href: "#etapas",  label: "Como funciona" },
              { href: "#sobre",   label: "Quem faz" },
              { href: "#faq",     label: "Dúvidas frequentes" },
            ].map(link => {
              const id = link.href.slice(1);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative transition-colors duration-200 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-primary after:transition-all after:duration-300
                    ${isActive
                      ? "text-ink after:w-full"
                      : "text-ink-soft hover:text-ink after:w-0 hover:after:w-full"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
          <a
            href="#cta-final"
            className="group btn-shine inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary-glow transition-all duration-300 hover:shadow-green"
          >
            Fazer o Diagnóstico
          </a>
        </div>
      </nav>

      {/* ══════════════ 1. HERO ══════════════ */}
      <section className="relative px-6 lg:px-10 overflow-hidden min-h-[100svh] flex items-center pt-[68px]">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-radial pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full dot-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_65%)]" />
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          <div className="absolute left-0 right-0 top-[30%] h-px bg-border/20" />
          <div className="absolute left-0 right-0 top-[65%] h-px bg-border/15" />
        </div>

        <div className="max-w-7xl mx-auto relative w-full py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-12 xl:gap-16 items-center">

            {/* Texto */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}
            >
              <motion.div variants={fadeIn} className="flex items-center gap-3 mb-10">
                <span className="w-6 h-px bg-primary/60" />
                <span className="text-[11px] uppercase tracking-[0.24em] font-mono font-medium text-primary-deep/70">
                  Inteligência Operacional
                </span>
              </motion.div>

              <h1 className="text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.96] font-semibold tracking-tight text-balance">
                {[
                  <span key="l1">Sua empresa cresceu,</span>,
                  <span key="l2" className="block font-serif italic font-normal text-ink/80 mt-1">
                    mas sem você a operação não anda.
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

              <motion.p variants={fadeUp} className="mt-10 max-w-[520px] text-[17px] text-ink-soft leading-[1.85]">
                A operação já dá sinais. Processos manuais que dependem das pessoas, urgências
                substituindo as prioridades e o crescimento pesando mais do que deveria.{" "}
                <span className="text-ink font-medium">
                  A FeelFlow transforma esses sinais em estrutura.
                </span>
              </motion.p>

              <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row gap-4 items-start">
                <div className="relative inline-flex">
                  {!prefersReduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{ scale: [1, 1.35, 1.35], opacity: [0.35, 0, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                  <motion.a
                    href="#cta-final"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="group btn-shine relative inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green hover:shadow-flow"
                  >
                    Fazer o Diagnóstico
                  </motion.a>
                </div>
                <motion.a
                  href="#etapas"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px] font-medium text-ink-soft border border-border/70 hover:border-border hover:text-ink transition-all duration-200 hover:bg-secondary/60"
                >
                  Ver como funciona
                </motion.a>
              </motion.div>

            </motion.div>

            {/* Iceberg */}
            <motion.div
              className="hidden lg:flex items-center justify-center relative"
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl scale-75 pointer-events-none" />
              <IcebergSculpture className="relative z-10" />
            </motion.div>

          </div>

          {/* Scroll indicator — centrado abaixo do grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex justify-center items-center gap-3 text-ink-soft/40"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
            <span className="text-[11px] uppercase tracking-[0.2em] font-mono">Scroll</span>
          </motion.div>
        </div>
      </section>

      <Rule />

      {/* ══════════════ TESE ══════════════ */}
      <section className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {/* Contraste editorial */}
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-0">
              <div className="md:pr-16 md:border-r border-border/40 pb-12 md:pb-0">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-ink-soft/40 mb-6">
                  O que a maioria vê
                </p>
                <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-ink/32 text-balance">
                  Empresas enxergam{" "}
                  <span className="font-serif italic font-normal">sintomas.</span>
                </h2>
                <ul className="mt-8 space-y-2.5 text-[13px] text-ink-soft/50">
                  {["Urgências constantes", "Gargalos visíveis", "Retrabalho frequente"].map(s => (
                    <li key={s} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-ink-soft/30 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:pl-16 pt-12 md:pt-0">
                <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-primary-deep/60 mb-6">
                  O que a FeelFlow mapeia
                </p>
                <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-balance">
                  A FeelFlow enxerga{" "}
                  <span className="font-serif italic font-normal text-primary-deep">estruturas.</span>
                </h2>
                <ul className="mt-8 space-y-2.5 text-[13px] text-ink-soft">
                  {["Processos que sustentam o problema", "Decisões que criam dependência", "Automações que eliminam o retrabalho"].map(s => (
                    <li key={s} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            <div className="grid lg:grid-cols-3 border-t border-background/10">
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
                  <p className="text-[13px] text-background/40 leading-[1.75] max-w-xs">
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

      {/* ══════════════ 6. ETAPAS ══════════════ */}
      <section id="etapas" className="py-28 lg:py-40 px-6 lg:px-10 bg-background">
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

            {/* Timeline com stagger por etapa */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="relative"
            >
              <div className="hidden lg:block absolute left-6 right-6 top-4 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                {[
                  { n: "01", t: "Priorizamos",            d: "Escolhemos o que hoje mais pesa na operação." },
                  { n: "02", t: "Construímos juntos",     d: "Processos criados com quem executa, não para quem executa." },
                  { n: "03", t: "Colocamos para funcionar", d: "Implementação respeitando a rotina da equipe, sem parar a operação." },
                  { n: "04", t: "Evoluímos",              d: "Acompanhamento contínuo com base no que os dados mostram." },
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
                    <p className="text-[14px] text-ink-soft leading-[1.85]">{step.d}</p>
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
        {/* Foto — invade levemente o lado do texto */}
        <motion.div
          className="absolute right-0 top-0 bottom-0 w-[68%] z-0"
          variants={{
            hidden:  { clipPath: "inset(0 0 100% 0)" },
            visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          <img
            src={leticiaPhoto}
            alt=""
            aria-hidden="true"
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
              <FaqItem
                q="Minha empresa ainda é pequena para pensar nisso?"
                a={`Não. Quando processos começam a depender de pessoas, urgências aumentam e a operação passa a consumir mais energia do que deveria, normalmente já existem sinais suficientes para organizar a base.`}
              />
              <FaqItem
                q="Vou precisar parar a operação para implementar mudanças?"
                a={`Não. As melhorias acontecem respeitando a realidade da empresa e entram aos poucos no fluxo da operação.`}
              />
              <FaqItem
                q="Isso vai criar mais burocracia?"
                a={`Não. O objetivo é simplificar, reduzir ruído e fazer a operação funcionar de forma mais leve.`}
              />
              <FaqItem
                q="Vocês chegam com processos prontos?"
                a={`Não. Cada empresa já possui uma dinâmica, pessoas e desafios diferentes.\n\nA construção acontece junto das lideranças para criar algo que faça sentido no dia a dia e que a equipe realmente consiga aplicar.`}
              />
              <FaqItem
                q="E tecnologia? Vou precisar mudar tudo?"
                a={`Não necessariamente. Tecnologia entra quando faz sentido.\n\nPrimeiro a operação precisa estar clara. Depois avaliamos onde automações e ferramentas realmente ajudam.`}
              />
              <FaqItem
                q="Eu já sei exatamente o que está errado. Ainda faz sentido conversar?"
                a={`Sim. Muitas empresas já sabem o que precisa melhorar.\n\nO desafio normalmente está em transformar esses sinais de modo estruturado e consistente.`}
              />
              <FaqItem
                q="Quanto tempo leva?"
                a={`Depende do momento da empresa e do que precisa ser estruturado.\n\nMas a proposta nunca é criar projetos longos e pesados.`}
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
              Você já sabe o que precisa{" "}
              <span className="font-serif italic font-normal text-primary-deep">melhorar.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-12">
              <div className="relative inline-flex">
                {!prefersReduced && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1.4], opacity: [0.35, 0, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <motion.a
                  href={import.meta.env.VITE_QUIZ_URL || "http://localhost:3016"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="group btn-shine relative inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-flow"
                >
                  Fazer o Diagnóstico
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t border-border/40 py-6 px-6 lg:px-10 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img src={logo} alt="FeelFlow" className="h-12 w-auto opacity-70" style={{ transform: "scale(1.5)", transformOrigin: "left center" }} />
          <div className="flex items-center gap-4 text-[12px] text-ink-soft/50 pr-20">
            <span className="font-mono uppercase tracking-widest">Inteligência Operacional</span>
            <span className="text-border">|</span>
            <span>© {new Date().getFullYear()} FeelFlow</span>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp flutuante ── */}
      <a
        href="https://wa.me/5511954388833"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Fale pelo WhatsApp"
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
