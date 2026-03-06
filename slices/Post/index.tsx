"use client";

import { Content, PostSliceDefaultPrimaryPostsItem } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type PostProps = SliceComponentProps<Content.PostSlice>;

function PostModal({
  post,
  onClose,
}: {
  post: PostSliceDefaultPrimaryPostsItem;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-white p-6 sm:p-8">
          <div className="flex-1">
            <div className="prismic-content font-heading text-2xl font-bold leading-tight text-primary sm:text-3xl">
              <PrismicRichText field={post.question} />
            </div>
            {post.sub_question && (
              <div className="prismic-content text-muted/80 prose prose-base mt-2 italic">
                <PrismicRichText field={post.sub_question} />
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-secondary hover:text-primary"
            aria-label="Fermer"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5l10 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="bg-logoGreen/30 mx-6 h-0.5 rounded-full sm:mx-8" />

        <div className="space-y-4 p-6 sm:p-8">
          {post.content_blocks &&
            Array.isArray(post.content_blocks) &&
            post.content_blocks.map((block, i) => {
              const blockType = block.type || "default";
              return (
                <div
                  key={i}
                  className={`rounded-xl p-5 sm:p-6 ${
                    blockType === "highlight"
                      ? "bg-logoGreen/5 border-l-4 border-logoGreen"
                      : blockType === "info"
                        ? "bg-primary/5 border-l-4 border-primary"
                        : "bg-secondary/40"
                  }`}
                >
                  {block.title && (
                    <h3
                      className={`mb-3 font-heading text-sm font-bold uppercase tracking-wider ${
                        blockType === "highlight"
                          ? "text-logoGreen"
                          : "text-primary"
                      }`}
                    >
                      {block.title}
                    </h3>
                  )}
                  <div className="prismic-content text-foreground/90 prose prose-base max-w-none">
                    <PrismicRichText field={block.content} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>,
    document.body
  );
}

const Post = ({ slice }: PostProps) => {
  const [selectedPost, setSelectedPost] =
    useState<PostSliceDefaultPrimaryPostsItem | null>(null);

  const posts = slice.primary.posts || [];

  return (
    <section
      id="post"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
      style={{
        background: "linear-gradient(to bottom, #fafaf8 0%, #f5f5f3 100%)",
      }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {slice.primary.section_title && (
          <header
            className="mb-12 text-center"
            style={{ animation: "fade-up 0.6s ease-out forwards" }}
          >
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

        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post, i) => (
            <button
              key={i}
              onClick={() => setSelectedPost(post)}
              className="group relative flex flex-col rounded-2xl bg-white p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7"
              style={{
                animation: `fade-up 0.6s ease-out ${i * 100}ms both`,
              }}
            >
              <div className="mb-4 h-1 w-10 rounded-full bg-logoGreen transition-all duration-300 group-hover:w-16" />

              <div className="prismic-content mb-3 font-heading text-lg font-bold leading-snug text-primary sm:text-xl">
                <PrismicRichText field={post.question} />
              </div>

              {post.sub_question && (
                <div className="prismic-content text-muted/80 prose prose-sm line-clamp-2 flex-1 italic">
                  <PrismicRichText field={post.sub_question} />
                </div>
              )}

              {post.content_blocks && post.content_blocks.length > 0 && (
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-xs text-muted">
                    {post.content_blocks.length} section
                    {post.content_blocks.length > 1 ? "s" : ""}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}

              <div className="text-primary/70 mt-4 flex items-center gap-2 text-sm font-medium transition-colors group-hover:text-primary">
                <span>Lire la suite</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </section>
  );
};

export default Post;
