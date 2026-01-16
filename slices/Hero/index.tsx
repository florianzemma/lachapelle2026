import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative flex min-h-[600px] items-center justify-center overflow-hidden py-20 sm:py-24"
    >
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
                quality={90}
                alt=""
                priority
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
              quality={90}
              alt=""
              priority
            />
          </div>

          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center lg:px-8">
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
    </section>
  );
};

export default Hero;
