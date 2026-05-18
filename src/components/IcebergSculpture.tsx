import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   ICEBERG SCULPTURE — v9

   Problema v8: elipse da waterline criava "tampa de barril"
   Corpo retangular + elipse no topo = lata/cilindro

   Solução v9:
   • Corpo TRAPEZOIDAL — mais largo no topo, afunila levemente embaixo
     → quebra a ilusão de cilindro, parece bloco sólido de gelo
   • Waterline RASA (ry=7) e transparente — linha de superfície, não tampa
   • Bordas com irregularidade HORIZONTAL (recortes) em vez de zigzag vertical
   • Montanha ALTA e ESTREITA vs corpo LARGO — proporção real de iceberg
   • Gradiente horizontal no corpo = iluminação de parede, não esfera
   • Sombra esquerda como BORDA ESCURA, não curva (anti-esfera)
───────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
interface Props { className?: string }

export default function IcebergSculpture({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="flex items-center justify-center"
        animate={{ y: [0, -9, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 520 660"
          className="w-full max-w-[460px]"
          aria-hidden="true"
          overflow="visible"
        >
          <defs>
            {/* ── Pico ── */}
            <linearGradient id="g-pk" x1="70%" y1="0%" x2="16%" y2="100%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="1"/>
              <stop offset="55%"  stopColor="#ECF6F5" stopOpacity="0.98"/>
              <stop offset="100%" stopColor="#C2E2E0" stopOpacity="0.96"/>
            </linearGradient>
            <linearGradient id="g-pk-sh" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%"   stopColor="#5A9898" stopOpacity="0.48"/>
              <stop offset="100%" stopColor="#2A6868" stopOpacity="0.06"/>
            </linearGradient>

            {/* ── Corpo: HORIZONTAL — esquerda escura, direita clara ── */}
            <linearGradient id="g-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#052424" stopOpacity="1"/>
              <stop offset="12%"  stopColor="#0B3C3C" stopOpacity="1"/>
              <stop offset="32%"  stopColor="#145858" stopOpacity="1"/>
              <stop offset="58%"  stopColor="#1E7672" stopOpacity="1"/>
              <stop offset="82%"  stopColor="#329690" stopOpacity="0.97"/>
              <stop offset="100%" stopColor="#50B8B2" stopOpacity="0.92"/>
            </linearGradient>

            {/* Borda esquerda escura do corpo — aresta lateral, não curva */}
            <linearGradient id="g-edge-l" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"  stopColor="#011010" stopOpacity="0.65"/>
              <stop offset="100%" stopColor="#011010" stopOpacity="0"/>
            </linearGradient>

            {/* ── Waterline: plano d'água muito raso — linha, não tampa ── */}
            <linearGradient id="g-wl" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.95"/>
              <stop offset="100%" stopColor="#B8E0DE" stopOpacity="0.50"/>
            </linearGradient>

            {/* ── Fade de profundidade ── */}
            <linearGradient id="g-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"  stopColor="#fff" stopOpacity="1"/>
              <stop offset="38%" stopColor="#fff" stopOpacity="1"/>
              <stop offset="62%" stopColor="#fff" stopOpacity="0.42"/>
              <stop offset="80%" stopColor="#fff" stopOpacity="0.04"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
            </linearGradient>
            <mask id="m-depth">
              <rect x="-200" y="255" width="920" height="760" fill="url(#g-fade)"/>
            </mask>

            {/* Filtros */}
            <filter id="f-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="f-soft"><feGaussianBlur stdDeviation="8"/></filter>
            <filter id="f-blur3"><feGaussianBlur stdDeviation="3"/></filter>

            <radialGradient id="g-drop" cx="50%" cy="28%" r="50%">
              <stop offset="0%"   stopColor="#1A6860" stopOpacity="0.20"/>
              <stop offset="100%" stopColor="#1A6860" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ══════════════════════════════════════════════
              CORPO SUBMERSO — TRAPÉZIO
              Topo: x=28 a x=492 = 464px
              Base: x=52 a x=468 = 416px (afunila 24px cada lado)
              → forma natural de bloco de gelo, não cilindro
          ══════════════════════════════════════════════ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
          >
            <ellipse cx="260" cy="648" rx="188" ry="17"
              fill="url(#g-drop)" filter="url(#f-soft)"/>

            <g mask="url(#m-depth)">
              {/*
                Corpo trapezoidal com recortes irregulares NAS BORDAS:
                Topo (y=258): left x=28, right x=492
                Meio (y=500): left x=38, right x=482
                Fundo (y=980): left x=52, right x=468 (off-screen)
                Recortes horizontais nas laterais = textura de pedra/gelo
              */}
              <path
                d="M 28,258
                   L 22,290  L 32,318  L 24,346
                   L 30,374  L 22,402  L 30,430
                   L 26,460  L 34,488  L 30,516
                   L 36,544  L 32,572  L 38,600
                   L 40,650  L 44,750  L 48,900  L 52,980
                   L 468,980
                   L 472,900  L 476,750  L 480,650
                   L 482,600  L 488,572  L 484,544
                   L 490,516  L 486,488  L 494,460
                   L 490,430  L 498,402  L 490,374
                   L 496,346  L 488,318  L 498,290
                   L 492,258 Z"
                fill="url(#g-body)"
              />

              {/* Borda escura esquerda — aresta plana, não curva */}
              <rect x="22" y="258" width="28" height="730"
                fill="url(#g-edge-l)"/>

              {/* Linhas de estratificação */}
              {[330, 400, 468, 535, 600].map((y, i) => (
                <line key={i}
                  x1="22" y1={y} x2="498" y2={y}
                  stroke="#fff" strokeWidth="0.5"
                  strokeOpacity={0.065 - i * 0.008}
                />
              ))}
            </g>
          </motion.g>

          {/* ══════════════════════════════════════════════
              WATERLINE — elipse muito rasa, quase linha
              ry=7 → não parece tampa de barril
          ══════════════════════════════════════════════ */}
          <motion.g
            initial={{ opacity: 0, scaleX: 0.05 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            style={{ transformOrigin: "260px 258px" }}
          >
            {/* Sombra difusa abaixo */}
            <ellipse cx="260" cy="267" rx="240" ry="9"
              fill="#186C68" fillOpacity="0.14" filter="url(#f-blur3)"/>
            {/* Plano d'água */}
            <ellipse cx="260" cy="258" rx="242" ry="7"
              fill="url(#g-wl)"
              stroke="#88C8C8" strokeWidth="0.5" strokeOpacity="0.60"/>
            {/* Reflexo brilhante */}
            <ellipse cx="246" cy="255" rx="130" ry="3"
              fill="#fff" fillOpacity="0.70"/>
            <ellipse cx="228" cy="254" rx="52" ry="1.5"
              fill="#fff" fillOpacity="0.88"/>
          </motion.g>

          {/* ══════════════════════════════════════════════
              PICO ROCHOSO — estreito e alto
              Base: x=154 a x=366 = 212px
              Corpo: 464px → relação 2.2:1
              Altura: 242px
          ══════════════════════════════════════════════ */}
          <motion.g
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.0, ease }}
          >
            <path
              d="M 260,16
                 L 277,50   L 299,87   L 285,118
                 L 313,156  L 334,191  L 318,223
                 L 346,254  L 366,258
                 L 154,258
                 L 174,254  L 202,223  L 186,191
                 L 207,156  L 228,118  L 214,87
                 L 237,50   L 250,16
                 Z"
              fill="url(#g-pk)"
            />
            {/* Sombra face esquerda */}
            <path
              d="M 260,16 L 237,50 L 214,87 L 228,118
                 L 207,156 L 186,191 L 202,223
                 L 174,254 L 154,258 L 260,258 Z"
              fill="url(#g-pk-sh)"
            />
            {/* Facetas iluminadas lado direito */}
            <polygon points="260,16,277,50,  289,44,271,12"  fill="#fff" fillOpacity="0.22"/>
            <polygon points="299,87,285,118, 311,124,325,92"  fill="#fff" fillOpacity="0.16"/>
            <polygon points="334,191,318,223,344,229,358,196" fill="#fff" fillOpacity="0.12"/>
            <polygon points="346,254,366,258,359,249,340,243" fill="#fff" fillOpacity="0.09"/>
            {/* Aresta principal */}
            <path d="M 260,16 C 284,52 312,94 330,140"
              fill="none" stroke="#fff" strokeWidth="2.2"
              strokeOpacity="0.85" strokeLinecap="round"
              filter="url(#f-glow)"/>
            {/* Aresta esquerda */}
            <path d="M 260,16 C 238,54 214,97 198,143"
              fill="none" stroke="#fff" strokeWidth="1.0"
              strokeOpacity="0.36" strokeLinecap="round"/>
            {/* Estratos */}
            <line x1="277" y1="50"  x2="237" y2="50"  stroke="#4A8282" strokeWidth="0.7" strokeOpacity="0.22"/>
            <line x1="285" y1="118" x2="228" y2="118" stroke="#4A8282" strokeWidth="0.7" strokeOpacity="0.15"/>
            <line x1="318" y1="223" x2="202" y2="223" stroke="#4A8282" strokeWidth="0.7" strokeOpacity="0.10"/>
          </motion.g>

          {/* ══════════════════════════════════════════════
              SPARKLE
          ══════════════════════════════════════════════ */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 1.25, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: "260px 16px" }}
          >
            {[0, 90, 45, 135].map((deg, i) => {
              const r = i < 2 ? 8.5 : 5;
              const rad = (deg * Math.PI) / 180;
              return (
                <line key={i}
                  x1={260 + Math.cos(rad) * r} y1={16 + Math.sin(rad) * r}
                  x2={260 - Math.cos(rad) * r} y2={16 - Math.sin(rad) * r}
                  stroke="#fff"
                  strokeWidth={i < 2 ? "1.8" : "1.1"}
                  strokeOpacity="0.92"
                  strokeLinecap="round"
                />
              );
            })}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
