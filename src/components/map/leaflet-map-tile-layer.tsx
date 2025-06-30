import { TileLayer, TileLayerProps } from "react-leaflet";

export function LeafletMapTileLayer({
  ...props
}: TileLayerProps) {
  return (
    <TileLayer
      {...props}
    />
  );
}
