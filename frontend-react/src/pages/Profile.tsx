import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const initials =
    user.name?.split(" ").map(n => n[0]).join("").toUpperCase() ||
    user.email[0].toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-6 py-14 space-y-10">

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Account Overview
        </h1>
        <p className="text-slate-500 mt-2">
          Manage your SoilSense account and security settings.
        </p>
      </div>

      {/* Top Profile Card */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl p-8 text-white shadow-lg flex items-center gap-6">

        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-bold">
          {initials}
        </div>

        {/* User Info */}
        <div>
          <h2 className="text-xl font-semibold">
            {user.name || "SoilSense User"}
          </h2>
          <p className="text-white/80 text-sm">
            {user.email}
          </p>
          <p className="text-white/70 text-xs mt-1">
            User ID: {user.id}
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Profile Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-slate-800">
            Profile Information
          </h3>

          <div className="space-y-4 text-sm">

            <InfoRow label="Full Name" value={user.name || "Not provided"} />
            <InfoRow label="Email Address" value={user.email} />
            <InfoRow label="User ID" value={String(user.id)} />

          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-5">
          <h3 className="text-lg font-semibold text-slate-800">
            Security & Authentication
          </h3>

          <div className="space-y-4 text-sm text-slate-600">

            <p>
              Your account is secured using JSON Web Tokens (JWT).
              Authentication is handled server-side to ensure your
              credentials are never exposed.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-emerald-700 font-medium text-sm">
                ✓ Logged in via secure token
              </p>
              <p className="text-emerald-600 text-xs mt-1">
                Session validated and active
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Responsible AI Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h4 className="font-semibold text-slate-800 mb-2">
          Responsible AI Usage
        </h4>
        <p className="text-sm text-slate-600 leading-relaxed">
          SoilSense generates AI-driven soil analysis and advisory
          recommendations based on your submitted data. Insights are
          designed to support decision-making and should be combined
          with professional agricultural consultation where required.
        </p>
      </div>

    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}