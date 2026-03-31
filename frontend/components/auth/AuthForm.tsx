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
import { cn } from "@/lib/utils";

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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} aria-label="auth-form" className="space-y-6">
        <div className="bg-white p-8 rounded-[32px] soft-shadow space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "h-14 bg-[#F7F7F8] border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-primary font-semibold text-slate-700", 
                errors.email && "ring-1 ring-red-500"
              )}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-slate-400">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "h-14 bg-[#F7F7F8] border-none rounded-2xl focus-visible:ring-1 focus-visible:ring-primary font-semibold text-slate-700", 
                errors.password && "ring-1 ring-red-500"
              )}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight" role="alert">
                {errors.password}
              </p>
            )}
          </div>
          {errors.form && (
            <p className="text-xs font-bold text-red-500 text-center uppercase" role="alert">
              {errors.form}
            </p>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest shadow-xl shadow-orange-200 transition-all active:scale-[0.98]" 
            disabled={loading}
          >
            {loading ? "Processing..." : type === "signup" ? "Create Account" : "Sign In"}
          </Button>
        </div>
      </form>
    </div>
  );
};
