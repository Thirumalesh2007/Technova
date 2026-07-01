import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Package } from "lucide-react";

type Search = { id?: string; total?: string };

export const Route = createFileRoute("/order-success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    id: typeof s.id === "string" ? s.id : undefined,
    total: typeof s.total === "string" ? s.total : undefined,
  }),
  head: () => ({ meta: [{ title: "Order Confirmed — TechNova Store" }] }),
  component: OrderSuccess,
});

function OrderSuccess() {
  const { id, total } = Route.useSearch();
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="size-20 mx-auto rounded-full gradient-hero grid place-items-center shadow-glow animate-scale-in">
        <CheckCircle2 className="size-10 text-white" />
      </div>
      <h1 className="mt-8 font-display font-black text-4xl">Order confirmed!</h1>
      <p className="mt-3 text-muted-foreground">
        Thank you for shopping with TechNova. A receipt is on its way to your inbox.
      </p>
      <div className="mt-8 glass rounded-3xl p-6 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Order ID</span>
          <span className="font-mono font-bold">{id ?? "TN-XXXXXX"}</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Total</span>
          <span className="font-black text-xl gradient-text">${total ?? "0.00"}</span>
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-brand-green">
          <Package className="size-4" /> Ships in 1–2 business days
        </div>
      </div>
      <div className="mt-8 flex gap-3 justify-center">
        <Link to="/shop" className="h-12 px-6 rounded-full glass grid place-items-center font-semibold">Continue shopping</Link>
        <Link to="/" className="h-12 px-6 rounded-full gradient-hero text-white grid place-items-center font-semibold shadow-glow">Back home</Link>
      </div>
    </div>
  );
}
