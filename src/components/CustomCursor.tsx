'use client';

import { useEffect, useRef, useCallback } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const visible = useRef(false);
  const currentText = useRef('');

  const updateVisibility = useCallback((show: boolean) => {
    visible.current = show;
    if (cursorRef.current) {
      cursorRef.current.style.opacity = show ? '1' : '0';
    }
  }, []);

  const updateText = useCallback((text: string) => {
    if (text === currentText.current) return;
    currentText.current = text;
    const el = cursorRef.current;
    const span = textRef.current;
    if (!el || !span) return;

    if (text) {
      el.classList.add(styles.expanded);
      span.textContent = text;
      span.style.opacity = '1';
    } else {
      el.classList.remove(styles.expanded);
      span.style.opacity = '0';
      span.textContent = '';
    }
  }, []);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || reduceMotion) {
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) updateVisibility(true);
    };

    const onMouseLeave = () => updateVisibility(false);
    const onMouseEnter = () => updateVisibility(true);

    const handleOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]');
      if (t) updateText(t.getAttribute('data-cursor') || '');
    };

    const handleOut = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('[data-cursor]');
      if (t) updateText('');
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleOver, { passive: true });
    document.addEventListener('mouseout', handleOut, { passive: true });

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      cancelAnimationFrame(raf);
    };
  }, [updateVisibility, updateText]);

  return (
    <div ref={cursorRef} className={styles.cursor}>
      <span ref={textRef} className={styles.text} />
    </div>
  );
}
