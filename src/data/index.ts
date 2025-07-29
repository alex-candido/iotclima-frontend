// src/data/index.ts

export const mockSavedLocations = Array.from({ length: 10 }, (_, i) => ({
  id: `saved-${i + 1}`,
  name: `Local Salvo ${i + 1}`,
  description: `Descrição do local salvo ${i + 1}`,
}));

export const mockRecentSearches = Array.from({ length: 10 }, (_, i) => ({
  id: `recent-${i + 1}`,
  name: `Pesquisa Recente ${i + 1}`,
  description: `Detalhes da pesquisa ${i + 1}`,
}));

export const mockDashboardContent = "Conteúdo detalhado do Dashboard de mapas.";