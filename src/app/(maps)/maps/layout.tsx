// src/app/(app)/app/layout.tsx

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}