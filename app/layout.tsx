import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";
import { Fraunces, Libre_Franklin } from "next/font/google";
import "./globals.css";

export const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-inter",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Construire La Chapelle de la Tour ensemble pour demain",
  description:
    "Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showPreview = process.env.NEXT_PUBLIC_ENABLE_PREVIEW === "true";

  return (
    <html
      lang="fr"
      className={`${libreFranklin.variable} ${fraunces.variable}`}
    >
      <body className={`${libreFranklin.variable} ${fraunces.variable}`}>
        <Navigation />
        <div>{children}</div>
        <Footer />
        {showPreview && <PrismicPreview repositoryName={repositoryName} />}
      </body>
    </html>
  );
}
