'use client';

import { useState, useEffect } from 'react';

/** Section IDs that drive active nav (must exist in the DOM). */
export const SECTION_IDS = [
  'hero',
  'work',
  'about',
  'expertise',
  'experience',
  'education',
  'faq',
  'contact',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Scroll-spy with sticky header offset.
 * Picks the last section whose top has crossed the header marker.
 */
export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('hero');

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const headerOffset = 96;
      const marker = window.scrollY + headerOffset;
      let current: SectionId = 'hero';

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top - 8 <= marker) current = id;
      }

      const doc = document.documentElement;
      const nearBottom =
        window.innerHeight + window.scrollY >= doc.scrollHeight - 100;
      if (nearBottom) current = 'contact';

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return active;
}
