import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Users, Globe, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TechNova Store" },
      { name: "description", content: "TechNova is a premium electronics marketplace curated by tech enthusiasts." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-cyan">Our story</div>
      <h1 className="mt-2 font-display font-black text-5xl md:text-6xl tracking-tight">
        We're obsessed with <span className="gradient-text">great gear</span>.
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
        TechNova started as a group of engineers, designers, and lifelong gadget enthusiasts who
        were tired of shopping for electronics on cluttered, generic marketplaces. So we built the
        store we always wanted: curated, honest, beautifully designed, and unapologetically premium.
      </p>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { Icon: Sparkles, k: "60+", v: "Curated products" },
          { Icon: Users, k: "50k+", v: "Happy customers" },
          { Icon: Globe, k: "40+", v: "Countries served" },
          { Icon: Heart, k: "4.9★", v: "Average rating" },
        ].map(({ Icon, k, v }) => (
          <div key={v} className="glass rounded-3xl p-6 text-center">
            <Icon className="size-6 mx-auto text-brand-cyan" />
            <div className="mt-3 font-display font-black text-3xl gradient-text">{k}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-5">
        {[
          { title: "Curation over volume", body: "We stock what we'd buy ourselves. If it doesn't earn its place, it doesn't ship." },
          { title: "Honest reviews", body: "Real specs, real photos, real ratings — no sponsored inflation or fake stars." },
          { title: "Support that ships", body: "Human specialists who know the products they sell. Warranty is on us for two years." },
        ].map((v) => (
          <div key={v.title} className="glass rounded-3xl p-6">
            <h3 className="font-display font-bold text-xl">{v.title}</h3>
            <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
