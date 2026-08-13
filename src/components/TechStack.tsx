'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './TechStack.module.css';

const STACK_LAYERS = [
  {
    label: 'Languages',
    items: ['PHP', 'JavaScript', 'Python', 'C/C++'],
    level: 0,
  },
  {
    label: 'Frameworks',
    items: ['Laravel', 'CodeIgniter', 'Angular'],
    level: 1,
  },
  {
    label: 'Data Layer',
    items: ['MySQL', 'REST APIs', 'Database Design'],
    level: 2,
  },
  {
    label: 'CMS',
    items: ['WordPress', 'Custom Themes', 'Plugins'],
    level: 3,
  },
  {
    label: 'Infrastructure',
    items: ['AWS', 'Docker', 'CI/CD', 'Git', 'GitHub'],
    level: 4,
  },
];

export default function TechStack() {
  const ref = useScrollReveal();

  return (
    <section className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={`${styles.eyebrow} animate-reveal`}>Engineering Stack</span>
          <h2 className={`${styles.title} animate-reveal stagger-1`}>
            The tools behind the systems.
          </h2>
        </div>

        <div className={`${styles.stack} animate-reveal stagger-2`}>
          {STACK_LAYERS.map((layer, i) => (
            <div key={layer.label} className={styles.layer}>
              <div className={styles.layerLabel}>
                <span className={styles.layerNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{layer.label}</span>
              </div>
              <div className={styles.layerItems}>
                {layer.items.map((item) => (
                  <span key={item} className={styles.item}>
                    {item}
                  </span>
                ))}
              </div>
              {i < STACK_LAYERS.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <svg width="2" height="32" viewBox="0 0 2 32" fill="none" aria-hidden="true">
                    <line x1="1" y1="0" x2="1" y2="32" stroke="var(--color-border-light)" strokeWidth="1" strokeDasharray="4 4" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
