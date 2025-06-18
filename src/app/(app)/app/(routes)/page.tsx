// src/app/(app)/(routes)/page.tsx

import { LogoutButton } from "@/components/auth/logout-button"; // Importa o Client Component LogoutButton
import { authenticateUser } from "@/lib/auth"; // Importa a função de autenticação do usuário

export default async function Page() {
  const user = await authenticateUser();

  console.log("User authenticated:", user); // Loga o usuário autenticado (Server-side)

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">
        Bem-vindo à Página Principal do Aplicativo!
      </h1>
      {user ? (
        <div className="space-y-2">
          <p className="text-lg">
            Você está logado como:{" "}
            <span className="font-semibold">{user.username || user.email}</span>
          </p>
          <p className="text-sm text-gray-600">ID: {user.id}</p>
          <p className="text-sm text-gray-600">
            Grupos: {user.groupNames?.join(", ") || "Nenhum"}
          </p>

          <div className="mt-4">
            <LogoutButton /> {/* Renderiza o botão de logout aqui */}
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-500">Você não está autenticado.</p>
      )}
    </div>
  );
}
