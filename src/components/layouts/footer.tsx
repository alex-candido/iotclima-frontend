// src/components/admin/footer.tsx

import { APP_TEXT } from "@/data/ui-content";

export function Footer() {
  return (
    <footer className="border-t border-border py-4 px-6 text-center text-sm text-muted-foreground">
      {APP_TEXT.GLOBAL.APP_NAME} &copy; {new Date().getFullYear()}{" "}
      {APP_TEXT.GLOBAL.ALL_RIGHTS_RESERVED}
    </footer>
  );
}
