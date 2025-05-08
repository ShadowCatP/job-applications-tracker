"use client";

import Image from "next/image";
import { Logout } from "../ui/logout";
import { usePathname } from "next/navigation";
import Logo from "./logo.png";
import Link from "next/link";

export const Header = () => {
  const pathname = usePathname();

  const hideHeader = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!hideHeader && (
        <header className="flex justify-between bg-white px-4 py-4 shadow">
          <Link href={"/"}>
            <Image
              src={Logo}
              width={1024}
              height={1024}
              alt="Logo"
              className="h-8 w-8"
            />
          </Link>
          <Logout />
        </header>
      )}
    </>
  );
};
