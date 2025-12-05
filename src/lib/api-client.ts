// lib/api-client.ts
const BASE_URL = process.env.API_URL || "https://api.quickprimetech.com/v1";
const BRANCH_ID = process.env.BRANCH_ID!;
const API_SECRET_KEY = process.env.API_SECRET_KEY!;

async function request(path: string, options: RequestInit = {}) {
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
  get: (path: string) => request(path, { method: "GET" }),

  post: (path: string, body: any) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path: string, body: any) =>
    request(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: (path: string) => request(path, { method: "DELETE" }),
};

export default api;
