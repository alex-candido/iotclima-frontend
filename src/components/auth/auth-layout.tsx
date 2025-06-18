// src/components/auth/auth-layout.tsx

import { cn } from "@/lib/utils";

export function AuthLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-muted/40 p-4",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
