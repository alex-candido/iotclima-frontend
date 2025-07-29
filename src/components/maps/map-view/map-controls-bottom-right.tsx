// src/components/maps/map-view/map-controls-bottom-right.tsx
"use client";

import { LocateMeButton } from "./locate-me-button";
import { ZoomControl } from "./zoom-control";

export function MapControlsBottomRight() {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[400]">
      <LocateMeButton />
      <ZoomControl />
    </div>
  );
}
