// src/components/ui/base-form-field.tsx
"use client";

import { ComboboxWithSearch } from "@/components/base/combobox-with-search";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

type Option = {
  value: string | number;
  label: string;
  disabled?: boolean;
};

interface BaseFormFieldProps<TFormValues extends FieldValues> {
  control: Control<TFormValues>;
  name: FieldPath<TFormValues>;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  type?: React.HTMLInputTypeAttribute;
  rows?: number;
  className?: string;

  renderAs?: "input" | "textarea" | "select" | "switch" | "combobox";

  selectOptions?: Option[];

  comboboxItems?: any[];
  comboboxItemKeyExtractor?: (item: any) => string | number;
  comboboxItemDisplayExtractor?: (item: any) => string;
  comboboxItemValueExtractor?: (item: any) => string | number;
  onComboboxSearchTermChange?: (searchTerm: string) => void;
  isLoadingComboboxItems?: boolean;
  comboboxEmptyMessage?: string;
  comboboxLoadingMessage?: string;
  comboboxPlaceholder?: string;
}

export function BaseFormField<TFormValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
  isSubmitting,
  type = "text",
  rows = 3,
  className,
  renderAs = "input",
  selectOptions,
  comboboxItems,
  comboboxItemKeyExtractor,
  comboboxItemDisplayExtractor,
  comboboxItemValueExtractor,
  onComboboxSearchTermChange,
  isLoadingComboboxItems,
  comboboxEmptyMessage,
  comboboxLoadingMessage,
  comboboxPlaceholder,
}: BaseFormFieldProps<TFormValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div
            className={
              renderAs === "switch"
                ? "flex flex-row items-center justify-between rounded-lg border p-4"
                : ""
            }
          >
            <div className={renderAs === "switch" ? "space-y-0.5" : ""}>
              <FormLabel>{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormControl>
              {(() => {
                if (renderAs === "input") {
                  return (
                    <Input
                      {...field}
                      type={type}
                      placeholder={placeholder}
                      value={field.value ?? ""}
                      disabled={disabled || isSubmitting}
                    />
                  );
                }
                if (renderAs === "textarea") {
                  return (
                    <Textarea
                      {...field}
                      placeholder={placeholder}
                      value={field.value ?? ""}
                      disabled={disabled || isSubmitting}
                      rows={rows}
                    />
                  );
                }
                if (renderAs === "select") {
                  return (
                    <Select
                      value={
                        field.value !== undefined && field.value !== null
                          ? String(field.value)
                          : ""
                      }
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      disabled={disabled || isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {selectOptions?.map((option) => (
                          <SelectItem
                            key={String(option.value)}
                            value={String(option.value)}
                            disabled={option.disabled}
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }
                if (renderAs === "switch") {
                  return (
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={disabled || isSubmitting}
                    />
                  );
                }
                if (renderAs === "combobox") {
                  return (
                    <ComboboxWithSearch
                      value={
                        field.value !== undefined && field.value !== null
                          ? field.value
                          : null
                      }
                      onValueChange={(newValue) => field.onChange(newValue)}
                      disabled={disabled || isSubmitting}
                      placeholder={placeholder}
                      items={comboboxItems || []}
                      itemKeyExtractor={
                        comboboxItemKeyExtractor ||
                        ((item: any) => item.id || item.value)
                      }
                      itemDisplayExtractor={
                        comboboxItemDisplayExtractor ||
                        ((item: any) => item.label || item.name)
                      }
                      itemValueExtractor={
                        comboboxItemValueExtractor ||
                        ((item: any) => item.id || item.value)
                      }
                      onSearchTermChange={onComboboxSearchTermChange}
                      isLoadingItems={isLoadingComboboxItems}
                      emptyMessage={comboboxEmptyMessage}
                      loadingMessage={comboboxLoadingMessage}
                      searchPlaceholder={comboboxPlaceholder}
                    />
                  );
                }
                return null;
              })()}
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
