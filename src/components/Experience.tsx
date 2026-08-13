'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Experience.module.css';

const JOBS = [
  {
    company: 'FIDSOR',
    role: 'Full-Stack Web Developer',
    location: 'Islamabad, Pakistan',
    period: 'Jun 2024 — Present',
    current: true,
    achievements: [
      'Built custom backend systems using CodeIgniter/PHP with secure authentication',
      'Developed REST APIs and optimized MySQL database structures',
      'Improved system performance by ~40% through caching and query optimization',
      'Built responsive Angular frontends, reducing page load time by ~35%',
      'Migrated legacy applications to Laravel, reducing application errors by ~45%',
      'Configured and deployed the QHMC Pro platform on AWS EC2 (Ubuntu), covering server environment setup, application deployment, database configuration, IAM permissions, S3-backed application and database backups, and CloudWatch monitoring for infrastructure and application health',
      'Created CI/CD pipelines and used Docker for consistent deployments',
      'Customized WordPress themes and plugins, improving user retention by ~25%',
    ],
  },
  {
    company: 'Massive Dynamics',
    role: 'Full-Stack Web Developer',
    location: 'Islamabad, Pakistan',
    period: 'Dates available on request',
    current: false,
    achievements: [
      'Responsive frontend architecture and development',
      'SEO-friendly WordPress website development',
      'Backend development and website customization',
      'Logo design and branding work',
    ],
  },
  {
    company: 'NaqsTech Digital',
    role: 'Full-Stack Web Developer',
    location: 'Lahore, Pakistan',
    period: 'May 2022 — Mar 2023',
    current: false,
    achievements: [
      'Frontend and backend application development using PHP frameworks',
      'REST API development and frontend/backend integration',
      'Server management and MySQL database administration',
      'Stakeholder collaboration on technical requirements',
    ],
  },
];

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={`${styles.eyebrow} animate-reveal`}>Experience</span>
          <h2 className={`${styles.title} animate-reveal stagger-1`}>
            Building production systems<br />since 2022.
          </h2>
        </div>

        <div className={`${styles.timeline} animate-reveal stagger-2`}>
          {JOBS.map((job) => (
            <div key={job.company} className={styles.job}>
              <div className={styles.jobLeft}>
                <div className={styles.timelineLine}>
                  <div className={`${styles.timelineDot} ${job.current ? styles.current : ''}`} />
                </div>
                <div className={styles.jobPeriod}>
                  <span className={styles.period}>{job.period}</span>
                  <span className={styles.location}>{job.location}</span>
                </div>
              </div>

              <div className={styles.jobRight}>
                <div className={styles.jobHeader}>
                  <h3 className={styles.company}>{job.company}</h3>
                  <span className={styles.role}>{job.role}</span>
                </div>
                <ul className={styles.achievements}>
                  {job.achievements.map((a) => (
                    <li key={a} className={styles.achievement}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
