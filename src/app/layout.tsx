import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body className={cn("overflow-x-hidden", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster
              icons={{
                warning: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-rose-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ),
                success: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-indigo-500"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ),
                loading: (
                  <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" />
                ),
              }}
            />
            <Footer />
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
