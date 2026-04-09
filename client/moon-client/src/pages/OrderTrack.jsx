import { useLocation, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value || 0);

export default function OrderTrack() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#070711] px-5 py-14 text-white">
      <div className="mx-auto max-w-3xl">
        <Motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Order Tracking</p>
          <h1 className="mt-3 text-4xl font-black">Payment Successful</h1>
          <p className="mt-2 text-white/70">Your order is confirmed and now being prepared for dispatch.</p>

          <div className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-black/25 p-5">
            <div className="flex justify-between text-sm"><span className="text-white/65">Customer</span><span>{state?.customerName || "Guest"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/65">Payment Mode</span><span>{state?.mode || "Online"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/65">Payment ID</span><span className="max-w-[60%] truncate text-right">{state?.paymentId || "N/A"}</span></div>
            <div className="flex justify-between text-sm"><span className="text-white/65">Items</span><span>{state?.itemCount || 1}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-lg font-black"><span>Total Paid</span><span className="text-yellow-300">{formatINR(state?.amountInr)}</span></div>
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-green-400" /><p>Order confirmed</p></div>
            <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-yellow-200" /><p>Packed and quality check in progress</p></div>
            <div className="flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-yellow-400" /><p>Shipping partner assignment pending</p></div>
          </div>

          <div className="mt-8 flex gap-3">
            <button onClick={() => navigate("/home")} className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-300 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black">
              Back to Home
            </button>
            <button onClick={() => navigate("/address")} className="rounded-xl border border-white/20 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]">
              New Order
            </button>
          </div>
        </Motion.div>
      </div>
    </div>
  );
}

