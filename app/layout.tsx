import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import '@stream-io/video-react-sdk/dist/css/styles.css';
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Streamify",
  description: "A streaming app for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider 
            attribute="class"
            forcedTheme="dark"         
            storageKey="streamify-theme"
          >
             <Toaster theme="light" position="bottom-center"/>
          {children}
          </ThemeProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
