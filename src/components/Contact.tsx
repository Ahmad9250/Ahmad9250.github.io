'use client';

import { useState, type FormEvent } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './Contact.module.css';

const RESUME_HREF =
  '/Ahmad_Jawad_Full_Stack_Developer_4+_Years_Pakistan.pdf';

const NEED_OPTIONS = [
  'New Website',
  'Website Redesign',
  'Landing Page',
  'Custom Website',
  'Maintenance / Support',
  'Other',
];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  website: string;
  need: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  fullName: '',
  email: '',
  company: '',
  website: '',
  need: '',
  message: '',
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.company.trim()) {
    errors.company = 'Please enter your business or company.';
  }
  if (!values.need) errors.need = 'Please select what you need.';
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Please share a short project message (at least 10 characters).';
  }
  if (values.website.trim()) {
    try {
      const url = values.website.startsWith('http')
        ? values.website
        : `https://${values.website}`;
      void new URL(url);
    } catch {
      errors.website = 'Please enter a valid website URL.';
    }
  }
  return errors;
}

export default function Contact() {
  const ref = useScrollReveal();
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {},
  );

  const [honeypot, setHoneypot] = useState('');

  const update = (field: keyof FormState, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        const fieldErrors = validate({ ...values, [field]: value });
        if (fieldErrors[field]) next[field] = fieldErrors[field];
        else delete next[field];
        return next;
      });
    }
  };

  const onBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldErrors = validate(values);
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErrors[field]) next[field] = fieldErrors[field];
      else delete next[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({
      fullName: true,
      email: true,
      company: true,
      website: true,
      need: true,
      message: true,
    });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('loading');
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          websiteTrap: honeypot,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error ||
            'Something went wrong sending your message. Please try again.',
        );
      }

      setStatus('success');
      setValues(INITIAL);
      setHoneypot('');
      setTouched({});
      setErrors({});
    } catch (err) {
      setStatus('error');
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong sending your message. Please try again, or email ahmadchohan31@gmail.com.',
      );
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setSubmitError('');
  };

  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          <div className={styles.intro}>
            <span className={`${styles.eyebrow} animate-reveal`}>Let&apos;s Talk</span>
            <h2 className={`${styles.headline} animate-reveal stagger-1`}>
              Have a system that needs to{' '}
              <em className={styles.italic}>scale, stabilize,</em> or start from
              scratch?
            </h2>
            <p className={`${styles.description} animate-reveal stagger-2`}>
              I&apos;m available for full-stack development, backend architecture,
              and technical consulting. Share a few details below and I&apos;ll
              get back to you.
            </p>

            <div className={`${styles.quickLinks} animate-reveal stagger-3`}>
              <a href="mailto:ahmadchohan31@gmail.com" className={styles.quickLink}>
                ahmadchohan31@gmail.com
              </a>
              <a href="tel:+923075646406" className={styles.quickLink}>
                +92 307 564 6406
              </a>
              <a
                href="https://wa.me/923075646406"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.quickLink} ${styles.whatsapp}`}
              >
                WhatsApp
              </a>
              <a
                href={RESUME_HREF}
                download
                className={styles.resumeBtn}
              >
                Download Resume
              </a>
            </div>

            <div className={`${styles.socials} animate-reveal stagger-4`}>
              <a
                href="https://www.linkedin.com/in/ahmad-jawad-fullstackdeveloper/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Ahmad9250"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                GitHub
              </a>
            </div>
          </div>

          <div className={`${styles.formWrap} animate-reveal stagger-2`}>
            {status === 'success' ? (
              <div className={styles.success} role="status">
                <span className={styles.successEyebrow}>Message sent</span>
                <h3 className={styles.successTitle}>Thanks — I&apos;ll get back to you soon.</h3>
                <p className={styles.successText}>
                  Your inquiry was delivered successfully. You can also reach me
                  directly by email or WhatsApp if anything is time-sensitive.
                </p>
                <button type="button" className={styles.secondaryBtn} onClick={resetForm}>
                  Send another message
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={onSubmit} noValidate>
                <div className={styles.formHeader}>
                  <h3 className={styles.formTitle}>Project inquiry</h3>
                  <p className={styles.formNote}>
                    Required fields are marked. Website is optional.
                  </p>
                </div>

                {/* Honeypot — leave empty */}
                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="websiteTrap">Website</label>
                  <input
                    id="websiteTrap"
                    name="websiteTrap"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {status === 'error' && submitError && (
                  <div className={styles.formError} role="alert">
                    {submitError}
                  </div>
                )}

                <div className={styles.grid}>
                  <div className={styles.field}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => update('fullName', e.target.value)}
                      onBlur={() => onBlur('fullName')}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      className={errors.fullName ? styles.invalid : ''}
                      disabled={status === 'loading'}
                    />
                    {errors.fullName && (
                      <span id="fullName-error" className={styles.error}>
                        {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update('email', e.target.value)}
                      onBlur={() => onBlur('email')}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={errors.email ? styles.invalid : ''}
                      disabled={status === 'loading'}
                    />
                    {errors.email && (
                      <span id="email-error" className={styles.error}>
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="company">Business / Company</label>
                    <input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => update('company', e.target.value)}
                      onBlur={() => onBlur('company')}
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                      className={errors.company ? styles.invalid : ''}
                      disabled={status === 'loading'}
                    />
                    {errors.company && (
                      <span id="company-error" className={styles.error}>
                        {errors.company}
                      </span>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="website">
                      Website <span className={styles.optional}>(optional)</span>
                    </label>
                    <input
                      id="website"
                      name="website"
                      type="url"
                      inputMode="url"
                      placeholder="https://"
                      value={values.website}
                      onChange={(e) => update('website', e.target.value)}
                      onBlur={() => onBlur('website')}
                      aria-invalid={!!errors.website}
                      aria-describedby={errors.website ? 'website-error' : undefined}
                      className={errors.website ? styles.invalid : ''}
                      disabled={status === 'loading'}
                    />
                    {errors.website && (
                      <span id="website-error" className={styles.error}>
                        {errors.website}
                      </span>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="need">What do you need?</label>
                  <select
                    id="need"
                    name="need"
                    value={values.need}
                    onChange={(e) => update('need', e.target.value)}
                    onBlur={() => onBlur('need')}
                    aria-invalid={!!errors.need}
                    aria-describedby={errors.need ? 'need-error' : undefined}
                    className={`${!values.need ? styles.selectEmpty : ''} ${errors.need ? styles.invalid : ''}`}
                    required
                    disabled={status === 'loading'}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {NEED_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.need && (
                    <span id="need-error" className={styles.error}>
                      {errors.need}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => update('message', e.target.value)}
                    onBlur={() => onBlur('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={errors.message ? styles.invalid : ''}
                    disabled={status === 'loading'}
                  />
                  {errors.message && (
                    <span id="message-error" className={styles.error}>
                      {errors.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  <span>{status === 'loading' ? 'Sending…' : 'Send Message'}</span>
                  {status !== 'loading' && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className={`${styles.locationBlock} animate-reveal stagger-5`}>
          <div className={styles.locationDot} />
          <span className={styles.locationText}>Islamabad, Pakistan</span>
          <span className={styles.timezone}>PKT (UTC+5)</span>
        </div>
      </div>
    </section>
  );
}
