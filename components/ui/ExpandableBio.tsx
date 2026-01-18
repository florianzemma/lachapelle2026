"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface ExpandableBioProps {
  children: ReactNode;
}

export function ExpandableBio({ children }: ExpandableBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setShowButton(
        contentRef.current.scrollHeight > contentRef.current.clientHeight
      );
    }
  }, []);

  return (
    <div className="mt-4">
      <div
        ref={contentRef}
        className={`prismic-content text-sm leading-relaxed text-muted ${isExpanded ? "" : "line-clamp-3"}`}
      >
        {children}
      </div>

      {showButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
