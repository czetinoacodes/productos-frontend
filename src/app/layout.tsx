import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";


export const metadata: Metadata = {
  title: "Catálogo de Productos",
  description: "Frontend Next.js conectado a la API de Laravel de Productos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone-50 text-stone-900">
        <header className="border-b border-stone-200 bg-white">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-extrabold text-indigo-700">
              🛒 Catálogo
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}