/**
 * HeroSpline3D.tsx — v2 React Three Fiber
 *
 * Iceberg 3D geométrico para o hero da LP v2 (IndexDesejo).
 * Substitui a dependência de Spline por geometria nativa Three.js.
 *
 * Características:
 *   - Pico angular (cone 5 lados) com material vítreo #34D399
 *   - Corpo submerso (cilindro) maior que o pico — verde escuro opaco
 *   - Linha d'água sutil (disco translúcido)
 *   - Rotação Y suave contínua via useFrame
 *   - Flutuação vertical (bob) sincronizada
 *   - Mobile / prefers-reduced-motion → fallback SVG (IcebergLight)
 *   - Fundo transparente (Canvas alpha: true)
 */

import { useRef, useEffect, useState, Suspense } from "react"
import { useReducedMotion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"
import IcebergLight from "./IcebergLight"

// ── Paleta ──────────────────────────────────────────────────────────────────
const EMERALD_PEAK   = "#34D399"  // verde translúcido — pico
const EMERALD_BODY   = "#064E3B"  // verde escuro opaco — corpo submerso
const EMERALD_RIM    = "#6EE7B7"  // borda iluminada
const WATERLINE_CLR  = "#A7F3D0"  // linha d'água

// ── Geometria do iceberg ─────────────────────────────────────────────────────
function IcebergMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef   = useRef<THREE.Group>(null)
  const floatRef   = useRef(0)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Rotação suave no eixo Y (~0.6 rpm)
    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.22
    }
    // Flutuação sutil no eixo Y (breathing)
    floatRef.current += delta * 0.45
    groupRef.current.position.y = Math.sin(floatRef.current) * 0.12
  })

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>

      {/* ── Pico (acima da waterline) ─────────────────────────────────────── */}
      {/* ConeGeometry: radiusBottom, height, segmentsRadial                   */}
      {/* 5 segmentos = pentagonal = facetas angulares                          */}
      <mesh
        position={[0, 2.6, 0]}
        rotation={[0, 0.45, 0]}
        castShadow
      >
        <coneGeometry args={[1.85, 4.8, 5, 1, false]} />
        <meshPhysicalMaterial
          color={EMERALD_PEAK}
          transmission={0.55}
          roughness={0.08}
          metalness={0.05}
          thickness={1.2}
          ior={1.45}
          transparent
          opacity={0.82}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Waterline — disco plano na linha d'água ──────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <circleGeometry args={[2.05, 40]} />
        <meshStandardMaterial
          color={WATERLINE_CLR}
          transparent
          opacity={0.22}
          roughness={0.0}
          metalness={0.7}
        />
      </mesh>

      {/* Halo sutil ao redor da waterline */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.05, 2.55, 40]} />
        <meshStandardMaterial
          color={WATERLINE_CLR}
          transparent
          opacity={0.08}
          roughness={0.0}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* ── Corpo submerso — maior que o pico (metáfora correta) ─────────── */}
      {/* CylinderGeometry: radiusTop, radiusBottom, height, segments          */}
      {/* 6 segmentos = hexagonal = facetas angulares                           */}
      <mesh position={[0, -4.2, 0]} rotation={[0, 0.2, 0]}>
        <cylinderGeometry args={[2.0, 1.55, 8.0, 6, 1, false]} />
        <meshStandardMaterial
          color={EMERALD_BODY}
          roughness={0.45}
          metalness={0.18}
          flatShading
        />
      </mesh>

      {/* Fundo plano do corpo (fecha a geometria embaixo) */}
      <mesh position={[0, -8.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.55, 6]} />
        <meshStandardMaterial
          color={EMERALD_BODY}
          roughness={0.45}
          metalness={0.18}
          flatShading
        />
      </mesh>
    </group>
  )
}

// ── Cena Three.js completa ───────────────────────────────────────────────────
function IcebergScene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <>
      {/* Ambiente geral — suave */}
      <ambientLight intensity={0.55} color="#ffffff" />

      {/* Luz principal de cima-direita */}
      <directionalLight
        position={[4, 8, 4]}
        intensity={2.2}
        color="#ffffff"
      />

      {/* Luz de contorno esquerda — tint verde */}
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.65}
        color={EMERALD_RIM}
      />

      {/* Luz de baixo — reflexo da água */}
      <pointLight
        position={[0, -3.5, 2.5]}
        intensity={1.8}
        color={EMERALD_PEAK}
        distance={14}
        decay={2}
      />

      {/* Leve luz traseira para rim no pico */}
      <pointLight
        position={[0, 5, -4]}
        intensity={0.7}
        color="#d1fae5"
        distance={12}
        decay={2}
      />

      {/* Environment map para reflexos realistas no material glass */}
      <Suspense fallback={null}>
        <Environment preset="forest" />
      </Suspense>

      <IcebergMesh reducedMotion={reducedMotion} />
    </>
  )
}

// ── Tipos do componente principal ────────────────────────────────────────────
interface HeroSpline3DProps {
  /** Modo dark (#0a0f0c). Default: false */
  darkMode?: boolean
  /** Classe CSS adicional */
  className?: string
}

// ── Componente principal exportado ───────────────────────────────────────────
export function HeroSpline3D({ darkMode = false, className = "" }: HeroSpline3DProps) {
  const prefersReduced = useReducedMotion()
  const [isMobile, setIsMobile]  = useState(false)
  const [isReady,  setIsReady]   = useState(false)

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    update()
    window.addEventListener("resize", update, { passive: true })
    // Pequeno delay para evitar flash no SSR / hydration
    const t = setTimeout(() => setIsReady(true), 50)
    return () => {
      window.removeEventListener("resize", update)
      clearTimeout(t)
    }
  }, [])

  const useSvgFallback = prefersReduced || isMobile

  return (
    <div
      className={`absolute inset-0 overflow-hidden ${darkMode ? "bg-[#0a0f0c]" : "bg-transparent"} ${className}`}
      role="img"
      aria-label="Iceberg 3D: metáfora da operação visível e submersa"
    >
      {/* Fallback SVG — mobile ou prefers-reduced-motion */}
      {useSvgFallback && (
        <div className="absolute inset-0 flex items-center justify-center">
          <IcebergLight className="w-full max-w-[300px] opacity-70" />
        </div>
      )}

      {/* Canvas R3F — desktop, sem prefers-reduced-motion */}
      {!useSvgFallback && isReady && (
        <Canvas
          camera={{ position: [0, 1.2, 12], fov: 36 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
          dpr={[1, 1.5]}
        >
          <IcebergScene reducedMotion={!!prefersReduced} />
        </Canvas>
      )}

      {/* ── Vinheta dark mode ── */}
      {darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              "linear-gradient(to bottom, #0a0f0c 0%, transparent 18%, transparent 75%, #0a0f0c 100%)",
              "linear-gradient(to right, #0a0f0c 0%, transparent 14%, transparent 86%, #0a0f0c 100%)",
            ].join(", "),
          }}
        />
      )}

      {/* ── Vinheta light mode — funde com #F7F8F7 ── */}
      {!darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              "linear-gradient(to right, #F7F8F7 0%, transparent 10%, transparent 90%, #F7F8F7 100%)",
              "linear-gradient(to bottom, #F7F8F7 0%, transparent 14%, transparent 72%, #F7F8F7 100%)",
            ].join(", "),
          }}
        />
      )}
    </div>
  )
}

export default HeroSpline3D
