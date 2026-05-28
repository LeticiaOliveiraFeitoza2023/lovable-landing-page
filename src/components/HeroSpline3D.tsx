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

      {/* Vinheta light mode — oval radial, sem bordas visíveis */}
      {!darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              /* Máscara oval principal — funde todos os lados suavemente */
              "radial-gradient(ellipse 88% 80% at 50% 48%, transparent 30%, rgba(242,248,246,0.25) 52%, rgba(238,246,244,0.65) 68%, #F7F8F7 85%)",
              /* Reforço no topo para colar no header */
              "linear-gradient(to bottom, #F7F8F7 0%, transparent 16%)",
              /* Reforço na base para fundir com próxima seção */
              "linear-gradient(to top, #F7F8F7 0%, transparent 20%)",
            ].join(", "),
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
