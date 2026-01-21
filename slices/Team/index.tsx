import { ExpandableBio } from "@/components/ui/ExpandableBio";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

type TeamMember = Content.TeamSliceDefaultPrimaryTeamMembersItem;

function TeamMemberCard({
  member,
  isLead = false,
  index = 0,
}: {
  member: TeamMember;
  isLead?: boolean;
  index?: number;
}) {
  const shouldPrioritize = index === 0;

  return (
    <article
      className={`hover:border-primary-light/50 group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${isLead ? "w-full max-w-sm" : ""} `}
    >
      <div className="relative h-80 w-full overflow-hidden bg-secondary sm:h-96">
        {member.photo.url && (
          <>
            <PrismicNextImage
              field={member.photo}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              quality={75}
              loading={shouldPrioritize ? "eager" : "lazy"}
              priority={shouldPrioritize}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 400px"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <header className="mb-3">
          <h3 className="font-heading text-xl font-bold leading-tight text-primary sm:text-2xl">
            {member.name}
          </h3>
          {member.role && (
            <p className="mt-1 text-sm font-semibold text-primary">
              {member.role}
            </p>
          )}
        </header>

        <dl className="flex flex-col gap-2 text-sm text-muted">
          {member.profession && (
            <div className="flex items-start gap-2">
              <dt className="sr-only">Profession</dt>
              <svg
                className="text-muted/60 mt-0.5 h-4 w-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <dd className="line-clamp-2">{member.profession}</dd>
            </div>
          )}

          {member.localite && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Localité</dt>
              <svg
                className="text-muted/60 h-4 w-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <dd>{member.localite}</dd>
            </div>
          )}

          {member.age && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Âge</dt>
              <svg
                className="text-muted/60 h-4 w-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <dd>{member.age} ans</dd>
            </div>
          )}
        </dl>

        {member.bio && (
          <ExpandableBio>
            <div className="prismic-content prose prose-sm max-w-none">
              <PrismicRichText field={member.bio} />
            </div>
          </ExpandableBio>
        )}
      </div>

      <div
        className="bg-primary/5 absolute -bottom-4 -right-4 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />
    </article>
  );
}

const Team = ({ slice }: TeamProps) => {
  const members = slice.primary.team_members;

  return (
    <section
      id="team"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="prismic-content text-balance font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl md:text-4xl">
            <PrismicRichText field={slice.primary.section_title} />
          </div>
          {slice.primary.section_description && (
            <div className="prismic-content mt-4 font-heading text-base leading-7 text-primary sm:text-lg">
              <PrismicRichText field={slice.primary.section_description} />
            </div>
          )}
        </div>

        {slice.primary.group_photo?.url && (
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div className="relative aspect-[4/3] w-full bg-secondary sm:aspect-[3/2]">
                <PrismicNextImage
                  field={slice.primary.group_photo}
                  fill
                  className="object-cover"
                  quality={80}
                  loading="lazy"
                  sizes="(max-width: 1280px) calc(100vw - 3rem), 1280px"
                />
              </div>
            </div>

            {slice.primary.team_intro && (
              <div className="relative mx-auto mt-16 max-w-4xl px-4 sm:px-6">
                {/* Decorative Quote Mark - Top Left */}
                <div
                  className="pointer-events-none absolute -left-4 -top-8 select-none font-serif text-8xl text-logoBlue sm:-left-8 sm:-top-12 sm:text-9xl"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <div className="prismic-content prose prose-lg relative max-w-none text-sm italic leading-relaxed text-primary sm:text-xl sm:leading-[1.6]">
                  <PrismicRichText field={slice.primary.team_intro} />
                </div>

                {/* Decorative Quote Mark - Bottom Right */}
                <div
                  className="pointer-events-none absolute -bottom-12 -right-4 select-none font-serif text-8xl text-logoBlue sm:-bottom-16 sm:-right-8 sm:text-9xl"
                  aria-hidden="true"
                >
                  &rdquo;
                </div>
              </div>
            )}
          </div>
        )}

        {members.length > 0 && members[0] && (
          <>
            <div className="mx-auto mt-12 flex justify-center">
              <TeamMemberCard member={members[0]} isLead index={0} />
            </div>

            {members.length > 1 && (
              <ul
                role="list"
                className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {members.slice(1).map((member, index) => {
                  const totalMembers = members.length - 1;
                  const isLastAndAlone =
                    index === totalMembers - 1 && totalMembers % 3 === 1;

                  return (
                    <li
                      key={index}
                      className={isLastAndAlone ? "lg:col-start-2" : ""}
                    >
                      <TeamMemberCard member={member} index={index + 1} />
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
