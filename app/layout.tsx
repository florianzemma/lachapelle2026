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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "La Chapelle de la Tour 2026 - Élections Municipales",
  description:
    "Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour, Isère. Découvrez notre équipe, nos priorités et notre vision pour notre commune.",

  keywords: [
    "la chapelle de la tour 2026",
    "elections",
    "élections municipales",
    "La Chapelle de la Tour",
    "Isère",
    "élections 2026",
    "municipales 2026",
    "liste électorale",
  ],

  authors: [{ name: "Liste La Chapelle de la Tour 2026" }],

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,

    siteName: "La Chapelle de la Tour 2026",
    title: "La Chapelle de la Tour 2026 - Élections Municipales",
    description:
      "Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour, Isère. Découvrez notre équipe, nos priorités et notre vision pour notre commune.",
  },

  twitter: {
    card: "summary_large_image",
    title: "La Chapelle de la Tour 2026 - Élections Municipales",
    description:
      "Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour, Isère.",
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
        name: "Liste électorale La Chapelle - Construire Ensemble pour Demain",
        url: SITE_URL,
        description:
          "Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour",
        areaServed: {
          "@type": "City",
          name: "La Chapelle de la Tour",
          containedIn: {
            "@type": "AdministrativeArea",
            name: "Isère",
          },
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,

        name: "La Chapelle - Construire Ensemble pour Demain",
        description:
          "Liste électorale pour les élections municipales 2026 à La Chapelle de la Tour",
        address: {
          "@type": "PostalAddress",
          addressLocality: "La Chapelle de la Tour",
          addressRegion: "Isère",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "45.4667",
          longitude: "5.7167",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,

        url: SITE_URL,

        name: "La Chapelle - Construire Ensemble pour Demain",
        description:
          "Site officiel de la liste électorale La Chapelle - Construire ensemble pour demain pour les élections municipales 2026",
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
            name: "Nos priorités",
            item: `${SITE_URL}#priorities`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Notre équipe",
            item: `${SITE_URL}#team`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Événements",
            item: `${SITE_URL}#events`,
          },
          {
            "@type": "ListItem",
            position: 5,
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
