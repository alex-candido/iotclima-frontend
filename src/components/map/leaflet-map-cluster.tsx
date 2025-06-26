import MarkerClusterGroup, { MarkerClusterGroupProps } from "react-leaflet-markercluster";

interface LeafletMapClusterProps {
  children: React.ReactNode;
}

export function LeafletMapCluster({ children, ...props }: LeafletMapClusterProps & MarkerClusterGroupProps) {
  return (
    <MarkerClusterGroup {...props}>
      { children }
    </MarkerClusterGroup>
  )
}
