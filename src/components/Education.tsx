'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Education.module.css';

const CERTIFICATIONS = [
  { name: 'Ultimate AWS Certified Solutions Architect Associate', provider: 'Udemy', year: '2026' },
  { name: 'AWS for Beginners', provider: 'Great Learning', year: '2025' },
  { name: 'Data Visualization with Power BI', provider: 'Great Learning', year: '2024' },
  { name: 'Data Visualization in Tableau', provider: 'Great Learning', year: '2023' },
  { name: 'Python for Data Science', provider: 'Great Learning', year: '2023' },
];

export default function Education() {
  const ref = useScrollReveal();

  return (
    <section id="education" className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          <div className={`${styles.educationBlock} animate-reveal`}>
            <span className={styles.eyebrow}>Education</span>
            <div className={styles.degree}>
              <h3 className={styles.degreeTitle}>
                BS Electrical Engineering
              </h3>
              <span className={styles.specialization}>Computer Specialization</span>
              <div className={styles.university}>
                <span className={styles.uniName}>University of Engineering & Technology (UET)</span>
                <span className={styles.uniLocation}>Taxila, Pakistan</span>
                <span className={styles.uniYears}>2017 — 2021</span>
              </div>
            </div>

            <div className={styles.fyp}>
              <span className={styles.fypLabel}>Final Year Project</span>
              <span className={styles.fypName}>IMU-Based Namaz Khushoo Tracker</span>
            </div>

            <div className={styles.coursework}>
              <span className={styles.courseworkLabel}>Relevant Coursework</span>
              <div className={styles.courses}>
                {['DBMS', 'Network Security', 'Microprocessors', 'OOP', 'Data Structures'].map((c) => (
                  <span key={c} className={styles.course}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.certBlock} animate-reveal stagger-2`}>
            <span className={styles.eyebrow}>Certifications</span>
            <div className={styles.certList}>
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className={styles.cert}>
                  <div className={styles.certInfo}>
                    <h4 className={styles.certName}>{cert.name}</h4>
                    <span className={styles.certProvider}>{cert.provider}</span>
                  </div>
                  <span className={styles.certYear}>{cert.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
