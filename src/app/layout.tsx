import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { I18nProvider } from "@/lib/i18n";
import { dictionaries, profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devmarcus.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: dictionaries.pt.meta.title,
  description: dictionaries.pt.meta.description,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "backend developer",
    "desenvolvedor backend",
    "Node.js",
    "NestJS",
    "TypeScript",
    "AWS Lambda",
    "SQS FIFO",
    "PostgreSQL",
    "Prisma",
    "RabbitMQ",
    "Stripe",
    "Mercado Pago",
    "PIX",
  ],
  openGraph: {
    type: "website",
    title: dictionaries.pt.meta.title,
    description: dictionaries.pt.meta.description,
    url: siteUrl,
    siteName: profile.name,
    locale: "pt_BR",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: dictionaries.pt.meta.title,
    description: dictionaries.pt.meta.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
