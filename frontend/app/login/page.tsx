"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { CheckSquare } from "lucide-react";

function LoginContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F8]">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F7F7F8]">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-primary p-4 rounded-[20px] shadow-xl shadow-orange-200">
            <CheckSquare className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Sign in to your account</p>
          </div>
        </div>
        
        {message && (
          <div className="bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest p-4 rounded-2xl text-center border-none shadow-sm">
            {message === "Account created successfully" ? "Account created! Please sign in." : message}
          </div>
        )}

        <AuthForm type="login" />
        
        <p className="text-center text-sm font-bold text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors underline decoration-2 underline-offset-4">
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F7F7F8] text-slate-400 font-bold uppercase tracking-widest">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
