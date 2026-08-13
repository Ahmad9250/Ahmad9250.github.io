'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Expertise.module.css';

const CATEGORIES = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    description: 'Building robust server-side systems and APIs that handle real production workloads.',
    skills: ['PHP', 'Laravel', 'CodeIgniter', 'REST APIs', 'Authentication', 'Caching'],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Creating responsive, performant interfaces that connect seamlessly with backend services.',
    skills: ['JavaScript', 'Angular', 'HTML5', 'CSS3', 'Responsive Design'],
  },
  {
    id: 'database',
    title: 'Database & Data',
    description: 'Designing schemas, optimizing queries, and managing data at scale.',
    skills: ['MySQL', 'Database Design', 'Query Optimization', 'Schema Migration', 'Data Modeling'],
  },
  {
    id: 'cms',
    title: 'CMS & WordPress',
    description: 'Building and customizing content management solutions for diverse requirements.',
    skills: ['WordPress', 'Custom Themes', 'Plugin Development', 'SEO Optimization'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description:
      'Deploying and maintaining production environments with containerization, CI/CD, and practical AWS infrastructure.',
    skills: [
      'AWS EC2',
      'Ubuntu Server Deployment',
      'IAM',
      'S3',
      'CloudWatch',
      'Docker',
      'CI/CD Pipelines',
      'Git / GitHub',
      'Database Backups',
      'Server & Application Monitoring',
    ],
  },
  {
    id: 'workflow',
    title: 'Process & Collaboration',
    description: 'Working effectively within teams using structured methodologies.',
    skills: ['GitHub', 'Agile', 'Scrum', 'Code Review', 'Technical Documentation'],
  },
];

export default function Expertise() {
  const [activeId, setActiveId] = useState('backend');
  const ref = useScrollReveal();

  const active = CATEGORIES.find((c) => c.id === activeId) || CATEGORIES[0];

  return (
    <section id="expertise" className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={`${styles.eyebrow} animate-reveal`}>Expertise</span>
          <h2 className={`${styles.title} animate-reveal stagger-1`}>
            Technical depth across the full stack.
          </h2>
        </div>

        <div className={`${styles.body} animate-reveal stagger-2`}>
          <div className={styles.tabs}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.tab} ${activeId === cat.id ? styles.tabActive : ''}`}
                onClick={() => setActiveId(cat.id)}
              >
                <span className={styles.tabNumber}>
                  {String(CATEGORIES.indexOf(cat) + 1).padStart(2, '0')}
                </span>
                <span className={styles.tabLabel}>{cat.title}</span>
              </button>
            ))}
          </div>

          <div className={styles.detail}>
            <div className={styles.detailContent} key={active.id}>
              <h3 className={styles.detailTitle}>{active.title}</h3>
              <p className={styles.detailDesc}>{active.description}</p>
              <div className={styles.skillsGrid}>
                {active.skills.map((skill) => (
                  <div key={skill} className={styles.skill}>
                    <span className={styles.skillDot} />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
