import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BudgetTrack",
  description: "Create budgets and start saving!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
        <Toaster/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
