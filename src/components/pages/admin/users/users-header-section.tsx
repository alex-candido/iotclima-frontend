// src/components/pages/admin/users/users-header-section.tsx
"use client";

export function UsersHeaderSection({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {children}
    </div>
  );
}
