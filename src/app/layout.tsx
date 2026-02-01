import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Viral Quiz Engine | How X Are You?",
  description:
    "Take viral checklist-style quizzes and find out how you stack up against everyone else!",
  keywords: ["quiz", "viral", "checklist", "personality test", "fun quiz"],
  authors: [{ name: "VQE Team" }],
  openGraph: {
    title: "Viral Quiz Engine | How X Are You?",
    description: "Take viral checklist-style quizzes and share your results!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Quiz Engine",
    description: "Take viral checklist-style quizzes and share your results!",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
