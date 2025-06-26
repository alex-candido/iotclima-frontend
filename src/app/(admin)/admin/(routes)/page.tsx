// src/app/(admin)/admin/(routes)/page.tsx

import { APP_ROUTES } from "@/data/routes";
import { redirect } from "next/navigation";

export default function AdminRootPage() {
  redirect(APP_ROUTES.ADMIN.DASHBOARD.path);
}
