"use client";

import Image from "next/image";
import { Logout } from "../ui/logout";
import { usePathname } from "next/navigation";
import Logo from "./logo.png";

export const Header = () => {
  const pathname = usePathname();

  const hideHeader = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!hideHeader && (
        <header className="flex justify-between px-4 py-4">
          <Image
            src={Logo}
            width={1024}
            height={1024}
            alt="Logo"
            className="h-8 w-8"
          />
          <Logout />
        </header>
      )}
    </>
  );
};
