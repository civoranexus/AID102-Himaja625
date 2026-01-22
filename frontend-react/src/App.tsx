import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Features from "./pages/Features";
import Analyze from "./pages/Analyze";
import Results from "./pages/Results";
import About from "./pages/About";
import History from "./pages/History";
import Auth from "./pages/Auth";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow">
        <Routes>
          {/* Auth first */}
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />

          {/* App pages */}
          <Route path="/home" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;