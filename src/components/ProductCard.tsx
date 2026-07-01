import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

function formatPrice(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`;
}

const fallbackGradients = [
  "linear-gradient(135deg, #2563EB, #8B5CF6)",
  "linear-gradient(135deg, #06B6D4, #2563EB)",
  "linear-gradient(135deg, #F97316, #EC4899)",
  "linear-gradient(135deg, #8B5CF6, #EC4899)",
  "linear-gradient(135deg, #22C55E, #06B6D4)",
];

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wished = useStore((s) => s.wishlist.includes(product.id));

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const grad = fallbackGradients[index % fallbackGradients.length];

  return (
    <div
      className="group relative rounded-3xl glass p-3 hover-lift animate-fade-up flex flex-col"
      style={{ animationDelay: `${(index % 8) * 40}ms` }}
    >
      {/* Badges */}
      <div className="absolute top-5 left-5 z-10 flex flex-col gap-2 pointer-events-none">
        {product.badge && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-warm text-white shadow-soft">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-green/20 text-brand-green ring-1 ring-brand-green/30 backdrop-blur">
            -{discount}%
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product.id);
          toast(wished ? "Removed from wishlist" : "Added to wishlist", { icon: "❤️" });
        }}
        aria-label="Toggle wishlist"
        className={cn(
          "absolute top-5 right-5 z-10 size-9 rounded-full grid place-items-center glass-strong transition-all hover:scale-110",
          wished && "text-brand-pink",
        )}
      >
        <Heart className={cn("size-4", wished && "fill-current")} />
      </button>

      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square rounded-2xl overflow-hidden mb-4 bg-surface-2"
        style={{ background: grad }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <div className="px-2 pb-2 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {product.brand}
          </span>
          <span className="flex items-center gap-1 text-xs text-brand-yellow">
            <Star className="size-3 fill-current" />
            <span className="text-foreground/80 font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews})</span>
          </span>
        </div>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="font-display font-bold text-base leading-tight mb-3 line-clamp-2 hover:text-brand-cyan transition-colors"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold font-display">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            className="size-10 rounded-full gradient-hero grid place-items-center shadow-glow hover:scale-105 active:scale-95 transition-transform"
            aria-label="Add to cart"
          >
            <ShoppingCart className="size-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductGrid({ products, className }: { products: Product[]; className?: string }) {
  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}
