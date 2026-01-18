"use client";

import { Content, RichTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { bilanIcons, defaultIcon } from "./icons";

export type BilanProps = SliceComponentProps<Content.BilanSlice>;

// Helper to count list items in a RichTextField
const countActions = (actions: RichTextField): number => {
  if (!Array.isArray(actions)) return 0;
  return actions.filter(
    (block) => block.type === "list-item" || block.type === "o-list-item"
  ).length;
};

// Composant ActionsList avec animation
function ActionsList({
  actions,
  isOpen,
  onToggle,
}: {
  actions: RichTextField;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const count = countActions(actions);

  // Extraire les items de la liste
  const actionItems = Array.isArray(actions)
    ? actions.filter((block) => block.type === "list-item")
    : [];

  return (
    <div className="border-border/30 mt-4 border-t pt-4">
      {/* Bouton toggle */}
      <button
        onClick={onToggle}
        className="text-primary/80 focus-visible:ring-primary/50 -my-1 flex w-full items-center justify-between gap-2 rounded-md py-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span>
            {isOpen ? "Masquer" : "Voir"} les {count} réalisations
          </span>
        </span>

        <svg
          className={`h-5 w-5 transition-transform duration-300 ease-out ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Container avec animation */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          {/* Liste complète */}
          <ul className="space-y-2">
            {actionItems.map((item, idx) => (
              <li
                key={idx}
                className="bg-primary/[0.03] border-primary/[0.08] hover:bg-primary/[0.06] hover:border-primary/15 group/item flex items-start gap-3 rounded-lg border p-2 transition-all duration-200"
              >
                {/* Numéro */}
                <span className="bg-primary/10 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary transition-colors group-hover/item:bg-primary group-hover/item:text-white">
                  {idx + 1}
                </span>

                {/* Texte de l'action */}
                <span className="text-sm leading-relaxed text-muted">
                  {"text" in item ? item.text : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Bilan = ({ slice }: BilanProps) => {
  const [openCards, setOpenCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    setOpenCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section
      id="bilan"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="prismic-content text-balance font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
            <PrismicRichText field={slice.primary.section_title} />
          </div>
          {slice.primary.section_description && (
            <div className="prismic-content mt-4 text-base leading-7 text-muted sm:text-lg">
              <PrismicRichText field={slice.primary.section_description} />
            </div>
          )}
        </div>

        {/* Bilan Items Grid */}
        <div className="mx-auto mt-12 flex flex-wrap items-start justify-center gap-6 sm:gap-8">
          {slice.primary.bilan_items.map((item, index) => {
            const actionCount = item.actions ? countActions(item.actions) : 0;
            const isOpen = openCards.has(index);

            return (
              <article
                key={index}
                className="hover:border-primary/30 group relative flex w-full max-w-md flex-col rounded-2xl border border-border bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg sm:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)]"
              >
                {/* Icon + Badge */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-xl text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {item.icon && bilanIcons[item.icon]
                      ? bilanIcons[item.icon]
                      : defaultIcon}
                  </div>

                  {/* Badge nombre d'actions */}
                  {actionCount > 0 && (
                    <span className="bg-primary/10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {actionCount} réalisations
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="mb-2 text-lg font-semibold text-primary">
                  {item.title}
                </h3>

                {/* Description */}
                <div className="prismic-content min-h-[40px] text-sm text-muted">
                  {item.description && (
                    <PrismicRichText field={item.description} />
                  )}
                </div>

                {/* Actions List - Animated Expansion */}
                {item.actions && actionCount > 0 && (
                  <ActionsList
                    actions={item.actions}
                    isOpen={isOpen}
                    onToggle={() => toggleCard(index)}
                  />
                )}

                {/* Decorative gradient */}
                <div
                  className="bg-primary/5 absolute -bottom-8 -right-8 h-24 w-24 rounded-full blur-2xl transition-opacity group-hover:opacity-75"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Optional Call-to-Action */}
        {slice.primary.cta_text && (
          <div className="mt-12 flex items-center justify-center">
            <a
              href={slice.primary.cta_link || "#contact"}
              aria-label={slice.primary.cta_text || "En savoir plus"}
              className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {slice.primary.cta_text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bilan;
