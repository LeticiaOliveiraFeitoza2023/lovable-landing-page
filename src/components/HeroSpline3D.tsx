/**
 * HeroSpline3D.tsx — v4 (PNG animado)
 *
 * Substitui o canvas WebGL pelo iceberg PNG de alta qualidade.
 * Animação via framer-motion:
 *   - Flutuação vertical suave (simula balanço da água)
 *   - Oscilação leve no eixo de rotação (sensação de mergulho)
 *   - Prefers-reduced-motion: para a animação automaticamente
 */

import { motion, useReducedMotion } from "framer-motion"
import icebergPng from "@/assets/iceberg-oficial.png"

export interface HeroSpline3DProps {
  darkMode?: boolean
  className?: string
}

export function HeroSpline3D({ darkMode = false, className = "" }: HeroSpline3DProps) {
  const prefersReduced = useReducedMotion()

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${
        darkMode ? "bg-[#0a0f0c]" : "bg-transparent"
      } ${className}`}
      role="img"
      aria-label="Iceberg: metáfora da operação visível e submersa"
    >
      {/* ── Bloom de luz atrás do iceberg ─────────────────────────────── */}
      {!darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              /* Halo de luz solar — clareia a parte de cima */
              "radial-gradient(ellipse 80% 45% at 50% 8%, rgba(255,255,255,0.50) 0%, transparent 100%)",
              /* Bloom central atrás do iceberg */
              "radial-gradient(ellipse 55% 42% at 50% 44%, rgba(255,255,255,0.18) 0%, transparent 100%)",
            ].join(", "),
          }}
        />
      )}

      {/* Iceberg animado */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src={icebergPng}
          alt=""
          aria-hidden="true"
          className="w-full max-w-[660px] lg:max-w-[820px] object-contain select-none"
          draggable={false}
          style={{ mixBlendMode: "multiply" }}
          animate={
            prefersReduced
              ? {}
              : {
                  y:       [0, -14, 0],
                  rotate:  [0, 0.6, -0.4, 0],
                  scaleX:  [1, 1.008, 0.994, 1],
                }
          }
          transition={
            prefersReduced
              ? {}
              : {
                  duration: 6,
                  repeat:   Infinity,
                  ease:     "easeInOut",
                }
          }
        />
      </div>

      {/* Vinheta light mode — oval suave sem cor sólida nas bordas */}
      {!darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse 92% 85% at 50% 50%, transparent 38%, rgba(220,240,235,0.18) 58%, rgba(210,235,228,0.42) 76%, rgba(200,230,220,0.68) 90%)",
          }}
        />
      )}

      {/* Vinheta dark mode */}
      {darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              "linear-gradient(to bottom, #0a0f0c 0%, transparent 20%, transparent 72%, #0a0f0c 100%)",
              "linear-gradient(to right, #0a0f0c 0%, transparent 14%, transparent 86%, #0a0f0c 100%)",
            ].join(", "),
          }}
        />
      )}
    </div>
  )
}

export default HeroSpline3D
