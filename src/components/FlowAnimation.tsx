import { motion } from "framer-motion";

/**
 * FlowAnimation
 * Conceito: do caos ao fluxo. Nós espalhados (operação no improviso)
 * convergem para uma rede organizada (operação estruturada),
 * pulsam, e voltam ao caos — em loop infinito.
 */
const FlowAnimation = () => {
  // Posições "caos" (aleatórias) e "ordem" (grade fluida) para 12 nós
  const chaos = [
    { x: 40, y: 60 }, { x: 220, y: 30 }, { x: 360, y: 90 },
    { x: 80, y: 180 }, { x: 280, y: 200 }, { x: 410, y: 230 },
    { x: 50, y: 300 }, { x: 200, y: 320 }, { x: 380, y: 350 },
    { x: 120, y: 420 }, { x: 290, y: 440 }, { x: 420, y: 410 },
  ];
  const order = [
    { x: 60, y: 120 }, { x: 180, y: 90 }, { x: 300, y: 110 }, // top flow
    { x: 420, y: 140 },
    { x: 100, y: 230 }, { x: 230, y: 240 }, { x: 360, y: 250 }, // middle flow
    { x: 80, y: 360 }, { x: 210, y: 350 }, { x: 340, y: 360 }, // bottom flow
    { x: 430, y: 340 }, { x: 160, y: 440 },
  ];

  // Conexões da rede organizada
  const edges: Array<[number, number]> = [
    [0, 1], [1, 2], [2, 3],
    [0, 4], [1, 5], [2, 6], [3, 6],
    [4, 5], [5, 6],
    [4, 7], [5, 8], [6, 9], [6, 10],
    [7, 8], [8, 9], [9, 10],
    [8, 11], [7, 11],
  ];

  // Loop: 0% caos -> 35% ordem -> 70% ordem (mantém) -> 100% caos
  const nodeAnim = (c: { x: number; y: number }, o: { x: number; y: number }, i: number) => ({
    cx: [c.x, o.x, o.x, c.x],
    cy: [c.y, o.y, o.y, c.y],
  });

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 480 500"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(142 80% 65%)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="hsl(142 71% 50%)" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(142 80% 65%)" />
            <stop offset="100%" stopColor="hsl(158 60% 22%)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges — só aparecem quando o sistema se organiza */}
        <g filter="url(#glow)">
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={order[a].x}
              y1={order[a].y}
              x2={order[b].x}
              y2={order[b].y}
              stroke="url(#edgeGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 9,
                times: [0, 0.4, 0.7, 1],
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.04,
              }}
            />
          ))}
        </g>

        {/* Partículas viajando pelas conexões (fluxo de informação) */}
        {edges.slice(0, 8).map(([a, b], i) => (
          <motion.circle
            key={`p-${i}`}
            r="2.5"
            fill="hsl(142 80% 65%)"
            filter="url(#glow)"
            animate={{
              cx: [order[a].x, order[b].x],
              cy: [order[a].y, order[b].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3 + i * 0.25,
              repeatDelay: 6.5,
            }}
          />
        ))}

        {/* Nós: caos -> ordem -> caos */}
        {chaos.map((c, i) => (
          <g key={i}>
            <motion.circle
              r="10"
              fill="hsl(142 71% 50% / 0.15)"
              animate={{
                ...nodeAnim(c, order[i], i),
                r: [6, 10, 10, 6],
                opacity: [0.4, 1, 1, 0.4],
              }}
              transition={{
                duration: 9,
                times: [0, 0.4, 0.7, 1],
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
            />
            <motion.circle
              r="4"
              fill="url(#nodeGrad)"
              filter="url(#glow)"
              animate={nodeAnim(c, order[i], i)}
              transition={{
                duration: 9,
                times: [0, 0.4, 0.7, 1],
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.05,
              }}
            />
          </g>
        ))}

        {/* Label sutil que aparece no momento "ordem" */}
        <motion.text
          x="240"
          y="490"
          textAnchor="middle"
          className="fill-primary-deep"
          style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}
          animate={{ opacity: [0, 0, 0.7, 0.7, 0] }}
          transition={{
            duration: 9,
            times: [0, 0.35, 0.45, 0.7, 0.8],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          fluxo organizado
        </motion.text>
        <motion.text
          x="240"
          y="490"
          textAnchor="middle"
          className="fill-ink-soft"
          style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}
          animate={{ opacity: [0.6, 0.6, 0, 0, 0.6] }}
          transition={{
            duration: 9,
            times: [0, 0.2, 0.35, 0.85, 1],
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
