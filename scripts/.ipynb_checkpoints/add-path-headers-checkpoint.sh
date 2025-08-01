#!/bin/bash

# Define the target directory
TARGET_DIR="src"

echo "Starting cleanup and header addition for code files (ts, tsx, js, jsx)..."

# Find only files with the specified extensions
find "$TARGET_DIR" -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) | while read -r file; do
  # Define the header content
  header="// $file"

  # 1. Remove ANY existing path header to prevent duplicates.
  # This makes the file empty if it only contained the header.
  sed -i '/^\/\/ src\//d' "$file"

  # 2. Robustly prepend the header using a temporary file.
  # This works correctly even if the file is empty after the previous step.
  echo "$header" | cat - "$file" > "$file.tmp" && mv "$file.tmp" "$file"

  echo "Processed: $file"
done

echo "Process complete."