/* ─────────────────────────────────────────────────────────────────────────────
   api/contact/route.js  —  Contact form API handler (Next.js App Router)

   This is a mock handler. In production, swap the console.log for:
     - Nodemailer + SMTP
     - Resend / SendGrid SDK
     - Supabase insert into a contacts table

   Accepts POST requests with JSON body: { name, email, message }
   Returns 200 on success, 400 on validation error, 405 on wrong method.
───────────────────────────────────────────────────────────────────────────── */

import { NextResponse } from 'next/server';

/**
 * POST /api/contact
 * Validates and logs the contact form submission.
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // ── Basic validation ─────────────────────────────────────────
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // ── Mock: log to console (replace with email send in production) ──
    console.log('[Contact Form Submission]', { name, email, message });

    // TODO: replace with real email sender — e.g.:
    // await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' });

    return NextResponse.json(
      { success: true, message: 'Thank you! I\'ll be in touch soon.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('[Contact API Error]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

/** Reject non-POST methods */
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
