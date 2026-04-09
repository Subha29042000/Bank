import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const raw = await res.text();
        let data;
        try {
          data = JSON.parse(raw);
        } catch {
          throw new Error("Profile API is unavailable. Restart backend server and try again.");
        }
        if (!res.ok) throw new Error(data?.msg || "Unable to load profile");
        setForm({ username: data.username || "", email: data.email || "", password: "" });
      })
      .catch((err) => {
        alert(err.message);
        navigate("/home");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    setSaving(true);
    try {
      const payload = { username: form.username.trim(), email: form.email.trim() };
      if (form.password.trim()) payload.password = form.password;
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || "Update failed");
      localStorage.setItem("user", JSON.stringify(data.user));
      setForm((prev) => ({ ...prev, password: "" }));
      alert("Profile updated");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete account permanently?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/auth/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.msg || "Delete failed");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffaf5] px-5 py-12 text-[#1f2937]">
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute left-[-10%] top-[-20%] h-[35rem] w-[35rem] rounded-full bg-yellow-400/15 blur-3xl" />
      </div>
      <Motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl rounded-3xl border border-yellow-300/30 bg-white p-8 shadow-md">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">Profile</p>
        <h1 className="mt-2 text-4xl font-black">My Account</h1>
        {loading ? (
          <p className="mt-6 text-[#1f2937]/70">Loading profile...</p>
        ) : (
          <form onSubmit={handleUpdate} className="mt-8 space-y-4">
            <input className="w-full rounded-xl border border-yellow-600/25 bg-[#fffaf5] p-3 outline-none focus:border-yellow-500" placeholder="Golden Alias" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input className="w-full rounded-xl border border-yellow-600/25 bg-[#fffaf5] p-3 outline-none focus:border-yellow-500" placeholder="royal.id@moonvault.in" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" className="w-full rounded-xl border border-yellow-600/25 bg-[#fffaf5] p-3 outline-none focus:border-yellow-500" placeholder="New secret (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" disabled={saving} className="rounded-xl bg-gradient-to-r from-yellow-500 to-amber-300 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-black">
                {saving ? "Saving..." : "Update Profile"}
              </button>
              <button type="button" onClick={() => navigate("/home")} className="rounded-xl border border-yellow-600/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]">
                Back Home
              </button>
              <button type="button" onClick={handleDelete} className="rounded-xl border border-red-400/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-300">
                Delete Account
              </button>
            </div>
          </form>
        )}
      </Motion.div>
    </div>
  );
}

