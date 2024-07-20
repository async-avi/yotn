import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "700"] });

export const metadata: Metadata = {
  title: "YOTN",
  description: "You own the Night",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
