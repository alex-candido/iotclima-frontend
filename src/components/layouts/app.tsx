// src/components/layouts/app.tsx

export function App({ children }: { children: React.ReactNode }) {
  return (
    <div className="ioclima-app flex flex-col">{children}</div>
  );
}
