import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full md:flex md:min-h-[800px] md:flex-row"
    >
      {/* Logo section - Hidden on mobile, 1/4 on desktop */}
      <div className="hidden items-center justify-center bg-white px-6 py-8 md:flex md:w-1/4 md:py-0">
        {slice.primary.logo?.url && (
          <PrismicNextImage
            field={slice.primary.logo}
            className="h-60 w-auto object-contain md:h-auto md:max-h-[400px] md:max-w-[80%]"
          />
        )}
      </div>

      {/* Hero image with content - aspect ratio on mobile, 3/4 on desktop */}
      <div className="relative aspect-[4/3] w-full overflow-hidden md:mt-12 md:aspect-auto md:min-h-0 md:w-3/4 md:flex-1 md:bg-white">
        {/* Background image with overlay */}
        {slice.primary.background_image.url && (
          <>
            {/* Mobile image */}
            {slice.primary.background_image_mobile.url ? (
              <div className="absolute inset-0 md:hidden">
                <PrismicNextImage
                  field={slice.primary.background_image_mobile}
                  fill
                  className="object-contain object-[50%_90%]"
                  quality={80}
                  alt=""
                  priority
                  sizes="100vw"
                />
              </div>
            ) : null}

            {/* Desktop image */}
            <div
              className={`absolute inset-0 ${slice.primary.background_image_mobile.url ? "hidden md:block" : ""}`}
            >
              <PrismicNextImage
                field={slice.primary.background_image}
                fill
                className="object-cover"
                quality={80}
                alt=""
                priority
              />
            </div>

            {/* Dark overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/40" />
          </>
        )}

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="mx-auto w-full max-w-4xl text-center">
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
      </div>
    </section>
  );
};

export default Hero;
