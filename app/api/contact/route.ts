import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  email: z
    .string()
    .email("Email invalide")
    .max(254)
    .refine((email) => !email.includes("\r") && !email.includes("\n"), {
      message: "Email contient des caractères invalides",
    }),
  message: z
    .string()
    .min(10, "Message trop court (minimum 10 caractères)")
    .max(1000, "Message trop long (maximum 1000 caractères)")
    .transform((msg) =>
      msg
        .trim()
        .replace(/[<>]/g, "")
        .replace(/[\r\n]+/g, " ")
    ),
});

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      process.env.NEXT_PUBLIC_SITE_URL,
      "https://lachapelledelatour2026.fr",
      "https://www.lachapelledelatour2026.fr",
    ];

    if (
      !origin ||
      !allowedOrigins.some((allowed) => allowed && origin.startsWith(allowed))
    ) {
      return NextResponse.json(
        { error: "Requête non autorisée" },
        { status: 403 }
      );
    }

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
      from: "La Chapelle 2026 <contact@lachapelledelatour2026.fr>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: "Nouveau message depuis le site La Chapelle 2026",
      text: `Reçu de: ${email}\n\nMessage:\n${message}`,
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
