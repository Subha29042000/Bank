import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const INR_RATE = 83;

const formatINR = (usdValue) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(usdValue * INR_RATE));

export default function Home() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    if (!token) return;

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const raw = await res.text();
        try {
          const data = JSON.parse(raw);
          return res.ok ? data : null;
        } catch {
          return null;
        }
      })
      .then((data) => {
        if (data) {
          setProfile(data);
          localStorage.setItem(
            "user",
            JSON.stringify({ id: data._id, username: data.username, email: data.email })
          );
        }
      })
      .catch(() => {});
  }, [navigate]);

  const products = [
    {
      id: 1,
      name: "Midnight Velvet Gown",
      priceUsd: 450,
      img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/64/1200/1600",
      category: "Evening Couture",
      details:
        "Sculpted silhouette with luminous velvet finish. Built for red-carpet nights, receptions, and statement entrances.",
    },
    {
      id: 2,
      name: "Golden Silk Wrap",
      priceUsd: 290,
      img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/838/1200/1600",
      category: "Festive Luxe",
      details:
        "Lightweight drape with a fluid golden texture. Perfect for wedding events and festive modern styling.",
    },
    {
      id: 3,
      name: "Noir Evening Blazer",
      priceUsd: 320,
      img: "https://images.unsplash.com/photo-1539109136881-3be061094fed?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/823/1200/1600",
      category: "Power Edit",
      details:
        "Tailored structure with contemporary street-luxury attitude. Designed for elevated day-to-night transitions.",
    },
    {
      id: 4,
      name: "Ivory Bloom Co-ord",
      priceUsd: 210,
      img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/1011/1200/1600",
      category: "Global Resort",
      details:
        "Soft modern layering with travel-ready comfort. Minimal, polished, and trend-forward for every season.",
    },
    {
      id: 5,
      name: "Obsidian Saree Edit",
      priceUsd: 380,
      img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/1027/1200/1600",
      category: "Modern Ethnic",
      details:
        "A contemporary drape with minimalist shimmer and fluid movement for premium festive evenings.",
    },
    {
      id: 6,
      name: "Auric Fusion Lehenga",
      priceUsd: 510,
      img: "https://images.unsplash.com/photo-1583391733956-6c77a5fbe2b6?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/1005/1200/1600",
      category: "Wedding Edit",
      details:
        "Handcrafted embellishment and runway silhouette crafted for wedding statement styling.",
    },
    {
      id: 7,
      name: "Midnight Street Set",
      priceUsd: 240,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/1001/1200/1600",
      category: "Street Luxe",
      details:
        "Structured coordinates with soft comfort layers designed for city-ready premium fashion looks.",
    },
    {
      id: 8,
      name: "Royal Ember Cape",
      priceUsd: 430,
      img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=1200",
      fallbackImg: "https://picsum.photos/id/1012/1200/1600",
      category: "Limited Drop",
      details:
        "High-impact cape layering with dramatic textures inspired by global fashion week runways.",
    },
  ];

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() + Math.random() }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const totalInr = useMemo(
    () => cart.reduce((sum, item) => sum + item.priceUsd * INR_RATE, 0),
    [cart]
  );

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }).finally(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fffaf5] text-[#1f2937]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-20%] h-[45rem] w-[45rem] rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-15%] h-[40rem] w-[40rem] rounded-full bg-yellow-400/10 blur-3xl" />
      </div>

      <nav className="fixed top-0 z-40 flex w-full items-center justify-between border-b border-yellow-600/20 bg-white/80 px-6 py-4 backdrop-blur-xl md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-200 bg-clip-text text-xl font-black tracking-[0.25em] text-transparent md:text-2xl"
        >
          MOON FASHION
        </motion.h1>
        <div className="flex items-center gap-3 md:gap-6">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-full border border-yellow-600/40 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-yellow-50"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 text-[10px] text-black">
              {(profile?.username?.[0] || "U").toUpperCase()}
            </span>
            {profile?.username || "Profile"}
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="rounded-full border border-yellow-600/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-yellow-600 hover:text-yellow-700"
          >
            Cart ({cart.length})
          </button>
          <button
            onClick={() => navigate("/my-orders")}
            className="rounded-full border border-yellow-600/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-yellow-600 hover:text-yellow-700"
          >
            My Orders
          </button>
          <button
            onClick={handleLogout}
            className="rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#1f2937] transition hover:scale-105"
          >
            Logout
          </button>
        </div>
      </nav>

      <section className="px-6 pb-14 pt-36 md:px-10 md:pt-40">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9 }}>
          <p className="mb-4 text-xs uppercase tracking-[0.45em] text-yellow-300">Worldwide Trend 2026</p>
          <h2 className="max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">
            Future <span className="italic text-yellow-300">Runway</span> for Modern India
          </h2>
          <p className="mt-6 max-w-2xl text-base text-[#1f2937]/75 md:text-lg">
            Discover globally inspired silhouettes with bold textures, cinematic styling, and premium details curated
            for festive, evening, and street-luxe wardrobes.
          </p>
          <button
            onClick={() => setIsCartOpen(true)}
            className="mt-8 rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 px-8 py-3 text-xs font-black uppercase tracking-[0.25em] text-black shadow-lg shadow-yellow-700/30 transition hover:scale-105"
          >
            Explore Drops
          </button>
        </motion.div>
      </section>

      <section className="grid grid-cols-1 gap-8 px-6 pb-16 md:grid-cols-2 md:px-10 xl:grid-cols-4">
        {products.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            className="group rounded-3xl border border-yellow-600/20 bg-white p-3 shadow-md"
          >
            <button
              type="button"
              onClick={() => setActiveProduct(product)}
              className="relative mb-4 block aspect-[3/4] w-full overflow-hidden rounded-2xl"
            >
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== product.fallbackImg) {
                    e.currentTarget.src = product.fallbackImg;
                  }
                }}
                  className="h-full w-full rounded-2xl object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                  View Details
                </span>
              </div>
            </button>
            <p className="text-[10px] uppercase tracking-[0.35em] text-yellow-300">{product.category}</p>
            <h3 className="mt-2 text-lg font-bold text-[#1f2937]">{product.name}</h3>
            <p className="mt-2 text-xl font-black text-yellow-300">{formatINR(product.priceUsd)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 w-full rounded-xl border border-yellow-600/40 bg-yellow-50 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:bg-yellow-400 hover:text-[#1f2937]"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </section>

      <AnimatePresence>
        {activeProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProduct(null)}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.98 }}
              className="fixed left-1/2 top-1/2 z-[60] w-[92%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-yellow-600/25 bg-white shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <img
                  src={activeProduct.img}
                  alt={activeProduct.name}
                  onError={(e) => {
                    if (e.currentTarget.src !== activeProduct.fallbackImg) {
                      e.currentTarget.src = activeProduct.fallbackImg;
                    }
                  }}
                  className="h-full w-full object-cover"
                />
                <div className="p-7 md:p-9">
                  <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">{activeProduct.category}</p>
                  <h3 className="mt-2 text-3xl font-black leading-tight">{activeProduct.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#1f2937]/75">{activeProduct.details}</p>
                  <p className="mt-6 text-3xl font-black text-yellow-300">{formatINR(activeProduct.priceUsd)}</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      onClick={() => addToCart(activeProduct)}
                      className="rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-black"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => setActiveProduct(null)}
                      className="rounded-full border border-yellow-600/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-yellow-50"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 190 }}
              className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col border-l border-yellow-600/20 bg-[#fffaf5] p-7 text-[#1f2937]"
            >
              <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-black uppercase tracking-[0.2em] text-[#1f2937]">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-xl text-[#1f2937]/60 hover:text-[#1f2937]">
                  ✕
                </button>
              </div>

              <div className="grow space-y-4 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <p className="mt-16 text-center italic text-[#1f2937]/45">Your style cart is waiting.</p>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={item.cartId}
                      layout
                      className="flex items-center gap-3 rounded-2xl border border-yellow-600/20 bg-white p-2"
                    >
                      <img src={item.img} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="grow">
                        <p className="text-sm font-semibold text-[#1f2937]">{item.name}</p>
                        <p className="text-sm font-black text-yellow-300">{formatINR(item.priceUsd)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#1f2937]/60">Total (INR)</span>
                  <span className="text-2xl font-black text-yellow-300">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(totalInr)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    navigate("/address", {
                      state: {
                        amountInr: Math.max(10, Math.round(totalInr)),
                        itemCount: cart.length,
                      },
                    })
                  }
                  className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-amber-300 py-3 text-xs font-black uppercase tracking-[0.2em] text-black"
                >
                  Proceed to Buy
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}