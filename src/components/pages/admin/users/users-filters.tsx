// src/components/admin/users/users-filters.tsx
"use client";

import { Search as SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { APP_TEXT } from "@/data/ui-content";
import { getUserGroupLabel } from "@/lib/user-helpers";
import {
  UserFilterFormData,
  UserGroupData,
  UserGroupEnum,
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
    filterParams.search_term || "",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTermLocal !== filterParams.search_term) {
        onFilterChange({ search_term: searchTermLocal });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTermLocal, onFilterChange, filterParams.search_term]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleGroupFilterChange = (value: string) => {
    onFilterChange({ group_name: value as UserGroupData | "all" });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
      <div className="relative flex-1 w-full sm:w-auto">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={APP_TEXT.COMMON_UI.SEARCH_PLACEHOLDER || "Buscar..."}
          value={searchTermLocal}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>
      <Select
        value={filterParams.group_name}
        onValueChange={handleGroupFilterChange}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue
            placeholder={
              APP_TEXT.USERS_PAGE.GROUP_FILTER_PLACEHOLDER || "Função"
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            {APP_TEXT.USERS_PAGE.GROUP_FILTER_ALL || "Todas"}
          </SelectItem>
          {Object.values(UserGroupEnum.Enum).map((groupString: string) => {
            const group = groupString as UserGroupData;
            return (
              <SelectItem key={group} value={group}>
                {getUserGroupLabel(group)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
