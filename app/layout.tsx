import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "UListed - University Marketplace",
  description: "Student marketplace for your campus. Buy and sell items with fellow students.",
  keywords: ["university", "marketplace", "student", "buy", "sell", "campus"],
  authors: [{ name: "UListed" }],
  openGraph: {
    title: "UListed - University Marketplace",
    description: "Student marketplace for your campus",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

