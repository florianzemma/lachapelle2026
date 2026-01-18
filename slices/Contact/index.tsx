"use client";

import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact = ({ slice }: ContactProps) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to an API
    console.log("Form submitted:", formState);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
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
                  value={formState.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  value={formState.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-full bg-primary px-8 py-3 text-center text-lg font-semibold text-white shadow-lg transition hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {slice.primary.submit_button_text || "Envoyer"}
            </button>
          </div>

          {submitted && (
            <div className="mt-4 rounded-md bg-green-50 p-4">
              <p className="text-center text-sm text-green-800">
                Message envoyé avec succès !
              </p>
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
    </section>
  );
};

export default Contact;
