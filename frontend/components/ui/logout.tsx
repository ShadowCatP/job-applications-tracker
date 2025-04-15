"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "./button";

export const Logout = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth?.logout();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
