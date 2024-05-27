import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col gap-y-28">
      <header className="w-screen sticky inset-0 z-50">
        <nav className="bg-secondary border-b border-dashed px-6 lg:px-28 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight text-2xl text-foreground"
            title="Volaired homepage"
          >
            volaired
          </Link>
        </nav>
      </header>
      <div className="flex flex-col justify-between items-stretch h-[75dvh]">
        <div>{children}</div>
        <footer className="px-6 font-medium text-xs text-muted-foreground">
          By continuing, you agree to Volaired's{" "}
          <span className="underline">Terms of Service</span> and{" "}
          <span className="underline">Privacy Policy</span>, and to receive
          emails with updates.
        </footer>
      </div>
    </div>
  );
}
