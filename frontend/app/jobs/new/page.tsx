"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { JobForm } from "@/components/Forms/JobForm";

export default function NewJobPage() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth?.loading && !auth?.token) {
      router.push("/login");
    }
  }, [auth?.token, auth?.loading, router]);

  return (
    <div className="mx-2 mt-10 flex justify-center">
      <section className="flex w-full max-w-xl flex-col rounded border bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">Add New Job</h1>
        <JobForm />
      </section>
    </div>
  );
}
