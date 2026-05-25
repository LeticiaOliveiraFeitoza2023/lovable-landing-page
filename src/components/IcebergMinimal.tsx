import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────
   ICEBERG MINIMAL — v1
   Design editorial limpo: facetas geométricas angulares, paleta
   monocromática cinza-gelado. Quase se funde ao background, emerge
   sutilmente — como a metáfora pede.

   Paleta sobre #F6F8F7:
   • Face iluminada: quase branco (#F8FAFA)
   • Face sombra:    cinza-teal médio (#B4C8C6)
   • Corpo submerso: oval suave, baixíssima opacidade
   • Linha d'água:   hairline cinza (#C4D0CE)
───────────────────────────────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;
interface Props { className?: string }

export default function IcebergMinimal({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 440 560"
          className="w-full max-w-[420px]"
          aria-hidden="true"
          overflow="visible"
        >
          <defs>
            {/* Gradiente corpo submerso — de cinza-teal suave a transparente */}
            <radialGradient id="gm-sub" cx="50%" cy="35%" r="55%">
              <stop offset="0%"   stopColor="#98BAB6" stopOpacity="0.28"/>
              <stop offset="45%"  stopColor="#A8C4C0" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#B8CECA" stopOpacity="0"/>
            </radialGradient>

            {/* Fade profundidade corpo */}
            <linearGradient id="gm-sub-fade" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%"   stopColor="#fff" stopOpacity="1"/>
              <stop offset="50%"  stopColor="#fff" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#fff" stopOpacity="0"/>
            </linearGradient>
            <mask id="mm-sub-fade">
              <rect x="60" y="270" width="320" height="220" fill="url(#gm-sub-fade)"/>
            </mask>

            {/* Sombra projetada suave */}
            <radialGradient id="gm-drop" cx="50%" cy="20%" r="50%">
              <stop offset="0%"   stopColor="#9ABAB6" stopOpacity="0.14"/>
              <stop offset="100%" stopColor="#9ABAB6" stopOpacity="0"/>
            </radialGradient>

            <filter id="fm-soft"><feGaussianBlur stdDeviation="7"/></filter>
            <filter id="fm-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── Sombra projetada ── */}
          <ellipse cx="224" cy="540" rx="145" ry="13"
            fill="url(#gm-drop)" filter="url(#fm-soft)"/>

          {/* ── Corpo submerso — oval translúcido ── */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            mask="url(#mm-sub-fade)"
          >
            {/* Oval principal */}
            <ellipse cx="222" cy="368" rx="128" ry="94"
              fill="url(#gm-sub)"/>
            {/* Linhas de profundidade internas — estratificação sutil */}
            {[308, 340, 372, 404].map((y, i) => (
              <ellipse key={i}
                cx="222" cy={y} rx={128 - i * 14} ry={8 - i}
                fill="none"
                stroke="#8AACAA"
                strokeWidth="0.5"
                strokeOpacity={0.10 - i * 0.018}
              />
            ))}
          </motion.g>

          {/* ── Waterline ── */}
          <motion.g
            initial={{ opacity: 0, scaleX: 0.04 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            style={{ transformOrigin: "222px 270px" }}
          >
            {/* Sombra d'água */}
            <ellipse cx="222" cy="278" rx="168" ry="7"
              fill="#A0BCBA" fillOpacity="0.08" filter="url(#fm-soft)"/>
            {/* Plano d'água */}
            <ellipse cx="222" cy="270" rx="166" ry="5.5"
              fill="#D8E8E6" fillOpacity="0.55"
              stroke="#C0D0CE" strokeWidth="0.6" strokeOpacity="0.55"/>
            {/* Reflexo brilhante */}
            <ellipse cx="204" cy="268" rx="90" ry="2.5"
              fill="#fff" fillOpacity="0.70"/>
            <ellipse cx="188" cy="267" rx="38" ry="1.2"
              fill="#fff" fillOpacity="0.85"/>
          </motion.g>

          {/* ══ MONTANHA — 3 faces angulares ══
              Silhueta irregular, peak em (222, 22)
              Base na linha d'água y=270

              Face sombra  (esquerda):  cinza-teal médio
              Face centro  (ridge):     cinza muito claro
              Face luz     (direita):   quase branco
          ══════════════════════════════════════ */}
          <motion.g
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.0, ease }}
          >
            {/* Face sombra — esquerda */}
            <path
              d="M 222,22
                 L 205,56  L 178,98  L 160,140
                 L 142,178 L 138,215 L 145,250
                 L 140,270 L 258,270
                 L 252,210 L 244,148 L 238,80
                 Z"
              fill="#B8CAC8"
              fillOpacity="0.82"
            />
            {/* Face central — ridge, levemente mais clara */}
            <path
              d="M 222,22
                 L 238,80  L 244,148 L 252,210 L 258,270
                 L 330,270 L 335,242 L 318,195
                 L 308,150 L 295,100 L 272,58
                 Z"
              fill="#E2EDED"
              fillOpacity="0.88"
            />
            {/* Face luz — direita, quase branca */}
            <path
              d="M 222,22
                 L 272,58  L 295,100 L 308,150
                 L 318,195 L 335,242 L 330,270
                 L 365,270 L 358,235 L 345,188
                 L 340,142 L 322,92  L 298,50
                 L 260,22
                 Z"
              fill="#F4F8F8"
              fillOpacity="0.92"
            />

            {/* Sub-facetas de destaque — pequenos planos iluminados */}
            {/* Topo direito brilhante */}
            <polygon
              points="222,22 260,22 272,58 238,80"
              fill="#FFFFFF" fillOpacity="0.60"
            />
            {/* Faceta lateral direita-alta */}
            <polygon
              points="295,100 322,92 310,132 295,138"
              fill="#FFFFFF" fillOpacity="0.25"
            />
            {/* Faceta esquerda-baixa (sombra mais profunda) */}
            <polygon
              points="138,215 145,250 165,248 158,212"
              fill="#8AACAA" fillOpacity="0.28"
            />

            {/* Hairlines de aresta — definem as faces sem preencher */}
            {/* Aresta principal (ridge direito) */}
            <path
              d="M 222,22 L 238,80 L 244,148 L 252,210 L 258,270"
              fill="none"
              stroke="#C4D4D2"
              strokeWidth="0.7"
              strokeOpacity="0.55"
              strokeLinecap="round"
            />
            {/* Aresta esquerda */}
            <path
              d="M 222,22 L 205,56 L 178,98 L 160,140 L 142,178"
              fill="none"
              stroke="#C4D4D2"
              strokeWidth="0.5"
              strokeOpacity="0.35"
              strokeLinecap="round"
            />
            {/* Linha de estratificação sutil */}
            <line x1="162" y1="158" x2="310" y2="158"
              stroke="#B8CECA" strokeWidth="0.5" strokeOpacity="0.18"/>
            <line x1="152" y1="210" x2="330" y2="210"
              stroke="#B8CECA" strokeWidth="0.5" strokeOpacity="0.12"/>

            {/* Aresta brilhante do pico — cresta iluminada */}
            <path
              d="M 222,22 C 242,55 268,96 282,138"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeOpacity="0.75"
              strokeLinecap="round"
              filter="url(#fm-glow)"
            />
          </motion.g>

          {/* ── Sparkle no pico ── */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: "222px 22px" }}
          >
            {[0, 90, 45, 135].map((deg, i) => {
              const r = i < 2 ? 7.5 : 4.5;
              const rad = (deg * Math.PI) / 180;
              return (
                <line key={i}
                  x1={222 + Math.cos(rad) * r} y1={22 + Math.sin(rad) * r}
                  x2={222 - Math.cos(rad) * r} y2={22 - Math.sin(rad) * r}
                  stroke="#fff"
                  strokeWidth={i < 2 ? "1.6" : "1.0"}
                  strokeOpacity="0.85"
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
