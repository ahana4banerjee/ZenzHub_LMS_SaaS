import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { dark } from "@clerk/themes";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zenzhub LMS Platform",
    template: "%s | Zenzhub",
  },
  description:
    "Zenzhub is a modern learning platform that combines AI companions, live sessions, and personalized journeys to make learning engaging and effective.",
  applicationName: "Zenzhub",
  keywords: [
    "Zenzhub",
    "AI learning platform",
    "personalized learning",
    "online tutoring",
    "learning companions",
    "LMS",
  ],
  authors: [{ name: "Zenzhub Team" }],
  creator: "Zenzhub",
  metadataBase: new URL("https://zenzhub.tech"),
  openGraph: {
    title: "Zenzhub LMS Platform",
    description:
      "Learn smarter with AI-powered companions, live sessions, and personalized learning journeys.",
    url: "https://zenzhub.tech",
    siteName: "Zenzhub",
    images: [
      {
        url: "favicon.ico", 
        width: 512,
        height: 512,
        alt: "Zenzhub Logo",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "favicon.ico",
    shortcut: "favicon.ico",
    apple: "favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} antialiased bg-black text-white`}
        suppressHydrationWarning
      >
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "#22d3ee", // cyan
              fontFamily: "Satoshi, system-ui, sans-serif",
              borderRadius: "12px",
            },
          }}
        >
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
