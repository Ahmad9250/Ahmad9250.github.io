'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const RESUME_HREF =
  '/Ahmad_Jawad_Full_Stack_Developer_4+_Years_Pakistan.pdf';

const LAYERS = [
  { id: 'client', label: 'Client', tech: 'Angular' },
  { id: 'api', label: 'API', tech: 'PHP / Laravel' },
  { id: 'app', label: 'Application', tech: 'Full-Stack' },
  { id: 'db', label: 'Database', tech: 'MySQL' },
  { id: 'infra', label: 'Infrastructure', tech: 'AWS · Docker' },
];

function ArchitecturePanel() {
  return (
    <aside className={styles.visual} aria-hidden="true">
      <div className={styles.visualFrame}>
        <div className={styles.visualHeader}>
          <span className={styles.visualDots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.visualTitle}>production.pipeline</span>
          <span className={styles.visualStatus}>
            <span className={styles.liveDot} />
            System Online
          </span>
        </div>

        <div className={styles.visualBody}>
          <div className={styles.pipeline}>
            {LAYERS.map((layer, i) => (
              <div key={layer.id} className={styles.layerBlock} style={{ ['--i' as string]: i }}>
                <div className={styles.layerCard}>
                  <span className={styles.layerIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className={styles.layerText}>
                    <span className={styles.layerLabel}>{layer.label}</span>
                    <span className={styles.layerTech}>{layer.tech}</span>
                  </div>
                  <span className={styles.layerNode} />
                </div>
                {i < LAYERS.length - 1 && (
                  <div className={styles.connector}>
                    <span className={styles.connectorLine} />
                    <span className={styles.packet} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.techRail}>
            {['PHP', 'Laravel', 'Angular', 'MySQL', 'AWS', 'Docker'].map((t, i) => (
              <span key={t} className={styles.techChip} style={{ ['--i' as string]: i }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.visualFooter}>
          <span>latency · optimized</span>
          <span>deploy · stable</span>
        </div>
      </div>
    </aside>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.classList.add(styles.loaded);
      return;
    }

    const id = requestAnimationFrame(() => {
      el.classList.add(styles.loaded);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.accentGlow} aria-hidden="true" />
      <div className={styles.accentGlowSecondary} aria-hidden="true" />

      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span className={styles.statusDot} aria-hidden="true" />
            <span>Available for projects</span>
            <span className={styles.divider} aria-hidden="true" />
            <span>Islamabad, PK</span>
          </div>

          <div className={styles.nameBlock}>
            <span className={styles.name}>Ahmad Jawad</span>
            <span className={styles.titleSlash}>/</span>
            <span className={styles.role}>Full-Stack Developer</span>
          </div>

          <h1 className={styles.headline}>
            <span className={styles.line}>
              <span className={styles.lineInner}>I architect systems</span>
            </span>
            <span className={styles.line}>
              <span className={styles.lineInner}>
                that <em className={styles.em}>perform</em>
              </span>
            </span>
            <span className={styles.line}>
              <span className={styles.lineInner}>under production pressure.</span>
            </span>
          </h1>

          <p className={styles.desc}>
            4+ years building scalable web applications, resilient backends, and
            optimized database architectures with PHP, Laravel, and modern
            JavaScript.
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => scrollToSection('#work')}
              className={styles.primaryBtn}
              data-cursor="VIEW"
            >
              <span>View Selected Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <a
              href={RESUME_HREF}
              download
              className={styles.secondaryBtn}
              data-cursor="VIEW"
            >
              Download Resume
            </a>
          </div>

          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Experience</span>
              <span className={styles.metaValue}>4+ Years</span>
            </div>
            <div className={styles.metaSep} aria-hidden="true" />
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Focus</span>
              <span className={styles.metaValue}>Backend & Full-Stack</span>
            </div>
            <div className={styles.metaSep} aria-hidden="true" />
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Primary Stack</span>
              <span className={styles.metaValue}>PHP / Laravel / Angular</span>
            </div>
          </div>
        </div>

        <ArchitecturePanel />
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
