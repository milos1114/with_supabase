import type { Viewport } from 'next'
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";

import { BetStoreProvider } from "@/providers/bet-store-provider";

import "./globals.css";
import { HeaderCustom } from '@/components/header';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3001";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dice game",
  description: "Dice game",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const myFont = localFont({
  src: [
    {
      path: "../font/ProximaNova-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../font/ProximaNova-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../font/ProximaNova-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../font/ProximaNova-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../font/ProximaNova-Bold.otf",
      weight: "800",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className} suppressHydrationWarning>
      <body className="bg-grey-600 text-grey-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <BetStoreProvider>
            <main className="min-h-screen flex flex-col items-center">
              <div className="flex-1 w-full flex flex-col items-center">
                <nav className="w-full flex justify-center h-16 shadow-lg">
                  <HeaderCustom />
                </nav>
                <div className="flex flex-col w-full max-w-[calc(1200px+6vw)] items-center">
                  {children}
                </div>
              </div>
            </main>
          </BetStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
