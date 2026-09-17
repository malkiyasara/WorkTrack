"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { registerUser } from "@/services/auth.service";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
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
      router.refresh();
    } catch (error: any) {
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-2xl font-bold tracking-tight mb-1">Create Account</h2>
      <p className="text-purple-200 mb-5 text-[10.5px]">
        Sign up to unlock your cross-functional dashboard terminal.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300">
            <User size={13} />
          </span>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 text-xs shadow-inner focus:outline-none"
          />
        </div>

        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300">
            <Mail size={13} />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-4 py-2 text-xs shadow-inner focus:outline-none"
          />
        </div>

        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300">
            <Lock size={13} />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-10 py-2 text-xs shadow-inner focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-purple-300 hover:text-purple-600 transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-purple-300">
            <Lock size={13} />
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full bg-white text-gray-800 rounded-full pl-10 pr-10 py-2 text-xs shadow-inner focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-purple-300 hover:text-purple-600 transition-colors focus:outline-none"
          >
            {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-purple-950 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-wider"
          >
            {loading ? "Registering..." : "Sign up"}
          </button>
        </div>

        <div className="text-center pt-2">
          <span className="text-[10.5px] text-purple-200">
            Already have an account?{" "}
          </span>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-[10.5px] font-bold text-white hover:underline bg-transparent"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
