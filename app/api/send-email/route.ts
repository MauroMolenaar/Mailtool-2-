import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('📨 Nieuwe mailpoging');
  console.log('Ontvanger:', body.to);
  console.log('Onderwerp:', body.subject);
  console.log('Bericht:', body.message);
  console.log('API KEY:', process.env.RESEND_API_KEY);

  try {
    const data = await resend.emails.send({
      from: 'noreply@mailtool.com',
      to: body.to,
      subject: body.subject,
      html: `<p>${body.message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Fout bij verzenden:', error);
    return NextResponse.json({ success: false, error });
  }
}
