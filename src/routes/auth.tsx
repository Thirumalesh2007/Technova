import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, User } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Login — TechNova Store" }] }),
  component: Auth,
});

function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(mode === "login" ? "Welcome back!" : "Account created!");
    navigate({ to: "/" });
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-strong rounded-3xl p-8 shadow-glow-purple">
        <div className="flex gap-2 p-1 rounded-full bg-white/5 mb-6">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 h-10 rounded-full text-sm font-semibold capitalize ${mode === m ? "gradient-hero text-white shadow-glow" : "text-muted-foreground"}`}
            >
              {m}
            </button>
          ))}
        </div>
        <h1 className="font-display font-black text-3xl text-center">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="text-center text-muted-foreground text-sm mt-1">
          {mode === "login" ? "Sign in to continue shopping" : "Join the Alpha Club today"}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          {mode === "register" && (
            <Field icon={<User className="size-4" />} placeholder="Full name" />
          )}
          <Field icon={<Mail className="size-4" />} placeholder="you@example.com" type="email" />
          <Field icon={<Lock className="size-4" />} placeholder="Password" type="password" />
          {mode === "login" && (
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-[color:var(--brand)]" /> Remember me
              </label>
              <button type="button" className="text-brand-cyan hover:underline">Forgot?</button>
            </div>
          )}
          <button className="w-full h-12 rounded-full gradient-hero text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform">
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex-1 h-px bg-hairline" /> or <div className="flex-1 h-px bg-hairline" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="h-11 rounded-2xl glass text-sm font-semibold hover:bg-white/10">Google</button>
          <button className="h-11 rounded-2xl glass text-sm font-semibold hover:bg-white/10">Apple</button>
        </div>
      </div>
    </div>
  );
}

function Field({ icon, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <label className="block relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      <input required {...rest} className="w-full h-12 pl-11 pr-4 rounded-2xl bg-white/5 border border-hairline text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
    </label>
  );
}
