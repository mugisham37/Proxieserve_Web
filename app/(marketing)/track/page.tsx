import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

interface Props {
  searchParams: Promise<{ code?: string }>;
}

export default async function TrackPage({ searchParams }: Props) {
  const { code } = await searchParams;
  if (code) {
    redirect(`/claim?code=${encodeURIComponent(code)}`);
  }
  redirect("/claim");
}
