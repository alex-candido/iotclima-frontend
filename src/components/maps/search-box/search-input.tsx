// src/components/maps/search-box/search-input.tsx
"use client";

import { Search, X } from "lucide-react";
import { useMap } from "@/providers/map-provider";

export function SearchInput() {
  const { searchQuery, setSearchQuery } = useMap();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <form className="search-form relative">
      <label htmlFor="search-location" className="sr-only">Pesquisar local</label>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
      <input
        id="search-location"
        type="text"
        placeholder="Pesquisar local..."
        className="w-full rounded-lg bg-background py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
        value={searchQuery}
        onChange={handleInputChange}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
      )}
    </form>
  );
}
