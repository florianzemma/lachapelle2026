import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { ExpandableBio } from "@/components/ui/ExpandableBio";

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

type TeamMember = Content.TeamSliceDefaultPrimaryTeamMembersItem;

function TeamMemberCard({
  member,
  isLead = false,
}: {
  member: TeamMember;
  isLead?: boolean;
}) {
  return (
    <article
      className={`hover:border-primary-light/50 group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${isLead ? "w-full max-w-sm" : ""} `}
    >
      <div className="relative h-64 w-full overflow-hidden bg-secondary sm:h-80">
        {member.photo.url && (
          <>
            <PrismicNextImage
              field={member.photo}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              quality={90}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            <p className="mt-1 text-sm font-semibold text-primary-light">
              {member.role}
            </p>
          )}
        </header>

        <dl className="flex flex-col gap-2 text-sm text-muted">
          {member.profession && (
            <div className="flex items-center gap-2">
              <dt className="sr-only">Profession</dt>
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <dd>{member.profession}</dd>
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
            <PrismicRichText field={member.bio} />
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

        {members.length > 0 && members[0] && (
          <>
            <div className="mx-auto mt-12 flex justify-center">
              <TeamMemberCard member={members[0]} isLead />
            </div>

            {members.length > 1 && (
              <ul
                role="list"
                className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {members.slice(1).map((member, index) => (
                  <li key={index}>
                    <TeamMemberCard member={member} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Team;
