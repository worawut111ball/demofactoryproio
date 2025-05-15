import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard - Factory Pro",
  description: "ระบบจัดการเว็บไซต์ Factory Pro",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={inter?.className || ""} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
