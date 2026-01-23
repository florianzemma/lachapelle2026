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
      <div className="md:order-0 order-1 mt-6 flex items-center justify-center bg-white px-6 md:w-1/3 md:py-0 lg:w-3/12">
        {slice.primary.logo?.url && (
          <PrismicNextImage
            field={slice.primary.logo}
            className="w-full max-w-md object-contain md:h-auto md:max-h-[400px] md:w-auto md:max-w-[80%]"
          />
        )}
      </div>

      {/* Hero image with content - Full width on mobile, 2/3 on tablet, 3/4 on desktop */}
      <div className="order-0 relative mt-16 flex min-h-screen flex-1 items-center justify-center overflow-hidden md:order-1 md:h-auto md:min-h-[600px] md:w-2/3 lg:w-3/4">
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
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </div>
            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40" />
            {/* Gradient fade from logo section */}
            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-r from-white to-transparent" />{" "}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-b from-white to-transparent md:hidden" />
          </>
        )}

        {/* Floating logo badge - Mobile only */}
        {slice.primary.logo?.url && (
          <div className="absolute left-4 top-4 z-20 md:hidden">
            <div className="rounded-lg bg-white/95 p-2 shadow-lg ring-1 ring-black/5 backdrop-blur-sm">
              <PrismicNextImage
                field={slice.primary.logo}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
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
