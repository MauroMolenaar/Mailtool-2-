import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log('📨 Nieuwe mail poging');
  console.log('Ontvanger:', body.to);
  console.log('Onderwerp:', body.subject);
  console.log('Bericht:', body.message);
  console.log('🔑 API-key:', process.env.RESEND_API_KEY); // debug: checkt of de key wordt geladen

  try {
    const data = await resend.emails.send({
      from: 'contact@noreplymailtool.com',
      to: body.to,
      subject: body.subject,
      html: `<p>${body.message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Fout bij verzenden:', error); // logt de fout naar de runtime logs
    return NextResponse.json({ success: false, error });
  }
}
