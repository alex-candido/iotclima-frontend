// src/components/maps/search-box/search-box.tsx
"use client";

import { FloatingCard } from "@/components/base/floating-card";
import { useMap } from "@/providers/map-provider";
import { useEffect, useRef } from "react";
import { SearchCollapse } from "./search-collapse";
import { SearchInput } from "./search-input";

export function SearchBox() {
  const { isSearchCollapseOpen, toggleSearchCollapse, searchQuery, setHasSearchResults, selectedSearchItem } = useMap();
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update hasSearchResults based on searchQuery
    setHasSearchResults(searchQuery.length > 0);
  }, [searchQuery, setHasSearchResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        // Close SearchCollapse only if it's open AND no item is selected in detail view
        if (isSearchCollapseOpen && selectedSearchItem === null) {
          toggleSearchCollapse();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchCollapseOpen, toggleSearchCollapse, selectedSearchItem]);

  const handleSearchInputFocus = () => {
    if (!isSearchCollapseOpen) {
      toggleSearchCollapse();
    }
  };

  return (
    <FloatingCard 
      className="search-box-container relative w-96 px-4 py-2"
      ref={searchBoxRef}
    >
      <div onFocus={handleSearchInputFocus}>
        <SearchInput />
      </div>
      <SearchCollapse />
    </FloatingCard>
  );
}