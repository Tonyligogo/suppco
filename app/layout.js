import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToasterProvider } from "@/providers/ToastProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { SessionProvider } from "next-auth/react";
import { PermissionsProvider } from "@/providers/PermissionsProvider";
import { AuthProvider } from "@/providers/AuthContextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Suppco",
  description: "Suppliers and contractors management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SessionProvider>
          <AuthProvider>
              <ReactQueryProvider>
            <PermissionsProvider>
              <ToasterProvider position="top-center" />
                <main>{children}</main>
            </PermissionsProvider>
              </ReactQueryProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
