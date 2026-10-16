import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-extrabold text-stone-900">
        Catálogo de Productos
      </h1>
      <p className="max-w-md text-stone-600">
        Frontend en Next.js conectado a tu API de Laravel (Tasks/Products API).
      </p>
      <Link
        href="/login"
        className="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Iniciar sesión
      </Link>
    </div>
  );
}