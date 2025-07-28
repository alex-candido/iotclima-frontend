// src/components/base/container.tsx

import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("container w-full max-w-4/5 mx-auto flex items-center justify-between", className)}>
      {children}
    </div>
  )
}