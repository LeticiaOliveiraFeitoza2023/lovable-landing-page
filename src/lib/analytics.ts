/**
 * analytics.ts — Utilitário de rastreamento de eventos
 *
 * Suporta Google Analytics 4 (gtag) e Google Tag Manager (dataLayer).
 * Para ativar, descomentar o bloco do GA no index.html e substituir G-XXXXXXXXXX.
 *
 * Uso: trackEvent('click_cta_hero', { location: 'hero' })
 */

// Tipos globais para GA4 e GTM
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export type TrackingEvent =
  | 'click_cta_nav'
  | 'click_cta_hero'
  | 'click_cta_como_funciona'
  | 'click_cta_solucao'
  | 'click_cta_final'
  | 'click_whatsapp'
  | 'view_mergulho_form';

export interface TrackingParams {
  location?: string;
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Dispara um evento de conversão para GA4 e/ou GTM.
 * Falha silenciosamente se nenhum dos dois estiver configurado.
 */
export function trackEvent(event: TrackingEvent, params?: TrackingParams): void {
  // GA4 via gtag
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }

  // GTM via dataLayer
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}
