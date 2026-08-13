'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Impact.module.css';

const METRICS = [
  { value: 45, suffix: '%', label: 'Reduction in Application Errors', prefix: '', icon: '↓' },
  { value: 40, suffix: '%', label: 'Faster Application Performance', prefix: '~', icon: '↑' },
  { value: 25, suffix: '%', label: 'Increase in User Retention', prefix: '', icon: '↑' },
  { value: 40, suffix: '%', label: 'Fewer Post-Deployment Issues', prefix: '', icon: '↓' },
];

function MetricCard({ value, suffix, label, prefix, icon }: {
  value: number;
  suffix: string;
  label: string;
  prefix: string;
  icon: string;
}) {
  const { count, ref } = useCountUp(value, 2400);

  return (
    <div ref={ref} className={styles.metric}>
      <div className={styles.metricIcon}>{icon}</div>
      <div className={styles.number}>
        {prefix}{count}<span className={styles.suffix}>{suffix}</span>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export default function Impact() {
  const ref = useScrollReveal();

  return (
    <section className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={`${styles.header} animate-reveal`}>
          <span className={styles.eyebrow}>Measured Impact</span>
          <h2 className={styles.title}>Results that hold up in production.</h2>
        </div>
        <div className={`${styles.grid} animate-reveal stagger-1`}>
          {METRICS.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </div>
    </section>
  );
}
