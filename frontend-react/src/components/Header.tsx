import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  const { isAuthenticated } = useAuth();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-teal-600 font-semibold"
      : "text-gray-600 hover:text-teal-500 transition";

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3">
          <img
            src="/short_logo.png"
            alt="CivoraX"
            className="h-8 w-auto"
          />
          <div className="text-lg font-semibold text-gray-900">
            CivoraX
            <span className="text-teal-600 font-medium">
              {" "}
              · SoilSense
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 items-center">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/features" className={linkClass}>
            Features
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/analyze" className={linkClass}>
                Analyze
              </NavLink>
              <NavLink to="/history" className={linkClass}>
                History
              </NavLink>
            </>
          )}

          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>

        {/* Right Side */}
        {isAuthenticated ? (
          <ProfileMenu />
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