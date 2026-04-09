// import { useState } from "react";

// export default function Address() {
//   const [form, setForm] = useState({ name: "", address: "", phone: "", payment: "" });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Order placed!\nName: ${form.name}\nPayment: ${form.payment}`);
//     // Here you could send order details to backend
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Shipping & Payment</h2>

//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Address"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />

//         <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
//         <div className="space-y-2 mb-4">
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="GPay"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> GPay
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="Paytm"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> Paytm
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="EMI"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> EMI
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="Cash on Delivery"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> Cash on Delivery
//           </label>
//         </div>

//         <button className="bg-pink-500 hover:bg-pink-600 text-white p-2 w-full rounded font-semibold">
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// }


























// import { useState } from "react";

// export default function Address() {
//   const [form, setForm] = useState({ name: "", address: "", phone: "", payment: "" });

//   // Razorpay payment handler
//   const handlePayment = async () => {
//     try {
//       // Call backend to create order
//       const res = await fetch("http://localhost:5000/api/payment/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: 500 }), // example amount
//       });
//       const order = await res.json();

//       const options = {
//         key: "YOUR_SANDBOX_KEY_ID", // Replace with Razorpay sandbox key
//         amount: order.amount,
//         currency: "INR",
//         name: "Moon Fashion",
//         description: "Test Transaction",
//         order_id: order.id,
//         handler: function (response) {
//           alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//         },
//         prefill: {
//           name: form.name,
//           email: "test@example.com",
//           contact: form.phone,
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (err) {
//       console.error(err);
//       alert("Error initiating payment");
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (form.payment === "Cash on Delivery") {
//       // COD simulation: no Razorpay, just confirm order
//       alert(`Order placed with Cash on Delivery!\nName: ${form.name}\nAddress: ${form.address}`);
//     } else {
//       // For GPay, Paytm, EMI → use Razorpay sandbox
//       handlePayment();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Shipping & Payment</h2>

//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Address"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />

//         <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
//         <div className="space-y-2 mb-4">
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="GPay"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> GPay
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="Paytm"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> Paytm
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="EMI"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> EMI
//           </label>
//           <label className="flex items-center gap-2">
//             <input type="radio" name="payment" value="Cash on Delivery"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}/> Cash on Delivery
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="bg-pink-500 hover:bg-pink-600 text-white p-2 w-full rounded font-semibold"
//         >
//           Place Order
//         </button>
//       </form>
//     </div>
//   );
// }


























// import { useState, useEffect } from "react";

// export default function Address() {
//   const [form, setForm] = useState({ name: "", address: "", phone: "", payment: "" });

//   // ✅ PayPal sandbox handler
//   const handlePayment = async () => {
//     try {
//       // Call backend to create PayPal order
//       const res = await fetch("http://localhost:5000/api/payment/create-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount: "10.00" }), // example amount in USD
//       });
//       const data = await res.json();

//       // Render PayPal button dynamically
//       window.paypal.Buttons({
//         createOrder: () => data.id,
//         onApprove: async (details) => {
//           alert("Payment successful! Transaction ID: " + details.id);
//         },
//         onError: (err) => {
//           console.error(err);
//           alert("Payment failed");
//         },
//       }).render("#paypal-button-container");
//     } catch (err) {
//       console.error(err);
//       alert("Error initiating PayPal payment");
//     }
//   };

//   // ✅ Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.name || !form.address || !form.phone) {
//       alert("Please fill in all shipping details");
//       return;
//     }

//     if (!form.payment) {
//       alert("Please select a payment option");
//       return;
//     }

//     if (form.payment === "Cash on Delivery") {
//       // COD simulation
//       alert(`Order placed with Cash on Delivery!\nName: ${form.name}\nAddress: ${form.address}`);
//     } else {
//       // For PayPal → trigger sandbox checkout
//       handlePayment();
//     }
//   };

//   // ✅ Load PayPal SDK script once
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID"; // replace with sandbox client ID
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Shipping & Payment</h2>

//         {/* Shipping details */}
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Address"
//           value={form.address}
//           onChange={(e) => setForm({ ...form, address: e.target.value })}
//         />
//         <input
//           className="border p-2 w-full mb-3 rounded"
//           placeholder="Phone Number"
//           value={form.phone}
//           onChange={(e) => setForm({ ...form, phone: e.target.value })}
//         />

//         {/* Payment options */}
//         <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
//         <div className="space-y-2 mb-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="payment"
//               value="PayPal"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}
//             /> PayPal
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               name="payment"
//               value="Cash on Delivery"
//               onChange={(e) => setForm({ ...form, payment: e.target.value })}
//             /> Cash on Delivery
//           </label>
//         </div>

//         {/* Place Order button */}
//         <button
//           type="submit"
//           className="bg-pink-500 hover:bg-pink-600 text-white p-2 w-full rounded font-semibold"
//         >
//           Place Order
//         </button>

//         {/* PayPal button container */}
//         <div id="paypal-button-container" className="mt-4"></div>
//       </form>
//     </div>
//   );
// }
































import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DEFAULT_AMOUNT_INR = 10;
const formatINR = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Address() {
  const location = useLocation();
  const navigate = useNavigate();
  const payableAmountInr = Math.max(DEFAULT_AMOUNT_INR, Number(location.state?.amountInr) || DEFAULT_AMOUNT_INR);
  const itemCount = Number(location.state?.itemCount) || 1;

  const [form, setForm] = useState({ name: "", address: "", phone: "", payment: "" });
  const [isCreatingPayment, setIsCreatingPayment] = useState(false);
  const [showPaymentActions, setShowPaymentActions] = useState(false);
  const [activeRzp, setActiveRzp] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successPaymentId, setSuccessPaymentId] = useState("");

  const getCurrentUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  };

  const getOrdersKey = () => {
    const user = getCurrentUser();
    const userKey = user?.id || user?.email || "guest";
    return `myOrders:${userKey}`;
  };

  const saveOrder = (paymentId, mode) => {
    const user = getCurrentUser();
    const newOrder = {
      id: `ORD-${Date.now()}`,
      paymentId,
      mode,
      amountInr: payableAmountInr,
      customerName: form.name,
      itemCount,
      createdAt: new Date().toISOString(),
      status: "Confirmed",
      userId: user?.id || null,
      userEmail: user?.email || null,
    };
    const existing = JSON.parse(localStorage.getItem(getOrdersKey()) || "[]");
    localStorage.setItem(getOrdersKey(), JSON.stringify([newOrder, ...existing]));
  };

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existingScript) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const goToTracking = (paymentId, mode) => {
    navigate("/order-track", {
      state: {
        paymentId,
        mode,
        amountInr: payableAmountInr,
        customerName: form.name,
        itemCount,
      },
    });
  };

  const handlePayment = async () => {
    if (isCreatingPayment) return;
    setIsCreatingPayment(true);
    try {
      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: payableAmountInr }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.details || data?.msg || "Unable to create Razorpay order");
      if (data?.gateway !== "razorpay") throw new Error("Wrong backend is running on port 5000. Start newmoon/server Razorpay API.");
      if (!/^order_/.test(data?.id || "")) throw new Error("Invalid Razorpay order id from backend.");
      if (!/^rzp_(test|live)_/.test(data?.key || "")) throw new Error("Invalid Razorpay key from backend.");
      if (!window.Razorpay) throw new Error("Razorpay SDK not loaded yet");

      const allowedMethods =
        form.payment === "UPI"
          ? { upi: true, card: false, netbanking: false, wallet: false }
          : form.payment === "Net Banking"
            ? { upi: false, card: false, netbanking: true, wallet: false }
            : undefined;
      const upiConfig = form.payment === "UPI" ? { flow: "intent" } : undefined;

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Moon Fashion",
        description: `${form.payment} payment`,
        order_id: data.id,
        prefill: { name: form.name },
        method: allowedMethods,
        ...(upiConfig ? { upi: upiConfig } : {}),
        retry: { enabled: false },
        handler: (response) => {
          setShowPaymentActions(false);
          setActiveRzp(null);
          saveOrder(response.razorpay_payment_id, form.payment);
          setSuccessPaymentId(response.razorpay_payment_id);
          setShowSuccessPopup(true);
          setTimeout(() => {
            goToTracking(response.razorpay_payment_id, form.payment);
          }, 1800);
        },
        modal: {
          ondismiss: () => {
            setShowPaymentActions(false);
            setActiveRzp(null);
            alert("Payment cancelled.");
          },
        },
        theme: { color: "#d4af37" },
      };

      const rzp = new window.Razorpay(options);
      setActiveRzp(rzp);
      setShowPaymentActions(true);
      rzp.open();
    } catch (err) {
      alert(err.message || "Error initiating Razorpay payment");
    } finally {
      setIsCreatingPayment(false);
    }
  };

  const handleCancelPayment = () => {
    if (activeRzp?.close) activeRzp.close();
    setShowPaymentActions(false);
    setActiveRzp(null);
    alert("Payment cancelled.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.phone) return alert("Please fill in all shipping details");
    if (!/^\d{10}$/.test((form.phone || "").replace(/\D/g, ""))) return alert("Please enter a valid 10-digit phone number");
    if (!form.payment) return alert("Please select a payment option");

    if (form.payment === "Cash on Delivery") {
      if (!window.confirm(`Confirm COD Order?\nName: ${form.name}\nAddress: ${form.address}\nPhone: ${form.phone}\nAmount: ${formatINR(payableAmountInr)}`)) {
        return;
      }
      const codId = `COD-${Date.now()}`;
      saveOrder(codId, "Cash on Delivery");
      setSuccessPaymentId(codId);
      setShowSuccessPopup(true);
      setTimeout(() => {
        goToTracking(codId, "Cash on Delivery");
      }, 1400);
      return;
    }
    handlePayment();
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#1f2937]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-20%] h-[40rem] w-[40rem] rounded-full bg-yellow-500/15 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[35rem] w-[35rem] rounded-full bg-amber-300/10 blur-3xl" />
      </div>

      <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 gap-8 px-5 py-10 md:grid-cols-2 md:px-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl border border-yellow-600/20 bg-white p-7 shadow-md">
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Checkout Summary</p>
          <h2 className="mt-3 text-4xl font-black leading-tight">Secure Payment</h2>
          <p className="mt-4 text-[#1f2937]/70">Your selected items and total are now synced from Home page.</p>
          <div className="mt-8 space-y-4 rounded-2xl border border-yellow-600/20 bg-[#fffaf5] p-5">
            <div className="flex justify-between text-sm">
              <span className="text-[#1f2937]/65">Items</span>
              <span className="font-semibold">{itemCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#1f2937]/65">Base amount</span>
              <span className="font-semibold">{formatINR(payableAmountInr)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-4 text-lg font-black">
              <span>Total Payable</span>
              <span className="text-yellow-300">{formatINR(payableAmountInr)}</span>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-3xl border border-yellow-600/20 bg-white p-7 shadow-md"
        >
          <h3 className="mb-6 text-2xl font-black">Shipping & Payment</h3>
          <input className="mb-3 w-full rounded-xl border border-yellow-600/25 bg-[#fffaf5] p-3 outline-none focus:border-yellow-500" placeholder="Runway Signature Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <textarea className="mb-3 w-full rounded-xl border border-yellow-600/25 bg-[#fffaf5] p-3 outline-none focus:border-yellow-500" placeholder="Golden Gate Delivery Spot" rows={3} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <input className="mb-5 w-full rounded-xl border border-yellow-600/25 bg-[#fffaf5] p-3 outline-none focus:border-yellow-500" placeholder="Royal Contact Digits" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="numeric" maxLength={10} />

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-yellow-300">Payment Options</p>
          <div className="mb-6 grid grid-cols-1 gap-3">
            {["UPI", "Net Banking", "Cash on Delivery"].map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-3 rounded-xl border border-yellow-600/20 bg-[#fffaf5] p-3">
                <input type="radio" name="payment" value={option} onChange={(e) => setForm({ ...form, payment: e.target.value })} />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {form.payment === "Cash on Delivery" && (
            <div className="mb-5 rounded-xl border border-yellow-400/40 bg-yellow-500/10 p-4 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-yellow-300">COD Confirmation</p>
              <p className="mt-2 text-[#1f2937]/80">Name: {form.name || "-"}</p>
              <p className="text-[#1f2937]/80">Address: {form.address || "-"}</p>
              <p className="text-[#1f2937]/80">Phone: {form.phone || "-"}</p>
              <p className="mt-1 font-bold text-yellow-200">Pay on Delivery: {formatINR(payableAmountInr)}</p>
            </div>
          )}

          <button type="submit" disabled={isCreatingPayment} className="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-amber-300 py-3 font-bold uppercase tracking-[0.2em] text-black">
            {isCreatingPayment
              ? "Processing..."
              : form.payment === "Cash on Delivery"
                ? `Confirm & Place COD ${formatINR(payableAmountInr)}`
                : `Pay ${formatINR(payableAmountInr)}`}
          </button>

          {showPaymentActions && (
            <button type="button" onClick={handleCancelPayment} className="mt-3 w-full rounded-xl border border-yellow-600/30 py-3 font-semibold uppercase tracking-[0.2em]">
              Cancel Payment
            </button>
          )}
        </motion.form>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/65 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-[92%] max-w-md rounded-2xl border border-yellow-400/40 bg-white p-6 text-center shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Order Update</p>
            <h3 className="mt-3 text-2xl font-black">Order Confirmed</h3>
            <p className="mt-2 text-sm text-[#1f2937]/70">Payment successful. Redirecting to tracking page...</p>
            <p className="mt-3 text-xs text-yellow-200">{successPaymentId}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
