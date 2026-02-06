export type ApiError = {
  message: string;
  status: number;
};

export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("civorax-token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // Session expired / invalid token
  if (res.status === 401) {
    localStorage.removeItem("civorax-token");
    localStorage.removeItem("civorax-user");
    window.location.href = "/auth";

    const error: ApiError = {
      message: "Session expired. Please login again.",
      status: 401,
    };
    throw error;
  }

  // Other server errors
  if (!res.ok) {
    let message = "Something went wrong. Please try again.";

    try {
      const body = await res.json();
      message = body?.error || message;
    } catch {
      // ignore JSON parse errors
    }

    const error: ApiError = {
      message,
      status: res.status,
    };
    throw error;
  }

  return res.json();
}