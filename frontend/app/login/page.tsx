"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "@/components/Forms/LoginForm";
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<LoginForm>();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/auth/login", data);
      auth?.login(res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.response.data.msg || "Registration Failed");
    }
  };

  return (
    <div className="mx-auto mt-20 flex max-w-md flex-col gap-4 rounded border p-6 shadow">
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
