// src/components/maps/search-box/search-item-list.tsx
"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface SearchItemListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemClick: (item: T) => void;
  className?: string;
}

export function SearchItemList<T>({ items, renderItem, onItemClick, className }: SearchItemListProps<T>) {
  return (
    <div className={cn("search-item-list flex-grow overflow-y-auto rounded-lg border", className)}>
      {items.length === 0 ? (
        <p className="text-muted-foreground p-4">Nenhum item para exibir.</p>
      ) : (
        items.map((item, index) => (
          <div 
            key={index} 
            onClick={() => onItemClick(item)} 
            className="flex items-center justify-between p-3 cursor-pointer transition-colors hover:bg-accent/50"
          >
            <div className="flex-grow">
              {renderItem(item)}
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
          </div>
        ))
      )}
    </div>
  );
}