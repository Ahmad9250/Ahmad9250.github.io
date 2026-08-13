import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ahmadjawad.dev'),
  title: "Ahmad Jawad — Full-Stack Developer",
  description:
    "Full-Stack Developer with 4+ years building scalable web applications, resilient backends, and optimized database architectures. Specializing in PHP, Laravel, Angular, and MySQL.",
  keywords: [
    "Ahmad Jawad",
    "Full-Stack Developer",
    "PHP Developer",
    "Laravel Developer",
    "Backend Engineer",
    "Web Developer",
    "Islamabad",
    "Pakistan",
  ],
  authors: [{ name: "Ahmad Jawad" }],
  creator: "Ahmad Jawad",
  openGraph: {
    title: "Ahmad Jawad — Full-Stack Developer",
    description:
      "Full-Stack Developer with 4+ years building scalable web applications, resilient backends, and optimized database architectures.",
    url: "https://ahmadjawad.dev",
    siteName: "Ahmad Jawad Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Jawad — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Jawad — Full-Stack Developer",
    description:
      "Full-Stack Developer with 4+ years building scalable web applications, resilient backends, and optimized database architectures.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0A0A0C" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
