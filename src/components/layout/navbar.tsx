import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const links = [
    {
      name: "Volaired",
      href: "/",
      title: "Go to Volaired homepage"
    },
    {
      name: "About",
      href: "/about",
      title: "Learn more about Volaired"
    },
    {
      name: "Contact",
      href: "/contact",
      title: "Contact Volaired"
    },
  ];

  return (
    <header>
      <nav className="px-6 py-3 lg:px-40 lg:py-4 border-b border-dashed flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-2xl" title="Volaired homepage">
          Volaired
        </Link>
        {/* <div className="flex space-x-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} title={link.title}>
              {link.name}
            </Link>
          ))}
        </div> */}
      </nav>
    </header>
  );
}
