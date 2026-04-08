import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-background px-4 py-10">
      <Suspense fallback={<p className="text-center py-10 text-muted-foreground">Loading…</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
