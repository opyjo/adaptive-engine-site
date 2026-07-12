import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adaptive Engine — the intelligence layer for learning products",
    template: "%s | Adaptive Engine",
  },
  description:
    "Adaptive-learning infrastructure that helps education, tutoring, assessment, and training products decide what every learner should practise next.",
  openGraph: {
    title: "Adaptive Engine — the intelligence layer for what comes next",
    description: "Add adaptive sequencing without moving your content, answer keys, or learner identity.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="site-body">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
