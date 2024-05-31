"use client";

import { Toaster } from "@/components/ui/toaster";
import AOS from "aos";
import "aos/dist/aos.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import AuthProvider from "../../providers/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  return (
    <html lang="pt-br">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <div className="flex-1">{children}</div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
