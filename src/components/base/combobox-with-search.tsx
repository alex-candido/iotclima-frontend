// src/components/ui/combobox-with-search.tsx
"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxWithSearchProps<T> {
  value: string | number | null | undefined;
  onValueChange: (newValue: string | number | null) => void;
  items: T[];
  itemKeyExtractor: (item: T) => string | number;
  itemDisplayExtractor: (item: T) => string;
  itemValueExtractor: (item: T) => string | number;
  onSearchTermChange?: (searchTerm: string) => void;
  isLoadingItems?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  placeholder?: string;
  disabled?: boolean;
  loadingMessage?: string;
}

export function ComboboxWithSearch<T>({
  value,
  onValueChange,
  items,
  itemKeyExtractor,
  itemDisplayExtractor,
  itemValueExtractor,
  onSearchTermChange,
  isLoadingItems = false,
  searchPlaceholder = "Buscar...",
  emptyMessage = "Nenhum resultado encontrado.",
  placeholder = "Selecione...",
  disabled = false,
  loadingMessage = "Carregando...",
}: ComboboxWithSearchProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [internalSearchTerm, setInternalSearchTerm] = React.useState("");

  const selectedItem = items.find((item) => itemValueExtractor(item) === value);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (onSearchTermChange) {
        onSearchTermChange(internalSearchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [internalSearchTerm, onSearchTermChange]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=""
          disabled={disabled}
        >
          {selectedItem ? itemDisplayExtractor(selectedItem) : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={internalSearchTerm}
            onValueChange={setInternalSearchTerm}
          />
          <CommandList>
            {isLoadingItems ? (
              <CommandEmpty className="flex justify-center items-center gap-2 py-4">
                <Loader2 className="h-4 w-4 animate-spin" /> {loadingMessage}
              </CommandEmpty>
            ) : items.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={itemKeyExtractor(item)}
                    value={itemDisplayExtractor(item)}
                    onSelect={() => {
                      onValueChange(itemValueExtractor(item));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        itemValueExtractor(item) === value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {itemDisplayExtractor(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
