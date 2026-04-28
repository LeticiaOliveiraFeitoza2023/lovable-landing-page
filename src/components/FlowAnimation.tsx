import { motion } from "framer-motion";

/**
 * FlowAnimation
 * Conceito: do caos ao fluxo. Nós espalhados (improviso) convergem
 * traçando o "F" da logo FeelFlow — um caminho contínuo —
 * pulsam e voltam ao caos. Loop infinito.
 */
const FlowAnimation = () => {
  // Caminho do "F" da logo (orgânico, curvo): 16 nós ao longo do contorno
  // viewBox 0 0 480 540 — F centralizado
  const order = [
    // topo arredondado descendo pela direita
    { x: 330, y: 60 },
    { x: 370, y: 100 },
    { x: 380, y: 150 },
    // descida pela lateral direita até a curva
    { x: 350, y: 200 },
    // travessa do meio (a "barra" horizontal do F)
    { x: 280, y: 220 },
    { x: 220, y: 220 },
    { x: 165, y: 230 },
    // ponto de junção / coluna principal descendo
    { x: 230, y: 280 },
    { x: 245, y: 330 },
    { x: 250, y: 380 },
    // base curvada do F
    { x: 240, y: 430 },
    { x: 215, y: 470 },
    { x: 175, y: 485 },
    // curva interna superior (recanto do F)
    { x: 195, y: 110 },
    { x: 165, y: 160 },
    { x: 195, y: 175 },
  ];

  // Posições iniciais "caos" — espalhadas
  const chaos = [
    { x: 60, y: 80 }, { x: 410, y: 50 }, { x: 50, y: 200 },
    { x: 430, y: 230 }, { x: 90, y: 320 }, { x: 380, y: 310 },
    { x: 30, y: 430 }, { x: 200, y: 30 }, { x: 440, y: 420 },
    { x: 130, y: 480 }, { x: 350, y: 480 }, { x: 70, y: 140 },
    { x: 410, y: 150 }, { x: 270, y: 90 }, { x: 100, y: 380 },
    { x: 360, y: 380 },
  ];

  // Conexões traçando o caminho do F (sequência contínua + curva interna)
  const edges: Array<[number, number]> = [
    // arco superior do F
    [0, 1], [1, 2], [2, 3],
    // travessa do meio
    [3, 4], [4, 5], [5, 6],
    // coluna descendo
    [6, 7], [7, 8], [8, 9], [9, 10],
    // base curvada
    [10, 11], [11, 12],
    // curva interna (o "recorte" do F)
    [0, 13], [13, 14], [14, 15], [15, 5],
    // reforços de fluxo
    [4, 7],
  ];

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 480 540"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(142 80% 65%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(142 71% 50%)" stopOpacity="0.5" />
          </linearGradient>
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(142 80% 65%)" />
            <stop offset="100%" stopColor="hsl(158 60% 22%)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges desenhando o F */}
        <g filter="url(#glow)">
          {edges.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={order[a].x}
              y1={order[a].y}
              x2={order[b].x}
              y2={order[b].y}
              stroke="url(#edgeGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 9,
                times: [0, 0.45, 0.72, 1],
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </g>

        {/* Partículas viajando pelo caminho do F */}
        {edges.slice(0, 13).map(([a, b], i) => (
          <motion.circle
            key={`p-${i}`}
            r="3"
            fill="hsl(142 85% 75%)"
            filter="url(#glow)"
            animate={{
              cx: [order[a].x, order[b].x],
              cy: [order[a].y, order[b].y],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4 + i * 0.18,
              repeatDelay: 7,
            }}
          />
        ))}

        {/* Nós: caos -> formam o F -> voltam ao caos */}
        {chaos.map((c, i) => (
          <g key={i}>
            <motion.circle
              r="12"
              fill="hsl(142 71% 50% / 0.18)"
              animate={{
                cx: [c.x, order[i].x, order[i].x, c.x],
                cy: [c.y, order[i].y, order[i].y, c.y],
                r: [6, 12, 12, 6],
                opacity: [0.3, 1, 1, 0.3],
              }}
              transition={{
                duration: 9,
                times: [0, 0.4, 0.72, 1],
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.04,
              }}
            />
            <motion.circle
              r="5"
              fill="url(#nodeGrad)"
              filter="url(#glow)"
              animate={{
                cx: [c.x, order[i].x, order[i].x, c.x],
                cy: [c.y, order[i].y, order[i].y, c.y],
              }}
              transition={{
                duration: 9,
                times: [0, 0.4, 0.72, 1],
                repeat: Infinity,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.04,
              }}
            />
          </g>
        ))}

        {/* Labels que alternam */}
        <motion.text
          x="240"
          y="525"
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
          y="525"
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
