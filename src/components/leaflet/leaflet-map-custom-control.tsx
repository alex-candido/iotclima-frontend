// src/components/leaflet/leaflet-map-custom-control.tsx
"use client";

import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LeafletMapCustomControlProps {
  position?: "topleft" | "topright" | "bottomleft" | "bottomright";
  children: React.ReactNode;
}

const createLeafletCustomControl = (props: LeafletMapCustomControlProps) => {
  const Control = L.Control.extend({
    onAdd: function () {
      const div = L.DomUtil.create("div");
      div.className = "leaflet-bar leaflet-control";
      return div;
    },
    onRemove: function () {},
  });
  return new Control({ position: props.position });
};

export const LeafletMapCustomControl = createControlComponent(createLeafletCustomControl);
