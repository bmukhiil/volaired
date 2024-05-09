import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const links = [
    {
      name: "Volaired",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  return (
    <nav className="px-6 py-3 border-b border-dashed flex items-center justify-between">
      <Link href="/" className="font-semibold tracking-tight text-2xl">
        Volaired
      </Link>
      <Link href="/support">
        <Button variant="secondary">Help & Support</Button>
      </Link>
    </nav>
  );
}
