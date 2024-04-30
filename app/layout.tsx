import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import MobileNav from "@/components/navigation/mobile";
import Image from "next/image";
import bgImage from "../public/logo1.png";
import { Toaster } from "@/components/ui/sonner";
import HeaderVert from "@/components/navigation/headerVert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cellules d'Impact",
  description: "Plateforme de suivi d'un groupe d'impact",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body
        suppressHydrationWarning={true}
        className="h-full bg-gradient-to-b from-[#CFE9EA] to-[#F2F7F2]"
      >
        <main className=" h-full  flex flex-col justify-between">
          <Header />
          <div className="relative h-full md:grid md:grid-cols-5">
            <HeaderVert />
            <div className=" w-full h-full md:col-span-4"> {children}</div>
          </div>
          {/*           <Footer />
           */}{" "}
        </main>

        <Toaster richColors />
      </body>
    </html>
    /*     <html lang="en" className="flex justify-center md:min-w-[1000px] relative">
      <body
        suppressHydrationWarning={true}
        className="flex flex-col justify-center items-center max-h-lvh w-full bg-gradient-to-tr from-blue-200 to-purple-200"
      >
        <div className="relative min-h-lvh flex flex-col justify-between w-full  ">
          <div className="absolute inset-0 -z-20  rounded-lg"></div>
          <div className="w-full flex-1 flex flex-col">
            <Header />
            <main className="h-full">{children}</main>
          </div>
          <Footer />
        </div>
        <Toaster richColors />
      </body>
    </html> */
  );
}
