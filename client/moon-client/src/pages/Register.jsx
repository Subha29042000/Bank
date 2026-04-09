import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const clearForm = () => setForm({ username: "", email: "", password: "" });
    clearForm();
    window.addEventListener("pageshow", clearForm);
    return () => window.removeEventListener("pageshow", clearForm);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.username.trim().length < 3) return alert("Username must be at least 3 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return alert("Enter a valid email");
    if (!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(form.password)) {
      return alert("Password must be 6+ chars with letters and numbers");
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(errorData.msg || "Registration failed");
        return;
      }

      const data = await res.json();
      alert(data.msg);
      setForm({ username: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf5] p-4 relative overflow-hidden text-[#1f2937]">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-125 h-125 bg-gold/5 blur-[150px] rounded-full" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row-reverse w-full max-w-6xl bg-white rounded-4xl overflow-hidden shadow-2xl border border-yellow-600/20 relative z-10"
      >
        
        {/* Right Side: Trendy Fashion Image (Reversed for visual variety) */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2 }}
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" 
            alt="Luxury Collection" 
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black/90 flex flex-col justify-between p-12">
            <div className="text-right">
              <p className="text-gold tracking-[0.5em] uppercase text-xs">New Season</p>
            </div>
            <div>
              <h2 className="text-white text-5xl font-light italic mb-4">Join the Club</h2>
              <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
                Unlock early access to limited drops and personalized couture recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* Left Side: Form */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 p-8 md:p-20 flex flex-col justify-center bg-white"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-4xl font-bold text-[#1f2937] mb-2">Create Account</h1>
            <p className="text-[#1f2937]/60 font-sans text-sm">Experience fashion in its purest form.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">What should we call you?</label>
              <input
                className="w-full bg-[#fffaf5] border border-yellow-600/20 p-4 rounded-xl text-[#1f2937] outline-none focus:border-gold transition-all duration-300"
                placeholder="Your Name"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                autoComplete="off"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">Where can we deliver your style vibe?</label>
              <input
                type="email"
                className="w-full bg-[#fffaf5] border border-yellow-600/20 p-4 rounded-xl text-[#1f2937] outline-none focus:border-gold transition-all duration-300"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                autoComplete="off"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-[10px] uppercase tracking-widest text-gold font-bold ml-1">Keep it Secret</label>
              <input
                type="password"
                className="w-full bg-[#fffaf5] border border-yellow-600/20 p-4 rounded-xl text-[#1f2937] outline-none focus:border-gold transition-all duration-300"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="new-password"
                required
              />
            </motion.div>

            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gold-gradient text-[#1f2937] font-black py-4 rounded-xl uppercase tracking-[0.3em] text-[10px] mt-8 shadow-2xl shadow-gold/20"
            >
              {loading ? "Creating..." : "Begin Journey"}
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className="mt-10 text-center text-[#1f2937] text-xs tracking-widest">
            ALREADY A MEMBER?{" "}
            <a href="/login" className="text-gold font-bold hover:underline underline-offset-4 ml-2 transition-all">
              SIGN IN
            </a>
          </motion.p>
        </motion.div>

      </motion.div>
    </div>
  );
}
