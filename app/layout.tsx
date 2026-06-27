import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RippleProvider from "./components/RippleProvider";
import PageTransition from "./components/PageTransition";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "文 | Wayne | 个人介绍与作品集",
  description: "文 | Wayne 的个人介绍与作品集网站，黑粉金高级视觉与动效体验。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#050308" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/w-icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#05030b] text-white">
        <RippleProvider>
          <Navbar />
          <PageTransition>
            <main className="flex-grow">{children}</main>
          </PageTransition>
          <ServiceWorkerRegister />
          <Footer />
        </RippleProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
