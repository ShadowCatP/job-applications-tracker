"use client";

import { Logout } from "../ui/logout";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const hideHeader = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!hideHeader && (
        <header className="flex justify-between px-4 py-4">
          <div className="h-8 w-8 rounded-full bg-blue-500" />
          <Logout />
        </header>
      )}
    </>
  );
};
