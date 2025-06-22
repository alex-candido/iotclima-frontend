// src/app/(admin)/admin/(routes)/users/[id]/page.tsx

import { UsersHeaderSection } from "@/components/pages/admin/users/users-header-section";

export default function Page() {
  return (
    <div className="space-y-6">
      <UsersHeaderSection>
        <h1 className="text-2xl font-bold">User Details</h1>
      </UsersHeaderSection>
    </div>
  );
}
