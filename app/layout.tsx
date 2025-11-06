import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Line Pointer - AI Sports Predictions | NFL & NCAAF Betting Analytics",
  description: "Advanced AI-powered sports predictions for NFL and NCAAF. Get accurate betting insights, parlay recommendations, and data-driven analysis.",
  keywords: "NFL predictions, NCAAF predictions, sports betting, AI predictions, parlay builder, sports analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

