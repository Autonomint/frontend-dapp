import { Button } from "@/components/ui/button";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SideBar from "@/components/Sidebar/SideBar";
import { Toaster } from "sonner";
import WalletProvider from "@/providers/WalletProvider";
import NavBar from "@/components/NavBar/NavBar";
import QueryProvider from "@/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ServerStatus from "@/components/server_status/ServerStatus";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Autonomint-Dapp",
  description: "Autonomint dapp",
  icons: "./assets/logo.svg",
};
// #0101f2
// #bdfd9f
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-bgGrey`}>
        {/* <div className="max-w-[1440px] mx-auto"> */}
        <main className="relative flex w-full h-auto md:left-0">
          <QueryProvider>
            <WalletProvider>

                <SideBar />
                <div className="h-full w-full basis-full md:basis-[90%] px-1 mx-0  flex flex-col lg:pb-4 xl:pb-6  xl:pr-6 lg:pr-4">
                  <NavBar />
                  <ServerStatus/>
                  {/* {children} */}
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
          toastOptions={{ style: { zIndex: 999, left: "-30%" } }}
        />
      </body>
    </html>
  );
}
