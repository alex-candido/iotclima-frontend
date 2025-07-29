// src/components/maps/actions/action-triggers.tsx

import { FloatingCard } from "@/components/base/floating-card";
import { ReactNode } from "react";

export function ActionTriggers({ children }: { children: ReactNode }) {
  return (
    <FloatingCard className="action-triggers flex items-center justify-end gap-2 px-4 py-2">
      {children}
    </FloatingCard>
  );
}

