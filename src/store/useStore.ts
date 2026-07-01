import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { id: string; qty: number };

type Store = {
  cart: CartItem[];
  wishlist: string[];
  theme: "dark" | "light";
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  toggleTheme: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      theme: "dark",
      addToCart: (id, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((c) => c.id === id);
          if (existing)
            return { cart: s.cart.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c)) };
          return { cart: [...s.cart, { id, qty }] };
        }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((c) => c.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          cart:
            qty <= 0
              ? s.cart.filter((c) => c.id !== id)
              : s.cart.map((c) => (c.id === id ? { ...c, qty } : c)),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),
      isWished: (id) => get().wishlist.includes(id),
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        if (typeof document !== "undefined") {
          document.documentElement.classList.toggle("light", next === "light");
        }
      },
    }),
    { name: "technova-store" },
  ),
);
