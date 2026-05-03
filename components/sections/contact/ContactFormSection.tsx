"use client";

import { useState } from "react";
import { MkIcon } from "@/components/atoms/MkIcon";
import { SPEND_RANGES, PLATFORMS } from "@/lib/constants";

interface FormState {
  fullName: string;
  email: string;
  company: string;
  spend: string;
  platform: string;
  message: string;
}

const EMPTY: FormState = {
  fullName: "",
  email: "",
  company: "",
  spend: "",
  platform: "",
  message: "",
};

export function ContactFormSection() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full px-3 py-2 text-[14px] bg-bg text-text border border-border rounded-[10px] font-sans transition-colors duration-[120ms] focus:outline-none focus:border-brand focus:ring-[3px] focus:ring-[var(--brand-soft)]";

  return (
    <div className="max-w-[1280px] mx-auto px-8 py-12 md:px-4">
      <div className="grid grid-cols-[1.2fr_1fr] gap-10 md:grid-cols-1">
        {/* Form */}
        <div className="bg-surface border border-border rounded-[14px] p-8">
          {sent ? (
            <div className="text-center py-10">
              <div className="w-14 h-14 rounded-full bg-[rgba(52,211,153,0.12)] text-success flex items-center justify-center mx-auto mb-4">
                <MkIcon name="check" size={28} />
              </div>
              <h3 className="text-[18px] font-semibold text-text mb-2">
                We&apos;ll be in touch within 24 hours.
              </h3>
              <p className="text-[14px] text-text-muted mb-4">
                Check your inbox for a confirmation. In the meantime, you can
                start a free account immediately.
              </p>
              <button
                onClick={() => { setSent(false); setForm(EMPTY); }}
                className="text-[14px] font-medium text-brand bg-transparent border-none cursor-pointer hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <>
              <h3 className="text-[18px] font-semibold text-text mb-5">
                Request a demo
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-medium text-text">
                      Full name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={set("fullName")}
                      className={inputClass}
                      placeholder="Kalisa Mugisha"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-medium text-text">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass}
                      placeholder="kalisa@inema.rw"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <label className="text-[13px] font-medium text-text">
                    Company
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={set("company")}
                    className={inputClass}
                    placeholder="Inema Boutique"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 sm:grid-cols-1">
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-medium text-text">
                      Monthly ad spend
                    </label>
                    <select
                      value={form.spend}
                      onChange={set("spend")}
                      className={inputClass}
                    >
                      <option value="">Select range</option>
                      {SPEND_RANGES.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-medium text-text">
                      Platform
                    </label>
                    <select
                      value={form.platform}
                      onChange={set("platform")}
                      className={inputClass}
                    >
                      <option value="">Select platform</option>
                      {PLATFORMS.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-6">
                  <label className="text-[13px] font-medium text-text">
                    Anything we should know?
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={set("message")}
                    className={inputClass + " resize-y"}
                    placeholder="Tell us about your products, target market, or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-[14px] font-semibold bg-brand text-white rounded-[10px] border-none cursor-pointer hover:bg-[#4A6BEE] transition-all duration-150 flex items-center justify-center gap-2"
                >
                  <MkIcon name="send" size={16} />
                  Send request
                </button>
              </form>
            </>
          )}
        </div>

        {/* Info */}
        <div>
          <h3 className="text-[18px] font-semibold text-text mb-5">
            Other ways to reach us
          </h3>

          <div className="flex gap-3 mb-4 text-[14px] text-text-muted">
            <MkIcon name="mail" size={18} className="text-brand shrink-0 mt-0.5" />
            <div>
              <strong className="block text-text mb-0.5">Email</strong>
              <a href="mailto:hello@solai.digisi.rw" className="text-brand">
                hello@solai.digisi.rw
              </a>
            </div>
          </div>

          <div className="flex gap-3 mb-4 text-[14px] text-text-muted">
            <MkIcon name="whatsapp" size={18} className="text-[#34D399] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-text mb-0.5">WhatsApp</strong>
              <a href="https://wa.me/250788000000" className="text-brand">
                +250 788 000 000
              </a>
            </div>
          </div>

          <div className="flex gap-3 mb-8 text-[14px] text-text-muted">
            <MkIcon name="mapPin" size={18} className="text-brand shrink-0 mt-0.5" />
            <div>
              <strong className="block text-text mb-0.5">Office</strong>
              Kigali Innovation City
              <br />
              KG 7 Ave, Kigali, Rwanda
            </div>
          </div>

          {/* Legal links */}
          <div className="pt-5 border-t border-border">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.06em] text-text-subtle mb-2">
              Legal
            </h4>
            {["Privacy Policy", "Terms of Service", "GDPR Notice", "Rwanda DPL Statement", "POPIA Compliance", "Sub-Processor Register"].map((l) => (
              <a
                key={l}
                href="#"
                className="block text-[13px] text-text-muted mb-1.5 no-underline hover:text-brand hover:no-underline transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
