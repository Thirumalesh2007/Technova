import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductGrid } from "@/components/ProductCard";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Deals — TechNova Store" },
      { name: "description", content: "Limited-time deals on flagship electronics — up to 45% off." },
    ],
  }),
  component: Deals,
});

function Deals() {
  const discounted = products.filter((p) => p.originalPrice && p.originalPrice > p.price);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      <div className="relative rounded-[2rem] gradient-flash p-10 md:p-14 overflow-hidden mb-12">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent_50%)]" />
        <div className="relative max-w-2xl text-white">
          <div className="text-xs font-bold uppercase tracking-[0.25em]">Live now</div>
          <h1 className="mt-2 font-display text-4xl md:text-6xl font-black tracking-tight">
            Deals that hurt <span className="italic">the competition</span>.
          </h1>
          <p className="mt-4 text-white/85 text-lg max-w-lg">
            Every product below is discounted right now. New drops every 12 hours.
          </p>
        </div>
      </div>
      <ProductGrid products={discounted} />
    </div>
  );
}
