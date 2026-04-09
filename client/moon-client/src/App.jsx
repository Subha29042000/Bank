import { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Address from "./pages/Address";
import OrderTrack from "./pages/OrderTrack";
import MouseAura from "./components/MouseAura";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";

function App() {
  const basename = import.meta.env.BASE_URL === "/" ? undefined : import.meta.env.BASE_URL;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 2300);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <Motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.45 } }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0f0c04]"
          >
            <div className="gold-glitter-layer absolute inset-0" />
            <Motion.h1
              initial={{ y: 16, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="gold-shine-text relative z-10 px-4 text-center text-4xl font-black tracking-[0.35em] md:text-6xl"
            >
              MOON FASHION
            </Motion.h1>
          </Motion.div>
        )}
      </AnimatePresence>

      <Router basename={basename}>
        <MouseAura />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/address" element={<Address />} /> {/* new route */}
          <Route path="/order-track" element={<OrderTrack />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

