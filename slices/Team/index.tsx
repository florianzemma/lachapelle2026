import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

const Team = ({ slice }: TeamProps) => {
  return (
    <section
      id="team"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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

        <ul
          role="list"
          className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {slice.primary.team_members.map((member, index) => (
            <li
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:shadow-xl hover:border-primary-light"
            >
              {/* Photo avec overlay */}
              <div className="relative h-80 w-full overflow-hidden bg-secondary">
                {member.photo.url && (
                  <>
                    <PrismicNextImage
                      field={member.photo}
                      fill
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      quality={90}
                      loading="lazy"
                      alt=""
                    />
                    {/* Gradient overlay for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name and role */}
                <div className="mb-4">
                  <h3 className="text-primary text-2xl font-bold leading-tight mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-3 flex-wrap">
                    <p className="text-primary-light text-sm font-medium tracking-wide">
                      {member.role}
                    </p>
                    {member.age && (
                      <>
                        <span className="text-border">•</span>
                        <p className="text-muted text-sm font-medium">
                          {member.age} ans
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {member.bio && (
                  <div className="prismic-content text-muted text-sm leading-relaxed">
                    <PrismicRichText field={member.bio} />
                  </div>
                )}
              </div>

              {/* Decorative element */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-secondary opacity-30 blur-3xl group-hover:opacity-50 transition-opacity" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Team;
