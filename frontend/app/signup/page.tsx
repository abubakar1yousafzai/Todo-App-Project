"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import Link from "next/link";
import { CheckSquare } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F7F7F8]">
      <div className="w-full max-w-md space-y-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-primary p-4 rounded-[20px] shadow-xl shadow-orange-200">
            <CheckSquare className="h-10 w-10 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">My Tasks</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2">Join the Community</p>
          </div>
        </div>

        <AuthForm type="signup" />
        
        <p className="text-center text-sm font-bold text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 transition-colors underline decoration-2 underline-offset-4">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
