"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";

export type FinancialInsightsProps =
  SliceComponentProps<Content.FinancialInsightsSlice>;

function FinancialCard({
  card,
  index,
}: {
  card: Content.FinancialInsightsSliceDefaultPrimaryFinancialCardsItem;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl">
        {/* Numéro décoratif en arrière-plan */}
        <div className="absolute right-8 top-8 opacity-[0.04]">
          <span className="font-heading text-[180px] font-black leading-none lg:text-[220px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Container principal */}
        <div className="relative z-10 flex flex-col items-center p-8 lg:p-12">
          {/* Badge numéro */}
          <div className="bg-primary/10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl font-heading text-2xl font-bold text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
            {index + 1}
          </div>

          {/* Titre */}
          <h3 className="mb-2 text-center font-heading text-2xl font-bold text-primary lg:text-3xl">
            {card.title}
          </h3>

          {/* Sous-titre */}
          <p className="mb-8 text-center text-sm font-medium text-muted lg:text-base">
            {card.subtitle}
          </p>

          {/* Séparateur décoratif */}
          <div className="mb-8 flex w-full items-center gap-2">
            <div className="bg-primary/20 h-px flex-1" />
            <div className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
            <div className="bg-primary/20 h-px flex-1" />
          </div>

          {/* Indicateur financier (mis en valeur) */}
          <div className="mb-4 text-center">
            <div className="bg-gradient-to-br from-primary to-primary-light bg-clip-text font-heading text-5xl font-black tracking-tight text-transparent transition-all duration-300 group-hover:scale-110 lg:text-6xl">
              {card.value}
            </div>
          </div>

          {/* Période */}
          <div className="flex items-center gap-2">
            <svg
              className="text-primary/60 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-primary/60 font-heading text-xs font-semibold uppercase tracking-widest">
              {card.period}
            </span>
          </div>
        </div>

        {/* Bordure animée au hover */}
        <div className="border-primary/0 group-hover:border-primary/20 absolute inset-0 rounded-3xl border-2 transition-colors" />
      </div>
    </div>
  );
}

const FinancialInsights = ({ slice }: FinancialInsightsProps) => {
  return (
    <section
      id="financial-insights"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      style={{
        background: "linear-gradient(to bottom, #fafaf8 0%, #f5f5f3 100%)",
      }}
    >
      {/* Fond décoratif organique */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-40">
        <div
          className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(28, 61, 44, 0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 h-[800px] w-[800px] translate-x-1/4 translate-y-1/4 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(127, 159, 107, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <header className="mx-auto mb-16 max-w-4xl text-center lg:mb-24">
          <div className="prismic-content mb-6 font-heading text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-6xl">
            <PrismicRichText field={slice.primary.section_title} />
          </div>

          {/* Ligne décorative */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="bg-primary/30 h-px w-16" />
            <div className="flex h-2 w-2 rotate-45 transform bg-primary" />
            <div className="bg-primary/40 h-px w-32" />
            <div className="flex h-2 w-2 rotate-45 transform bg-primary" />
            <div className="bg-primary/30 h-px w-16" />
          </div>
        </header>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {slice.primary.financial_cards.map((card, index) => (
            <FinancialCard key={index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinancialInsights;
