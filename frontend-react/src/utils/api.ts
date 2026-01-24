export async function apiRequest(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("civorax-token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("civorax-token");
    localStorage.removeItem("civorax-user");
    window.location.href = "/auth";
    throw new Error("Unauthorized");
  }

  return res.json();
}