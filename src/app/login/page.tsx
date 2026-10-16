import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-stone-900">
          Iniciar sesión
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          Usa un usuario de tu API de Laravel (Tasks/Products API).
        </p>
      </div>
      <LoginForm />
    </div>
  );
}