export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-2">CivoraX</h3>
          <p className="text-sm">
            Building intelligent systems for a sustainable future.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Product</h4>
          <ul className="text-sm space-y-1">
            <li>Features</li>
            <li>Analyze Soil</li>
            <li>Results</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Connect</h4>
          <p className="text-sm">info@civorax.com</p>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-slate-800">
        © 2026 CivoraX. All rights reserved.
      </div>
    </footer>
  );
}