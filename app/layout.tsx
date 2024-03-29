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
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MonGi",
  description: "Plateforme de suivi d'un groupe d'impact",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html
        lang="en"
        className="flex justify-center md:px-20 md:min-w-[1000px] max-w-[1200px]  mx-auto"
      >
        <body
          suppressHydrationWarning={true}
          className="flex flex-col justify-center items-center bg-[#1b4c48] max-h-lvh py-8 w-full  "
        >
          <div className="relative min-h-lvh flex flex-col justify-between md:mt-4 w-full  ">
            <div className="absolute inset-0 -z-20  rounded-lg"></div>
            <div className="w-full flex-1 flex flex-col">
              <Header />
              <MobileNav />
              {/*             <main className=" flex flex-col flex-1 bg-blue-400">
               */}{" "}
              <main className="flex flex-col flex-1 w-full ">{children}</main>
            </div>
            <Footer />
          </div>
          <Toaster richColors />
        </body>

        {/*       <body
        suppressHydrationWarning={true}
        className="flex flex-col justify-center items-center bg-[#1b4c48] max-h-lvh py-8 max-w-5xl mx-auto min-w-5xl"
      >
        <div className="relative min-h-lvh flex flex-col justify-between md:mt-4 w-full  ">
          <div className="absolute inset-0 -z-20  rounded-lg"></div>
          <div className="w-full flex-1 flex flex-col">
            <Header />
            <MobileNav />
            <main className=" flex flex-col flex-1">{children}</main>
          </div>
          <Footer />
        </div>
      </body> */}
      </html>
    </SessionProvider>
  );
}
