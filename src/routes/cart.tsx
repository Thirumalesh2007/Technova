import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — TechNova Store" }] }),
  component: Cart,
});

function Cart() {
  const cart = useStore((s) => s.cart);
  const setQty = useStore((s) => s.setQty);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);

  const items = cart.map((c) => ({ ...c, product: getProduct(c.id)! })).filter((c) => c.product);
  const subtotal = items.reduce((a, c) => a + c.product.price * c.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = subtotal * applied;
  const total = Math.max(0, subtotal + shipping + tax - discount);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "TECHNOVA10") {
      setApplied(0.1);
      toast.success("Coupon applied! 10% off.");
    } else {
      toast.error("Invalid coupon");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="size-24 mx-auto rounded-full glass grid place-items-center mb-6">
          <ShoppingBag className="size-10 text-muted-foreground" />
        </div>
        <h1 className="font-display font-black text-3xl">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some flagship gear to get started.</p>
        <Link to="/shop" className="mt-6 inline-flex h-12 px-8 items-center rounded-full gradient-hero text-white font-semibold shadow-glow">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display font-black text-4xl mb-8">Your Cart</h1>
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it.id} className="glass rounded-3xl p-4 flex gap-4 items-center">
              <Link to="/product/$id" params={{ id: it.id }} className="size-24 rounded-2xl overflow-hidden gradient-cool shrink-0">
                <img src={it.product.image} alt={it.product.name} className="w-full h-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground uppercase tracking-widest">{it.product.brand}</div>
                <Link to="/product/$id" params={{ id: it.id }} className="font-display font-bold truncate block hover:text-brand-cyan">
                  {it.product.name}
                </Link>
                <div className="mt-1 font-black">${it.product.price}</div>
              </div>
              <div className="glass rounded-full flex items-center">
                <button onClick={() => setQty(it.id, it.qty - 1)} className="size-9 grid place-items-center"><Minus className="size-3" /></button>
                <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                <button onClick={() => setQty(it.id, it.qty + 1)} className="size-9 grid place-items-center"><Plus className="size-3" /></button>
              </div>
              <button onClick={() => { removeFromCart(it.id); toast("Removed from cart"); }} className="size-10 rounded-full glass grid place-items-center hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        <aside className="glass rounded-3xl p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="font-display font-black text-xl">Order Summary</h2>
          <div className="flex gap-2">
            <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Try TECHNOVA10" className="flex-1 h-10 rounded-full bg-white/5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40" />
            <button onClick={applyCoupon} className="h-10 px-4 rounded-full glass hover:bg-white/10 text-sm font-semibold">Apply</button>
          </div>
          <dl className="space-y-2 text-sm border-t border-hairline pt-4">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-brand-green">Free</span> : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax (8%)</dt><dd>${tax.toFixed(2)}</dd></div>
            {applied > 0 && <div className="flex justify-between text-brand-green"><dt>Discount</dt><dd>−${discount.toFixed(2)}</dd></div>}
            <div className="flex justify-between pt-3 border-t border-hairline text-lg font-black"><dt>Total</dt><dd className="gradient-text">${total.toFixed(2)}</dd></div>
          </dl>
          <Link to="/checkout" className="block h-12 rounded-full gradient-hero text-white font-semibold shadow-glow text-center leading-[3rem] hover:scale-[1.02] transition-transform">
            Proceed to Checkout
          </Link>
          <div className="text-xs text-center text-muted-foreground">Estimated delivery: 2–3 business days</div>
        </aside>
      </div>
    </div>
  );
}
