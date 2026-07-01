import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Zap } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products, type Product } from "@/data/products";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — TechNova Store` },
          { name: "description", content: loaderData.product.description.slice(0, 155) },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto p-16 text-center">
      <h1 className="font-display text-3xl font-black">Product not found</h1>
      <Link to="/shop" className="mt-4 inline-flex h-11 px-6 items-center rounded-full gradient-hero text-white font-semibold">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <nav className="text-xs text-muted-foreground mb-6 flex gap-2">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-foreground">Shop</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <div className="relative aspect-square rounded-3xl overflow-hidden glass gradient-cool">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase bg-gradient-warm text-white shadow-soft">
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={cn(
                  "aspect-square rounded-2xl overflow-hidden glass transition-all",
                  activeImg === i ? "ring-2 ring-brand shadow-glow" : "opacity-70 hover:opacity-100",
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand-cyan">{product.brand}</div>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 text-brand-yellow">
              <Star className="size-4 fill-current" />
              <span className="text-foreground font-semibold">{product.rating}</span>
            </span>
            <span className="text-muted-foreground">· {product.reviews} reviews</span>
            <span className="text-brand-green font-semibold">· In stock ({product.stock})</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display font-black text-4xl">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                <span className="px-2 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold">-{discount}%</span>
              </>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <ul className="mt-6 space-y-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm">
                <span className="size-1.5 rounded-full bg-brand-cyan" /> {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center gap-3">
            <div className="glass rounded-full flex items-center h-12">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-12 grid place-items-center font-bold">−</button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="size-12 grid place-items-center font-bold">+</button>
            </div>
            <button
              onClick={() => {
                addToCart(product.id, qty);
                toast.success(`${qty}× ${product.name} added to cart`);
              }}
              className="flex-1 h-12 rounded-full gradient-hero text-white font-semibold shadow-glow inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <ShoppingCart className="size-4" /> Add to cart
            </button>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                toast(wished ? "Removed from wishlist" : "Added to wishlist");
              }}
              className={cn("size-12 rounded-full glass grid place-items-center", wished && "text-brand-pink")}
              aria-label="Wishlist"
            >
              <Heart className={cn("size-5", wished && "fill-current")} />
            </button>
          </div>

          <Link
            to="/checkout"
            onClick={() => addToCart(product.id, qty)}
            className="mt-3 block w-full h-12 rounded-full glass text-center leading-[3rem] font-semibold hover:bg-white/10"
          >
            <Zap className="inline size-4 mr-1 text-brand-orange" /> Buy now
          </Link>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              [Truck, "Free shipping"],
              [Shield, "2yr warranty"],
              [RotateCcw, "30-day returns"],
            ].map(([Icon, label], i) => {
              const IC = Icon as typeof Truck;
              return (
                <div key={i} className="glass rounded-2xl p-3 text-center">
                  <IC className="size-4 mx-auto mb-1 text-brand-cyan" />
                  <div className="font-semibold">{label as string}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Specs & Reviews */}
      <div className="mt-16 grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-3xl p-8">
          <h2 className="font-display font-black text-2xl mb-6">Specifications</h2>
          <dl className="space-y-3">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 pb-3 border-b border-hairline last:border-0">
                <dt className="text-muted-foreground text-sm">{s.label}</dt>
                <dd className="text-sm font-semibold text-right">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="glass rounded-3xl p-8">
          <h2 className="font-display font-black text-2xl mb-6">Customer Reviews</h2>
          {[
            { name: "Alex R.", stars: 5, text: "Absolutely love it. Feels premium, works flawlessly." },
            { name: "Priya M.", stars: 5, text: "Exceeded expectations. Shipping was faster than promised." },
            { name: "Jordan K.", stars: 4, text: "Great value for the price. Would buy again." },
          ].map((r, i) => (
            <div key={i} className="pb-4 mb-4 border-b border-hairline last:border-0 last:pb-0 last:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="size-8 rounded-full gradient-hero grid place-items-center text-xs font-bold text-white">{r.name[0]}</div>
                <span className="font-semibold text-sm">{r.name}</span>
                <span className="flex text-brand-yellow ml-auto">
                  {[...Array(r.stars)].map((_, k) => <Star key={k} className="size-3 fill-current" />)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display font-black text-2xl mb-6">You might also like</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
