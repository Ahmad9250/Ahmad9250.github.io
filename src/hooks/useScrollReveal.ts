'use client';

import { useEffect, useRef, useCallback } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealAll = () => {
      const children = el.querySelectorAll('.animate-reveal');
      children.forEach((child) => child.classList.add('revealed'));
      if (el.classList.contains('animate-reveal')) {
        el.classList.add('revealed');
      }
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin: '0px 0px -50px 0px',
    });

    const children = el.querySelectorAll('.animate-reveal');
    children.forEach((child) => observer.observe(child));
    if (el.classList.contains('animate-reveal')) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [threshold, handleIntersection]);

  return ref;
}
