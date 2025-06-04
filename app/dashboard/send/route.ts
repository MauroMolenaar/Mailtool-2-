import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/authOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const formData = await req.formData();
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  const { error } = await supabase.from("emails").insert({
    user_email: session.user.email,
    subject,
    message,
  });

  if (error) {
    console.error("Supabase fout:", error);
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
