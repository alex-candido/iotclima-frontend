// src/components/layouts/main.tsx

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1 p-6 min-h-[calc(100vh-4rem)] overflow-auto">
      {children}
    </main>
  );
}
