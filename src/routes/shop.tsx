import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, brands, priceRange } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type Search = { q?: string; category?: string; sort?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: typeof s.category === "string" ? s.category : undefined,
    sort: typeof s.sort === "string" ? s.sort : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop — TechNova Store" },
      { name: "description", content: "Browse 60+ premium electronics — filter by category, brand, price and rating." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const [selectedCat, setSelectedCat] = useState<string | undefined>(search.category);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(priceRange[1]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState(search.sort ?? "featured");
  const [query, setQuery] = useState(search.q ?? "");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    let list = products.slice();
    if (selectedCat) list = list.filter((p) => p.category === selectedCat);
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    list = list.filter((p) => p.price <= priceMax && p.rating >= minRating);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
    }
    return list;
  }, [selectedCat, selectedBrands, priceMax, minRating, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  const resetFilters = () => {
    setSelectedCat(undefined);
    setSelectedBrands([]);
    setPriceMax(priceRange[1]);
    setMinRating(0);
    setQuery("");
    setSort("featured");
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">Shop</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-black tracking-tight">
          All products
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} of {products.length} products
        </p>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
        <button
          onClick={() => {
            setSelectedCat(undefined);
            setPage(1);
          }}
          className={cn(
            "shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
            !selectedCat
              ? "gradient-hero text-white shadow-glow"
              : "glass hover:bg-white/10",
          )}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => {
              setSelectedCat(c.slug);
              setPage(1);
            }}
            className={cn(
              "shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all",
              selectedCat === c.slug
                ? "gradient-hero text-white shadow-glow"
                : "glass hover:bg-white/10",
            )}
          >
            {c.icon} {c.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Filters */}
        <aside
          className={cn(
            "lg:sticky lg:top-24 lg:self-start",
            filtersOpen
              ? "fixed inset-0 z-40 bg-background/90 backdrop-blur-xl p-6 overflow-y-auto"
              : "hidden lg:block",
          )}
        >
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <div className="font-display font-black text-xl">Filters</div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="size-10 rounded-full glass grid place-items-center"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="glass rounded-3xl p-5 space-y-6">
            <div className="relative">
              <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search..."
                className="w-full h-10 pl-9 pr-3 rounded-full bg-white/5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
              />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Max price
              </div>
              <input
                type="range"
                min={priceRange[0]}
                max={priceRange[1]}
                value={priceMax}
                onChange={(e) => {
                  setPriceMax(Number(e.target.value));
                  setPage(1);
                }}
                className="w-full accent-[color:var(--brand)]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>${priceRange[0]}</span>
                <span className="text-foreground font-semibold">${priceMax}</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Rating
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 3, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setMinRating(r);
                      setPage(1);
                    }}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      minRating === r
                        ? "gradient-hero text-white"
                        : "bg-white/5 hover:bg-white/10",
                    )}
                  >
                    {r === 0 ? "Any" : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Brand
              </div>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {brands.map((b) => {
                  const on = selectedBrands.includes(b);
                  return (
                    <button
                      key={b}
                      onClick={() => {
                        setSelectedBrands((prev) =>
                          prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
                        );
                        setPage(1);
                      }}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        on ? "gradient-hero text-white" : "bg-white/5 hover:bg-white/10",
                      )}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full h-10 rounded-full glass hover:bg-white/10 text-sm font-semibold"
            >
              Reset filters
            </button>
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-5 gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 h-10 px-4 rounded-full glass text-sm font-semibold"
            >
              <SlidersHorizontal className="size-4" /> Filters
            </button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="ml-auto h-10 px-4 rounded-full glass text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand/40"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top rated</option>
            </select>
          </div>

          {paged.length === 0 ? (
            <div className="glass rounded-3xl p-12 text-center">
              <div className="text-4xl mb-3">🔍</div>
              <div className="font-display font-bold text-lg">No products match your filters</div>
              <button
                onClick={resetFilters}
                className="mt-4 inline-flex h-10 px-5 items-center rounded-full gradient-hero text-white font-semibold"
              >
                Reset
              </button>
            </div>
          ) : (
            <ProductGrid products={paged} />
          )}

          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={cn(
                    "size-10 rounded-full text-sm font-semibold",
                    n === page
                      ? "gradient-hero text-white shadow-glow"
                      : "glass hover:bg-white/10",
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ensure Link import used (avoid unused warning) */}
      <Link to="/" className="sr-only">Home</Link>
    </div>
  );
}
