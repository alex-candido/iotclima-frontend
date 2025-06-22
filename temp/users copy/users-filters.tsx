// src/components/admin/users/users-filters.tsx
"use client";

import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { APP_TEXT } from "@/data/ui-content";
import { getUserRoleLabel } from "@/lib/user-helpers";
import {
  UserFilterFormData,
  UserRoleData,
  UserRoleEnum,
} from "@/schemas/user-schema";

interface UsersFiltersProps {
  filterParams: UserFilterFormData;
  onFilterChange: (newFilters: Partial<UserFilterFormData>) => void;
}

export function UsersFilters({
  filterParams,
  onFilterChange,
}: UsersFiltersProps) {
  const [searchTermLocal, setSearchTermLocal] = useState(
    filterParams.searchTerm || "",
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleApplySearch = () => {
    onFilterChange({ searchTerm: searchTermLocal });
  };

  const handleRoleFilterChange = (value: string) => {
    onFilterChange({ role: value as UserRoleData | "all" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
      <div className="relative flex-1 w-full sm:w-auto">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={APP_TEXT.COMMON_UI.SEARCH_PLACEHOLDER || "Buscar..."}
          value={searchTermLocal}
          onChange={handleSearchChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleApplySearch();
            }
          }}
          className="pl-8"
        />
      </div>
      <Select value={filterParams.role} onValueChange={handleRoleFilterChange}>
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.USERS_PAGE.ROLE_FILTER_PLACEHOLDER || "Função"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.USERS_PAGE.ROLE_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(UserRoleEnum.Enum).map((role) => (
            <SelectItem key={role} value={role}>
              {getUserRoleLabel(role)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleApplySearch} className="w-full sm:w-auto">
        {APP_TEXT.COMMON_UI.SEARCH_BUTTON || "Buscar"}
      </Button>
    </div>
  );
}
