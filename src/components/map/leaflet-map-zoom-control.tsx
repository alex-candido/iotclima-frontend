import { ZoomControl, ZoomControlProps } from "react-leaflet";

export function LeafletMapZoomControl({
  ...props
}: ZoomControlProps) {
  return (
    <ZoomControl
      {...props}
    />
  );
}
