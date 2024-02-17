import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Link from "next/link";

import { CategoryNavigationMenu } from "./CategoryMenu";
import { LogoSquare } from "./Logo";
import { UserMenu } from "./UserMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



export function Navbar() {
  return(
    <header className="fixed w-full top-0 bg-white text-gray-600 body-font shadow-sm border-b border-gray-200 z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/" className="text-black no-underline flex font-medium items-center mb-4 md:mb-0">
          <LogoSquare/>
        </Link>
        <CategoryNavigationMenu/>

        <div className="mx-auto">
          <form>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search" className="pl-8 w-80 text-center" />
            </div>
          </form>
        </div>

        <nav className="md:ml-auto flex-wrap items-center text-base justify-center min-[1200px]:block hidden">
          <Link href={"/"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Home</Link>
          <Link href={"/chats"} className="mr-5 hover:text-gray-900 hover:cursor-pointer">Chats</Link>
        </nav>

        <SignedOut>
          <SignInButton mode="modal">
            <Button size={"lg"} className="text-base">Login</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserMenu />
        </SignedIn>

      </div>
    </header>
  );
}
