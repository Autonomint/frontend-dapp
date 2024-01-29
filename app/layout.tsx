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
import QueryProvider from "@/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
        <main className="grid h-screen xl:grid-cols-[140px_1fr] grid-cols-[105px_1fr]">

          <QueryProvider>
            <WalletProvider>
              <SideBar />
              <div className="h-full flex flex-col pb-1 lg:pb-4 xl:pb-6 pr-1 xl:pr-6 lg:pr-4">
                <NavBar />
                {children}
              </div>
              <ReactQueryDevtools
                buttonPosition="top-left"
                initialIsOpen={false}
              />
            </WalletProvider>
          </QueryProvider>

        </main>
        {/* </div> */}
        <Toaster
          expand
          visibleToasts={9}
          duration={Infinity}
          closeButton={true}
          position="top-center"
          toastOptions={{ style: { zIndex: 999,left:"-30%" } }}
        />
      </body>
    </html>
  );
}
