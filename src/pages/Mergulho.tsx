/**
 * Mergulho.tsx — Página de qualificação "Mergulho Operacional™"
 *
 * Formulário multi-step (3 etapas + tela de abertura + confirmação)
 * que captura e qualifica leads da Landing Page.
 *
 * Fluxo: Abertura → Step 1 (empresa) → Step 2 (dores) → Step 3 (contato) → Confirmação
 * POST: /api/leads/mergulho (CRM)
 */

import { useState } from "react";
import logo from "@/assets/Horizontal_2.png";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";

// ─── API base ──────────────────────────────────────────────────────────────────
const CRM_API =
  import.meta.env.VITE_CRM_API_URL ?? "http://localhost:3000";

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1
  empresa: string;
  segmento: string;
  numFuncionarios: string;
  cidade: string;
  // Step 2
  dores: string[];
  tentouAntes: string;
  observacaoLivre: string;
  // Step 3
  nome: string;
  cargo: string;
  email: string;
  celular: string;
  preferenciaContato: string;
}

const EMPTY: FormData = {
  empresa: "", segmento: "", numFuncionarios: "", cidade: "",
  dores: [], tentouAntes: "", observacaoLivre: "",
  nome: "", cargo: "", email: "", celular: "", preferenciaContato: "",
};

// ─── Opções ───────────────────────────────────────────────────────────────────
const SEGMENTOS = [
  "Indústria", "Saúde / Clínicas", "Serviços", "Varejo",
  "Logística", "Construção", "Tecnologia", "Outro",
];
const FUNCIONARIOS = ["1–10 pessoas", "11–50 pessoas", "51–200 pessoas", "Mais de 200 pessoas"];
const FUNC_SLUGS   = ["1-10", "11-50", "51-200", "200+"];

const DORES = [
  { slug: "processos_manuais",       label: "Processos manuais que consomem tempo do time" },
  { slug: "info_na_cabeca",          label: "Informações críticas na cabeça das pessoas ou em planilhas soltas" },
  { slug: "falta_visibilidade",      label: "Falta de visibilidade para tomar decisões com segurança" },
  { slug: "sistema_nao_funcionou",   label: "Já tentamos implementar um sistema — e não funcionou" },
  { slug: "crescimento_sem_processo",label: "A empresa cresceu, mas a operação não acompanhou" },
];

const TENTOU = [
  { slug: "nao",                      label: "Não — estamos buscando uma solução pela primeira vez" },
  { slug: "sim_nao_resolveu",         label: "Sim — já tentamos, mas não resolveu" },
  { slug: "tentando_com_dificuldade", label: "Estamos tentando agora, mas com dificuldade" },
];

const PREFERENCIA = [
  { slug: "whatsapp", label: "WhatsApp" },
  { slug: "email",    label: "E-mail" },
  { slug: "ligacao",  label: "Ligação" },
];

