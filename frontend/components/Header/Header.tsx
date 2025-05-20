"use client";

import { Logout } from "../ui/logout";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ThemeButtonSwitch } from "../ui/theme-button-switch";

export const Header = () => {
  const pathname = usePathname();

  const hideHeader = ["/login", "/register"].includes(pathname);

  return (
    <>
      {!hideHeader && (
        <header className="flex items-center justify-between px-4 py-4 shadow transition-colors dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-neutral-400">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">JT</h1>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeButtonSwitch />
            <Logout />
          </div>
        </header>
      )}
    </>
  );
};
