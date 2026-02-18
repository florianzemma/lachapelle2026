"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";

export type PostProps = SliceComponentProps<Content.PostSlice>;

const Post = ({ slice }: PostProps) => {
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

  const posts = slice.primary.posts || [];

  return (
    <section
      ref={sectionRef}
      id="post"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background: "linear-gradient(to bottom, #fafaf8 0%, #f5f5f3 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Titre Global Optionnel */}
        {slice.primary.section_title && (
          <header className="mb-16 text-center">
            <div className="prismic-content font-heading text-4xl font-black tracking-tight text-primary sm:text-5xl lg:text-6xl">
              <PrismicRichText field={slice.primary.section_title} />
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="bg-primary/30 h-px w-16" />
              <div className="flex h-2 w-2 rotate-45 transform bg-primary" />
              <div className="bg-primary/30 h-px w-16" />
            </div>
          </header>
        )}

        {/* Liste des Posts */}
        <div className="space-y-24">
          {posts.map((post, postIndex) => (
            <div key={postIndex} className="space-y-12">
              {/* En-tête du Post : Question & Sous-question */}
              <header
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${postIndex * 100}ms` }}
              >
                <div className="prismic-content mb-6 font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
                  <PrismicRichText field={post.question} />
                </div>
                {post.sub_question && (
                  <div className="prismic-content text-muted/80 prose prose-lg italic">
                    <PrismicRichText field={post.sub_question} />
                  </div>
                )}
                <div className="bg-logoGreen/30 mt-8 h-1 w-24 rounded-full" />
              </header>

              {/* Blocs de contenu du Post */}
              <div className="space-y-8">
                {post.content_blocks &&
                  Array.isArray(post.content_blocks) &&
                  post.content_blocks.map((block, blockIndex) => {
                    const blockType = block.type || "default";

                    return (
                      <article
                        key={blockIndex}
                        className={`transition-all duration-700 ease-out ${
                          isVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-12 opacity-0"
                        }`}
                        style={{
                          transitionDelay: `${(postIndex + 1) * 150 + blockIndex * 100}ms`,
                        }}
                      >
                        <div
                          className={`rounded-2xl p-6 transition-all duration-500 hover:shadow-lg sm:p-8 ${
                            blockType === "highlight"
                              ? "bg-logoGreen/5 border-l-4 border-logoGreen shadow-sm"
                              : blockType === "info"
                                ? "bg-primary/5 border-l-4 border-primary shadow-sm"
                                : "bg-white shadow-md"
                          }`}
                        >
                          {block.title && (
                            <h3
                              className={`mb-4 font-heading text-xl font-bold uppercase tracking-wider ${
                                blockType === "highlight"
                                  ? "text-logoGreen"
                                  : "text-primary"
                              }`}
                            >
                              {block.title}
                            </h3>
                          )}
                          <div
                            className={`prismic-content prose prose-lg max-w-none ${
                              blockType === "info"
                                ? "prose-primary"
                                : "text-foreground/90"
                            }`}
                          >
                            <PrismicRichText field={block.content} />
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>

              {/* Séparateur entre les posts si ce n'est pas le dernier */}
              {postIndex < posts.length - 1 && (
                <div className="flex justify-center pt-12 opacity-20">
                  <div className="h-px w-full max-w-xs bg-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Post;
