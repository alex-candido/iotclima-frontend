// src/components/admin/search.tsx

"use client";

import { Input } from "@/components/ui/input";
import { APP_TEXT } from "@/data/ui-content";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder={APP_TEXT.COMMON_UI.SEARCH_PLACEHOLDER}
        className="w-[200px] pl-8 md:w-[300px]"
      />
    </div>
  );
}
