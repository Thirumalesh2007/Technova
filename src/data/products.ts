export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string; // slug
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  images: string[];
  badge?: "New" | "Hot" | "Sale" | "Best Seller" | "Editor's Pick";
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isFlashSale?: boolean;
  isNewArrival?: boolean;
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&h=900&fit=crop&auto=format&q=80`;

// Curated pool of Unsplash tech photo IDs by category
const pool = {
  smartphones: [
    "1592750475338-74b7b21085ab",
    "1511707171634-5f897ff02aa9",
    "1580910051074-3eb694886505",
    "1598327105666-5b89351aff97",
    "1567581935884-3349723552ca",
    "1616348436168-de43ad0db179",
    "1565849904461-04a58ad377e0",
    "1601784551446-20c9e07cdbdb",
  ],
  laptops: [
    "1517336714731-489689fd1ca8",
    "1496181133206-80ce9b88a853",
    "1541807084-5c52b6b3adef",
    "1587202372775-e229f172b9d7",
    "1611186871348-b1ce696e52c9",
    "1593642632559-0c6d3fc62b89",
    "1531297484001-80022131f5a1",
    "1484788984921-03950022c9ef",
  ],
  gaming: [
    "1592840496694-26d035b52b48",
    "1606813907291-d86efa9b94db",
    "1621259182978-fbf93132d53d",
    "1612287230202-1ff1d85d1bdf",
    "1493711662062-fa541adb3fc8",
    "1552820728-8b83bb6b773f",
  ],
  smartwatches: [
    "1523275335684-37898b6baf30",
    "1546868871-7041f2a55e12",
    "1579586337278-3befd40fd17a",
    "1508685096489-7aacd43bd3b1",
    "1617043786394-f977fa12eddf",
    "1544117519-31a4b719223d",
  ],
  tablets: [
    "1544244015-0df4b3ffc6b0",
    "1587033411391-5d9e51cce126",
    "1585790050230-5dd28404ccb9",
    "1561154464-82e9adf32764",
    "1542751110-97427bbecf20",
  ],
  headphones: [
    "1505740420928-5e560c06d30e",
    "1583394838336-acd977736f90",
    "1546435770-a3e426bf472b",
    "1590658165737-15a047b7f74a",
    "1524678606370-a47ad25cb82a",
    "1618366712010-f4ae9c647dcb",
    "1487215078519-e21cc028cb29",
  ],
  speakers: [
    "1608043152269-423dbba4e7e1",
    "1545454675-3531b543be5d",
    "1558379850-3b6cb4dc65b1",
    "1516280440614-37939bbacd81",
    "1589003077984-894e133dabab",
  ],
  monitors: [
    "1527443224154-c4a3942d3acf",
    "1616763355603-9755a640a287",
    "1547082299-de196ea013d6",
    "1593640408182-31c70c8268f5",
    "1587614382346-4ec70e388b28",
  ],
  powerbanks: [
    "1609592314434-5c0fbaa71d33",
    "1583863788434-e58a36330cf0",
    "1621330396173-e41b1cafd17f",
    "1585338447937-7082f8fc763d",
  ],
  cameras: [
    "1502920917128-1aa500764cbd",
    "1516035069371-29a1b244cc32",
    "1606986628253-49b8b4d8dd60",
    "1568605114967-8130f3a36994",
    "1495707902641-75cac588d2e9",
    "1500634245200-e5245c7574ef",
  ],
  accessories: [
    "1618384887929-16ec33fab9ef",
    "1587829741301-dc798b83add3",
    "1615663245857-ac93bb7c39e7",
    "1563297007-0686b7003af7",
    "1541140532154-b024d705b90a",
    "1595225476474-87563907198a",
  ],
};

const pickImg = (cat: keyof typeof pool, i: number) => u(pool[cat][i % pool[cat].length]);

type P = Omit<Product, "id" | "image" | "images" | "specs" | "highlights" | "reviews" | "stock" | "rating" | "description"> & {
  desc?: string;
  hl?: string[];
  spec?: [string, string][];
};

const seed: P[] = [
  // Smartphones
  { name: "Titan Pro 15 Max", brand: "Apple", category: "smartphones", price: 1199, originalPrice: 1299, badge: "New", isFeatured: true, isNewArrival: true, hl: ["Titanium frame", "A17 Pro chip", "5x Telephoto"] },
  { name: "Galaxy Ultra S24", brand: "Samsung", category: "smartphones", price: 1299, originalPrice: 1499, badge: "Hot", isTrending: true, isFeatured: true },
  { name: "Pixel 8 Pro", brand: "Google", category: "smartphones", price: 899, originalPrice: 999, badge: "Editor's Pick", isTrending: true },
  { name: "OnePlus 12", brand: "OnePlus", category: "smartphones", price: 799, originalPrice: 899, isFlashSale: true },
  { name: "Xiaomi 14 Ultra", brand: "Xiaomi", category: "smartphones", price: 1099, badge: "New", isNewArrival: true },
  { name: "Nothing Phone (2)", brand: "Nothing", category: "smartphones", price: 599, originalPrice: 699, badge: "Sale", isFlashSale: true },
  { name: "iPhone 15", brand: "Apple", category: "smartphones", price: 799 },

  // Laptops
  { name: "MacBook Air M3", brand: "Apple", category: "laptops", price: 1099, originalPrice: 1299, badge: "Best Seller", isFeatured: true, isTrending: true, hl: ["Apple M3 chip", "18h battery", "Liquid Retina"] },
  { name: "MacBook Pro 16″ M3 Max", brand: "Apple", category: "laptops", price: 3499, badge: "New", isNewArrival: true, isFeatured: true },
  { name: "XPS 15 OLED", brand: "Dell", category: "laptops", price: 1899, originalPrice: 2199, badge: "Sale", isFlashSale: true },
  { name: "ROG Zephyrus G16", brand: "ASUS", category: "laptops", price: 2499, badge: "Hot", isTrending: true },
  { name: "ThinkPad X1 Carbon Gen 12", brand: "Lenovo", category: "laptops", price: 1799, originalPrice: 1999 },
  { name: "Surface Laptop 6", brand: "Microsoft", category: "laptops", price: 1499, badge: "New", isNewArrival: true },
  { name: "Razer Blade 18", brand: "Razer", category: "laptops", price: 3299, isFeatured: true },

  // Gaming
  { name: "PlayStation 5 Slim", brand: "Sony", category: "gaming", price: 499, badge: "Best Seller", isFeatured: true, isTrending: true },
  { name: "Xbox Series X", brand: "Microsoft", category: "gaming", price: 499, badge: "Hot", isTrending: true },
  { name: "Nintendo Switch OLED", brand: "Nintendo", category: "gaming", price: 349, originalPrice: 399, isFlashSale: true },
  { name: "DualSense Edge Controller", brand: "Sony", category: "gaming", price: 199 },
  { name: "Steam Deck OLED 1TB", brand: "Valve", category: "gaming", price: 649, badge: "Editor's Pick", isNewArrival: true, isFeatured: true },
  { name: "Meta Quest 3", brand: "Meta", category: "gaming", price: 499, originalPrice: 549, badge: "New" },

  // Smartwatches
  { name: "Apple Watch Ultra 2", brand: "Apple", category: "smartwatches", price: 799, badge: "New", isFeatured: true, isNewArrival: true },
  { name: "Galaxy Watch 6 Classic", brand: "Samsung", category: "smartwatches", price: 399, originalPrice: 499, isFlashSale: true, isTrending: true },
  { name: "Pixel Watch 2", brand: "Google", category: "smartwatches", price: 349 },
  { name: "Garmin Fenix 7X", brand: "Garmin", category: "smartwatches", price: 899, badge: "Best Seller" },
  { name: "Fitbit Charge 6", brand: "Fitbit", category: "smartwatches", price: 159, originalPrice: 199, badge: "Sale" },
  { name: "Amazfit GTR Mini", brand: "Amazfit", category: "smartwatches", price: 129 },

  // Tablets
  { name: "iPad Pro 13″ M4", brand: "Apple", category: "tablets", price: 1299, badge: "New", isNewArrival: true, isFeatured: true },
  { name: "iPad Air 11″", brand: "Apple", category: "tablets", price: 599, originalPrice: 699, isTrending: true },
  { name: "Galaxy Tab S9 Ultra", brand: "Samsung", category: "tablets", price: 1199, originalPrice: 1399, badge: "Sale", isFlashSale: true },
  { name: "Surface Pro 10", brand: "Microsoft", category: "tablets", price: 1099 },
  { name: "Xiaomi Pad 6 Pro", brand: "Xiaomi", category: "tablets", price: 449, badge: "Hot" },

  // Headphones
  { name: "WH-1000XM5", brand: "Sony", category: "headphones", price: 349, originalPrice: 399, badge: "Best Seller", isFeatured: true, isTrending: true },
  { name: "AirPods Pro 2 (USB-C)", brand: "Apple", category: "headphones", price: 249, isTrending: true },
  { name: "AirPods Max", brand: "Apple", category: "headphones", price: 549, originalPrice: 599, badge: "Sale", isFlashSale: true },
  { name: "Bose QuietComfort Ultra", brand: "Bose", category: "headphones", price: 429 },
  { name: "Sennheiser Momentum 4", brand: "Sennheiser", category: "headphones", price: 379, originalPrice: 399, badge: "Editor's Pick" },
  { name: "Beats Studio Pro", brand: "Beats", category: "headphones", price: 299, badge: "Hot" },
  { name: "Nothing Ear (2)", brand: "Nothing", category: "headphones", price: 149 },

  // Speakers
  { name: "HomePod 2 (2nd Gen)", brand: "Apple", category: "speakers", price: 299, isFeatured: true },
  { name: "Sonos Era 300", brand: "Sonos", category: "speakers", price: 449, badge: "New", isNewArrival: true },
  { name: "JBL Charge 5", brand: "JBL", category: "speakers", price: 149, originalPrice: 179, isFlashSale: true },
  { name: "Bose SoundLink Revolve+ II", brand: "Bose", category: "speakers", price: 329 },
  { name: "Marshall Emberton II", brand: "Marshall", category: "speakers", price: 169, badge: "Best Seller" },

  // Monitors
  { name: "Studio Display 27″ 5K", brand: "Apple", category: "monitors", price: 1599, badge: "Editor's Pick", isFeatured: true },
  { name: "Odyssey OLED G9 49″", brand: "Samsung", category: "monitors", price: 1799, originalPrice: 2199, badge: "Sale", isFlashSale: true, isTrending: true },
  { name: "UltraGear 32GR93U 4K", brand: "LG", category: "monitors", price: 899 },
  { name: "ProArt Display PA279CV", brand: "ASUS", category: "monitors", price: 599, badge: "Hot" },
  { name: "Dell UltraSharp U3223QE", brand: "Dell", category: "monitors", price: 1099 },

  // Power Banks
  { name: "MagSafe Battery 10K", brand: "Anker", category: "powerbanks", price: 89, originalPrice: 109, isFlashSale: true },
  { name: "PowerCore 26800 PD", brand: "Anker", category: "powerbanks", price: 79, badge: "Best Seller", isTrending: true },
  { name: "Baseus Blade 100W 20K", brand: "Baseus", category: "powerbanks", price: 129 },
  { name: "Belkin BoostCharge 20K", brand: "Belkin", category: "powerbanks", price: 69 },

  // Cameras
  { name: "Alpha 7 IV Mirrorless", brand: "Sony", category: "cameras", price: 2499, isFeatured: true, badge: "Editor's Pick" },
  { name: "EOS R5", brand: "Canon", category: "cameras", price: 3899, originalPrice: 4299, isFlashSale: true },
  { name: "X-T5 Body", brand: "Fujifilm", category: "cameras", price: 1699, badge: "Hot", isTrending: true },
  { name: "Z 6III", brand: "Nikon", category: "cameras", price: 2499, badge: "New", isNewArrival: true },
  { name: "GoPro HERO12 Black", brand: "GoPro", category: "cameras", price: 399, originalPrice: 449 },
  { name: "DJI Osmo Pocket 3", brand: "DJI", category: "cameras", price: 519 },

  // Accessories
  { name: "MX Master 3S Mouse", brand: "Logitech", category: "accessories", price: 99, badge: "Best Seller", isTrending: true },
  { name: "Magic Keyboard with Touch ID", brand: "Apple", category: "accessories", price: 199 },
  { name: "Keychron Q1 Pro Wireless", brand: "Keychron", category: "accessories", price: 219, badge: "Editor's Pick" },
  { name: "CalDigit TS4 Thunderbolt Hub", brand: "CalDigit", category: "accessories", price: 379, isFlashSale: true, originalPrice: 429 },
  { name: "Anker 737 GaNPrime 120W", brand: "Anker", category: "accessories", price: 119 },
  { name: "Peak Design Everyday Sling 6L", brand: "Peak Design", category: "accessories", price: 89, badge: "Hot" },
];

const defaultHl = ["Premium build quality", "Free 2-day shipping", "2-year TechNova warranty"];
const defaultSpecs = (p: P): [string, string][] => [
  ["Brand", p.brand],
  ["Category", p.category],
  ["Warranty", "24 months"],
  ["In the box", `${p.name}, Cable, Documentation`],
];

let idx = 0;
const catCounter: Record<string, number> = {};

export const products: Product[] = seed.map((p) => {
  idx += 1;
  const cat = p.category as keyof typeof pool;
  const i = (catCounter[cat] = (catCounter[cat] ?? -1) + 1);
  const image = pickImg(cat, i);
  const images = [image, pickImg(cat, i + 1), pickImg(cat, i + 2), pickImg(cat, i + 3)];
  const rating = 4.2 + ((idx * 7) % 8) / 10;
  const reviews = 40 + ((idx * 137) % 1600);
  const stock = 5 + ((idx * 31) % 90);
  return {
    id: `pd-${String(idx).padStart(3, "0")}`,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    originalPrice: p.originalPrice,
    badge: p.badge,
    isFeatured: p.isFeatured,
    isTrending: p.isTrending,
    isFlashSale: p.isFlashSale,
    isNewArrival: p.isNewArrival,
    image,
    images,
    rating: Math.round(rating * 10) / 10,
    reviews,
    stock,
    description:
      p.desc ??
      `The ${p.name} by ${p.brand} raises the bar for ${p.category}. Precision engineering, premium materials, and best-in-class performance — hand-picked by our TechNova specialists to give you the very best of what modern hardware can do.`,
    highlights: p.hl ?? defaultHl,
    specs: (p.spec ?? defaultSpecs(p)).map(([label, value]) => ({ label, value })),
  };
});

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const brands = Array.from(new Set(products.map((p) => p.brand))).sort();
export const priceRange: [number, number] = [
  Math.min(...products.map((p) => p.price)),
  Math.max(...products.map((p) => p.price)),
];
