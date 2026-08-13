'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './SelectedWork.module.css';

type Variant = 'hero' | 'split' | 'splitReverse' | 'stacked' | 'band';

interface FeaturedProject {
  num: string;
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  tag: string;
  role: string;
  highlights: string[];
  variant: Variant;
}

interface MoreProject {
  name: string;
  category: string;
  url: string;
  image: string;
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    num: '01',
    name: 'KAPL',
    category: 'Corporate Web Platform',
    description:
      "Full-stack development for KAPL — a professional corporate web platform serving the organization's digital presence in Saudi Arabia.",
    url: 'https://kapl.org.sa/en',
    image: '/projects/kapl.png',
    tag: 'Web Development',
    role: 'Full-Stack Developer',
    highlights: ['Corporate Platform', 'Digital Presence', 'Saudi Arabia'],
    variant: 'hero',
  },
  {
    num: '02',
    name: 'QHMC Pro',
    category: 'Enterprise Application',
    description:
      'Development and optimization of an enterprise management system with secure authentication, role-based access, and streamlined workflows. Deployed and maintained on AWS EC2.',
    url: 'https://qhmcpro.com/login',
    image: '/projects/qhmcpro.png',
    tag: 'Full-Stack Development',
    role: 'Full-Stack Developer',
    highlights: [
      'Secure Authentication',
      'Role-Based Access',
      'AWS Deployment',
    ],
    variant: 'split',
  },
  {
    num: '03',
    name: 'SANA',
    category: 'Non-Profit Platform',
    description:
      "Web development for SANA Online — a digital platform supporting the organization's mission with a focus on accessibility and reach.",
    url: 'https://sanaonline.org/',
    image: '/projects/sana.png',
    tag: 'Web Development',
    role: 'Full-Stack Developer',
    highlights: ['Accessibility', 'Digital Reach'],
    variant: 'splitReverse',
  },
  {
    num: '04',
    name: 'Fixivo',
    category: 'Home Services Platform',
    description:
      'Full-stack development of a UAE-based home and technical services platform, connecting users with essential services through an optimized web experience.',
    url: 'https://fixivo.ae/',
    image: '/projects/fixivo.png',
    tag: 'Full-Stack Development',
    role: 'Full-Stack Developer',
    highlights: ['Service Marketplace', 'UAE', 'Web Platform'],
    variant: 'stacked',
  },
  {
    num: '05',
    name: 'CareMate',
    category: 'Home Maintenance & Technical Services',
    description:
      'Service-business website for home maintenance and technical home services — presenting service categories and quote-request lead generation for customers seeking home support.',
    url: 'https://caremate.ae/',
    image: '/projects/caremate.png',
    tag: 'Web Development',
    role: 'Full-Stack Developer',
    highlights: ['Home Maintenance', 'Technical Services', 'Quote Requests'],
    variant: 'band',
  },
];

const MORE_PROJECTS: MoreProject[] = [
  {
    name: 'Heart Felt Scrubs',
    category: 'E-Commerce',
    url: 'https://heartfeltscrubsaz.com/',
    image: '/projects/heartfeltscrubs.png',
  },
  {
    name: 'Austin Guards Patrol',
    category: 'Business Website',
    url: 'https://austinguardspatrol.com/',
    image: '/projects/austinguardpatrol.png',
  },
  {
    name: 'Write My Courses',
    category: 'Education Platform',
    url: 'https://writemycourses.com/',
    image: '/projects/writemycourses.png',
  },
];

function ProjectCard({ project }: { project: FeaturedProject }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add(styles.revealed);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.revealed);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const variantClass = {
    hero: styles.hero,
    split: styles.split,
    splitReverse: styles.splitReverse,
    stacked: styles.stacked,
    band: styles.band,
  }[project.variant];

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.project} ${variantClass}`}
      data-cursor="VIEW"
    >
      <div className={styles.imageContainer}>
        <Image
          src={project.image}
          alt={`${project.name} — ${project.category}`}
          fill
          sizes={
            project.variant === 'hero' ||
            project.variant === 'stacked' ||
            project.variant === 'band'
              ? '(max-width: 600px) 100vw, 90vw'
              : '(max-width: 900px) 100vw, 60vw'
          }
          className={styles.image}
          priority={project.variant === 'hero'}
          loading={project.variant === 'hero' ? undefined : 'lazy'}
        />
        <div className={styles.imageOverlay} aria-hidden="true" />
      </div>

      <div className={styles.info}>
        <div className={styles.infoTop}>
          <span className={styles.num}>{project.num}</span>
          <span className={styles.slash} aria-hidden="true">
            /
          </span>
          <span className={styles.tag}>{project.tag}</span>
        </div>

        <h3 className={styles.name}>{project.name}</h3>
        <span className={styles.category}>{project.category}</span>
        <p className={styles.desc}>{project.description}</p>

        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Role</span>
            <span className={styles.metaValue}>{project.role}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Scope</span>
            <span className={styles.metaValue}>{project.tag}</span>
          </div>
        </div>

        <div className={styles.highlights}>
          {project.highlights.map((h) => (
            <span key={h} className={styles.highlight}>
              {h}
            </span>
          ))}
        </div>

        <span className={styles.cta}>
          <span>View Live Site</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function SelectedWork() {
  const sectionRef = useScrollReveal(0.08);

  return (
    <section id="work" className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerLeft}>
            <span className={`${styles.eyebrow} animate-reveal`}>
              Selected Work
            </span>
            <h2 className={`${styles.title} animate-reveal stagger-1`}>
              Projects shipped
              <br />
              to production.
            </h2>
          </div>
          <p className={`${styles.subtitle} animate-reveal stagger-2`}>
            Corporate platforms, enterprise systems, and service applications
            built for clients across regions.
          </p>
        </div>

        <div className={styles.featured}>
          {FEATURED_PROJECTS.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>

        <div className={`${styles.moreSection} animate-reveal`}>
          <h3 className={styles.moreLabel}>More Work</h3>
          <div className={styles.moreGrid}>
            {MORE_PROJECTS.map((project, i) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.moreProject}
                data-cursor="VIEW"
              >
                <div className={styles.moreThumb}>
                  <Image
                    src={project.image}
                    alt=""
                    width={52}
                    height={52}
                    className={styles.moreThumbImg}
                    aria-hidden="true"
                  />
                </div>
                <div className={styles.moreContent}>
                  <span className={styles.moreNum}>
                    {String(i + 6).padStart(2, '0')}
                  </span>
                  <div className={styles.moreInfo}>
                    <h4 className={styles.moreName}>{project.name}</h4>
                    <span className={styles.moreCat}>{project.category}</span>
                  </div>
                </div>
                <svg
                  className={styles.moreArrow}
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
