import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useStore } from "@/store/useStore";
import { getProduct } from "@/data/products";
import { ProductGrid } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — TechNova Store" }] }),
  component: Wishlist,
});

function Wishlist() {
  const wishlist = useStore((s) => s.wishlist);
  const items = wishlist.map(getProduct).filter(Boolean) as NonNullable<ReturnType<typeof getProduct>>[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-pink">Wishlist</div>
      <h1 className="mt-2 font-display font-black text-4xl">Your saved items</h1>
      <p className="mt-2 text-muted-foreground">{items.length} product{items.length === 1 ? "" : "s"}</p>

      <div className="mt-8">
        {items.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center">
            <div className="size-20 mx-auto rounded-full glass grid place-items-center mb-6">
              <Heart className="size-8 text-muted-foreground" />
            </div>
            <div className="font-display font-black text-2xl">No wishlisted items yet</div>
            <p className="mt-2 text-muted-foreground">Tap the heart icon on any product to save it here.</p>
            <Link to="/shop" className="mt-6 inline-flex h-12 px-8 items-center rounded-full gradient-hero text-white font-semibold shadow-glow">
              Browse shop
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
