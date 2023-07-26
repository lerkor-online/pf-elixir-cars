import Footer from "@/components/footer/Footer";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/nav/nav";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import ShoppingCart from "@/components/shoppingCart/shoppingCart";
import StateWrapper from "@/components/stateWrapper/stateWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elixir Car",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className}`}>
          <SignedIn>
            <Nav />
          </SignedIn>
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
