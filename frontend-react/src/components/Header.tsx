import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-teal-600 font-semibold"
      : "text-gray-600 hover:text-teal-500 transition";

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-900">
          CivoraX<span className="text-teal-600"> · SoilSense</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/features" className={linkClass}>Features</NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/analyze" className={linkClass}>Analyze</NavLink>
              <NavLink to="/history" className={linkClass}>History</NavLink>
            </>
          )}

          <NavLink to="/about" className={linkClass}>About</NavLink>
        </nav>

        {/* Right Side Auth */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            {/* Profile shortcut */}
            <NavLink
              to="/profile"
              className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition"
            >
              <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold">
                {user.email[0].toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {user.name ?? user.email.split("@")[0]}
              </span>
            </NavLink>

            {/* Logout */}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/auth"
            className="bg-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-700 transition"
          >
            Get Started
          </NavLink>
        )}
      </div>
    </header>
  );
}