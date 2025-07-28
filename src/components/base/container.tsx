// src/components/base/container.tsx

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container w-full max-w-4/5 mx-auto flex items-center justify-between">
      {children}
    </div>
  )
}