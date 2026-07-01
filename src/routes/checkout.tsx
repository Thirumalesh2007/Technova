import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, Truck, Lock } from "lucide-react";
import { toast } from "sonner";
import { useStore } from "@/store/useStore";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — TechNova Store" }] }),
  component: Checkout,
});

function Checkout() {
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const navigate = useNavigate();
  const items = cart.map((c) => ({ ...c, product: getProduct(c.id)! })).filter((c) => c.product);
  const subtotal = items.reduce((a, c) => a + c.product.price * c.qty, 0);
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [method, setMethod] = useState("card");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const orderId = "TN-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      clearCart();
      toast.success("Order placed successfully!");
      navigate({ to: "/order-success", search: { id: orderId, total: total.toFixed(2) } as never });
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display font-black text-4xl mb-8">Checkout</h1>
      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6">
          <Section icon={<Truck className="size-4" />} title="Shipping Address">
            <div className="grid sm:grid-cols-2 gap-3">
              <Input required label="Full name" placeholder="Alex Smith" />
              <Input required label="Phone" placeholder="+1 555 123 4567" />
              <Input required label="Email" type="email" placeholder="you@example.com" className="sm:col-span-2" />
              <Input required label="Address" placeholder="123 Nova Street" className="sm:col-span-2" />
              <Input required label="City" placeholder="San Francisco" />
              <Input required label="State" placeholder="CA" />
              <Input required label="Pincode / ZIP" placeholder="94103" />
              <Input required label="Country" placeholder="United States" defaultValue="United States" />
            </div>
          </Section>

          <Section icon={<CreditCard className="size-4" />} title="Payment Method">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { id: "card", label: "Card" },
                { id: "paypal", label: "PayPal" },
                { id: "cod", label: "Cash on Delivery" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`h-12 rounded-2xl font-semibold text-sm ${method === m.id ? "gradient-hero text-white shadow-glow" : "glass hover:bg-white/10"}`}
                >
                  {m.label}
                </button>
              ))}
            </div>
            {method === "card" && (
              <div className="grid sm:grid-cols-2 gap-3">
                <Input required label="Card number" placeholder="4242 4242 4242 4242" className="sm:col-span-2" />
                <Input required label="Expiry" placeholder="MM/YY" />
                <Input required label="CVC" placeholder="123" />
              </div>
            )}
          </Section>
        </div>

        <aside className="glass rounded-3xl p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="font-display font-black text-xl">Order Summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {items.map((it) => (
              <div key={it.id} className="flex gap-3 items-center">
                <div className="size-14 rounded-xl overflow-hidden gradient-cool shrink-0">
                  <img src={it.product.image} alt="" className="w-full h-full object-cover" onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{it.product.name}</div>
                  <div className="text-xs text-muted-foreground">Qty {it.qty}</div>
                </div>
                <div className="text-sm font-bold">${(it.product.price * it.qty).toFixed(2)}</div>
              </div>
            ))}
            {items.length === 0 && (
              <div className="text-sm text-muted-foreground">Your cart is empty. Add items to place an order.</div>
            )}
          </div>
          <dl className="space-y-2 text-sm border-t border-hairline pt-4">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>${tax.toFixed(2)}</dd></div>
            <div className="flex justify-between pt-3 border-t border-hairline text-lg font-black"><dt>Total</dt><dd className="gradient-text">${total.toFixed(2)}</dd></div>
          </dl>
          <button
            type="submit"
            disabled={items.length === 0 || submitting}
            className="w-full h-12 rounded-full gradient-hero text-white font-semibold shadow-glow inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Lock className="size-4" /> {submitting ? "Processing..." : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-3xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="size-8 rounded-full gradient-cool grid place-items-center text-white">{icon}</div>
        <h2 className="font-display font-black text-xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function Input({ label, className, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; className?: string }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full h-11 rounded-2xl bg-white/5 border border-hairline px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
    </label>
  );
}
