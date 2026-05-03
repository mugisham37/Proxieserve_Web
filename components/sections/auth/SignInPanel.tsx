import { AuthPanelTestimonial } from "@/components/molecules/AuthPanelTestimonial";
import { AuthPanelStat } from "@/components/molecules/AuthPanelStat";
import { SIGNIN_TESTIMONIAL, SIGNIN_PANEL_STATS } from "@/lib/auth/data";

export function SignInPanel() {
  return (
    <div className="w-full max-w-[340px]">
      <AuthPanelTestimonial {...SIGNIN_TESTIMONIAL} />
      <div className="grid grid-cols-3 gap-3">
        {SIGNIN_PANEL_STATS.map((stat) => (
          <AuthPanelStat key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
