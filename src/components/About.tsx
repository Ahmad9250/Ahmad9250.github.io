'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './About.module.css';

const PRINCIPLES = [
  { title: 'Performance-First', description: 'Every query optimized, every endpoint measured, every bottleneck resolved.' },
  { title: 'Production-Grade', description: 'Code that ships reliably and stays reliable under real-world load.' },
  { title: 'Scalable Architecture', description: 'Systems designed to grow with the business, not against it.' },
  { title: 'Clean Maintainability', description: 'Readable code, clear patterns, and documentation that matters.' },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.left}>
          <span className={`${styles.eyebrow} animate-reveal`}>About</span>
          <h2 className={`${styles.statement} animate-reveal stagger-1`}>
            I don&apos;t just write code.<br />
            I build systems that businesses depend on.
          </h2>
        </div>

        <div className={styles.right}>
          <div className={`${styles.bio} animate-reveal stagger-2`}>
            <p>
              With 4+ years of professional experience, I specialize in building and maintaining
              production web applications that prioritize reliability, performance, and maintainability.
              My work spans full-stack development with a strong emphasis on backend architecture
              using PHP, Laravel, and CodeIgniter.
            </p>
            <p>
              From optimizing MySQL queries that cut application response times in half, to migrating
              legacy systems onto modern frameworks, to building CI/CD pipelines that reduce
              post-deployment issues — I focus on the engineering that keeps production systems running smoothly.
            </p>
          </div>

          <div className={`${styles.principles} animate-reveal stagger-3`}>
            <h3 className={styles.principlesTitle}>Engineering Philosophy</h3>
            <div className={styles.principlesGrid}>
              {PRINCIPLES.map((p) => (
                <div key={p.title} className={styles.principle}>
                  <h4 className={styles.principleTitle}>{p.title}</h4>
                  <p className={styles.principleDesc}>{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
