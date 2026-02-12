export type ApiError = {
  message: string;
  status: number;
};

// Automatically switch between local and production backend
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("civorax-token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // Handle session expiration
  if (res.status === 401) {
    localStorage.removeItem("civorax-token");
    localStorage.removeItem("civorax-user");
    window.location.href = "/auth";

    throw {
      message: "Session expired. Please login again.",
      status: 401,
    } as ApiError;
  }

  // Handle other errors
  if (!res.ok) {
    let message = "Something went wrong. Please try again.";

    try {
      const body = await res.json();
      message = body?.error || message;
    } catch {
      // ignore JSON parse errors
    }

    throw {
      message,
      status: res.status,
    } as ApiError;
  }

  return res.json();
}