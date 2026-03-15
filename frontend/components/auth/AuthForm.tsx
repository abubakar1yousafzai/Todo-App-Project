"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";

const authSchema = z.object({
  email: z.string().min(1, "Email is required").regex(/@/, "Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
    .regex(/[0-9]/, "Password must contain at least 1 number"),
});

interface AuthFormProps {
  type: "signup" | "login";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = authSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors: { email?: string; password?: string; form?: string } = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof typeof fieldErrors;
        if (path && !fieldErrors[path]) fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      if (type === "signup") {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name: email.split("@")[0], // Default name
        });

        if (error) {
          if (error.status === 409) {
            setErrors({ form: "Email already registered" });
          } else {
            setErrors({ form: error.message || "Signup failed" });
          }
          return;
        }
        
        router.push("/login?message=Account created successfully");
      } else {
        const { data, error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          if (error.status === 401) {
            setErrors({ form: "Invalid email or password" });
          } else {
            setErrors({ form: error.message || "Login failed" });
          }
          return;
        }

        router.push("/dashboard");
      }
    } catch (err) {
      setErrors({ form: "Something went wrong, please try again" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{type === "signup" ? "Create Account" : "Welcome Back"}</CardTitle>
        <CardDescription>
          {type === "signup"
            ? "Sign up to start managing your tasks."
            : "Log in to access your todo list."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} aria-label="auth-form">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive" : ""}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p className="text-sm text-destructive" id="email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-destructive" : ""}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p className="text-sm text-destructive" id="password-error" role="alert">
                {errors.password}
              </p>
            )}
          </div>
          {errors.form && (
            <p className="text-sm font-medium text-destructive text-center" id="form-error" role="alert">
              {errors.form}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : type === "signup" ? "Sign Up" : "Log In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
