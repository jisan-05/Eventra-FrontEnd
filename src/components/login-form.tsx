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
import { authClient } from "@/lib/auth-client";
import { Chrome, Facebook } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "facebook" | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const demoCredentials = {
    email: "demo@eventra.com",
    password: "Demo@123456",
  };

  const validate = () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const errorMessage = validate();
    if (errorMessage) {
      toast.error(errorMessage);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important for cookies
        body: JSON.stringify({
          email: email.trim(),
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

  const handleDemoFill = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
    toast.success("Demo credentials filled.");
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    try {
      setSocialLoading(provider);
      await authClient.signIn.social({
        provider,
        callbackURL: callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/",
      });
    } catch (err: any) {
      toast.error(err?.message || `${provider} login is not configured yet.`);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 w-full max-w-md mx-auto px-2 my-10",
        className,
      )}
      {...props}
    >
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
              disabled={socialLoading !== null}
              className="w-full"
            >
              <Chrome className="mr-2 h-4 w-4" />
              {socialLoading === "google" ? "Connecting..." : "Google"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("facebook")}
              disabled={socialLoading !== null}
              className="w-full"
            >
              <Facebook className="mr-2 h-4 w-4" />
              {socialLoading === "facebook" ? "Connecting..." : "Facebook"}
            </Button>
          </div>
          <p className="mb-4 text-center text-xs text-muted-foreground">or continue with email</p>

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
                <Button type="button" variant="outline" onClick={handleDemoFill}>
                  Use demo login
                </Button>
                <FieldDescription>
                  Demo: <span className="font-medium">{demoCredentials.email}</span> /{" "}
                  <span className="font-medium">{demoCredentials.password}</span>
                </FieldDescription>

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
