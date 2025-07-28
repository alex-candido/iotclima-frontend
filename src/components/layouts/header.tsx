// src/components/layouts/header.tsx

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="header h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
      {children}
    </header>
  );
}
