"use client";

import { Toaster } from "@/components/ui/toaster";
import AOS from "aos";
import "aos/dist/aos.css";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import AuthProvider from "../../providers/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  const pathname = usePathname();

  return (
    <html lang="pt-br">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {pathname !== "/login" && pathname !== "/register" && <Header />}
          <div
            className={
              pathname !== "/login" && pathname !== "/register"
                ? "px-8 max-md:px-0 flex-1"
                : "flex-1"
            }
          >
            {children}
          </div>
          <Toaster />
          {pathname !== "/login" && pathname !== "/register" && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
