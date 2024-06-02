import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "404 - Page Not Found - Volaired",
  description: "The page you are looking for does not exist on Volaired.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="px-6 w-screen h-[92dvh] flex justify-center flex-col gap-y-5 overflow-hidden">
      <div className="">
        <h1 className="text-lg text-indigo-500 font-semibold tracking-tight">
          404
        </h1>
        <h2 className="font-bold tracking-tight text-3xl">
          We couldn&apos;t find the page you&apos;re looking for.
        </h2>
      </div>
      <div className="flex items-center gap-x-3">
        <Link href="/">
          <Button variant="outline">Go back home</Button>
        </Link>
      </div>
    </main>
  );
}
