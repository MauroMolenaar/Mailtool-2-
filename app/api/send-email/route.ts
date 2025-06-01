import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  console.log('📨 Nieuwe mail poging');

  const body = await req.json();

  console.log('🔑 API-key:', process.env.RESEND_API_KEY);
  console.log('📬 Naar:', body.to);
  console.log('📌 Onderwerp:', body.subject);
  console.log('💬 Bericht:', body.message);

  try {
    const data = await resend.emails.send({
      from: 'Mauro <noreply@mailtool.dev>',
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
