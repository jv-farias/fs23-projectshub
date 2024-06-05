"use client";

import { cn } from "@/lib/utils";
import {
  BookIcon,
  Code2,
  HomeIcon,
  LogOutIcon,
  PlusCircle,
  TextSearch,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "../Icons";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function MobileNav() {
  const pathname = usePathname();
  const { data } = useSession();

  const handleLogoutClick = () => {
    signOut();
  };

  return (
    <div className="flex justify-between items-center w-full">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          >
            <svg
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="flex flex-col gap-4 text-base mt-8">
            {!data?.user && (
              <Button variant="outline" className="justify-start" asChild>
                <Link
                  href="/"
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === "/" ? "text-foreground" : "text-foreground/60"
                  )}
                >
                  <HomeIcon size={18} className="mr-2" />
                  Home
                </Link>
              </Button>
            )}
            {data?.user && (
              <>
                <Link href={`/profile/${data.user.id}`}>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={data.user.image ?? ""} />
                      <AvatarFallback>{data.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-semibold">
                      {data.user.name}
                    </span>
                  </div>
                </Link>
                <Button variant="outline" className="justify-start" asChild>
                  <Link
                    href="/"
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      pathname === "/"
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    <HomeIcon size={18} className="mr-2" />
                    Home
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link
                    href="/new-project"
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      pathname?.startsWith("/add-project")
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    <PlusCircle size={18} className="mr-2" />
                    Adicionar Projeto
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link
                    href="/my-projects"
                    className={cn(
                      "transition-colors hover:text-foreground/80",
                      pathname?.startsWith("/my-projects")
                        ? "text-foreground"
                        : "text-foreground/60"
                    )}
                  >
                    <Code2 size={18} className="mr-2" />
                    Meus Projetos
                  </Link>
                </Button>
              </>
            )}

            <Button variant="outline" className="justify-start" asChild>
              <Link
                href="/explore"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/explore")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <TextSearch size={18} className="mr-2" />
                Explore
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link
                href="/about"
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathname?.startsWith("/about")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <BookIcon size={18} className="mr-2" />
                Sobre
              </Link>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <Link
                href="/github"
                className={cn(
                  "transition-colors hover:text-foreground/80 flex items-center",
                  pathname?.startsWith("/github")
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <Icons.GitHub className="w-[18px] h-[18px] mr-2" />
                GitHub
              </Link>
            </Button>
            {!data?.user && (
              <>
                <Link href={"/login"}>
                  <Button variant={"default"} className="w-full font-semibold">
                    Fazer Login
                  </Button>
                </Link>
                <Link href={"/register"}>
                  <Button
                    variant={"secondary"}
                    className="w-full font-semibold"
                  >
                    Fazer Cadastro
                  </Button>
                </Link>
              </>
            )}
            {data?.user && (
              <Button
                onClick={handleLogoutClick}
                className="justify-start w-full text-foreground/60 "
                variant="outline"
              >
                <LogOutIcon className="w-[18px] text-foreground/60  h-[18px] mr-2" />
                Sair
              </Button>
            )}
          </nav>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6"></ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
