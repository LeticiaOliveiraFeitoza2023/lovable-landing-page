/**
 * HeroSpline3D.tsx
 * Componente de hero 3D via Spline para a LP v2 da FeelFlow.
 *
 * Metáfora central: "A operação que estava oculta agora fica visível."
 * Conceito: iceberg geométrico facetado em vidro translúcido com tint verde.
 *
 * Como usar:
 *   1. Crie a cena no Spline (spline.design) seguindo o brief abaixo.
 *   2. Publique → copie a URL da cena (termina em .splinecode).
 *   3. Substitua SPLINE_SCENE_URL pela URL copiada.
 *   4. Substitua <HeroImage> por <HeroSpline3D> em IndexDesejo.tsx.
 *
 * Brief de criação (Spline):
 *   - Objeto: iceberg geométrico low-poly, ~12-16 faces visíveis
 *   - Proporção: ~2:3 largura x altura, pico acima e massa abaixo
 *   - Material: glass translúcido, transmission 0.85, roughness 0.1
 *   - Cor do tint: hsl(158 55% 28%) — primary-deep da FeelFlow
 *   - Iluminação principal: ponto abaixo do iceberg, cor verde escuro
 *   - Rim light: branco frio nas arestas superiores
 *   - Background da cena: transparente (export sem background)
 *   - Animação idle: rotação Y de -3 a +3 graus, 8s loop suave
 *   - Animação float: Y de -4px a +4px, 6s loop (breathing)
 *   - Export: Spline → Share → Public URL → copiar .splinecode
 *
 * Peso estimado: 150-250KB | LCP alvo: abaixo de 2.5s em 4G
 */

import { Suspense, lazy, useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import icebergImg from "@/assets/iceberg.jpeg";

// ── Lazy load do Spline para não bloquear o bundle principal ─────────────────
const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * URL da cena Spline.
 * Substituir quando a cena estiver publicada.
 * Formato: https://prod.spline.design/[scene-id]/scene.splinecode
 */
const SPLINE_SCENE_URL = "PLACEHOLDER_SPLINE_SCENE_URL";

const IS_PLACEHOLDER = SPLINE_SCENE_URL === "PLACEHOLDER_SPLINE_SCENE_URL";

// ── Tipos ────────────────────────────────────────────────────────────────────
interface HeroSpline3DProps {
  /** Modo dark (fundo escuro premium). Default: false */
  darkMode?: boolean;
  /** Classe CSS adicional para o container externo */
  className?: string;
}

// ── Fallback estático (imagem iceberg) ───────────────────────────────────────
function StaticFallback({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center ${darkMode ? "bg-[#0a0f0c]" : "bg-background"}`}>
      <img
        src={icebergImg}
        alt=""
        aria-hidden="true"
        className={`w-full h-full object-contain object-center select-none ${darkMode ? "opacity-60" : "opacity-80 mix-blend-multiply"}`}
        draggable={false}
        loading="eager"
      />
    </div>
  );
}

// ── Skeleton de carregamento ─────────────────────────────────────────────────
function SplineSkeleton({ darkMode = false }: { darkMode?: boolean }) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${darkMode ? "bg-[#0a0f0c]" : "bg-background"}`}
      aria-hidden="true"
    >
      {/* Silhueta animada do iceberg */}
      <div className="relative w-[280px] h-[380px] animate-pulse opacity-25">
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(50% 0%, 75% 35%, 95% 45%, 85% 70%, 65% 75%, 80% 90%, 60% 100%, 40% 100%, 20% 90%, 35% 75%, 15% 70%, 5% 45%, 25% 35%)",
            background: darkMode
              ? "linear-gradient(180deg, rgba(158,230,196,0.4) 0%, rgba(22,101,63,0.2) 100%)"
              : "linear-gradient(180deg, rgba(22,101,63,0.15) 0%, rgba(22,101,63,0.05) 100%)",
          }}
        />
      </div>
    </div>
  );
}

// ── Componente principal ─────────────────────────────────────────────────────
export function HeroSpline3D({ darkMode = false, className = "" }: HeroSpline3DProps) {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detectar mobile (abaixo de 768px)
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fallback automático: prefers-reduced-motion, mobile ou placeholder
  const useFallback = prefersReduced || isMobile || IS_PLACEHOLDER || hasError;

  // Handler de carga concluída
  const handleLoad = () => setIsLoaded(true);

  // Handler de erro do Spline
  const handleError = () => {
    console.warn("[HeroSpline3D] Falha ao carregar cena Spline. Usando fallback estático.");
    setHasError(true);
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${darkMode ? "bg-[#0a0f0c]" : "bg-transparent"} ${className}`}
      role="img"
      aria-label="Iceberg geométrico representando a metáfora da operação visível versus oculta"
    >
      {/* Fallback: mobile, prefers-reduced-motion, erro, ou URL ainda placeholder */}
      {useFallback && <StaticFallback darkMode={darkMode} />}

      {/* Spline 3D: desktop, sem reduced motion, URL real */}
      {!useFallback && (
        <Suspense fallback={<SplineSkeleton darkMode={darkMode} />}>
          {/* Skeleton visível enquanto carrega */}
          {!isLoaded && <SplineSkeleton darkMode={darkMode} />}

          <div
            className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          >
            <Spline
              scene={SPLINE_SCENE_URL}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                width: "100%",
                height: "100%",
                background: "transparent",
              }}
            />
          </div>
        </Suspense>
      )}

      {/* Vinheta dark mode: borda superior e inferior para integração com o layout */}
      {darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              "linear-gradient(to bottom, #0a0f0c 0%, transparent 18%, transparent 78%, #0a0f0c 100%)",
              "linear-gradient(to right, #0a0f0c 0%, transparent 12%, transparent 88%, #0a0f0c 100%)",
            ].join(", "),
          }}
        />
      )}

      {/* Vinheta light mode: mesclagem com background off-white */}
      {!darkMode && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: [
              "linear-gradient(to right, #F7F8F7 0%, transparent 9%, transparent 91%, #F7F8F7 100%)",
              "linear-gradient(to bottom, #F7F8F7 0%, transparent 13%, transparent 76%, #F7F8F7 100%)",
            ].join(", "),
          }}
        />
      )}

      {/* Status de desenvolvimento: aviso quando URL é placeholder */}
      {IS_PLACEHOLDER && import.meta.env.DEV && (
        <div className="absolute bottom-4 left-4 z-20 bg-amber-500/90 text-white text-[11px] font-mono px-3 py-1.5 rounded-md backdrop-blur-sm max-w-[320px]">
          [DEV] Crie a cena no Spline e substitua SPLINE_SCENE_URL em HeroSpline3D.tsx
        </div>
      )}
    </div>
  );
}

export default HeroSpline3D;
