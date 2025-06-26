import { MapContainer, MapContainerProps } from "react-leaflet";

interface LeafletMapContainerProps {
  children: React.ReactNode;
}

export function LeafletMapContainer({ children, ...props }: LeafletMapContainerProps & MapContainerProps) {
  return (
    <MapContainer className="absolute h-full w-full text-white outline-0" {...props}>
      {children}
    </MapContainer>
  );
}
