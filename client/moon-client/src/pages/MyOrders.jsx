import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);

export default function MyOrders() {
  const navigate = useNavigate();
  const orders = useMemo(() => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch {}
    const userKey = user?.id || user?.email || "guest";
    const scopedOrders = JSON.parse(localStorage.getItem(`myOrders:${userKey}`) || "[]");
    return scopedOrders;
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf5] px-5 py-12 text-[#1f2937]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-20%] h-140 w-140 rounded-full bg-yellow-400/15 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-yellow-300/30 bg-white p-7 shadow-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">My Orders</p>
              <h1 className="mt-2 text-4xl font-black">Confirmed Orders</h1>
            </div>
            <button onClick={() => navigate("/home")} className="rounded-xl bg-linear-to-r from-yellow-500 to-amber-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black">
              Back Home
            </button>
          </div>

          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="rounded-xl border border-yellow-600/20 bg-[#fffaf5] p-5 text-[#1f2937]/70">No confirmed orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="rounded-2xl border border-yellow-600/20 bg-[#fffaf5] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-bold text-yellow-300">{order.id}</p>
                    <p className="text-xs text-[#1f2937]/65">{new Date(order.createdAt).toLocaleString("en-IN")}</p>
                  </div>
                  <div className="mt-3 grid grid-cols-1 gap-1 text-sm md:grid-cols-2">
                    <p><span className="text-[#1f2937]/60">Name:</span> {order.customerName}</p>
                    <p><span className="text-[#1f2937]/60">Mode:</span> {order.mode}</p>
                    <p><span className="text-[#1f2937]/60">Payment ID:</span> {order.paymentId}</p>
                    <p><span className="text-[#1f2937]/60">Items:</span> {order.itemCount}</p>
                  </div>
                  <p className="mt-3 text-lg font-black text-yellow-300">{formatINR(order.amountInr)}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
