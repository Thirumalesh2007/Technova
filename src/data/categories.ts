export type Category = {
  slug: string;
  name: string;
  icon: string;
  gradient: string;
  blurb: string;
};

export const categories: Category[] = [
  { slug: "smartphones", name: "Smartphones", icon: "📱", gradient: "from-blue-500 to-purple-500", blurb: "Flagships & foldables" },
  { slug: "laptops", name: "Laptops", icon: "💻", gradient: "from-cyan-500 to-blue-600", blurb: "Ultrabooks & pro machines" },
  { slug: "gaming", name: "Gaming", icon: "🎮", gradient: "from-pink-500 to-orange-500", blurb: "Consoles & controllers" },
  { slug: "smartwatches", name: "Smart Watches", icon: "⌚", gradient: "from-purple-500 to-pink-500", blurb: "Fitness & style" },
  { slug: "tablets", name: "Tablets", icon: "📲", gradient: "from-cyan-500 to-teal-500", blurb: "Creative canvases" },
  { slug: "headphones", name: "Headphones", icon: "🎧", gradient: "from-orange-500 to-pink-500", blurb: "ANC & audiophile" },
  { slug: "speakers", name: "Speakers", icon: "🔊", gradient: "from-yellow-400 to-orange-500", blurb: "Home & portable" },
  { slug: "monitors", name: "Monitors", icon: "🖥️", gradient: "from-blue-500 to-cyan-500", blurb: "4K, OLED, ultrawide" },
  { slug: "powerbanks", name: "Power Banks", icon: "🔋", gradient: "from-green-500 to-cyan-500", blurb: "Fast-charge everywhere" },
  { slug: "cameras", name: "Cameras", icon: "📷", gradient: "from-purple-500 to-blue-500", blurb: "Mirrorless & action" },
  { slug: "accessories", name: "Accessories", icon: "⚡", gradient: "from-pink-500 to-purple-500", blurb: "Cables, hubs, keyboards" },
];
