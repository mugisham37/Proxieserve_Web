import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { BackendStatusBanner } from "@/components/molecules/system/BackendStatusBanner";
import { Toaster } from "@/components/molecules/system/Toaster";
import { PwaInit } from "@/components/atoms/shared/PwaInit";
import { InstallPrompt } from "@/components/molecules/system/InstallPrompt";

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
    default: "Hebuza — Hand it over. We'll handle it.",
    template: "%s — Hebuza",
  },
  description:
    "Skip the queues and confusing forms. A trained Hebuza agent handles your government paperwork — tax, ID, licenses, permits — on your behalf.",
  keywords: ["government services", "Rwanda", "paperwork", "agent", "Hebuza"],
  authors: [{ name: "Hebuza Ltd" }],
  creator: "Hebuza Ltd",
  metadataBase: new URL("https://hebuza.rw"),
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: "https://hebuza.rw",
    siteName: "Hebuza",
    title: "Hebuza — Hand it over. We'll handle it.",
    description:
      "Skip the queues and confusing forms. A trained Hebuza agent handles your government paperwork on your behalf.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hebuza — Hand it over. We'll handle it.",
    description:
      "Skip the queues and confusing forms. A trained Hebuza agent handles your government paperwork on your behalf.",
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
  const rawLocale = cookieStore.get("hebuza_locale")?.value ?? "en";
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
          <BackendStatusBanner />
          {children}
          <Toaster />
          <PwaInit />
          <InstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
