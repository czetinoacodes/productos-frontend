export default function Loading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Cargando">
      <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
      <div className="h-72 animate-pulse rounded-2xl bg-stone-200" />
    </div>
  );
}