/**
 * IndexDark.tsx — v3: Experimento de Hero Dark Premium
 *
 * Rota: /v3
 * Propósito: testar o feel premium com background escuro antes de
 * ter a cena 3D pronta no Spline. Usa o HeroSpline3D (com fallback
 * estático ao iceberg.jpeg sobre fundo dark).
 *
 * Fluxo do conteúdo: mesmo da /v2, com hero reimaginado em dark.
 * Transição: hero dark → seção Tese em background claro (handoff suave).
 *
 * Regra FeelFlow: ZERO travessões em qualquer texto visível.
 */

import { useState, useEffect, useRef } from "react";
import logo from "@/assets/Horizontal_4.png"; // versão clara do logo (branca)
import leticiaPhoto from "@/assets/leticia.jpg";
import icebergImg from "@/assets/iceberg.jpeg";
import { ChevronDown, Settings, Zap, Monitor, BarChart2, Link2, Bot, TrendingUp, RefreshCw, Building2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

/* ─── Motion presets ─── */
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

/* ─── Label chip ─── */
const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`text-[11px] uppercase tracking-[0.22em] font-medium mb-5 font-mono ${light ? "text-white/40" : "text-ink-soft/55"}`}>
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
            <p key={i} className="text-ink/70 leading-[1.7] text-[14px]">{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Animated counter ─── */
function AnimatedNumber({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setVal(to); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, reduced]);

  return <span ref={ref} aria-live="polite" aria-atomic="true">{prefix}{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════
   PAGE — v3 Dark Hero
   ═══════════════════════════════════════════════════ */
export default function IndexDark() {
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen text-ink" style={{ overflowX: "clip" }}>

      {/* ══════════════ NAV DARK ══════════════ */}
      <nav
        aria-label="Navegação principal"
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#0a0f0c]/92 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <a href="#" className="flex items-center">
            {/* Logo branca para fundo dark */}
            <img src={logo} alt="FeelFlow" className="h-14 w-auto" onError={(e) => {
              // fallback para logo padrão se a versão clara não existir
              (e.target as HTMLImageElement).src = "/src/assets/Horizontal_2.png";
            }} />
          </a>
          <a
            href="/mergulho"
            onClick={() => trackEvent('click_cta_nav', { location: 'nav_dark', label: 'Fazer Diagnóstico' })}
            className="hidden md:inline-flex items-center gap-2 text-[14px] font-semibold px-7 py-3.5 rounded-full bg-primary text-white hover:bg-primary-glow transition-all duration-300"
          >
            Fazer Diagnóstico
          </a>
          <a
            href="/mergulho"
            onClick={() => trackEvent('click_cta_nav', { location: 'nav_mobile_dark', label: 'Diagnóstico' })}
            className="md:hidden inline-flex items-center px-5 py-2.5 rounded-full bg-primary text-white text-[13px] font-semibold"
          >
            Diagnóstico
          </a>
        </div>
      </nav>

      {/* ══════════════ 1. HERO DARK ══════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden" style={{ background: "#0a0f0c" }}>

        {/* Névoa verde escura de fundo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(22,101,63,0.35) 0%, transparent 65%)",
              "radial-gradient(ellipse 50% 40% at 20% 60%, rgba(16,78,48,0.2) 0%, transparent 55%)",
              "radial-gradient(ellipse 50% 40% at 80% 40%, rgba(16,78,48,0.15) 0%, transparent 50%)",
            ].join(", "),
          }}
        />

        {/* Grain texture sutil */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px 128px",
          }}
        />

        {/* Iceberg — centralizadono hero, visível imediatamente (sem scrollytelling) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          {/* Glow verde abaixo do iceberg */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[80px] opacity-30"
            style={{ background: "radial-gradient(ellipse at 50% 100%, hsl(158 55% 28% / 1) 0%, transparent 70%)" }}
          />
          {/* Iceberg estático com tint verde e modo de mesclagem */}
          <motion.div
            className="absolute w-full h-full"
            initial={prefersReduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 2.2, ease, delay: 0.3 }}
          >
            <img
              src={icebergImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain object-center select-none"
              draggable={false}
              style={{
                opacity: 0.55,
                filter: "saturate(0.3) brightness(1.4) hue-rotate(120deg)",
                mixBlendMode: "screen",
              }}
            />
            {/* Versão sólida com blend diferente para dar profundidade */}
            <img
              src={icebergImg}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain object-center select-none"
              draggable={false}
              style={{
                opacity: 0.2,
                filter: "saturate(0) brightness(2)",
                mixBlendMode: "overlay",
              }}
            />
          </motion.div>
        </div>

        {/* Vinheta dark: fade lateral e inferior para integrar o iceberg */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-[5]"
          style={{
            background: [
              "linear-gradient(to right, #0a0f0c 0%, transparent 15%, transparent 85%, #0a0f0c 100%)",
              "linear-gradient(to bottom, #0a0f0c 0%, transparent 22%, transparent 68%, #0a0f0c 100%)",
            ].join(", "),
          }}
        />

        {/* Texto do hero */}
        <motion.div
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-[68px] text-center"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } } }}
        >
          {/* Badge premium */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/50">
              Transformação Operacional
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[clamp(2rem,5.5vw,4.4rem)] leading-[1.06] font-semibold tracking-tight text-center mx-auto max-w-[740px]">
            {[
              <span key="l1" className="text-white/90">Empresas que crescem</span>,
              <span key="l2" className="text-white/90">
                sem travar{" "}
                <span className="font-serif italic font-normal" style={{ color: "hsl(145 65% 62%)" }}>têm operações</span>
              </span>,
              <span key="l3" className="font-serif italic font-normal" style={{ color: "hsl(145 65% 62%)" }}>
                que trabalham por elas.
              </span>,
            ].map((line, i) => (
              <motion.span
                key={i}
                className="block overflow-hidden pb-1"
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } },
                }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtítulo */}
          <motion.p
            variants={fadeUp}
            className="mt-8 md:mt-12 mx-auto max-w-[560px] text-[15px] md:text-[17px] text-white/45 leading-[1.8] text-center"
          >
            As melhores operações não surgem por acaso.{" "}
            <span className="text-white/70 font-medium">
              Elas são construídas com método, intenção e as ferramentas certas.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.a
              href="/mergulho"
              onClick={() => trackEvent('click_cta_hero', { location: 'hero_dark', label: 'Fazer Diagnóstico' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green"
            >
              Fazer Diagnóstico
            </motion.a>
            <motion.a
              href="#como-funciona"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-[14px] font-medium text-white/40 hover:text-white/70 transition-colors duration-200 px-4 py-3.5"
            >
              Ver como funciona
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.8}>
                <path d="M2 7h10M8 3l4 4-4 4"/>
              </svg>
            </motion.a>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex justify-center opacity-30"
            aria-hidden="true"
          >
            <motion.div
              animate={prefersReduced ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5 text-white/50" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Transição para seção clara abaixo */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #F7F8F7 100%)",
          }}
        />
      </section>

      {/* ══════════════ RESTANTE DA LP (fundo claro) ══════════════
          A partir daqui, reutiliza o conteúdo da /v2.
          O hero dark faz a transição suave para o background off-white.
      */}
      <div className="bg-background">

        {/* ── Tese Mobile (simplificada) ── */}
        <section className="py-16 px-6 max-w-3xl mx-auto text-center md:hidden">
          <Label>A Tese</Label>
          <p className="text-[17px] text-ink/75 leading-[1.85]">
            A FeelFlow mapeia o que está travando sua operação e entrega um sistema que funciona — com processos, automação e IA trabalhando juntos.
          </p>
        </section>

        {/* ── Sinais ── */}
        <section id="sinais" className="py-20 lg:py-28 px-6 max-w-5xl mx-auto">
          <Label>Você está aqui</Label>
          <h2 className="text-[clamp(1.6rem,3.8vw,2.8rem)] font-semibold tracking-tight leading-[1.1] max-w-[620px] mb-14">
            Sua empresa cresceu. Sua operação ainda não acompanhou.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: <Settings className="w-4 h-4" />, title: "Cada processo depende de você", desc: "Decisões simples travam sem sua presença. Nenhum processo roda sozinho." },
              { icon: <Zap className="w-4 h-4" />, title: "Automação que não automatiza", desc: "Ferramentas espalhadas. Integrações quebradas. Mais trabalho manual do que antes." },
              { icon: <Monitor className="w-4 h-4" />, title: "Sem visibilidade em tempo real", desc: "Você descobre o problema depois que o cliente já reclamou." },
              { icon: <BarChart2 className="w-4 h-4" />, title: "Relatórios que chegam tarde", desc: "Dados de semanas atrás. Decisões baseadas em intuição, não em números." },
              { icon: <Link2 className="w-4 h-4" />, title: "Times que trabalham em paralelo", desc: "Cada área com seu próprio sistema. Informação que não conversa." },
              { icon: <Bot className="w-4 h-4" />, title: "IA que virou mais uma ferramenta", desc: "Prompts soltos sem estratégia. Resultados inconsistentes. Potencial desperdiçado." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease }}
                className="p-6 rounded-2xl border border-border/50 bg-surface hover:border-primary/30 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-[14px] font-semibold text-ink mb-2">{item.title}</h3>
                <p className="text-[13px] text-ink/60 leading-[1.65]">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Rule />

        {/* ── Stats ── */}
        <section className="py-20 lg:py-24 px-6">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-12 text-center">
            {[
              { value: 67, suffix: "%", label: "das empresas operam com processos improvisados", prefix: "" },
              { value: 3, suffix: "x", label: "mais rápidas chegam às metas com operação estruturada", prefix: "" },
              { value: 40, suffix: "%", label: "do tempo dos líderes vai para tarefas que poderiam ser automatizadas", prefix: "" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease }}
              >
                <p className="text-[clamp(2.8rem,6vw,4.5rem)] font-semibold tracking-tight text-primary leading-none">
                  <AnimatedNumber to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-[13px] text-ink/60 leading-[1.65] max-w-[200px] mx-auto">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Rule />

        {/* ── Como funciona ── */}
        <section id="como-funciona" className="py-20 lg:py-28 px-6 max-w-5xl mx-auto">
          <Label>Como funciona</Label>
          <h2 className="text-[clamp(1.6rem,3.8vw,2.8rem)] font-semibold tracking-tight leading-[1.1] max-w-[560px] mb-6">
            Um diagnóstico que revela o que está oculto.
          </h2>
          <p className="text-[15px] text-ink/65 max-w-[500px] leading-[1.8] mb-14">
            O Mergulho Operacional é uma sessão de 60 minutos onde mapeamos sua operação e identificamos exatamente onde ela está travando o seu crescimento.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {[
              { step: "01", title: "Você preenche o formulário", desc: "Conte sobre sua operação, seus desafios e onde você quer chegar. Leva menos de 5 minutos." },
              { step: "02", title: "Nós mergulhamos fundo", desc: "Nossa equipe analisa sua operação antes da reunião. Chegamos preparados, não de mãos vazias." },
              { step: "03", title: "Você recebe clareza", desc: "Uma visão honesta do que está travando seu crescimento e os próximos passos concretos para mudar." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.7, ease }}
                className="flex gap-5"
              >
                <span className="text-[11px] font-mono text-primary/60 mt-1 shrink-0">{item.step}</span>
                <div>
                  <h3 className="text-[15px] font-semibold text-ink mb-2">{item.title}</h3>
                  <p className="text-[13px] text-ink/60 leading-[1.7]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <a
            href="/mergulho"
            onClick={() => trackEvent('click_cta_como_funciona', { location: 'como_funciona_dark', label: 'Quero meu Mergulho Operacional' })}
            className="inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green"
          >
            Quero meu Mergulho Operacional
          </a>
        </section>

        <Rule />

        {/* ── Letícia ── */}
        <section className="py-20 lg:py-28 px-6 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="shrink-0">
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden border-2 border-primary/20">
                <img src={leticiaPhoto} alt="Letícia Feitoza, fundadora da FeelFlow" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <Label>Quem está do outro lado</Label>
              <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-semibold tracking-tight leading-[1.15] mb-5">
                Letícia Feitoza, fundadora da FeelFlow
              </h2>
              <p className="text-[15px] text-ink/70 leading-[1.8] mb-5 max-w-[540px]">
                Construí a FeelFlow depois de perceber que a maioria das empresas que crescem continuam funcionando no improviso. Não por falta de vontade, mas porque ninguém nunca mostrou como uma operação estruturada realmente funciona.
              </p>
              <p className="text-[15px] text-ink/70 leading-[1.8] max-w-[540px]">
                O Mergulho Operacional é a primeira conversa honesta sobre o que está travando o seu crescimento, sem jargão, sem promessa vazia.
              </p>
            </div>
          </div>
        </section>

        <Rule />

        {/* ── FAQ ── */}
        <section className="py-20 lg:py-28 px-6 max-w-3xl mx-auto">
          <Label>Perguntas frequentes</Label>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.4rem)] font-semibold tracking-tight leading-[1.1] mb-12">
            Antes de se inscrever
          </h2>
          <div className="divide-y divide-border/50">
            {[
              { q: "Isso é uma consultoria paga?", a: "O Mergulho Operacional é uma sessão de diagnóstico gratuita. Você sai com clareza sobre o que está travando sua operação, sem compromisso." },
              { q: "Quanto tempo leva?", a: "A sessão dura em média 60 minutos. Você preenche o formulário (5 min), nós analisamos sua operação, e marcamos a reunião dentro de até 3 dias úteis." },
              { q: "Para que tipo de empresa faz sentido?", a: "Para empresas de 5 a 200 funcionários que cresceram mas ainda operam no improviso. Se você sente que a operação não acompanhou o crescimento, é para você." },
              { q: "O que acontece depois do Mergulho?", a: "Você recebe um diagnóstico honesto. Se fizer sentido continuar, apresentamos uma proposta personalizada. Nenhuma pressão, nenhum roteiro de venda agressivo." },
              { q: "Posso participar de qualquer setor?", a: "Sim. Já trabalhamos com clínicas, indústrias, varejo, serviços e tecnologia. O método se adapta ao seu contexto operacional." },
            ].map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} id={String(i)} />
            ))}
          </div>
        </section>

        <Rule />

        {/* ── CTA Final ── */}
        <section className="py-20 lg:py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Label>Próximo passo</Label>
            <h2 className="text-[clamp(1.8rem,4.5vw,3.2rem)] font-semibold tracking-tight leading-[1.1] mb-6">
              Sua operação pode{" "}
              <span className="font-serif italic font-normal text-primary-deep">trabalhar por você.</span>
            </h2>
            <p className="text-[15px] text-ink/65 max-w-[480px] mx-auto leading-[1.8] mb-10">
              O Mergulho Operacional é o primeiro passo. Uma sessão de 60 minutos que revela exatamente o que está impedindo o seu crescimento.
            </p>
            <motion.a
              href="/mergulho"
              onClick={() => trackEvent('click_cta_final', { location: 'cta_final_dark', label: 'Iniciar meu Mergulho Operacional' })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-primary text-white px-9 py-4 rounded-full text-[15px] font-semibold hover:bg-primary-glow transition-all duration-300 shadow-green"
            >
              Iniciar meu Mergulho Operacional
            </motion.a>
            <p className="mt-5 text-[12px] text-ink/35">
              Gratuito. Sem compromisso. Sem roteiro de venda.
            </p>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-border/40 py-10 px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <img src="/src/assets/Horizontal_2.png" alt="FeelFlow" className="h-9 w-auto opacity-50" />
            <div className="flex items-center gap-4 text-[12px] text-ink/30">
              <a href="mailto:contato@feelflow.com.br" className="hover:text-ink/60 transition-colors">
                contato@feelflow.com.br
              </a>
              <span>·</span>
              <a href="/privacidade" className="hover:text-ink/60 transition-colors underline underline-offset-2">
                Política de Privacidade
              </a>
            </div>
            <p className="text-[12px] text-ink/20">
              © {new Date().getFullYear()} FeelFlow. Todos os direitos reservados.
            </p>
          </div>
        </footer>

      </div>

      {/* Botão flutuante WhatsApp */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('click_whatsapp', { location: 'floating_dark' })}
        aria-label="Falar pelo WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  );
}
