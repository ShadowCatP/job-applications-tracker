"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
