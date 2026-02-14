import Footer from "@/components/ui/Footer";
import Navigation from "@/components/ui/Navigation";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { SITE_URL } from "@/lib/constants";
import { repositoryName } from "@/prismicio";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";
import { Fraunces, Libre_Franklin } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-libre-franklin",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
});

const SITE_NAME = "La Chapelle - Construire Ensemble pour Demain";
const SITE_TITLE = "La Chapelle - Construire Ensemble pour Demain";
const SITE_DESCRIPTION =
  "La Chapelle 2026 Construire Ensemble pour Demain. Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour, Isère. Découvrez notre équipe, nos priorités et notre projet pour notre commune.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_TITLE} - ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  keywords: [
    "la chapelle 2026",
    "la chapelle village d'avenir",
    "village d'avenir la chapelle",
    "la chapelle de la tour 2026",
    "la chapelle construire ensemble pour demain",
    "la chapelle de la tour",
    "village avenir",
    "elections",
    "élections municipales",
    "La Chapelle de la Tour",
    "Isère",
    "municipales 2026",
    "liste électorale",
    "projet municipal la chapelle",
  ],
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: `${SITE_TITLE} - ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_TITLE} - ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const showPreview = process.env.NEXT_PUBLIC_ENABLE_PREVIEW === "true";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_TITLE,
        alternateName: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        sameAs: ["https://www.facebook.com/profile.php?id=61587248212379"],
        areaServed: {
          "@type": "City",
          name: "La Chapelle de la Tour",
          "@postalCode": "38110",
          containedIn: {
            "@type": "AdministrativeArea",
            name: "Isère",
          },
        },
        slogan: "Construire ensemble un village d'avenir",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "fr-FR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Bilan",
            item: `${SITE_URL}#summary`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Nos priorités",
            item: `${SITE_URL}#priorities`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Notre équipe",
            item: `${SITE_URL}#team`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Événements",
            item: `${SITE_URL}#events`,
          },
          {
            "@type": "ListItem",
            position: 6,
            name: "Contact",
            item: `${SITE_URL}#contact`,
          },
        ],
      },
    ],
  };

  return (
    <html
      lang="fr"
      className={`${libreFranklin.variable} ${fraunces.variable}`}
    >
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${libreFranklin.variable} ${fraunces.variable}`}>
        <SmoothScroll>
          <Navigation />
          <div>{children}</div>
          <Footer />
        </SmoothScroll>
        {showPreview && <PrismicPreview repositoryName={repositoryName} />}
      </body>
    </html>
  );
}
