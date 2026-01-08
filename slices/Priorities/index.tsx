import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type PrioritiesProps = SliceComponentProps<Content.PrioritiesSlice>;

const Priorities = ({ slice }: PrioritiesProps) => {
  return (
    <section
      id="priorities"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="prismic-content font-heading text-primary text-balance text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            <PrismicRichText field={slice.primary.section_title} />
          </div>
          {slice.primary.section_description && (
            <div className="prismic-content font-heading text-primary mt-4 text-base leading-7 sm:text-lg">
              <PrismicRichText field={slice.primary.section_description} />
            </div>
          )}
        </div>

        {/* Priorities Grid */}
        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {slice.primary.priorities.map((priority, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-primary-light"
            >
              {/* Icon */}
              {priority.icon && (
                <div className="mb-4 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-4xl shadow-sm group-hover:scale-110 transition-transform">
                    {priority.icon}
                  </div>
                </div>
              )}

              {/* Priority Title */}
              <h3 className="mb-3 text-center text-xl font-semibold text-primary">
                {priority.title}
              </h3>

              {/* Priority Description */}
              {priority.description && (
                <div className="prismic-content text-center text-sm leading-6 text-muted">
                  <PrismicRichText field={priority.description} />
                </div>
              )}

              {/* Decorative element */}
              <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-secondary opacity-30 blur-2xl group-hover:opacity-50 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Optional Call-to-Action */}
        {slice.primary.cta_text && (
          <div className="mt-12 flex items-center justify-center">
            <a
              href="#contact"
              aria-label={slice.primary.cta_text || "En savoir plus"}
              className="bg-primary focus-visible:outline-primary rounded-lg px-6 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {slice.primary.cta_text}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Priorities;
