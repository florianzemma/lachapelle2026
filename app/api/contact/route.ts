import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  email: z.string().email("Email invalide"),
  message: z
    .string()
    .min(10, "Message trop court (minimum 10 caractères)")
    .max(1000, "Message trop long (maximum 1000 caractères)")
    .transform((msg) => msg.trim().replace(/[<>]/g, "")),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, message } = contactSchema.parse(body);

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Service d'envoi non configuré" },
        { status: 500 }
      );
    }

    if (!process.env.CONTACT_EMAIL) {
      return NextResponse.json(
        { error: "Email de destination non configuré" },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "La Chapelle 2026 <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${email}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Données invalides" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur lors de l'envoi" },
      { status: 500 }
    );
  }
}
