"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await api.post("/auth/register", data);
      auth?.login(res.data.token);
      router.push("/");
    } catch (err: any) {
      setError(err.response.data.msg || "Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="mb-4 rounded bg-red-100 px-4 py-2 text-red-700">
          {error}
        </div>
      )}

      <Input {...register("name", { required: true })} placeholder="Name" />

      <Input
        {...register("email", { required: true })}
        type="email"
        placeholder="Email"
      />

      <Input
        {...register("password", { required: true })}
        type="password"
        placeholder="Password"
      />

      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  );
};
