import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css"
import ConvexClientProvider from "./_components/ConvexClientProvider";
import { Navbar } from "./_components/Navbar";
import { Toaster as DefaultToaster } from "@/components/ui/toaster";
import { EdgeStoreProvider } from "@/lib/edgestore";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Palate Pals",
  description: "Connecting people through food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Navbar/>
          <main className="m-20">
          <EdgeStoreProvider>
            {children}
          </EdgeStoreProvider>
          </main>
          {/* <Footer /> */}
          <DefaultToaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
