import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — TechNova Store" },
      { name: "description", content: "Browse TechNova's 11 electronics categories." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="max-w-2xl">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">Categories</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tight">
          Everything <span className="gradient-text">tech</span>, sorted.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Eleven categories, sixty-plus products, all curated with obsessive attention to detail.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.slug).length;
          const sample = products.find((p) => p.category === c.slug);
          return (
            <Link
              key={c.slug}
              to="/shop"
              search={{ category: c.slug } as never}
              className="group relative rounded-3xl glass overflow-hidden hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div
                className={`absolute inset-0 opacity-25 group-hover:opacity-50 transition-opacity bg-gradient-to-br ${c.gradient}`}
              />
              {sample && (
                <img
                  src={sample.image}
                  alt=""
                  className="absolute -bottom-6 -right-6 size-40 object-cover rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
                />
              )}
              <div className="relative p-8">
                <div className="text-5xl mb-4">{c.icon}</div>
                <div className="font-display font-black text-2xl">{c.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.blurb}</div>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  {count} products
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
