import { TileLayer, TileLayerProps } from "react-leaflet";

interface LeafletMapTileLayerProps {}

export function LeafletMapTileLayer({
  ...props
}: LeafletMapTileLayerProps & TileLayerProps) {
  return (
    <TileLayer
      {...props}
    />
  );
}
