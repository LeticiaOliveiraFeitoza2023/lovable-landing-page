import { motion } from "framer-motion";

/**
 * FlowAnimation
 * Os nós convergem traçando o "F" da logo FeelFlow:
 * dois paths Bezier suaves (contorno externo + recorte interno)
 * que se desenham no ar e depois revelam pontos pulsando ao longo do traço.
 * Loop infinito: caos → F formado → caos.
 */
const FlowAnimation = () => {
  // Path principal do F — uma única curva contínua e fluida
  // viewBox 0 0 480 600
  // Começa no topo direito, faz arco superior, desce pela direita,
  // entra na travessa do meio, segue para a coluna que desce até a base afilada.
  const fPath =
    "M 330 70 " +
    "C 395 75, 415 130, 405 175 " +     // arco superior arredondado
    "C 395 215, 360 235, 320 240 " +    // descida pela direita até travessa
    "L 230 240 " +                       // travessa horizontal
    "C 200 242, 195 260, 215 285 " +    // dobra orgânica para coluna
    "C 240 320, 255 360, 260 405 " +    // coluna principal descendo
    "C 262 450, 245 490, 210 515 " +    // curva final
    "C 185 532, 155 538, 130 530";      // base afilada

  // Recorte interno do F (a "boca" no canto superior esquerdo)
  const fInnerPath =
    "M 240 110 " +
    "C 215 115, 200 145, 205 175 " +
    "C 208 195, 225 200, 245 195";

  // Nós distribuídos ao longo dos paths (calculados por proporção)
  // Vamos posicionar 18 nós ao longo do path principal e 4 no recorte interno
  const N_MAIN = 18;
  const N_INNER = 4;

  // Posições "ordem" derivadas — pré-calculadas seguindo o path
  const order = [
    // Path principal (arco -> travessa -> coluna -> base)
    { x: 330, y: 70 },
    { x: 365, y: 85 },
    { x: 395, y: 120 },
    { x: 408, y: 160 },
    { x: 402, y: 195 },
    { x: 380, y: 220 },
    { x: 345, y: 235 },
    { x: 305, y: 240 },
    { x: 265, y: 240 },
    { x: 225, y: 245 },
    { x: 215, y: 275 },
    { x: 232, y: 310 },
    { x: 248, y: 350 },
    { x: 258, y: 388 },
    { x: 261, y: 425 },
    { x: 252, y: 465 },
    { x: 228, y: 498 },
    { x: 195, y: 522 },
    { x: 158, y: 533 },
    // Recorte interno
    { x: 230, y: 120 },
    { x: 210, y: 150 },
    { x: 215, y: 180 },
    { x: 240, y: 192 },
  ];

  const TOTAL = order.length;

  // Posições "caos" — espalhadas por toda a área
  const chaos = [
    { x: 50, y: 60 }, { x: 420, y: 40 }, { x: 80, y: 180 }, { x: 440, y: 130 },
    { x: 30, y: 280 }, { x: 460, y: 270 }, { x: 70, y: 400 }, { x: 410, y: 380 },
    { x: 40, y: 500 }, { x: 240, y: 30 }, { x: 380, y: 520 }, { x: 110, y: 560 },
    { x: 450, y: 460 }, { x: 130, y: 90 }, { x: 350, y: 110 }, { x: 60, y: 340 },
    { x: 430, y: 340 }, { x: 200, y: 555 }, { x: 320, y: 565 },
    { x: 100, y: 240 }, { x: 380, y: 200 }, { x: 170, y: 460 }, { x: 300, y: 470 },
  ];

  // Edges traçando o F (sequência ao longo do path principal)
  const mainEdges: Array<[number, number]> = [];
  for (let i = 0; i < N_MAIN; i++) mainEdges.push([i, i + 1]);
  // Edges do recorte interno (índices 19..22)
  const innerStart = N_MAIN + 1;
  const innerEdges: Array<[number, number]> = [
    [innerStart, innerStart + 1],
    [innerStart + 1, innerStart + 2],
    [innerStart + 2, innerStart + 3],
  ];

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 480 600"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="strokeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(142 85% 70%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(142 71% 45%)" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="nodeGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="hsl(142 90% 78%)" />
            <stop offset="100%" stopColor="hsl(158 60% 28%)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Halo do F (espessura visual por trás do path) */}
        <motion.path
          d={fPath}
          stroke="hsl(142 71% 50%)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
          filter="url(#softGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.22, 0.22, 0] }}
          transition={{
            duration: 9,
            times: [0, 0.45, 0.72, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Path principal do F — desenhado com curva real */}
        <motion.path
          d={fPath}
          stroke="url(#strokeGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 9,
            times: [0, 0.45, 0.72, 1],
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
          }}
        />

        {/* Recorte interno do F */}
        <motion.path
          d={fInnerPath}
          stroke="url(#strokeGrad)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1, 1, 0],
            opacity: [0, 0.95, 0.95, 0],
          }}
          transition={{
            duration: 9,
            times: [0, 0.5, 0.72, 1],
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.4,
          }}
        />

        {/* Partículas viajando pelo path principal */}
        {[0, 0.15, 0.32, 0.5, 0.68, 0.85].map((offset, i) => (
          <motion.circle
            key={`flow-${i}`}
            r="3.5"
            fill="hsl(142 95% 80%)"
            filter="url(#glow)"
          >
            <animateMotion
              dur="3.2s"
              repeatCount="indefinite"
              begin={`${4 + offset * 2}s`}
              path={fPath}
              keyPoints="0;1"
              keyTimes="0;1"
            />
          </motion.circle>
        ))}

        {/* Nós: caos -> formam o F -> voltam ao caos */}
        {Array.from({ length: TOTAL }).map((_, i) => {
          const c = chaos[i % chaos.length];
          const o = order[i];
          return (
            <g key={i}>
              <motion.circle
                r="10"
                fill="hsl(142 71% 50% / 0.2)"
                animate={{
                  cx: [c.x, o.x, o.x, c.x],
                  cy: [c.y, o.y, o.y, c.y],
                  r: [5, 10, 10, 5],
                  opacity: [0.3, 0.9, 0.9, 0.3],
                }}
                transition={{
                  duration: 9,
                  times: [0, 0.42, 0.72, 1],
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.035,
                }}
              />
              <motion.circle
                r="4"
                fill="url(#nodeGrad)"
                filter="url(#glow)"
                animate={{
                  cx: [c.x, o.x, o.x, c.x],
                  cy: [c.y, o.y, o.y, c.y],
                }}
                transition={{
                  duration: 9,
                  times: [0, 0.42, 0.72, 1],
                  repeat: Infinity,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.035,
                }}
              />
            </g>
          );
        })}

        {/* Labels que alternam */}
        <motion.text
          x="240"
          y="585"
          textAnchor="middle"
          className="fill-primary-deep"
          style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Inter, sans-serif", fontWeight: 500 }}
          animate={{ opacity: [0, 0, 0.85, 0.85, 0] }}
          transition={{
            duration: 9,
            times: [0, 0.4, 0.5, 0.72, 0.82],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          fluxo
        </motion.text>
        <motion.text
          x="240"
          y="585"
          textAnchor="middle"
          className="fill-ink-soft"
          style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}
          animate={{ opacity: [0.5, 0.5, 0, 0, 0.5] }}
          transition={{
            duration: 9,
            times: [0, 0.25, 0.4, 0.85, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          improviso
        </motion.text>
      </svg>
    </div>
  );
};

export default FlowAnimation;
