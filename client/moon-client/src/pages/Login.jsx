import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clearForm = () => setForm({ email: "", password: "" });
    clearForm();
    window.addEventListener("pageshow", clearForm);
    return () => window.removeEventListener("pageshow", clearForm);
  }, []);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Login failed");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf5] p-4 overflow-hidden relative text-[#1f2937]">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-gold/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-gold/5 blur-[120px] rounded-full"
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(31,41,55,0.12)] border border-yellow-600/20 relative z-10"
      >
        
        {/* Left Side: Trendy Image with Overlay Animation */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden group">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop" 
              alt="Luxury Dress" 
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-12">
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-black hover:text-white text-5xl font-bold tracking-tighter italic mb-2"
            >
              Gold & Velvet
            </motion.h1>
            <p className="text-white text-sm tracking-[0.3em] uppercase">E-Commerce Excellence</p>
          </div>
        </div>

        {/* Right Side: Animated Form */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white"
        >
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-4xl font-semibold text-[#1f2937] mb-3">Sign In</h2>
            <div className="h-1 w-12 bg-gold rounded-full" />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-yellow-300 font-bold ml-1">Identity</label>
              <input
                type="email"
                className="w-full bg-[#fffaf5] border border-yellow-600/20 p-4 rounded-xl text-[#1f2937] outline-none focus:border-gold/70 transition-all duration-500"
                placeholder="Identity"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="off"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] text-yellow-300 font-bold ml-1">Access Key</label>
              <input
                type="password"
                className="w-full bg-[#fffaf5] border border-yellow-600/20 p-4 rounded-xl text-[#1f2937] outline-none focus:border-gold/70 transition-all duration-500"
                placeholder="Crown Code"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
                required
              />
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className="gold-neon-btn w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[11px] mt-6 transition-all"
            >
              {loading ? "Authorizing..." : "Authorize"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="mt-10 flex justify-between items-center">
            <span className="h-px w-1/4 bg-white/10" />
            <a href="#" className="text-[#1f2937] hover:text-gold text-[10px] uppercase tracking-widest transition-colors">
              Request Access
            </a>
            <span className="h-px w-1/4 bg-white/10" />
          </motion.div>
           <motion.p variants={itemVariants} className="mt-10 text-center text-[#1f2937] text-xs tracking-widest">
            NEW USER ?{" "}
            <Link to="/" className="text-gold font-bold hover:underline underline-offset-4 ml-2 transition-all">
              REGISTER
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}