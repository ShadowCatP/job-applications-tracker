"use client";

import { useForm } from "react-hook-form";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const auth = useAuth();
  const router = useRouter();

  const onSubmit = async (data: RegisterForm) => {
    try {
      const res = await api.post("/auth/register", data);
      auth?.login(res.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.response.data.msg || "Registration Failed");
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md rounded border p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full rounded border p-2"
        />
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
