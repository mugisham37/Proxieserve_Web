import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/atoms/Avatar";
import type { AvatarProps } from "@/components/atoms/Avatar";

interface TeamCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  bio: string;
  initials: string;
  avatarColor?: AvatarProps["color"];
}

export function TeamCard({ name, role, bio, initials, avatarColor = "ink", className, ...props }: TeamCardProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Avatar initials={initials} size="lg" color={avatarColor} />
      <div>
        <p className="font-mono text-[11px] text-[var(--ink-muted)] uppercase tracking-wider mb-1">{role}</p>
        <p className="font-serif text-[19px] text-[var(--ink)] mb-2">{name}</p>
        <p className="font-sans text-[13px] text-[var(--ink-muted)] leading-relaxed">{bio}</p>
      </div>
    </div>
  );
}
