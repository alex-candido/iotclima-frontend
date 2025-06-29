// src/components/auth/auth-hero.tsx

import { cn } from "@/lib/utils";

export function AuthHero({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex justify-center mb-6", className)} {...props}>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