// ─── Animação ─────────────────────────────────────────────────────────────────
const slideIn = {
  initial: { opacity: 0, x: 32 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, x: -32, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Componentes auxiliares ────────────────────────────────────────────────────
function FieldInput({
  label, type = "text", value, onChange, placeholder, required,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-ink/60 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-border bg-white text-ink text-[14.5px] placeholder:text-ink/30 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
      />
    </div>
  );
}

function FieldSelect({
  label, value, onChange, options, placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-ink/60 uppercase tracking-wide">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border border-border bg-white text-[14.5px] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200 ${
          value ? "text-ink" : "text-ink/30"
        }`}
      >
        <option value="" disabled>{placeholder ?? "Selecione…"}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

// ─── Máscara de telefone ────────────────────────────────────────────────────────
function maskPhone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2)  return d.replace(/(\d{0,2})/, "($1");
  if (d.length <= 7)  return d.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  if (d.length <= 11) return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  return v;
}

// ═══════════════════════════════════════════════════════════════
//  PÁGINA PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function Mergulho() {
  const [step, setStep]         = useState<"intro" | 1 | 2 | 3 | "done">("intro");
  const [form, setForm]         = useState<FormData>(EMPTY);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const set = (field: keyof FormData, value: string | string[]) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleDor = (slug: string) =>
    set("dores", form.dores.includes(slug)
      ? form.dores.filter(d => d !== slug)
      : [...form.dores, slug]
    );

  // Validação por step
  const step1Valid = !!form.empresa && !!form.segmento && !!form.numFuncionarios && !!form.cidade;
  const step2Valid = form.dores.length > 0 && !!form.tentouAntes;
  const step3Valid = !!form.nome && !!form.cargo && !!form.email && !!form.celular && !!form.preferenciaContato;

  async function handleSubmit() {
    if (!step3Valid) return;
    setLoading(true);
    setError(null);
    try {
      const segSlug = form.segmento.toLowerCase().replace(/[^a-z]/g, "");
      const funcIdx = FUNCIONARIOS.indexOf(form.numFuncionarios);
      const payload = {
        ...form,
        segmento:        segSlug,
        numFuncionarios: FUNC_SLUGS[funcIdx] ?? "1-10",
      };

      const res = await fetch(`${CRM_API}/api/leads/mergulho`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Erro ao enviar. Tente novamente.");
      }

      setStep("done");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-ink flex flex-col">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="flex items-center justify-center px-6 h-[64px] border-b border-border/40">
        <a href="/" className="flex items-center">
          <img src={logo} alt="FeelFlow" className="h-8 w-auto" />
        </a>
      </nav>

      {/* ── CONTEÚDO ─────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[480px]">

          {/* Barra de progresso */}
          {typeof step === "number" && (
            <div className="flex items-center gap-2 justify-center mb-10">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    s < step ? "bg-primary scale-90" :
                    s === step ? "bg-primary scale-110" : "bg-border"
                  }`} />
                  {s < 3 && <div className={`w-8 h-px transition-all duration-300 ${s < step ? "bg-primary" : "bg-border"}`} />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ─── INTRO ───────────────────────────────────────── */}
            {step === "intro" && (
              <motion.div key="intro" {...slideIn} className="text-center">
                <p className="text-[11px] uppercase tracking-[0.22em] font-medium text-ink/40 mb-6 font-mono">
                  Método Clarear™
                </p>
                <h1 className="text-[clamp(1.6rem,5vw,2.4rem)] font-semibold leading-[1.1] tracking-tight mb-5">
                  Antes de qualquer tecnologia,{" "}
                  <span className="font-serif italic font-normal text-ink/75">
                    queremos entender sua operação.
                  </span>
                </h1>
                <p className="text-[15px] text-ink-soft leading-relaxed mb-10">
                  São 3 minutos. Sem compromisso.<br />O Mergulho começa aqui.
                </p>
                <button
                  onClick={() => setStep(1)}
                  className="group inline-flex items-center gap-2.5 bg-primary text-white px-8 py-4 rounded-full text-[14px] font-semibold hover:bg-primary/90 transition-all duration-200 shadow-[0_4px_24px_rgba(60,191,142,0.3)]"
                >
                  Começar
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            )}

            {/* ─── STEP 1 ──────────────────────────────────────── */}
            {step === 1 && (
              <motion.div key="step1" {...slideIn} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-tight mb-1">
                    Nos conte sobre sua empresa
                  </h2>
                  <p className="text-[14px] text-ink-soft">Etapa 1 de 3</p>
                </div>

                <FieldInput
                  label="Nome da empresa" required
                  value={form.empresa} onChange={v => set("empresa", v)}
                  placeholder="Nome da empresa"
                />
                <FieldSelect
                  label="Segmento" required
                  value={form.segmento} onChange={v => set("segmento", v)}
                  options={SEGMENTOS} placeholder="Qual é o setor?"
                />
                <FieldSelect
                  label="Número de funcionários" required
                  value={form.numFuncionarios} onChange={v => set("numFuncionarios", v)}
                  options={FUNCIONARIOS} placeholder="Quantas pessoas trabalham aí?"
                />
                <FieldInput
                  label="Cidade / Estado" required
                  value={form.cidade} onChange={v => set("cidade", v)}
                  placeholder="Ex: São Paulo, SP"
                />

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!step1Valid}
                    className="group inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-primary/90"
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:enabled:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 2 ──────────────────────────────────────── */}
            {step === 2 && (
              <motion.div key="step2" {...slideIn} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-tight mb-1">
                    O que está travando o crescimento?
                  </h2>
                  <p className="text-[14px] text-ink-soft">Marque tudo que se parece com o que vocês vivem hoje</p>
                </div>

                {/* Checkboxes de dores */}
                <div className="flex flex-col gap-2.5">
                  {DORES.map(d => (
                    <button
                      key={d.slug}
                      onClick={() => toggleDor(d.slug)}
                      className={`flex items-start gap-3 text-left p-3.5 rounded-xl border transition-all duration-200 ${
                        form.dores.includes(d.slug)
                          ? "border-primary bg-primary/5 text-ink"
                          : "border-border bg-white text-ink-soft hover:border-primary/40 hover:text-ink"
                      }`}
                    >
                      <div className={`shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-all duration-200 ${
                        form.dores.includes(d.slug)
                          ? "bg-primary border-primary"
                          : "border-border"
                      }`}>
                        {form.dores.includes(d.slug) && <Check className="w-3 h-3 text-white" strokeWidth={2.5} />}
                      </div>
                      <span className="text-[13.5px] leading-snug">{d.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tentou antes */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-semibold text-ink/60 uppercase tracking-wide">
                    Já tentaram resolver isso antes? <span className="text-red-400">*</span>
                  </label>
                  {TENTOU.map(t => (
                    <button
                      key={t.slug}
                      onClick={() => set("tentouAntes", t.slug)}
                      className={`flex items-center gap-3 text-left p-3 rounded-xl border transition-all duration-200 ${
                        form.tentouAntes === t.slug
                          ? "border-primary bg-primary/5 text-ink"
                          : "border-border bg-white text-ink-soft hover:border-primary/40 hover:text-ink"
                      }`}
                    >
                      <div className={`shrink-0 w-4 h-4 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        form.tentouAntes === t.slug ? "border-primary" : "border-border"
                      }`}>
                        {form.tentouAntes === t.slug && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <span className="text-[13.5px] leading-snug">{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Campo livre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-semibold text-ink/60 uppercase tracking-wide">
                    Quer contar mais alguma coisa? <span className="text-ink/30 font-normal normal-case">(opcional)</span>
                  </label>
                  <textarea
                    value={form.observacaoLivre}
                    onChange={e => set("observacaoLivre", e.target.value)}
                    maxLength={300}
                    rows={3}
                    placeholder="Quanto mais contexto, melhor o diagnóstico."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-ink text-[14px] placeholder:text-ink/30 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-200"
                  />
                  <p className="text-[11px] text-ink/30 text-right">{form.observacaoLivre.length}/300</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!step2Valid}
                    className="group inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-primary/90"
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:enabled:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── STEP 3 ──────────────────────────────────────── */}
            {step === 3 && (
              <motion.div key="step3" {...slideIn} className="flex flex-col gap-6">
                <div>
                  <h2 className="text-[22px] font-semibold tracking-tight mb-1">
                    Como quer que a gente entre em contato?
                  </h2>
                  <p className="text-[14px] text-ink-soft">Etapa 3 de 3</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FieldInput
                    label="Seu nome" required
                    value={form.nome} onChange={v => set("nome", v)}
                    placeholder="Como você se chama?"
                  />
                  <FieldInput
                    label="Cargo" required
                    value={form.cargo} onChange={v => set("cargo", v)}
                    placeholder="Qual é seu cargo?"
                  />
                </div>
                <FieldInput
                  label="E-mail corporativo" type="email" required
                  value={form.email} onChange={v => set("email", v)}
                  placeholder="email@empresa.com"
                />
                <FieldInput
                  label="WhatsApp" type="tel" required
                  value={form.celular}
                  onChange={v => set("celular", maskPhone(v))}
                  placeholder="(00) 00000-0000"
                />

                {/* Preferência de contato */}
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-semibold text-ink/60 uppercase tracking-wide">
                    Prefiro ser contactado por <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2.5">
                    {PREFERENCIA.map(p => (
                      <button
                        key={p.slug}
                        onClick={() => set("preferenciaContato", p.slug)}
                        className={`flex-1 py-2.5 rounded-xl border text-[13.5px] font-medium transition-all duration-200 ${
                          form.preferenciaContato === p.slug
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-white text-ink-soft hover:border-primary/40 hover:text-ink"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="text-[13px] text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-[13.5px] text-ink-soft hover:text-ink transition-colors duration-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Voltar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!step3Valid || loading}
                    className="group inline-flex items-center gap-2.5 bg-primary text-white px-7 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-primary/90 shadow-[0_4px_24px_rgba(60,191,142,0.25)]"
                  >
                    {loading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Enviando…</>
                    ) : (
                      <>Quero meu Mergulho Operacional <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:enabled:translate-x-0.5" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── CONFIRMAÇÃO ─────────────────────────────────── */}
            {step === "done" && (
              <motion.div key="done" {...slideIn} className="text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-[26px] font-semibold tracking-tight mb-3">
                    Seu Mergulho começa agora.
                  </h2>
                  <p className="text-[15px] text-ink-soft leading-relaxed max-w-[340px] mx-auto">
                    Recebemos tudo. Em até 2 horas, alguém do nosso time entra em contato
                    pelo <strong className="text-ink">{
                      form.preferenciaContato === "whatsapp" ? "WhatsApp" :
                      form.preferenciaContato === "email" ? "e-mail" : "telefone"
                    }</strong> para dar o próximo passo.
                  </p>
                </div>
                <div className="w-full max-w-[340px] bg-background border border-border rounded-2xl p-5 text-left">
                  <p className="text-[11px] uppercase tracking-wide text-ink/40 font-medium mb-3">Enquanto isso</p>
                  <p className="text-[13.5px] text-ink-soft leading-relaxed italic">
                    "Clareza operacional antes de qualquer tecnologia."
                  </p>
                  <p className="text-[12px] text-ink/40 mt-1">— Método Clarear™</p>
                </div>
                <a
                  href="/"
                  className="text-[14px] text-primary font-medium hover:underline transition-all"
                >
                  Conhecer o Método Clarear™ →
                </a>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="flex items-center justify-center gap-3 px-6 py-5 border-t border-border/40">
        <p className="text-[12px] text-ink/30">
          Seus dados estão protegidos pela LGPD
        </p>
        <span className="text-ink/20">·</span>
        <a
          href="/privacidade"
          className="text-[12px] text-ink/30 hover:text-ink/60 transition-colors duration-200 underline underline-offset-2"
        >
          Política de Privacidade
        </a>
      </footer>

    </div>
  );
}
