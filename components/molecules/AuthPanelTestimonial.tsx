interface AuthPanelTestimonialProps {
  quote: string;
  name: string;
  company: string;
  location: string;
  avatarInitials: string;
  avatarColor: string;
  avatarTextColor: string;
}

export function AuthPanelTestimonial({
  quote,
  name,
  company,
  location,
  avatarInitials,
  avatarColor,
  avatarTextColor,
}: AuthPanelTestimonialProps) {
  return (
    <div className="p-5 bg-[var(--bg)] border border-[var(--border)] rounded-[14px] mb-6">
      <p className="text-[15px] italic text-[var(--text)] leading-[1.7] mb-4">{quote}</p>
      <div className="flex items-center gap-[10px]">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-semibold flex-shrink-0"
          style={{ background: avatarColor, color: avatarTextColor }}
        >
          {avatarInitials}
        </div>
        <div>
          <strong className="block text-[13px] text-[var(--text)]">{name}</strong>
          <span className="block text-[12px] text-[var(--text-subtle)]">
            {company} · {location}
          </span>
        </div>
      </div>
    </div>
  );
}
