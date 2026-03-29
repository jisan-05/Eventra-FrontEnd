/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for cookies
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful");

      const next =
        callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/";
      setTimeout(() => {
        router.push(next);
        router.refresh();
      }, 600);
      
      
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-md mx-auto px-2 my-10",
        className,
      )}
      {...props}
    >
      <Card className="">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" className="ml-auto text-sm hover:underline">
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              {/* Buttons */}
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>

               

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
