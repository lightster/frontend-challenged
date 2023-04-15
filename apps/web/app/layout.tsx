import { ReactNode } from "react";
import { Libre_Franklin, Lora } from "next/font/google";
import "./globals.css";

interface Props {
  children: ReactNode;
}

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-libre-franklin",
  display: "swap",
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${lora.variable} ${libreFranklin.variable}`}>
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <title>Frontend Challenged</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
