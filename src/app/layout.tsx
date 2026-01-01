import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dawatul-islam-bd.vercel.app'),
  title: "New Muslim Support - Bangladesh",
  description: "Complete guide and support for new Muslims in Bangladesh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  <Analytics />
  return children;
}
