import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   ICEBERG LIGHT — v1
   Versão do IcebergSculpture adaptada para background claro (#F6F8F7).
   Mesma estrutura e formas do original, paleta retonada para tons
   cinza-teal suaves que emergem naturalmente do fundo.
───────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
interface Props { className?: string }

export default function IcebergLight({ className = "" }: Props) {
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
            {/* ── Pico — igual ao original (já é claro) ── */}
            <linearGradient id="gl-pk" x1="70%" y1="0%" x2="16%" y2="100%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="1"/>
              <stop offset="55%"  stopColor="#ECF6F5" stopOpacity="0.98"/>
              <stop offset="100%" stopColor="#C8DCDA" stopOpacity="0.96"/>
            </linearGradient>
            <linearGradient id="gl-pk-sh" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%"   stopColor="#A8C4C2" stopOpacity="0.42"/>
              <stop offset="100%" stopColor="#7AAAA6" stopOpacity="0.04"/>
            </linearGradient>

            {/* ── Corpo submerso — tonalidade cinza-teal CLARA ── */}
            <linearGradient id="gl-body" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#6A9E9A" stopOpacity="0.82"/>
              <stop offset="12%"  stopColor="#7FB0AC" stopOpacity="0.86"/>
              <stop offset="32%"  stopColor="#9CC8C4" stopOpacity="0.88"/>
              <stop offset="58%"  stopColor="#B8DAD6" stopOpacity="0.88"/>
              <stop offset="82%"  stopColor="#D0ECEA" stopOpacity="0.84"/>
              <stop offset="100%" stopColor="#E6F4F2" stopOpacity="0.78"/>
            </linearGradient>

            {/* Aresta esquerda — cinza-teal escuro, não preto */}
            <linearGradient id="gl-edge-l" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#4A8280" stopOpacity="0.48"/>
              <stop offset="100%" stopColor="#4A8280" stopOpacity="0"/>
            </linearGradient>

            {/* Waterline */}
            <linearGradient id="gl-wl" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.92"/>
              <stop offset="100%" stopColor="#C4DCDA" stopOpacity="0.40"/>
            </linearGradient>

            {/* Fade de profundidade */}
            <linearGradient id="gl-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"  stopColor="#fff" stopOpacity="1"/>
              <stop offset="38%" stopColor="#fff" stopOpacity="1"/>
              <stop offset="60%" stopColor="#fff" stopOpacity="0.5"/>
              <stop offset="78%" stopColor="#fff" stopOpacity="0.06"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
            </linearGradient>
            <mask id="ml-depth">
              <rect x="-200" y="255" width="920" height="760" fill="url(#gl-fade)"/>
            </mask>

            <filter id="fl-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="fl-soft"><feGaussianBlur stdDeviation="8"/></filter>
            <filter id="fl-blur3"><feGaussianBlur stdDeviation="3"/></filter>

            <radialGradient id="gl-drop" cx="50%" cy="28%" r="50%">
              <stop offset="0%"   stopColor="#9EC4C0" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#9EC4C0" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Sombra projetada no chão */}
          <ellipse cx="260" cy="648" rx="188" ry="17"
            fill="url(#gl-drop)" filter="url(#fl-soft)"/>

          {/* ── Corpo submerso trapezoidal ── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
          >
            <g mask="url(#ml-depth)">
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
                fill="url(#gl-body)"
              />
              {/* Aresta esquerda suave */}
              <rect x="22" y="258" width="28" height="730"
                fill="url(#gl-edge-l)"/>
              {/* Linhas de estratificação */}
              {[330, 400, 468, 535, 600].map((y, i) => (
                <line key={i}
                  x1="22" y1={y} x2="498" y2={y}
                  stroke="#fff" strokeWidth="0.5"
                  strokeOpacity={0.05 - i * 0.006}
                />
              ))}
            </g>
          </motion.g>

          {/* ── Waterline ── */}
          <motion.g
            initial={{ opacity: 0, scaleX: 0.05 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            style={{ transformOrigin: "260px 258px" }}
          >
            <ellipse cx="260" cy="267" rx="240" ry="9"
              fill="#A8C8C4" fillOpacity="0.10" filter="url(#fl-blur3)"/>
            <ellipse cx="260" cy="258" rx="242" ry="7"
              fill="url(#gl-wl)"
              stroke="#A4C4C0" strokeWidth="0.5" strokeOpacity="0.50"/>
            <ellipse cx="246" cy="255" rx="130" ry="3"
              fill="#fff" fillOpacity="0.65"/>
            <ellipse cx="228" cy="254" rx="52" ry="1.5"
              fill="#fff" fillOpacity="0.82"/>
          </motion.g>

          {/* ── Pico ── */}
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
              fill="url(#gl-pk)"
            />
            <path
              d="M 260,16 L 237,50 L 214,87 L 228,118
                 L 207,156 L 186,191 L 202,223
                 L 174,254 L 154,258 L 260,258 Z"
              fill="url(#gl-pk-sh)"
            />
            <polygon points="260,16,277,50,  289,44,271,12"  fill="#fff" fillOpacity="0.22"/>
            <polygon points="299,87,285,118, 311,124,325,92"  fill="#fff" fillOpacity="0.16"/>
            <polygon points="334,191,318,223,344,229,358,196" fill="#fff" fillOpacity="0.12"/>
            <polygon points="346,254,366,258,359,249,340,243" fill="#fff" fillOpacity="0.09"/>
            <path d="M 260,16 C 284,52 312,94 330,140"
              fill="none" stroke="#fff" strokeWidth="2.2"
              strokeOpacity="0.80" strokeLinecap="round"
              filter="url(#fl-glow)"/>
            <path d="M 260,16 C 238,54 214,97 198,143"
              fill="none" stroke="#fff" strokeWidth="1.0"
              strokeOpacity="0.30" strokeLinecap="round"/>
            <line x1="277" y1="50"  x2="237" y2="50"  stroke="#7AAAA6" strokeWidth="0.7" strokeOpacity="0.18"/>
            <line x1="285" y1="118" x2="228" y2="118" stroke="#7AAAA6" strokeWidth="0.7" strokeOpacity="0.12"/>
            <line x1="318" y1="223" x2="202" y2="223" stroke="#7AAAA6" strokeWidth="0.7" strokeOpacity="0.08"/>
          </motion.g>

          {/* ── Sparkle ── */}
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
                  strokeOpacity="0.88"
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
