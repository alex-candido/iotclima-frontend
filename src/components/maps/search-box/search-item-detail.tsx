// src/components/maps/search-box/search-item-detail.tsx
"use client";

interface SearchItem {
  id: string | number;
  name: string;
  description: string;
}

interface SearchItemDetailProps {
  item: SearchItem;
}

export function SearchItemDetail({ item }: SearchItemDetailProps) {
  if (!item) return null;

  return (
    <div className="p-4 border rounded-lg bg-card mt-2">
      <h3 className="font-semibold">Details for: {item.name || 'Item'}</h3>
      <p>More details about {item.name || 'this item'} will go here.</p>
      {/* Add more detailed information here */}
    </div>
  );
}
