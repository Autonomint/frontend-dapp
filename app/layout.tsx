import { Button } from "@/components/ui/button";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HeaderItems from "@/components/Header/HeaderItems";
import SideBar from "@/components/Sidebar/SideBar";
import Image from "next/image";
import { Toaster } from "sonner";
import WalletProvider from "@/providers/WalletProvider";
import NavBar from "@/components/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autonomint-Dapp",
  description: "Autonomint dapp",
  icons: "./assets/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bgGrey`}>
        {/* <div className="max-w-[1440px] mx-auto"> */}
        <main className="grid h-screen grid-cols-[140px_1fr]">
          <WalletProvider>
            <SideBar />
            <div className="h-full flex flex-col pb-6 pr-6">
              <NavBar />
              {children}
            </div>
          </WalletProvider>
        </main>
        {/* </div> */}
        <Toaster
          duration={3000}
          closeButton={true}
          position="top-center"
          toastOptions={{style:{zIndex:999}}}
        />
      </body>
    </html>
  );
}
