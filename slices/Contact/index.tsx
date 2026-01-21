"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState, useEffect } from "react";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const RATE_LIMIT_KEY = "contact_form_attempts";
const MAX_ATTEMPTS = 5;
const COOLDOWN_MS = 15 * 60 * 1000;

const Contact = ({ slice }: ContactProps) => {
  const [formState, setFormState] = useState({
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [cooldownEndsAt, setCooldownEndsAt] = useState<number | null>(null);

  useEffect(() => {
    checkRateLimit();
  }, []);

  const checkRateLimit = () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    if (!stored) return;

    const { attempts, resetAt } = JSON.parse(stored);
    const now = Date.now();

    if (now > resetAt) {
      localStorage.removeItem(RATE_LIMIT_KEY);
      setIsRateLimited(false);
      setCooldownEndsAt(null);
      return;
    }

    if (attempts >= MAX_ATTEMPTS) {
      setIsRateLimited(true);
      setCooldownEndsAt(resetAt);
    }
  };

  const incrementAttempts = () => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const now = Date.now();

    if (!stored) {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({ attempts: 1, resetAt: now + COOLDOWN_MS })
      );
      return;
    }

    const { attempts, resetAt } = JSON.parse(stored);

    if (now > resetAt) {
      localStorage.setItem(
        RATE_LIMIT_KEY,
        JSON.stringify({ attempts: 1, resetAt: now + COOLDOWN_MS })
      );
      setIsRateLimited(false);
      setCooldownEndsAt(null);
      return;
    }

    const newAttempts = attempts + 1;
    localStorage.setItem(
      RATE_LIMIT_KEY,
      JSON.stringify({ attempts: newAttempts, resetAt })
    );

    if (newAttempts >= MAX_ATTEMPTS) {
      setIsRateLimited(true);
      setCooldownEndsAt(resetAt);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRateLimited) {
      setStatus("error");
      setErrorMessage("Trop de tentatives. Réessayez dans quelques minutes.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      incrementAttempts();
      setStatus("success");
      setFormState({ email: "", message: "" });

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Une erreur est survenue"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const isLoading = status === "loading";
  const isDisabled = isLoading || isRateLimited;

  const getRemainingTime = () => {
    if (!cooldownEndsAt) return "";
    const remaining = Math.ceil((cooldownEndsAt - Date.now()) / 60000);
    return remaining > 0
      ? `${remaining} minute${remaining > 1 ? "s" : ""}`
      : "";
  };

  return (
    <section
      id="contact"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-secondary py-24 sm:py-32"
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

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-xl sm:mt-10"
        >
          <div className="grid grid-cols-1 gap-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-slate-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  disabled={isDisabled}
                  value={formState.email}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={status === "error"}
                  aria-describedby={
                    status === "error" ? "error-message" : undefined
                  }
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-slate-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  disabled={isDisabled}
                  value={formState.message}
                  onChange={handleChange}
                  aria-required="true"
                  aria-invalid={status === "error"}
                  aria-describedby={
                    status === "error" ? "error-message" : undefined
                  }
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              disabled={isDisabled}
              className="block w-full rounded-full bg-primary px-8 py-3 text-center text-lg font-semibold text-white shadow-lg transition hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : isRateLimited ? (
                `Limite atteinte (${getRemainingTime()})`
              ) : (
                slice.primary.submit_button_text || "Envoyer"
              )}
            </button>
          </div>

          {status === "success" && (
            <div
              className="animate-fadeIn mt-4 rounded-md bg-green-50 p-4"
              role="status"
              aria-live="polite"
            >
              <p className="text-center text-sm text-green-800">
                Message envoyé avec succès !
              </p>
            </div>
          )}

          {status === "error" && (
            <div
              id="error-message"
              className="animate-fadeIn mt-4 rounded-md bg-red-50 p-4"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-center text-sm text-red-800">{errorMessage}</p>
            </div>
          )}
        </form>

        {(slice.primary.email || slice.primary.phone) && (
          <div className="mt-16 border-t border-slate-200 pt-16">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-lg font-semibold text-primary">
                Autres moyens de nous contacter
              </h3>
              <div className="mt-6 space-y-2 text-slate-700">
                {slice.primary.email && (
                  <p>
                    Email :{" "}
                    <a
                      href={`mailto:${slice.primary.email}`}
                      className="font-medium text-primary transition-opacity hover:opacity-80"
                    >
                      {slice.primary.email}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-fadeIn) {
          animation: fadeIn 0.3s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.animate-fadeIn) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
