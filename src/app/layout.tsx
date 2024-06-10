import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

// SEO: https://www.reddit.com/r/nextjs/comments/195ikpf/nextjs_seo_complete_checklist/

export const metadata: Metadata = {
  title: "Volaired - Optimize Your Flights and Plan Group Trips",
  description:
    "Optimize your flights for cost and layovers with ease. Plan group trips and split bills seamlessly with Volaired.",
  keywords:
    "flight booking, flight optimization, group trips, Volaired, travel planning",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://volaired.com",
    title: "Volaired - Optimize Your Flights and Plan Group Trips",
    description:
      "Optimize your flights for cost and layovers with ease. Plan group trips and split bills seamlessly with Volaired.",
    siteName: "Volaired",
    // images: [
    //   {
    //     url: "https://volaired.com/images/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Volaired",
    //     type: "image/png",
    //   },
    // ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@volaired",
  //   creator: "@volaired",
  //   title: "Volaired - Optimize Your Flights and Plan Group Trips",
  //   description: "Optimize your flights for cost and layovers with ease. Plan group trips and split bills seamlessly with Volaired.",
  //   images: [
  //     {
  //       url: "https://volaired.com/images/twitter-image.png",
  //       alt: "Volaired",
  //     },
  //   ],
  // },
  // icons: {
  //   icon: [
  //     { url: "/favicon.ico", type: "image/x-icon" },
  //     { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
  //     // Add more icons as needed
  //   ],
  //   apple: [
  //     { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
  //     { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
  //     // Add more apple-touch icons as needed
  //   ],
  // },
  alternates: {
    canonical: "https://volaired.com",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <Providers>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <body
            className={cn("overflow-x-hidden bg-background", inter.className)}
          >
            {children}
            <SpeedInsights />
            <Analytics />
          </body>
          {/* </ThemeProvider> */}
        </Providers>
      </html>
    </CookiesProvider>
  );
}
