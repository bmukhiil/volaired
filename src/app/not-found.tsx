import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-6 w-screen h-[92dvh] flex justify-center flex-col gap-y-5">
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
