import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

const AuthPage = ({ mode, setToast }) => {
  const isLogin = mode === "login";
  const { saveAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = isLogin
        ? await api.login({ email: form.email, password: form.password })
        : await api.signup(form);
      saveAuth(data);
      setToast({ type: "success", message: data.message || "Welcome!" });
      navigate(location.state?.from || "/generate");
    } catch (error) {
      setToast({ type: "error", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-brand-purple focus:ring-1 focus:ring-brand-purple";

  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-5xl gap-8 lg:grid-cols-2">
        <div className="glass-card flex flex-col justify-center rounded-[32px] p-8">
          <span className="mb-2 text-sm font-medium text-brand-purple">
            {isLogin ? "Welcome back" : "Create account"}
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            {isLogin ? <>Sign in to <span className="gradient-text">Thumblify</span></> : <>Join <span className="gradient-text">Thumblify</span></>}
          </h1>
          <p className="mt-3 text-slate-400">
            {isLogin ? "Access your AI thumbnail studio." : "Start creating stunning thumbnails. 15 credits on us."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card rounded-[32px] p-8">
          <div className="space-y-5">
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required className={inputCls} />
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required className={inputCls} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required className={inputCls} />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-brand-pink to-brand-purple py-3.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50">
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
            <p className="text-center text-sm text-slate-400">
              {isLogin ? <>Don't have an account? <Link to="/signup" className="font-medium text-brand-purple hover:underline">Sign Up</Link></> : <>Already have an account? <Link to="/login" className="font-medium text-brand-purple hover:underline">Login</Link></>}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;