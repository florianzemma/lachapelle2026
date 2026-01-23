"use client";

import { Simplify } from "@/prismicio-types";
import { Content } from "@prismicio/client";
import {
  PrismicImage,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { useEffect, useRef, useState } from "react";
import { bilanIcons, defaultIcon } from "./icons";

export type SummaryProps = SliceComponentProps<Content.BilanSlice>;

function ThematicCard({
  item,
  index,
  total,
}: {
  item: Content.BilanSliceDefaultPrimaryBilanItemsItem;
  index: number;
  total: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

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

  // Calcul du masonry span pour chaque card action
  useEffect(() => {
    const calculateMasonrySpan = () => {
      const cards = document.querySelectorAll(".bilan-masonry-item");
      cards.forEach((card) => {
        const height = (card as HTMLElement).offsetHeight;
        const rowHeight = 20; // Match grid-auto-rows
        const rowGap = 24; // Match gap-6 (1.5rem = 24px)
        const rowSpan = Math.ceil((height + rowGap) / (rowHeight + rowGap));
        (card as HTMLElement).style.setProperty("--row-span", String(rowSpan));
      });
    };

    // Calculer au montage et après chargement des images
    calculateMasonrySpan();
    window.addEventListener("load", calculateMasonrySpan);
    window.addEventListener("resize", calculateMasonrySpan);

    return () => {
      window.removeEventListener("load", calculateMasonrySpan);
      window.removeEventListener("resize", calculateMasonrySpan);
    };
  }, []);

  const actionItems = Array.isArray(item.actions)
    ? item.actions.filter((block) => block.type === "list-item")
    : [];

  const actionCount = actionItems.length;
  const actionDetails = item.action_details || [];

  return (
    <article
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-md transition-shadow duration-500 hover:shadow-2xl">
        {/* Numéro de chapitre décoratif en arrière-plan */}
        <div className="absolute right-8 top-8 opacity-[0.06] lg:right-12 lg:top-12">
          <span className="font-heading text-[200px] font-black leading-none lg:text-[280px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Container principal */}
        <div className="relative z-10 p-8 lg:p-12">
          {/* En-tête de thématique */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Gauche - Badge et titre */}
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-4">
                <div className="bg-primary/10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white lg:h-20 lg:w-20">
                  {item.icon && bilanIcons[item.icon]
                    ? bilanIcons[item.icon]
                    : defaultIcon}
                </div>
                <div>
                  <span className="text-primary/60 font-heading text-xs font-semibold uppercase tracking-widest lg:text-sm">
                    Thématique {index + 1} / {total}
                  </span>
                  {actionCount > 0 && (
                    <p className="mt-1 flex items-center gap-1.5 font-heading text-xs font-medium text-primary lg:text-sm">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {actionCount} réalisation{actionCount > 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>

              <h3 className="mb-4 font-heading text-3xl font-bold leading-tight text-primary lg:text-5xl">
                {item.title}
              </h3>

              <div className="prismic-content text-muted/90 prose prose-lg max-w-none">
                {item.description && (
                  <PrismicRichText field={item.description} />
                )}
              </div>
            </div>

            {item.thematic_image && item.thematic_image.url && (
              <div className="relative h-48 w-full overflow-hidden rounded-2xl lg:h-64 lg:w-80">
                <PrismicImage
                  field={item.thematic_image}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="from-primary/20 absolute inset-0 bg-gradient-to-t to-transparent" />
              </div>
            )}
          </div>

          {/* Séparateur décoratif */}
          <div className="my-8 flex items-center gap-3">
            <div className="bg-primary/20 h-px flex-1" />
            <div className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
            <span className="text-primary/60 font-heading text-xs font-semibold uppercase tracking-widest">
              Réalisations
            </span>
            <div className="bg-primary/40 h-1.5 w-1.5 rounded-full" />
            <div className="bg-primary/20 h-px flex-1" />
          </div>

          {/* Grille des actions avec photos - Masonry Layout */}
          {actionDetails.length > 0 ? (
            <div className="bilan-masonry-grid gap-6">
              {actionDetails
                .filter(
                  (
                    action: Simplify<Content.BilanSliceDefaultPrimaryBilanItemsActionDetailsItem>
                  ) => action
                )
                .map(
                  (
                    action: Simplify<Content.BilanSliceDefaultPrimaryBilanItemsActionDetailsItem>,
                    idx: number
                  ) => (
                    <div
                      key={idx}
                      className="group/action from-primary/[0.03] to-primary/[0.01] bilan-masonry-item relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br transition-all duration-300 hover:shadow-lg"
                      style={{
                        transitionDelay: `${idx * 30}ms`,
                      }}
                    >
                      {/* Photo de l'action */}
                      {action && action.image && action.image.url && (
                        <div className="relative h-48 w-full overflow-hidden">
                          <PrismicImage
                            field={action.image}
                            className="h-full w-full object-cover transition-all duration-500 group-hover/action:scale-110"
                          />
                          {/* Overlay avec numéro */}
                          <div className="from-primary/80 via-primary/40 group-hover/action:from-primary/90 absolute inset-0 bg-gradient-to-t to-transparent transition-opacity" />
                          <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 font-heading text-lg font-bold text-primary shadow-lg">
                            {idx + 1}
                          </div>
                        </div>
                      )}

                      {/* Contenu texte */}
                      <div className="flex flex-col p-5">
                        {action?.title && (
                          <h4 className="mb-2 font-heading text-base font-bold leading-tight text-primary lg:text-lg">
                            {action.title}
                          </h4>
                        )}
                        {action?.description && (
                          <div className="prismic-content prose prose-sm max-w-none text-muted">
                            <PrismicRichText field={action.description} />
                          </div>
                        )}
                      </div>

                      {/* Bordure animée au hover */}
                      <div className="border-primary/0 group-hover/action:border-primary/20 absolute inset-0 rounded-2xl border-2 transition-colors" />
                    </div>
                  )
                )}
            </div>
          ) : (
            // Fallback pour afficher les actions actuelles (liste simple)
            actionCount > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {actionItems.map((action, idx) => (
                  <div
                    key={idx}
                    className="group/item border-primary/10 bg-primary/[0.02] hover:border-primary/20 hover:bg-primary/[0.05] flex items-start gap-4 rounded-xl border p-4 transition-all hover:shadow-md"
                  >
                    <span className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-heading text-sm font-bold text-primary transition-all group-hover/item:bg-primary group-hover/item:text-white">
                      {idx + 1}
                    </span>
                    <div className="text-foreground/90 flex-1 pt-0.5 text-sm leading-relaxed">
                      {"text" in action ? action.text : ""}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>

      {/* Ligne de connexion vers le prochain élément */}
      {index < total - 1 && (
        <div className="relative mx-auto h-12 w-px">
          <div className="from-primary/30 via-primary/20 absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b to-transparent" />
          <div className="border-primary/30 absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-background" />
        </div>
      )}
    </article>
  );
}

const Summary = ({ slice }: SummaryProps) => {
  return process.env.NEXT_PUBLIC_HIDE_SUMMARY === "true" ? null : (
    <section
      id="summary"
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
        {/* En-tête de section */}
        <header className="mx-auto mb-16 max-w-4xl text-center lg:mb-24">
          <div className="prismic-content mb-6 font-heading text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-6xl">
            <PrismicRichText field={slice.primary.section_title} />
          </div>
          {slice.primary.section_description && (
            <div className="prismic-content prose prose-xl mx-auto max-w-3xl leading-relaxed text-muted">
              <PrismicRichText field={slice.primary.section_description} />
            </div>
          )}

          {/* Ligne décorative sophistiquée */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="bg-primary/30 h-px w-16" />
            <div className="flex h-2 w-2 rotate-45 transform bg-primary" />
            <div className="bg-primary/40 h-px w-32" />
            <div className="flex h-2 w-2 rotate-45 transform bg-primary" />
            <div className="bg-primary/30 h-px w-16" />
          </div>
        </header>

        {/* Texte d'introduction optionnel */}
        {slice.primary.introduction_text && (
          <div className="mx-auto mb-16 max-w-4xl rounded-2xl bg-white p-8 shadow-sm lg:mb-20 lg:p-12">
            <div className="prismic-content text-foreground/90 prose prose-lg mx-auto max-w-3xl leading-relaxed">
              <PrismicRichText field={slice.primary.introduction_text} />
            </div>
          </div>
        )}

        {/* Cards thématiques */}
        <div className="space-y-0">
          {slice.primary.bilan_items.map((item, index) => (
            <ThematicCard
              key={index}
              item={item}
              index={index}
              total={slice.primary.bilan_items.length}
            />
          ))}
        </div>

        {/* CTA optionnel */}
        {slice.primary.cta_text && (
          <div className="mt-20 flex items-center justify-center lg:mt-24">
            <a
              href={slice.primary.cta_link || "#contact"}
              aria-label={slice.primary.cta_text || "En savoir plus"}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-10 py-5 font-heading text-lg font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              <span className="relative z-10">{slice.primary.cta_text}</span>
              <svg
                className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Summary;
