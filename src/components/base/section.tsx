// src/components/base/section.tsx
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("section px-4 py-6", className)}>
      {children}
    </section>
  );
}
