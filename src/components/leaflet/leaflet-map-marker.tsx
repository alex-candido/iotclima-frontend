// src/components/leaflet/leaflet-map-marker.tsx
"use client";

import L, { LatLngExpression, LeafletEventHandlerFnMap } from 'leaflet'; // Importe L aqui, mas a lógica de criação do ícone estará em useMemo
import { useMemo } from 'react';
import ReactDOMServer from "react-dom/server"; // Importe ReactDOMServer aqui
import { Marker as ReactLeafletMarker } from 'react-leaflet';

// Importe o seu componente de CONTEÚDO do ícone
import { LeafletMapCustomMarkerIcon } from "./leaflet-map-custom-marker-icon";

interface LeafletMapMarkerProps {
  position: LatLngExpression;
  children?: React.ReactNode; // Para o Popup
  renderIconContent?: React.ReactNode; // Conteúdo React para o ícone customizado
  iconClassName?: string; // Classes para o div wrapper do ícone customizado
  eventHandlers?: LeafletEventHandlerFnMap;
}

export function LeafletMapMarker({
  position,
  children,
  renderIconContent,
  iconClassName,
  eventHandlers,
}: LeafletMapMarkerProps) {
  // O ícone Leaflet será criado aqui, dentro de useMemo para ser reativo a mudanças
  // e evitar recriações desnecessárias.
  const customIcon = useMemo(() => {
    // Esta condição é redundante se o componente é 'use client', mas é uma segurança.
    // L.divIcon precisa do ambiente do navegador.
    if (typeof window === 'undefined') {
      // Retorna um placeholder ou um L.Icon simples para evitar crash durante o SSR.
      // Next.js verá isso e desativará o SSR para este componente.
      return L.icon({
        iconUrl: '/marker-icon.png', // Um ícone padrão, ou um pixel transparente se você não quiser nada
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
    }

    // Renderiza o componente React em HTML estático
    const iconHtml = ReactDOMServer.renderToStaticMarkup(
      // Usamos o LeafletMapCustomMarkerIcon como o componente que contém o children e className
      <LeafletMapCustomMarkerIcon className={iconClassName}>
        {renderIconContent}
      </LeafletMapCustomMarkerIcon>
    );

    return L.divIcon({
      html: iconHtml,
      className: '', // Vazio para não adicionar classes indesejadas que poderiam vir de Leaflet
      iconSize: [32, 32], // Tamanho base do container do ícone
      iconAnchor: [16, 32], // Ponto de ancoragem do ícone
      popupAnchor: [0, -32], // Ponto de ancoragem do popup
    });
  }, [renderIconContent, iconClassName]); // Recria o ícone se o conteúdo ou classes mudarem

  // Se você precisa que o componente não renderize nada até que o Leaflet esteja pronto,
  // pode-lo fazer aqui, mas como o L.icon fallback já está lá, geralmente não é necessário.
  // if (typeof window === 'undefined') {
  //   return null;
  // }

  return (
    <ReactLeafletMarker position={position} icon={customIcon} eventHandlers={eventHandlers}>
      {children}
    </ReactLeafletMarker>
  );
}