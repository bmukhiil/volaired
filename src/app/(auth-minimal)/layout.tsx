import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="w-screen sticky inset-0 z-50">
        <nav className="bg-secondary border-b border-dashed px-6 lg:px-28 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-bold tracking-tight text-2xl text-foreground"
            title="Volaired homepage"
          >
            volaired
          </Link>
        </nav>
      </header>
      <div className="h-full lg:mt-0 flex flex-col justify-between items-stretch overflow-y-hidden">
        <div className="flex w-full h-full">
          <div className="pt-20 justify-between flex flex-col lg:pt-28 lg:w-3/4 w-full bg-secondary">
            {children}
            <footer className="mb-6 px-6 lg:px-28 font-medium text-xs text-muted-foreground">
              By continuing, you agree to Radiair&apos;s{" "}
              <Link href="/terms" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </Link>
              , and to receive emails with updates.
            </footer>
          </div>
          <div className="hidden lg:flex bg-background border-l border-dashed justify-center items-center">
            <div className="bg-background px-32 flex flex-col gap-y-4">
              <h2 className="text-3xl tracking-tight">
                &quot;Volaired is hands-down, the best platform for booking
                flights and hotels. I use it for all my trips.&quot;
              </h2>
              <div className="flex gap-x-4 items-center w-1/2 bg-secondary p-4 rounded-xl shadow-sm">
                <Avatar>
                  <AvatarImage src="" alt="Mohith B." />
                  <AvatarFallback>MB</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Mohith B.</h3>
                  <p className="text-sm text-muted-foreground">
                    Software Engineer @ Radiar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
