import { useEffect, useRef, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (event: MediaQueryListEvent) => setReduced(event.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.01) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: '180px 0px 180px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, reducedMotion]);

  return { ref, isVisible };
}

export function useScrollParallax(speed = 0.14) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      setOffset(0);
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const el = containerRef.current;
      if (!el || window.innerWidth < 768) {
        setOffset(0);
        return;
      }
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const delta = (elementCenter - viewportCenter) * speed;
      const clamped = Math.max(-72, Math.min(72, delta));
      setOffset(clamped);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [speed, reducedMotion]);

  return { containerRef, offset };
}
