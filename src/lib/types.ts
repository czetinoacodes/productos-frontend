// Contrato real de la API de Laravel: los campos vienen en español,
// tal como los definimos en el proyecto Tasks/Products API.
export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  existencia: number;
  promocionado: number; // 0 | 1 (boolean en MySQL)
  categoria: string;
}

// Laravel API Resource envuelve las listas en "data" (+ paginación)
export interface ApiListResponse<T> {
  data: T[];
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta?: {
    current_page: number;
    last_page: number;
    total: number;
  };
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}