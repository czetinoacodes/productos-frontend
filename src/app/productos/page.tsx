import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { getProductos } from "@/lib/api";

export default async function ProductosPage() {
  const cookieStore = await cookies(); // en Next 16, cookies() también es async
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  let productos;
  try {
    productos = await getProductos(token);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      redirect("/login"); // token vencido o inválido
    }
    throw error; // lo atrapa error.tsx
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900">Productos</h1>
          <p className="text-sm text-stone-500">
            Datos en vivo desde tu API de Laravel — {productos.length} productos.
          </p>
        </div>
        <LogoutButton />
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-100 text-xs uppercase tracking-wide text-stone-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Categoría</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Existencia</th>
              <th className="px-4 py-3">Promocionado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {productos.map((p) => (
              <tr key={p.id} className="hover:bg-stone-50">
                <td className="px-4 py-3 font-medium text-stone-900">
                  {p.nombre}
                </td>
                <td className="px-4 py-3 text-stone-600">{p.categoria}</td>
                <td className="px-4 py-3 text-stone-600">
                  ${p.precio.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-stone-600">{p.existencia}</td>
                <td className="px-4 py-3">
                  {p.promocionado ? (
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                      En promoción
                    </span>
                  ) : (
                    <span className="text-stone-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}