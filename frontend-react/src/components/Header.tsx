export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <div className="text-xl font-semibold text-slate-800">
          CivoraX · <span className="text-teal-600">SoilSense</span>
        </div>

        <nav className="hidden md:flex gap-8 text-slate-600 font-medium">
          <a className="hover:text-teal-600 transition" href="#">Features</a>
          <a className="hover:text-teal-600 transition" href="#">Analyze</a>
          <a className="hover:text-teal-600 transition" href="#">About</a>
        </nav>

        <button className="bg-teal-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-teal-700 transition">
          Get Started
        </button>

      </div>
    </header>
  );
}