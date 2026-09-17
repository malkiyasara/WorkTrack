"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        alert(res.error);
        return;
      }

      router.push("/dashboard");
    } catch (error: any) {
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h1 className="text-2xl font-bold tracking-tight mb-1">Welcome Back</h1>
      <p className="text-purple-200 mb-5 text-[10.5px]">
        Please enter your authorized credentials to access your terminal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300">
            <Mail size={13} />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Your registered email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-4 py-2.5 text-xs shadow-inner focus:outline-none focus:ring-4 focus:ring-amber-400/40"
          />
        </div>

        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300">
            <Lock size={13} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Your account password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-10 py-2.5 text-xs shadow-inner focus:outline-none focus:ring-4 focus:ring-amber-400/40"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-purple-300 hover:text-purple-600 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        <div className="flex flex-row items-center gap-2 pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-wider disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-1/2 border border-white/50 text-white py-2.5 rounded-full font-semibold text-[11px] hover:bg-white hover:text-purple-700 transition-all"
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}
