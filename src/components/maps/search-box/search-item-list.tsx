// src/components/maps/search-box/search-item-list.tsx
"use client";

import { cn } from "@/lib/utils";

interface SearchItemListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick: (item: T) => void;
  className?: string; // Add className prop
}

export function SearchItemList<T>({ items, renderItem, onItemClick, className }: SearchItemListProps<T>) {
  return (
    <div className={cn("search-item-list", className)}>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No items to display.</p>
      ) : (
        items.map((item, index) => (
          <div key={index} onClick={() => onItemClick(item)} className="p-2 border cursor-pointer hover:bg-accent rounded-lg mb-2">
            {renderItem(item)}
          </div>
        ))
      )}
    </div>
  );
}
