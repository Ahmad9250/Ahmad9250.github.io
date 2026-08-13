'use client';

import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.left}>
          <span className={styles.name}>Ahmad Jawad</span>
          <span className={styles.role}>Full-Stack Developer</span>
        </div>

        <div>
          <div className={styles.links}>
            <a
              href="https://www.linkedin.com/in/ahmad-jawad-fullstackdeveloper/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Ahmad9250"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a href="mailto:ahmadchohan31@gmail.com">Email</a>
            <a
              href="https://wa.me/923075646406"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div>
          <span className={styles.copyright}>
            &copy; {year} Ahmad Jawad
          </span>
        </div>
      </div>
    </footer>
  );
}
