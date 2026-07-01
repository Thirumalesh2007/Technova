import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Shield, Truck, RotateCcw, Star, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGrid, ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechNova Store — Smart Technology. Smarter Shopping." },
      {
        name: "description",
        content:
          "Discover flagship smartphones, laptops, audio, gaming and more at TechNova — the premium electronics marketplace.",
      },
      { property: "og:title", content: "TechNova Store — Premium Electronics" },
      {
        property: "og:description",
        content: "Smart Technology. Smarter Shopping. Shop 60+ curated tech products.",
      },
    ],
  }),
  component: Home,
});

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const t = setInterval(() => setLeft((l) => (l <= 0 ? seconds : l - 1)), 1000);
    return () => clearInterval(t);
  }, [seconds]);
  const h = String(Math.floor(left / 3600)).padStart(2, "0");
  const m = String(Math.floor((left % 3600) / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return { h, m, s };
}

function Home() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const trending = products.filter((p) => p.isTrending).slice(0, 4);
  const flashSale = products.filter((p) => p.isFlashSale).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.badge === "Best Seller").slice(0, 4);
  const heroProduct = products.find((p) => p.name.includes("Titan Pro"))!;

  const { h, m, s } = useCountdown(6 * 3600 + 42 * 60 + 15);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-24">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[900px] rounded-full bg-brand/20 blur-[140px]" />
          <div className="absolute top-10 right-10 size-[500px] rounded-full bg-brand-purple/20 blur-[120px]" />
          <div className="absolute bottom-0 left-10 size-[400px] rounded-full bg-brand-cyan/20 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold tracking-wide">
              <Sparkles className="size-3.5 text-brand-yellow" />
              <span className="uppercase text-muted-foreground">New M3 Generation is here</span>
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]">
              Smart Technology.
              <br />
              <span className="gradient-text">Smarter Shopping.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Flagship phones, pro laptops, next-gen audio and more — hand-picked by tech
              specialists and shipped free with our 30-day happiness promise.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full gradient-hero text-white font-semibold shadow-glow hover:scale-105 active:scale-95 transition-transform"
              >
                Shop Now <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/deals"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full glass font-semibold hover:bg-white/10 transition-colors"
              >
                <Zap className="size-4 text-brand-orange" /> View Deals
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                ["60+", "Products"],
                ["11", "Categories"],
                ["4.8★", "Avg. rating"],
              ].map(([v, l]) => (
                <div key={l} className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl font-black font-display gradient-text">{v}</div>
                  <div className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero product visual */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 rounded-[3rem] gradient-hero blur-3xl opacity-40" />
            <div className="relative rounded-[3rem] glass-strong p-8 shadow-glow-purple animate-float">
              <div className="aspect-square rounded-2xl overflow-hidden gradient-cool">
                <img
                  src={heroProduct.image}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover mix-blend-luminosity opacity-90"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">
                    Featured Drop
                  </div>
                  <div className="mt-1 font-display font-bold text-xl">{heroProduct.name}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm">
                    <span className="text-brand-yellow flex items-center gap-1">
                      <Star className="size-3 fill-current" />
                      {heroProduct.rating}
                    </span>
                    <span className="text-muted-foreground">
                      · {heroProduct.reviews} reviews
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-2xl">${heroProduct.price}</div>
                  {heroProduct.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">
                      ${heroProduct.originalPrice}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <div className="hidden md:block absolute -top-4 -left-4 glass-strong rounded-2xl px-4 py-3 shadow-soft animate-float">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Free shipping</div>
              <div className="text-sm font-semibold">on orders $50+</div>
            </div>
            <div
              className="hidden md:block absolute -bottom-4 -right-4 glass-strong rounded-2xl px-4 py-3 shadow-soft animate-float"
              style={{ animationDelay: "1.5s" }}
            >
              <div className="text-[10px] uppercase tracking-widest text-brand-green">In stock</div>
              <div className="text-sm font-semibold">Ships tomorrow</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y border-hairline bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { Icon: Truck, title: "Free shipping", sub: "on orders over $50" },
            { Icon: Shield, title: "2-year warranty", sub: "on every product" },
            { Icon: RotateCcw, title: "30-day returns", sub: "no questions asked" },
            { Icon: Sparkles, title: "Curated by experts", sub: "60+ premium picks" },
          ].map(({ Icon, title, sub }, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="size-10 rounded-xl gradient-cool grid place-items-center shrink-0">
                <Icon className="size-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold truncate">{title}</div>
                <div className="text-xs text-muted-foreground truncate">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Shop by category"
            title="Explore every corner of tech"
            sub="From flagship phones to studio-grade cameras — organized so you can find it fast."
          />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                to="/shop"
                search={{ category: c.slug } as never}
                className="group relative rounded-3xl p-5 glass hover-lift animate-fade-up overflow-hidden"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div
                  className={`absolute -top-8 -right-8 size-32 rounded-full bg-gradient-to-br ${c.gradient} opacity-30 blur-2xl group-hover:opacity-60 transition-opacity`}
                />
                <div className="relative">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className="font-display font-bold">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground mt-1">{c.blurb}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-[2rem] overflow-hidden gradient-flash p-8 md:p-10">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.4),transparent_40%)]" />
            </div>
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 backdrop-blur text-white text-xs font-bold uppercase tracking-widest">
                  <span className="size-2 rounded-full bg-white animate-pulse" /> Live Flash Sale
                </span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl font-black text-white leading-tight">
                  Up to 45% off flagship gear
                </h3>
                <p className="mt-2 text-white/80 max-w-md">
                  Limited quantity. Deals refresh every 12 hours — grab yours before the timer runs
                  out.
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {[
                    ["Hours", h],
                    ["Mins", m],
                    ["Secs", s],
                  ].map(([l, v]) => (
                    <div
                      key={l}
                      className="glass-strong rounded-2xl px-4 py-3 min-w-[70px] text-center"
                    >
                      <div className="font-mono text-2xl font-black text-white">{v}</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/70">{l}</div>
                    </div>
                  ))}
                  <Link
                    to="/deals"
                    className="ml-2 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-slate-900 font-semibold hover:scale-105 transition-transform"
                  >
                    Shop Deals <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {flashSale.slice(0, 4).map((p, i) => (
                  <Link
                    key={p.id}
                    to="/product/$id"
                    params={{ id: p.id }}
                    className="glass-strong rounded-2xl p-3 hover-lift"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="aspect-square rounded-xl overflow-hidden bg-white/10 mb-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                      />
                    </div>
                    <div className="text-xs font-semibold truncate text-white">{p.name}</div>
                    <div className="text-sm font-black text-white">${p.price}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <Section
        eyebrow="Featured"
        title="Handpicked flagship gear"
        sub="Products our tech team can't stop talking about."
        cta={{ label: "View all", to: "/shop" }}
      >
        <ProductGrid products={featured} />
      </Section>

      {/* TRENDING */}
      <Section
        eyebrow="Trending now"
        title="What everyone's buying"
        sub="Our top movers in the past 24 hours."
      >
        <ProductGrid products={trending} />
      </Section>

      {/* NEW ARRIVALS */}
      <Section
        eyebrow="Just landed"
        title="New arrivals"
        sub="Fresh drops added this week."
        cta={{ label: "See all new", to: "/shop" }}
      >
        <ProductGrid products={newArrivals} />
      </Section>

      {/* BEST SELLERS */}
      <Section eyebrow="Best sellers" title="Loved by the community">
        <ProductGrid products={bestSellers} />
      </Section>

      {/* TESTIMONIALS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="From our customers"
            title="10,000+ five-star reviews"
            sub="Real words from real TechNova buyers."
          />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Sara J.",
                role: "Product Designer",
                text: "Ordered the MacBook Air and it arrived next day, perfectly packaged. TechNova is now my default for anything tech.",
              },
              {
                name: "Marcus T.",
                role: "Creative Director",
                text: "The interface is as sharp as the hardware. Feels curated, not a random big-box store.",
              },
              {
                name: "Ayesha K.",
                role: "Software Engineer",
                text: "Prices are competitive, returns are painless, and support actually knows their gear. 10/10.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="glass rounded-3xl p-6 hover-lift animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex text-brand-yellow gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-foreground/90 leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="size-10 rounded-full gradient-hero grid place-items-center font-bold text-white">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PARTNERS */}
      <section className="py-16 border-y border-hairline">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
            Trusted brand partners
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {["APPLE", "SAMSUNG", "SONY", "GOOGLE", "MICROSOFT", "DJI", "BOSE", "LOGITECH"].map(
              (b) => (
                <span
                  key={b}
                  className="font-display font-black text-2xl tracking-tight text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {b}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-[2.5rem] p-10 md:p-14 glass-strong overflow-hidden">
            <div className="absolute -top-20 -right-20 size-72 rounded-full gradient-hero opacity-30 blur-3xl" />
            <div className="relative text-center max-w-xl mx-auto">
              <h3 className="font-display text-3xl md:text-4xl font-black tracking-tight">
                Join the <span className="gradient-text">Alpha Club</span>
              </h3>
              <p className="mt-3 text-muted-foreground">
                Early access to new drops, exclusive member pricing, and a monthly hand-picked deal
                digest.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  import("sonner").then(({ toast }) =>
                    toast.success("You're in! Check your inbox."),
                  );
                  form.reset();
                }}
                className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
              >
                <input
                  required
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-12 rounded-full glass px-5 focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
                <button className="h-12 px-6 rounded-full gradient-hero text-white font-semibold shadow-glow hover:scale-105 transition-transform">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="FAQ"
            title="Quick answers"
            sub="Everything else lives in our Help Center."
          />
          <div className="mt-8 space-y-3">
            {[
              [
                "How fast is shipping?",
                "Orders over $50 ship free and arrive in 2 business days across the continental US.",
              ],
              [
                "What's your return policy?",
                "30 days, no questions asked. Full refund to original payment method within 3 business days.",
              ],
              [
                "Do you offer international shipping?",
                "Yes — we ship to 40+ countries. Duties are calculated at checkout.",
              ],
              [
                "Is warranty included?",
                "Every TechNova order includes a complimentary 2-year warranty from us, on top of the manufacturer's.",
              ],
            ].map(([q, a]) => (
              <details
                key={q}
                className="glass rounded-2xl p-5 group cursor-pointer marker:content-none"
              >
                <summary className="flex items-center justify-between font-semibold list-none">
                  {q}
                  <span className="size-6 rounded-full glass grid place-items-center text-xs group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">{eyebrow}</div>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-black tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Section({
  eyebrow,
  title,
  sub,
  cta,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  cta?: { label: string; to: string };
  children: React.ReactNode;
}) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">
              {eyebrow}
            </div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-black tracking-tight">
              {title}
            </h2>
            {sub && <p className="mt-2 text-muted-foreground">{sub}</p>}
          </div>
          {cta && (
            <Link
              to={cta.to}
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan hover:gap-3 transition-all"
            >
              {cta.label} <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

// Avoid unused-import warning; ProductCard re-exported for tree-shake friendliness
export { ProductCard };
