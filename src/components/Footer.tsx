import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline bg-surface/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="size-9 rounded-xl gradient-hero grid place-items-center font-black text-white shadow-glow">
              T
            </div>
            <span className="font-display font-black text-lg tracking-tight">
              Tech<span className="gradient-text">Nova</span> Store
            </span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            Smart Technology. Smarter Shopping. The definitive marketplace for premium electronics —
            curated by tech specialists, backed by our 30-day promise.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed! Watch your inbox for early drops.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
            className="mt-6 flex gap-2 max-w-sm"
          >
            <input
              required
              type="email"
              placeholder="you@example.com"
              className="flex-1 h-11 rounded-full glass px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
            <button className="h-11 px-4 rounded-full gradient-hero text-white text-sm font-semibold shadow-glow hover:scale-105 transition-transform grid place-items-center">
              <Send className="size-4" />
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="size-10 rounded-full glass grid place-items-center hover:text-brand-cyan hover:scale-110 transition-all"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Shop",
            links: [
              ["Smartphones", "/shop"],
              ["Laptops", "/shop"],
              ["Gaming", "/shop"],
              ["Deals", "/deals"],
            ],
          },
          {
            title: "Company",
            links: [
              ["About", "/about"],
              ["Contact", "/contact"],
              ["Careers", "#"],
              ["Press", "#"],
            ],
          },
          {
            title: "Support",
            links: [
              ["Order Status", "#"],
              ["Returns", "#"],
              ["Warranty", "#"],
              ["FAQ", "/about"],
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              {col.title}
            </h4>
            <ul className="space-y-3 text-sm">
              {col.links.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-foreground/80 hover:text-brand-cyan transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} TechNova Store. Crafted with care.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
