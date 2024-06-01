"use client";

import { cn } from "@/lib/utils";
import { Code2, LogOutIcon, PlusCircle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MainNav } from "../MainNav";
import { MobileNav } from "../MobileNav";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
export const Header = () => {
  const { data } = useSession();
  const pathname = usePathname();

  const handleLogoutClick = () => {
    signOut();
  };
  
  return (
    <header className="sticky py-3 max-lg:w-full w-full mx-auto top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 w-[90%] max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center gap-4">
            {!data?.user && (
              <div className="max-md:hidden flex gap-4">
                <Link href={"/sign_in"}>
                  <Button variant={"default"} className="font-semibold">
                    Fazer Login
                  </Button>
                </Link>
                <Link href={"/sign_up"}>
                  <Button variant={"secondary"} className="font-semibold">
                    Fazer Cadastro
                  </Button>
                </Link>
              </div>
            )}
            {data?.user && (
              <HoverCard openDelay={15} closeDelay={30}>
                <HoverCardTrigger asChild>
                  <Link
                    className="max-md:hidden"
                    href={`/profile/${data.user.id}`}
                  >
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
                </HoverCardTrigger>
                <HoverCardContent className=" w-54 gap-3 flex flex-col mt-1">
                  <Button
                    variant="outline"
                    className="w-full justify-start "
                    asChild
                  >
                    <Link
                      href="/add-project"
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
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
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
                  <Button onClick={handleLogoutClick} variant="outline">
                    <LogOutIcon className="w-[18px] h-[18px] mr-2" />
                    Sair
                  </Button>
                </HoverCardContent>
              </HoverCard>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
