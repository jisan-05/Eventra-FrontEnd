import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="">
      <Suspense fallback={<p className="text-center py-10 text-gray-500">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
