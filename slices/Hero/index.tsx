import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex min-h-[500px] w-full flex-col md:min-h-[600px] md:flex-row"
    >
      {/* Logo section - Full width on mobile, 1/3 on tablet, 1/4 on desktop */}
      <div className="mt-6 flex items-center justify-center bg-white px-6 py-8 md:w-1/3 md:py-0 lg:w-1/4">
        {slice.primary.logo?.url && (
          <PrismicNextImage
            field={slice.primary.logo}
            className="w-full max-w-md object-contain md:h-auto md:max-h-[400px] md:w-auto md:max-w-[80%]"
          />
        )}
      </div>

      {/* Hero image with content - Full width on mobile, 2/3 on tablet, 3/4 on desktop */}
      <div className="relative flex min-h-[400px] flex-1 items-center justify-center overflow-hidden md:min-h-0 md:w-2/3 lg:w-3/4">
        {/* Background image with overlay */}
        {slice.primary.background_image.url && (
          <>
            {/* Mobile image */}
            {slice.primary.background_image_mobile.url ? (
              <div className="absolute inset-0 sm:hidden">
                <PrismicNextImage
                  field={slice.primary.background_image_mobile}
                  fill
                  className="h-full w-full object-cover object-center"
                  quality={80}
                  alt=""
                  priority
                  sizes="100vw"
                />
              </div>
            ) : null}

            {/* Desktop image */}
            <div
              className={`absolute inset-0 ${slice.primary.background_image_mobile.url ? "hidden sm:block" : ""}`}
            >
              <PrismicNextImage
                field={slice.primary.background_image}
                fill
                className="h-full w-full object-cover object-center"
                quality={80}
                alt=""
                priority
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </>
        )}

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-12 text-center md:py-0 lg:px-8">
          <div className="prismic-content hero-title font-heading">
            <PrismicRichText field={slice.primary.title} />
          </div>

          <div className="prismic-content hero-description font-heading">
            <PrismicRichText field={slice.primary.description} />
          </div>

          {slice.primary.cta_text && (
            <div className="mt-8 flex items-center justify-center">
              <a
                href="#team"
                aria-label="Découvrir l'équipe de campagne"
                className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {slice.primary.cta_text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
