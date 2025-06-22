// src/components/auth/auth-footer.tsx

import { CardFooter } from "@/components/ui/card";

interface AuthFooterProps {
  children: React.ReactNode;
}

export function AuthFooter({ children }: AuthFooterProps) {
  return (
    <CardFooter className="flex flex-col space-y-4 justify-center">
      {children}
    </CardFooter>
  );
}
