import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Toaster } from "@/components/molecules/Toaster";
import { PwaInit } from "@/components/atoms/PwaInit";
import { InstallPrompt } from "@/components/molecules/InstallPrompt";

type Locale = "en" | "rw" | "fr";
const VALID_LOCALES: Locale[] = ["en", "rw", "fr"];

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "ProxiServe — Hand it over. We'll handle it.",
    template: "%s — ProxiServe",
  },
  description:
    "Skip the queues and confusing forms. A trained ProxiServe agent handles your government paperwork — tax, ID, licenses, permits — on your behalf.",
  keywords: ["government services", "Rwanda", "paperwork", "agent", "ProxiServe"],
  authors: [{ name: "ProxiServe Ltd" }],
  creator: "ProxiServe Ltd",
  metadataBase: new URL("https://proxiserve.rw"),
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://proxiserve.rw",
    siteName: "ProxiServe",
    title: "ProxiServe — Hand it over. We'll handle it.",
    description:
      "Skip the queues and confusing forms. A trained ProxiServe agent handles your government paperwork on your behalf.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProxiServe — Hand it over. We'll handle it.",
    description:
      "Skip the queues and confusing forms. A trained ProxiServe agent handles your government paperwork on your behalf.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawLocale = cookieStore.get("proxi_locale")?.value ?? "en";
  const locale: Locale = VALID_LOCALES.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : "en";

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers>
          {children}
          <Toaster />
          <PwaInit />
          <InstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
