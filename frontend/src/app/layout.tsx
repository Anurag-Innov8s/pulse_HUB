import "./globals.css";

import { GeistMono } from "geist/font/mono";
import { Toaster } from "sonner";

import { StoreProvider } from "@/store/StoreProvider";

import Bottombar from "./components/HomePage/Bottombar";
import { Navbar } from "./components/HomePage/Navbar";
export const metadata = {
  title: "PulseHub",
  description: "Social Media Plateform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
    <html lang="en" className={GeistMono.className}>
      <body>
        <Navbar />
        {children}
        <Toaster richColors position="top-center" />
        <Bottombar></Bottombar>
      </body>
    </html>
    </StoreProvider>
  );
}
