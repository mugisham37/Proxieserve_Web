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
      <div className="max-w-[1280px] mx-auto px-4 py-14 text-center md:px-8 md:py-20">
        <h2 className="text-[clamp(26px,4vw,44px)] font-bold tracking-[-0.03em] text-text mb-4">
          Ready to let SolAI run your growth?
        </h2>
        <p className="text-[clamp(16px,1.8vw,18px)] text-text-muted max-w-[560px] mx-auto mb-8 leading-[1.7]">
          Upload your first product. Set a cap. Walk away. Revenue starts flowing.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-7 py-3.5 text-[15px] font-semibold bg-brand text-white rounded-[10px] border border-brand no-underline hover:no-underline hover:bg-[#4A6BEE] transition-all duration-150"
          >
            Start free
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-7 py-3.5 text-[15px] font-medium bg-transparent text-text border border-border rounded-[10px] no-underline hover:no-underline hover:bg-surface-2 transition-all duration-150"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
