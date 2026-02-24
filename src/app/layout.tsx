import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Có Thực Mới Vực Được Đạo — Gamified Learning Tracker",
  description:
    "Turn networking, cybersecurity, and cloud certification learning into a food-reward system. Earn virtual food through knowledge!",
  keywords: [
    "CCNA",
    "AWS",
    "Security+",
    "spaced repetition",
    "gamified learning",
    "cybersecurity",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
