"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface ExpandableBioProps {
  children: ReactNode;
  maxLines?: number;
}

export function ExpandableBio({ children, maxLines = 3 }: ExpandableBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const lineHeight = parseInt(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * maxLines;
      setNeedsTruncation(contentRef.current.scrollHeight > maxHeight + 4);
    }
  }, [children, maxLines]);

  return (
    <div className="mt-4">
      <div
        ref={contentRef}
        className={`prismic-content overflow-hidden text-sm leading-relaxed text-muted transition-[max-height] duration-300 ease-out ${!isExpanded && needsTruncation ? "max-h-[4.5rem]" : "max-h-[500px]"} `}
      >
        {children}
      </div>

      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-primary-light transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              Voir moins
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </>
          ) : (
            <>
              Lire la suite
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}
