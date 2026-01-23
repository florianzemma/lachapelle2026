"use client";

import { Content } from "@prismicio/client";
import {
  PrismicImage,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import { useEffect, useRef, useState } from "react";

export type EventsProps = SliceComponentProps<Content.EventsSlice>;

const Events = ({ slice }: EventsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const hasTitle =
    slice.primary.event_title && slice.primary.event_title.length > 0;
  const hasDescription =
    slice.primary.event_description &&
    slice.primary.event_description.length > 0;
  const hasCta = slice.primary.cta_text && slice.primary.cta_link;

  return (
    <section
      ref={sectionRef}
      id="events"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
      style={{
        background: "linear-gradient(to bottom, #f5f5f3 0%, #fafaf8 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Titre de section */}
        {slice.primary.section_title && (
          <header className="mb-12 text-center">
            <div className="prismic-content font-heading text-4xl font-black text-primary">
              <PrismicRichText field={slice.primary.section_title} />
            </div>
          </header>
        )}

        {/* Card événement */}
        <article
          className={`overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-700 ease-out motion-safe:transition-all ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          } `}
        >
          {/* Image */}
          {slice.primary.event_image && slice.primary.event_image.url && (
            <div className="relative w-full">
              <PrismicImage
                field={slice.primary.event_image}
                className="w-full object-contain md:max-h-[850px]"
              />
            </div>
          )}

          {/* Contenu texte (si présent) */}
          {(hasTitle || hasDescription || hasCta) && (
            <div className="p-6 text-center sm:p-8">
              {hasTitle && (
                <div className="prismic-content mb-3 font-heading text-2xl font-bold text-primary">
                  <PrismicRichText field={slice.primary.event_title} />
                </div>
              )}
              {hasDescription && (
                <div className="prismic-content text-muted">
                  <PrismicRichText field={slice.primary.event_description} />
                </div>
              )}
              {hasCta && (
                <a
                  href={slice.primary.cta_link || "#"}
                  className="mt-6 inline-block rounded-full bg-primary px-8 py-3 font-heading font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                >
                  {slice.primary.cta_text}
                </a>
              )}
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default Events;
