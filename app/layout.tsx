import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import NavBar from "@/components/NavBar/NavBar";
import QueryProvider from "@/providers/QueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/providers/theme-provider";
import dynamic from 'next/dynamic'
import CheckNetwork from "@/components/ConnectWallet/CheckNetwork";
import WaitlistBanner from "@/components/Banner/WaitlistBanner";
import Footer from "@/components/Footer/Footer";

const WalletProvider = dynamic(() => import('@/providers/WalletProvider'), {
  ssr: false,
})
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
      <head>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet"></link>
      </head>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <body className={` font-plex-sans bg-[#EEEEEE] dark:bg-[#0F0F0F]`}>
          {/* <div className="max-w-[1440px] mx-auto"> */}
          <main className="relative flex w-full h-auto md:left-0 ">
            <WalletProvider>
              <QueryProvider>

                <div className="flex flex-col w-full h-full mx-0 basis-full ">
                  {/* <WaitlistBanner/> */}
                  <NavBar />
                  {children}
                  <Footer />
                </div>
                <CheckNetwork/>
                <ReactQueryDevtools
                  buttonPosition="top-left"
                  initialIsOpen={false}
                />
              </QueryProvider>
          <Toaster
            expand
            visibleToasts={9}
            duration={Infinity}
            closeButton={true}
            position="top-center"
            toastOptions={{ style: { zIndex: 999, left: "-30%" } }}
          />
            </WalletProvider>

          </main>
          {/* </div> */}
        </body>
      </ThemeProvider>
    </html>
  );
}
