import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Account Overview
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Profile Information
          </h2>

          <div className="space-y-3 text-slate-700">
            <p>
              <span className="font-medium">User ID:</span>{" "}
              {user.id}
            </p>

            <p>
              <span className="font-medium">Email:</span>{" "}
              {user.email}
            </p>

            {user.name && (
              <p>
                <span className="font-medium">Name:</span>{" "}
                {user.name}
              </p>
            )}
          </div>
        </div>

        {/* Security Card */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Security
          </h2>

          <p className="text-slate-600 text-sm leading-relaxed">
            Your account is protected using secure JSON Web
            Tokens (JWT). Authentication is handled entirely
            on the server and your credentials are never
            exposed to the client.
          </p>

          <p className="text-xs text-slate-400 mt-4">
            Logged in via secure token
          </p>
        </div>
      </div>
    </div>
  );
}