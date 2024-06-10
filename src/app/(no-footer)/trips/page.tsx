import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function TripsPage() {
  return (
    <div className="flex flex-col gap-y-2">
      <Button className="bg-secondary border border-primary text-primary hover:bg-background flex items-center gap-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          class="size-5"
        >
          <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
        </svg>
        Create a new trip
      </Button>
      <ul className="flex flex-col gap-y-4">
        <li className="border rounded-lg flex flex-col">
          <Link href="/trips/1">
            <div className="w-full h-32 bg-background rounded-lg" />
            <div className="p-4 flex items-center justify-between">
              <h2 className="font-bold text-xl">Trip to NYC</h2>
              <div className="bg-background p-1 flex rounded-full gap-x-2 items-center">
                <div className="flex items-center">
                  <Image
                    src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/nSFC74Naxn1NTZ4l"
                    alt=""
                    width={50}
                    height={50}
                    className="w-8 h-8 rounded-full"
                  />
                  <Image
                    src="https://itin-dev.sfo2.cdn.digitaloceanspaces.com/profilePicture/SQptUWNel3Ftc28t"
                    alt=""
                    width={50}
                    height={50}
                    className="w-8 h-8 rounded-full ring-2 ring-secondary -translate-x-1"
                  />
                </div>
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}
