import { RegisterForm } from "@/components/Forms/RegisterForm";
import Link from "next/link";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  return (
    <div className="shadow, mx-auto mt-20 flex max-w-md flex-col gap-4 rounded border bg-white p-6">
      <h1 className="text-2xl font-bold">Register</h1>

      <RegisterForm />

      <span>
        Already have an account?{" "}
        <Link href={"/login"} className="text-blue-400 hover:underline">
          Login
        </Link>
      </span>
    </div>
  );
}
