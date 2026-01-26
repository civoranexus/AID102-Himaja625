import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfileMenu() {
  const { user, logout, loggingOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const displayName = user.name ?? user.email.split("@")[0];

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition focus:ring-2 focus:ring-teal-500"
      >
        <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
          {user.email[0].toUpperCase()}
        </div>
        <span className="text-sm font-medium text-slate-700 hidden sm:block">
          {displayName}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border z-50 animate-fade-in">
          <div className="px-4 py-3 border-b">
            <p className="text-sm font-medium text-slate-800">
              {displayName}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user.email}
            </p>
          </div>

          <NavLink
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm hover:bg-slate-50 transition"
          >
            👤 Profile
          </NavLink>

          <button
            onClick={logout}
            disabled={loggingOut}
            className={`w-full text-left px-4 py-3 text-sm transition ${
              loggingOut
                ? "text-slate-400 cursor-not-allowed"
                : "text-red-600 hover:bg-red-50"
            }`}
          >
            {loggingOut ? "Logging out…" : "🚪 Logout"}
          </button>
        </div>
      )}
    </div>
  );
}