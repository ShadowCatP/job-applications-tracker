"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./button";
import { LogOut } from "lucide-react";

export const Logout = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth?.logout();
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-primary-600 hover:bg-primary-500"
    >
      <LogOut />
      <span>Logout</span>
    </Button>
  );
};
