// src/components/layouts/main.tsx

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="main flex-1 min-h-[calc(100vh-4rem)]">{children}</main>
  );
}
