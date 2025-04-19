"use client";

import { LoginForm } from "@/components/Forms/LoginForm";
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  return (
    <div className="mx-auto mt-20 flex max-w-md flex-col gap-4 rounded border bg-white p-6 shadow">
      <h1 className="text-2xl font-bold">Login</h1>

      <LoginForm />

      <span>
        Don't have account?{" "}
        <Link href={"/register"} className="text-blue-400 hover:underline">
          Register
        </Link>
      </span>
    </div>
  );
}
