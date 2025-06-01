import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
console.log('🔑 API-key:', process.env.RESEND_API_KEY);
console.log('🔑 API-key:', process.env.RESEND_API_KEY);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();console.log('📨 Nieuwe mail poging');
  console.log('Ontvanger:', body.to);
  console.log('Onderwerp:', body.subject);
  console.log('Bericht:', body.message);
  

  try {
    const data = await resend.emails.send({
      from: 'jij@jouwdomein.nl',
      to: body.to,
      subject: body.subject,
      html: `<p>${body.message}</p>`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
