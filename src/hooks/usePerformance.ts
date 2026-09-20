import { useEffect, useState } from 'react';

export type PerformanceTier = 'high' | 'medium' | 'low';

export function usePerformanceTier(): PerformanceTier {
  const [tier, setTier] = useState<PerformanceTier>('high');

  useEffect(() => {
    const detect = (): PerformanceTier => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return 'low';

      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const isTablet = window.matchMedia('(max-width: 1024px)').matches;

      if (isMobile) return 'low';
      if (isTablet) return 'medium';

      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      if (cores <= 4 || memory <= 4) return 'medium';

      if (typeof WebGLRenderingContext !== 'undefined') {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return 'low';
      } else {
        return 'low';
      }

      return 'high';
    };

    setTier(detect());
  }, []);

  return tier;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);
    handler();
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
