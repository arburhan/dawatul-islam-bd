import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "New Muslim Support - Bangladesh",
  description: "Complete guide and support for new Muslims in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
