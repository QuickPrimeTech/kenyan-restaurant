// lib/api-client.ts
const BASE_URL = process.env.API_URL || "https://api.quickprimetech.com/v1";
const BRANCH_ID = process.env.BRANCH_ID!;
const API_SECRET_KEY = process.env.API_SECRET_KEY!;

async function request<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}/${BRANCH_ID}${path}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_SECRET_KEY}`,
    ...(options.headers || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText}`);
  }

  return res.json();
}

const api = {
  get: <T = unknown>(path: string) => request<T>(path, { method: "GET" }),

  post: <Req = unknown, Res = unknown>(path: string, body: Req) =>
    request<Res>(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <Req = unknown, Res = unknown>(path: string, body: Req) =>
    request<Res>(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T = unknown>(path: string) => request<T>(path, { method: "DELETE" }),
};

export default api;
