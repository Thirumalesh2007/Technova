import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Heart, Moon, Search, ShoppingCart, Sun, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cartCount = useStore((s) => s.cart.reduce((a, c) => a + c.qty, 0));
  const wishCount = useStore((s) => s.wishlist.length);
  const theme = useStore((s) => s.theme);
  const toggleTheme = useStore((s) => s.toggleTheme);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // sync theme class on mount
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light", theme === "light");
    }
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [theme]);

  useEffect(() => setMobileOpen(false), [pathname]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: query } as never });
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all",
        scrolled ? "glass-strong border-b border-hairline" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="size-9 rounded-xl gradient-hero grid place-items-center font-black text-white shadow-glow">
            T
          </div>
          <span className="hidden sm:block font-display font-black text-lg tracking-tight">
            Tech<span className="gradient-text">Nova</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {links.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-all",
                  active
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-sm ml-auto relative">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search products, brands..."
            className="w-full h-10 rounded-full glass pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
        </form>

        <div className="flex items-center gap-1 ml-auto md:ml-2">
          <button
            onClick={toggleTheme}
            className="size-10 rounded-full grid place-items-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <Link
            to="/wishlist"
            className="relative size-10 rounded-full grid place-items-center text-muted-foreground hover:text-brand-pink hover:bg-white/5 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="size-4" />
            {wishCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold gradient-warm text-white grid place-items-center">
                {wishCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative size-10 rounded-full grid place-items-center text-muted-foreground hover:text-brand-cyan hover:bg-white/5 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="size-4" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold gradient-hero text-white grid place-items-center">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            to="/auth"
            className="hidden sm:inline-flex ml-1 items-center gap-2 h-10 px-4 rounded-full gradient-hero text-white text-sm font-semibold shadow-glow hover:scale-105 active:scale-95 transition-transform"
          >
            <User className="size-4" />
            Login
          </Link>

          <button
            className="lg:hidden size-10 rounded-full grid place-items-center hover:bg-white/5"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-hairline glass-strong">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-3 rounded-xl hover:bg-white/5 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
            <form onSubmit={onSearch} className="relative mt-2">
              <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full h-11 rounded-full glass pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
