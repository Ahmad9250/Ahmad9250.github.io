import { NextResponse } from 'next/server';

type ContactBody = {
  fullName?: string;
  email?: string;
  company?: string;
  website?: string;
  need?: string;
  message?: string;
  websiteTrap?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot — bots fill this; humans leave it empty
  if (body.websiteTrap && body.websiteTrap.trim()) {
    return NextResponse.json({ ok: true });
  }

  const fullName = body.fullName?.trim() || '';
  const email = body.email?.trim() || '';
  const company = body.company?.trim() || '';
  const website = body.website?.trim() || '';
  const need = body.need?.trim() || '';
  const message = body.message?.trim() || '';

  if (!fullName || !email || !company || !need || message.length < 10) {
    return NextResponse.json(
      { error: 'Please complete all required fields.' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'Contact delivery is not configured. Please email ahmadchohan31@gmail.com directly.',
      },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || 'ahmadchohan31@gmail.com';
  // Use a verified Resend domain in production; onboarding@resend.dev works for testing.
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Ahmad Jawad Portfolio <onboarding@resend.dev>';

  const text = [
    `New portfolio inquiry`,
    '',
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Business / Company: ${company}`,
    `Website: ${website || '—'}`,
    `What do you need?: ${need}`,
    '',
    message,
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `New Portfolio Inquiry — ${fullName}`,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('Resend error:', response.status, detail);
      return NextResponse.json(
        { error: 'Unable to deliver your message. Please try again later.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Unable to deliver your message. Please try again later.' },
      { status: 502 },
    );
  }
}
