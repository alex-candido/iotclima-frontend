// src/components/maps/map-view/custom-popup-content.tsx

export function CustomPopupContent({ data }: { data: any }) {
  return (
    <div className="p-2">
      <h3 className="font-bold text-lg">{data.name}</h3>
      <p className="text-sm">{data.description}</p>
    </div>
  );
}
