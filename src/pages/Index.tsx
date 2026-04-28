import logo from "@/assets/feelflow-logo.png";
import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-ink overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="FeelFlow" className="h-8 w-auto" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
            <a href="#dor" className="hover:text-ink transition-colors">Diagnóstico</a>
            <a href="#solucao" className="hover:text-ink transition-colors">Solução</a>
            <a href="#processo" className="hover:text-ink transition-colors">Processo</a>
            <a href="#para-quem" className="hover:text-ink transition-colors">Para quem</a>
          </div>
          <a href="#cta-final" className="group inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-ink text-background hover:bg-primary hover:text-primary-foreground transition-all">
            Conversar
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-40 pb-32 px-6 lg:px-10">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <motion.div
          className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full pointer-events-none"
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-glow/15 blur-3xl rounded-full pointer-events-none"
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0], scale: [1, 0.9, 1.1, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary-deep mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Estruturação operacional para empresas em crescimento
              </motion.div>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] font-semibold text-balance tracking-tight">
                {[
                  <>Sua empresa cresceu.</>,
                  <span className="font-serif italic font-normal text-primary-deep">Mas a operação</span>,
                  <span className="font-serif italic font-normal text-primary-deep">não acompanhou.</span>,
                ].map((line, i) => (
                  <motion.span
                    key={i}
                    className="block overflow-hidden"
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="mt-10 text-lg md:text-xl text-ink-soft max-w-2xl leading-relaxed"
              >
                A FeelFlow reorganiza operações que funcionam no improviso — estruturando processos, conectando sistemas e eliminando o excesso de trabalho manual para que o negócio cresça com mais clareza, controle e eficiência.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <motion.a
                  href="#cta-final"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center gap-3 bg-ink text-background px-7 py-4 rounded-full text-base font-medium hover:bg-primary hover:text-primary-foreground transition-colors shadow-elevated hover:shadow-flow"
                >
                  Quero entender onde minha operação trava
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, delay: 0.1 } },
                }}
                className="mt-5 text-sm text-ink-soft/80 max-w-md"
              >
                Uma conversa estratégica para identificar gargalos e oportunidades na sua operação.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="lg:col-span-4 hidden lg:flex justify-center"
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-flow blur-3xl opacity-40 rounded-full"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <img src={logo} alt="" className="relative w-72 h-72 object-contain" />
              </motion.div>
            </motion.div>
          </div>

          {/* metric strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border"
          >
            {[
              { k: "Decisões", v: "centralizadas" },
              { k: "Retrabalho", v: "constante" },
              { k: "Visibilidade", v: "limitada" },
              { k: "Operação", v: "no limite" },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="space-y-1"
              >
                <div className="text-xs uppercase tracking-widest text-ink-soft/60">Sintomas</div>
                <div className="text-lg">
                  <span className="text-ink-soft">{s.k}</span>{" "}
                  <span className="font-serif italic text-primary-deep">{s.v}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DOR */}
      <section id="dor" className="relative py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <span className="text-xs uppercase tracking-widest text-primary-deep font-medium">01 — Diagnóstico</span>
                <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
                  Se a operação <span className="font-serif italic font-normal text-primary-deep">depende demais de você</span>, ela ainda não está estruturada.
                </h2>
              </div>
            </div>
            <div className="lg:col-span-7 lg:pt-4">
              <p className="text-lg text-ink-soft leading-relaxed">
                Com o crescimento, a operação fica mais pesada.
              </p>
              <div className="mt-8 space-y-4 text-lg text-ink leading-relaxed">
                <p>Processos começam a se perder.</p>
                <p>A equipe executa, mas sem clareza.</p>
                <p>Informações ficam espalhadas.</p>
                <p>E você vira o ponto de controle de tudo.</p>
              </div>

              <div className="mt-14 pt-10 border-t border-border">
                <p className="text-sm uppercase tracking-widest text-ink-soft/70 mb-8">No dia a dia, isso aparece como:</p>
                <ul className="space-y-5">
                  {[
                    "decisões centralizadas",
                    "retrabalho constante",
                    "falta de visibilidade",
                    "tarefas manuais que não deveriam existir",
                    "sensação de que tudo funciona… mas no limite",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <span className="font-mono text-xs text-primary-deep/60 mt-2 w-8">0{i + 1}</span>
                      <Minus className="w-5 h-5 text-primary mt-1.5 shrink-0" />
                      <span className="text-lg text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUEBRA DE CRENÇA */}
      <section className="relative py-32 px-6 lg:px-10 bg-surface-dark text-background overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-3xl animate-flow" />
        </div>
        <div className="max-w-5xl mx-auto relative text-center">
          <span className="text-xs uppercase tracking-widest text-primary font-medium">02 — Quebra de crença</span>
          <h2 className="mt-8 text-5xl md:text-7xl font-semibold leading-[1] text-balance">
            O problema não é <span className="text-background/40">esforço.</span>
            <br />
            É <span className="font-serif italic font-normal text-primary">estrutura.</span>
          </h2>
          <div className="mt-16 max-w-2xl mx-auto space-y-6 text-lg md:text-xl text-background/70 leading-relaxed">
            <p>
              A maioria das empresas tenta resolver isso trabalhando mais, cobrando mais ou adicionando ferramentas.
            </p>
            <p>
              Mas sem organização, qualquer solução vira mais uma camada de complexidade.
            </p>
            <p className="text-background pt-6 text-2xl md:text-3xl font-serif italic">
              O que falta não é tecnologia.
              <br />
              É uma forma melhor de operar.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section id="solucao" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest text-primary-deep font-medium">03 — Solução</span>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              A FeelFlow <span className="font-serif italic font-normal text-primary-deep">organiza e moderniza</span> a forma como sua empresa funciona.
            </h2>
            <p className="mt-8 text-lg text-ink-soft leading-relaxed max-w-2xl">
              Nós analisamos sua operação, identificamos onde estão os gargalos e estruturamos um funcionamento mais claro, fluido e eficiente.
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { t: "Organização de processos", d: "Mapeamento e desenho de fluxos com clareza operacional." },
              { t: "Redução de trabalho manual", d: "Eliminamos tarefas repetitivas que consomem o time." },
              { t: "Integração entre sistemas", d: "Sistemas conversando — sem ilhas de informação." },
              { t: "Automação de rotinas", d: "Rotinas executadas com consistência, sem depender de pessoas." },
              { t: "Estruturação de dados", d: "Indicadores que mostram o que importa, no momento certo." },
              { t: "Funciona no dia a dia", d: "Tudo pensado para a realidade — não só para o papel." },
            ].map((c, i) => (
              <div key={i} className="group relative p-8 rounded-3xl bg-card border border-border hover:border-primary/40 transition-all hover:shadow-elevated">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-ink-soft/60">/ {String(i + 1).padStart(2, "0")}</span>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Check className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{c.t}</h3>
                <p className="text-ink-soft leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="relative py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-primary-deep font-medium">04 — Benefícios</span>
              <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] text-balance">
                O que muda quando a operação começa a <span className="font-serif italic font-normal text-primary-deep">funcionar de verdade</span>
              </h2>
            </div>
            <div className="lg:col-span-7">
              <ul className="divide-y divide-border">
                {[
                  "Mais clareza no funcionamento da empresa",
                  "Mais autonomia da equipe",
                  "Menos dependência direta de você",
                  "Menos retrabalho e desperdício",
                  "Mais controle sem precisar microgerenciar",
                  "Mais previsibilidade para crescer",
                ].map((b, i) => (
                  <li key={i} className="py-6 flex items-center gap-6 group">
                    <span className="font-mono text-sm text-ink-soft/50 w-8">0{i + 1}</span>
                    <span className="text-xl md:text-2xl flex-1 group-hover:text-primary-deep transition-colors">{b}</span>
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-20">
            <span className="text-xs uppercase tracking-widest text-primary-deep font-medium">05 — Processo</span>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              Um caminho claro para <span className="font-serif italic font-normal text-primary-deep">sair do improviso</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
              {[
                { n: "01", t: "Entendimento da operação", d: "Compreendemos como sua empresa funciona hoje e onde estão os principais gargalos." },
                { n: "02", t: "Organização estrutural", d: "Definimos processos, fluxos e prioridades com clareza." },
                { n: "03", t: "Implementação", d: "Aplicamos automações, ajustes e sistemas conforme a necessidade da operação." },
                { n: "04", t: "Evolução contínua", d: "A operação passa a ser acompanhada e melhorada com base em dados." },
              ].map((step) => (
                <div key={step.n} className="relative">
                  <div className="relative w-24 h-24 mb-8 mx-auto lg:mx-0">
                    <div className="absolute inset-0 bg-primary rounded-full blur-2xl opacity-30" />
                    <div className="relative w-24 h-24 rounded-full border border-primary/30 bg-background flex items-center justify-center">
                      <span className="font-serif text-3xl text-primary-deep">{step.n}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.t}</h3>
                  <p className="text-ink-soft leading-relaxed">{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AUTORIDADE */}
      <section className="relative py-32 px-6 lg:px-10 bg-surface-dark text-background overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-radial" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-primary font-medium">06 — Autoridade</span>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              Não é sobre adicionar <span className="text-background/40 line-through decoration-primary/60">mais ferramentas.</span>
            </h2>
            <p className="mt-10 text-lg md:text-xl text-background/60 max-w-2xl mx-auto">
              Sem estrutura, qualquer sistema só mascara o problema.
              <br />
              A FeelFlow parte de outra lógica:
            </p>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-px bg-background/10 rounded-3xl overflow-hidden border border-background/10">
            {[
              { a: "Antes de automatizar,", b: "organizar." },
              { a: "Antes de escalar,", b: "estruturar." },
              { a: "Antes de acelerar,", b: "dar clareza." },
            ].map((p, i) => (
              <div key={i} className="bg-surface-dark p-12 text-center">
                <p className="text-background/50 text-sm uppercase tracking-wider mb-4">{p.a}</p>
                <p className="font-serif italic text-4xl md:text-5xl text-primary">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section id="para-quem" className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-widest text-primary-deep font-medium">07 — Para quem é</span>
            <h2 className="mt-6 text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              Para empresas que já perceberam que precisam <span className="font-serif italic font-normal text-primary-deep">ajustar a base</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              "Empresas que cresceram e sentem a operação pesada",
              "Negócios que dependem demais do dono",
              "Equipes que trabalham, mas sem fluxo claro",
              "Operações com retrabalho e falta de padrão",
              "Empresas que querem crescer com mais controle",
            ].map((p, i) => (
              <div key={i} className="p-8 rounded-2xl border border-border bg-card flex items-start gap-5 hover:bg-primary/5 hover:border-primary/30 transition-all">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-primary-deep" strokeWidth={2.5} />
                </div>
                <p className="text-lg leading-snug pt-1.5">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJEÇÃO */}
      <section className="relative py-32 px-6 lg:px-10 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase tracking-widest text-primary-deep font-medium">08 — Objeção</span>
          <h2 className="mt-8 font-serif italic text-5xl md:text-7xl leading-[1.05] text-ink-soft">
            "Mas minha empresa
            <br />
            já funciona."
          </h2>
          <div className="mt-16 max-w-2xl mx-auto space-y-6 text-lg md:text-xl text-ink leading-relaxed">
            <p className="text-3xl font-semibold">Funciona.</p>
            <p className="text-ink-soft">
              A questão é o quanto ela exige de você para continuar funcionando.
            </p>
            <p className="text-ink-soft">
              Se o crescimento depende de esforço constante, existe um limite.
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="cta-final" className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-primary/20 blur-3xl rounded-full" />

        <div className="max-w-5xl mx-auto relative">
          <div className="relative rounded-[2.5rem] bg-surface-dark text-background p-12 md:p-20 overflow-hidden shadow-elevated">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/40 blur-3xl rounded-full animate-flow" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary-glow/30 blur-3xl rounded-full animate-flow" style={{ animationDelay: '3s' }} />

            <div className="relative">
              <span className="text-xs uppercase tracking-widest text-primary font-medium">09 — Próxima etapa</span>
              <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1] text-balance">
                Você já percebeu onde sua operação <span className="font-serif italic font-normal text-primary">precisa melhorar.</span>
              </h2>
              <p className="mt-8 text-xl md:text-2xl text-background/70 max-w-2xl">
                A próxima etapa é estruturar isso da forma certa.
              </p>

              <div className="mt-12">
                <a href="#" className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-5 rounded-full text-lg font-medium hover:bg-primary-glow transition-all shadow-flow">
                  Quero estruturar melhor minha operação
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="mt-5 text-sm text-background/60 max-w-md">
                  Uma conversa direta para entender sua operação e identificar o melhor caminho.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="FeelFlow" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-ink-soft">
            © {new Date().getFullYear()} FeelFlow. Operações que fluem.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
