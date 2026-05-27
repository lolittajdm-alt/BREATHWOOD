import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { FloatingShapes } from "@/components/layout/FloatingShapes";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BREATH WOOD — Новий ритуал замість сигарет",
  description:
    "BREATH WOOD — стильний екологічний девайс для відмови від куріння, ароматерапії та усвідомленого дихання.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${display.variable} ${body.variable}`}>
      <body>
        <ScrollProgress />
        <GrainOverlay />
        <FloatingShapes />
        {children}
      </body>
    </html>
  );
}
