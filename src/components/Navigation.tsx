'use client';

import { useState, useEffect } from 'react';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/components/ThemeProvider';
import styles from './Navigation.module.css';

/** Mirrors page section order — only sections that exist in the DOM. */
const NAV_LINKS = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Expertise', href: '#expertise', id: 'expertise' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Education', href: '#education', id: 'education' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const active = useActiveSection();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Async so React re-renders keep `loaded` in className (classList alone gets wiped on scroll).
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 0
      : 60;
    const timer = window.setTimeout(() => setLoaded(true), delay);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const isActive = (id: string) => active === id;

  return (
    <>
      <nav
        className={`${styles.nav} ${loaded ? styles.loaded : ''} ${scrolled ? styles.scrolled : ''}`}
        aria-label="Primary"
      >
        <div className={styles.inner}>
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className={styles.logo}
          >
            <span className={styles.logoMark}>AJ</span>
          </a>

          <div className={styles.links}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${styles.link} ${isActive(link.id) ? styles.active : ''}`}
                aria-current={isActive(link.id) ? 'true' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className={styles.rightActions}>
            <button
              type="button"
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
              }
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`${styles.contactBtn} ${isActive('contact') ? styles.contactActive : ''}`}
            >
              Get in Touch
            </a>
          </div>

          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.menuVisible : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <div className={styles.mobileLinks}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`${styles.mobileLink} ${isActive(link.id) ? styles.mobileActive : ''}`}
                style={{
                  transitionDelay: menuOpen ? `${120 + i * 50}ms` : '0ms',
                }}
              >
                <span className={styles.mobileLinkNumber}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.mobileLinkText}>{link.label}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`${styles.mobileLink} ${isActive('contact') ? styles.mobileActive : ''}`}
              style={{
                transitionDelay: menuOpen
                  ? `${120 + NAV_LINKS.length * 50}ms`
                  : '0ms',
              }}
            >
              <span className={styles.mobileLinkNumber}>
                {String(NAV_LINKS.length + 1).padStart(2, '0')}
              </span>
              <span className={styles.mobileLinkText}>Contact</span>
            </a>
          </div>
          <div className={styles.mobileFooter}>
            <button
              type="button"
              className={styles.mobileTheme}
              onClick={toggleTheme}
              aria-label={
                theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
              }
            >
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
            <a href="mailto:ahmadchohan31@gmail.com">ahmadchohan31@gmail.com</a>
            <a href="tel:+923075646406">+92 307 564 6406</a>
          </div>
        </div>
      </div>
    </>
  );
}
