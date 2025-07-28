// src/components/layouts/footer.tsx

export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="footer border-t border-border text-muted-foreground">
      {children}
    </footer>
  );
}
