"use client";

import * as React from "react";
import { Eyebrow } from "@/components/atoms/shared/Eyebrow";
import { FormField } from "@/components/atoms/auth/FormField";
import { PillButton } from "@/components/atoms/shared/PillButton";
import { ContactMethod } from "@/components/molecules/auth/ContactMethod";
import { SiteFooter } from "@/components/organisms/SiteFooter";

const TOPICS = [
  "General inquiry",
  "New application",
  "Existing application",
  "Payment issue",
  "Urgent request",
  "Compliance & legal",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    contact: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.contact.trim()) e.contact = "Phone or email is required";
    if (!formData.topic) e.topic = "Please select a topic";
    if (!formData.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  }

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-16">
        <Eyebrow withLine className="text-[var(--ink-muted)] mb-4">Contact</Eyebrow>
        <h1 className="t-h1 text-[var(--ink)] mb-12">Get in touch</h1>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
          {/* Left — methods + WA card */}
          <div className="flex flex-col gap-8">
            {/* WhatsApp card */}
            <div className="notch bg-[var(--b-green)] text-white p-8 flex flex-col gap-4">
              <p className="eyebrow text-[rgba(255,255,255,0.7)]">Fastest response</p>
              <h2 className="t-h2 text-white">WhatsApp us</h2>
              <p className="font-sans text-[15px] text-[rgba(255,255,255,0.85)] leading-relaxed">
                Most clients prefer WhatsApp. Our agents respond within 30 minutes during business hours.
              </p>
              <a
                href="https://wa.me/250788000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-serif italic text-[17px] text-white border border-white rounded-[999px] px-5 py-3 hover:bg-white hover:text-[var(--b-green)] transition-colors self-start"
              >
                Open WhatsApp →
              </a>
            </div>

            {/* Contact methods */}
            <div>
              <ContactMethod
                label="Phone"
                content={<a href="tel:+250788000000" className="hover:text-[var(--brand)]">+250 788 000 000</a>}
              />
              <ContactMethod
                label="Email"
                content={<a href="mailto:hello@proxiserve.rw" className="hover:text-[var(--brand)]">hello@proxiserve.rw</a>}
              />
              <ContactMethod
                label="Office"
                content="KN 4 Ave, Kigali City Tower, 3rd Floor, Kigali, Rwanda"
              />
              <ContactMethod
                label="Hours"
                content="Monday–Friday 8am–6pm, Saturday 9am–2pm (CAT)"
              />
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            <h2 className="t-h3 text-[var(--ink)] mb-6">Send us a message</h2>
            {status === "success" ? (
              <div className="bg-[var(--ok-soft)] border border-[var(--ok)] rounded-[var(--r-xl)] p-8">
                <p className="font-serif text-[20px] text-[var(--ink)] mb-2">Message sent ✓</p>
                <p className="font-sans text-[14px] text-[var(--ink-muted)]">
                  We&apos;ll get back to you within 2 hours during business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <FormField
                  label="Your name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: (e.target as HTMLInputElement).value }))}
                  error={errors.name}
                />
                <FormField
                  label="Phone or email"
                  name="contact"
                  required
                  placeholder="+250 7XX XXX XXX or email@example.com"
                  value={formData.contact}
                  onChange={(e) => setFormData((d) => ({ ...d, contact: (e.target as HTMLInputElement).value }))}
                  error={errors.contact}
                />
                <FormField
                  label="Topic"
                  name="topic"
                  type="select"
                  required
                  value={formData.topic}
                  onChange={(e) => setFormData((d) => ({ ...d, topic: (e.target as HTMLSelectElement).value }))}
                  error={errors.topic}
                >
                  <option value="">Select a topic…</option>
                  {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                </FormField>
                <FormField
                  label="Message"
                  name="message"
                  type="textarea"
                  required
                  rows={5}
                  placeholder="Tell us what you need…"
                  value={formData.message}
                  onChange={(e) => setFormData((d) => ({ ...d, message: (e.target as HTMLTextAreaElement).value }))}
                  error={errors.message}
                />
                <PillButton
                  type="submit"
                  variant="solid"
                  size="md"
                  arrow
                  disabled={status === "loading"}
                  className="self-start"
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                </PillButton>
              </form>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
