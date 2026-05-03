import Link from "next/link";

export function CTASection() {
  return (
    <section
      className="border-t border-border"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-soft) 0%, var(--bg) 60%)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8 py-20 text-center md:px-4 md:py-14">
        <p className="font-mono text-[12px] font-medium text-brand uppercase tracking-[0.08em] mb-3">
          Get started
        </p>
        <h2 className="text-[clamp(26px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-4">
          Ready to let SolAI run your revenue?
        </h2>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[540px] mx-auto mb-8 leading-[1.7]">
          Start free — no card required. Upload one product, launch your first
          campaign in under 5 minutes.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-7 py-3.5 text-[15px] font-semibold bg-brand text-white rounded-[10px] border border-brand no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
          >
            Start free — no card needed
          </Link>
          <Link
            href="/features"
            className="inline-flex items-center gap-1.5 px-7 py-3.5 text-[15px] font-medium bg-transparent text-text border border-border rounded-[10px] no-underline hover:no-underline hover:bg-surface-2 transition-all duration-150"
          >
            Explore features
          </Link>
        </div>
        <p className="text-[13px] text-text-subtle mt-4">
          🇷🇼 Built in Kigali · Trusted across Africa
        </p>
      </div>
    </section>
  );
}
