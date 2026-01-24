import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Auth() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const endpoint =
      tab === "login"
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      if (tab === "login") {
        login(data.user, data.token);
      } else {
        alert("Registration successful. Please login.");
        setTab("login");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E0F7FA] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#02394A]">
            Civora<span className="text-[#1B9AAA]">X</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Intelligent soil analysis platform
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-slate-100 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`w-1/2 py-2 text-sm font-medium transition ${
              tab === "login"
                ? "bg-[#1B9AAA] text-white"
                : "text-slate-600"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTab("register")}
            className={`w-1/2 py-2 text-sm font-medium transition ${
              tab === "register"
                ? "bg-[#1B9AAA] text-white"
                : "text-slate-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {tab === "register" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                name="name"
                required
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1B9AAA]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              required
              type="email"
              placeholder="you@civorax.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1B9AAA]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              name="password"
              required
              type="password"
              placeholder="••••••••"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#1B9AAA]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg font-medium text-white bg-[#1B9AAA] hover:bg-[#147783] transition disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : tab === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          By continuing, you agree to CivoraX terms & privacy policy.
        </p>
      </div>
    </div>
  );
}