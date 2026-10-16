import type { ApiListResponse, LoginResponse, Producto } from "./types";

const BASE_URL = process.env.LARAVEL_API_URL;

if (!BASE_URL) {
  throw new Error("Falta LARAVEL_API_URL en tu archivo .env.local");
}

// Laravel necesita este header en cada request, incluso en el login.
// Sin él, una petición no autenticada puede devolver un 500 o un
// redirect HTML en vez del JSON de error que esperamos.
const JSON_HEADERS = { Accept: "application/json" };

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { ...JSON_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Credenciales inválidas");
  }

  return res.json();
}

export async function getProductos(token: string): Promise<Producto[]> {
  const res = await fetch(`${BASE_URL}/api/products`, {
    headers: { ...JSON_HEADERS, Authorization: `Bearer ${token}` },
    cache: "no-store", // datos privados: siempre frescos, nunca ISR
  });

  if (res.status === 401) {
    // Token vencido o inválido: el que llama decide redirigir a /login
    throw new Error("UNAUTHORIZED");
  }
  if (!res.ok) {
    throw new Error(`Error al cargar productos: ${res.status}`);
  }

  const json: ApiListResponse<Producto> = await res.json();
  return json.data; // ← el JOIN con la paginación queda en json.meta si lo necesitas
}