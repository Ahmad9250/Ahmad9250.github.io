'use client';

import { useId, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'What type of websites do you build?',
    a: 'I build production websites and web platforms — corporate sites, service businesses, e-commerce, education platforms, and custom full-stack applications — with a strong focus on performance, reliability, and maintainability.',
  },
  {
    q: 'Do you work on existing websites?',
    a: 'Yes. I regularly improve, extend, and stabilize existing systems — from performance work and bug fixes to feature development, migrations, and infrastructure improvements.',
  },
  {
    q: 'Can you redesign or optimize an existing website?',
    a: 'Absolutely. I can redesign interfaces, improve UX flows, optimize frontend performance, tighten backend queries, and modernize legacy stacks when a full rebuild is not required.',
  },
  {
    q: 'Do you build custom web applications?',
    a: 'Yes. I develop custom web applications with authentication, role-based access, APIs, and database-backed workflows tailored to business requirements.',
  },
  {
    q: 'Do you work with Laravel and PHP?',
    a: 'Yes — PHP and Laravel are core strengths in my stack, alongside CodeIgniter when needed. I also work with modern JavaScript and Angular on the frontend.',
  },
  {
    q: 'Can you handle backend and API development?',
    a: 'Backend and API work is a primary focus: REST APIs, authentication, database design, query optimization, caching, and integration between frontend and server systems.',
  },
  {
    q: 'Can you deploy applications to AWS?',
    a: 'Yes. I have hands-on experience deploying and maintaining applications on AWS EC2 (Ubuntu), configuring IAM permissions, using S3 for backups, and monitoring with CloudWatch — including production deployment for QHMC Pro.',
  },
  {
    q: 'Do you provide maintenance and support?',
    a: 'Yes. I can support production systems after launch — monitoring, backups, bug fixes, performance improvements, and ongoing feature work.',
  },
  {
    q: 'Can you work with WordPress?',
    a: 'Yes. I build and customize WordPress sites, including themes, plugins, SEO-friendly structure, and ongoing maintenance when WordPress is the right fit.',
  },
  {
    q: 'How can I start a project?',
    a: 'Send a message through the contact form, email me, or reach out on WhatsApp with a short overview of your project. I will review the requirements and propose next steps.',
  },
];

export default function FAQ() {
  const ref = useScrollReveal(0.1);
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={`${styles.eyebrow} animate-reveal`}>FAQ</span>
          <h2 className={`${styles.title} animate-reveal stagger-1`}>
            Common questions about working together.
          </h2>
        </div>

        <div className={`${styles.list} animate-reveal stagger-2`}>
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.open : ''}`}
              >
                <h3 className={styles.question}>
                  <button
                    id={buttonId}
                    type="button"
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.icon} aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.panel}
                  aria-hidden={!isOpen}
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
