"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex p-0">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <h1 className="h-6 font-bold">DC TEAM 23</h1>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          href="/"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>

        <Link
          href="/explore"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.startsWith("/explore")
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          Explore
        </Link>
        <Link
          href={"/about"}
          className={cn(
            "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
          )}
        >
          Sobre
        </Link>
      </nav>
    </div>
  );
}
