import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TechNova Store" },
      { name: "description", content: "Get in touch with the TechNova team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">Contact</div>
      <h1 className="mt-2 font-display font-black text-4xl md:text-5xl">Talk to a human.</h1>
      <p className="mt-3 text-muted-foreground max-w-xl">
        Our support team responds within 4 hours during business days.
      </p>

      <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Message sent! We'll be in touch shortly.");
            (e.currentTarget as HTMLFormElement).reset();
          }}
          className="glass rounded-3xl p-6 space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Name" required />
            <Input label="Email" type="email" required />
          </div>
          <Input label="Subject" required />
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</span>
            <textarea required rows={6} className="mt-1.5 w-full rounded-2xl bg-white/5 border border-hairline p-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
          </label>
          <button className="h-12 px-8 rounded-full gradient-hero text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform">
            Send message
          </button>
        </form>

        <aside className="space-y-3">
          {[
            { Icon: Mail, label: "Email", value: "hello@technova.store" },
            { Icon: Phone, label: "Phone", value: "+1 (555) 010-0100" },
            { Icon: MapPin, label: "HQ", value: "500 Market St, San Francisco, CA" },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="glass rounded-3xl p-5 flex items-center gap-4">
              <div className="size-11 rounded-2xl gradient-cool grid place-items-center">
                <Icon className="size-4 text-white" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
                <div className="font-semibold">{value}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function Input({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input {...rest} className="mt-1.5 w-full h-11 rounded-2xl bg-white/5 border border-hairline px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
    </label>
  );
}
