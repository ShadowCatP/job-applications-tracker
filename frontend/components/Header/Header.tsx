"use client";

import { Logout } from "../ui/logout";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const hideHeader = pathname === "/register" || pathname === "/login";

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
