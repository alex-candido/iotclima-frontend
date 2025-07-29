// src/components/maps/map-view/locate-me-button.tsx
"use client";

import { Button } from "@/components/ui/button";
import { LocateFixed } from "lucide-react";

export function LocateMeButton() {
  const handleLocateMe = () => {
    console.log("Localizar minha posição");
    // Lógica para localizar o usuário e centralizar o mapa será implementada posteriormente
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleLocateMe}
      className="text-muted-foreground cursor-pointer hover:bg-muted/50 hover:text-foreground"
    >
      <LocateFixed className="h-5 w-5" />
    </Button>
  );
}
