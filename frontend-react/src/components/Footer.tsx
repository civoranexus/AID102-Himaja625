import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <img
              src="/short_logo.png"
              alt="CivoraX"
              className="h-8 w-auto"
            />
            <span className="text-white font-semibold text-lg">
              CivoraX
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-400">
            CivoraX builds intelligent, explainable systems that empower
            sustainable decision-making. SoilSense helps translate complex
            soil data into actionable agricultural insights.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-semibold mb-3">
            Product
          </h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link to="/features" className="hover:text-teal-400 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/analyze" className="hover:text-teal-400 transition">
                Analyze Soil
              </Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-teal-400 transition">
                Insights & History
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="text-white font-semibold mb-3">
            Connect
          </h4>

          <p className="text-sm text-slate-400 mb-4">
            info@civorax.com
          </p>

          <div className="flex gap-4 items-center">
            <img src="/facebook.png" alt="Facebook" className="h-5 opacity-70 hover:opacity-100 transition" />
            <img src="/instagram.png" alt="Instagram" className="h-5 opacity-70 hover:opacity-100 transition" />
            <img src="/linkedin.png" alt="LinkedIn" className="h-5 opacity-70 hover:opacity-100 transition" />
            <img src="/twitter.png" alt="X" className="h-5 opacity-70 hover:opacity-100 transition" />
            <img src="/github.png" alt="GitHub" className="h-5 opacity-70 hover:opacity-100 transition" />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center text-xs py-4 text-slate-500">
        © {new Date().getFullYear()} CivoraX. All rights reserved.
      </div>
    </footer>
  );
}