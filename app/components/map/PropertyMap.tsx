'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface Property {
  id: string;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
}

interface PropertyMapProps {
  properties: Property[];
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

// Fix for default marker icons in Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41],
});

export default function PropertyMap({
  properties,
  center = { lat: 40.7128, lng: -74.0060 }, // Default to New York
  zoom = 13,
}: PropertyMapProps) {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current && properties.length > 0) {
      const bounds = L.latLngBounds(
        properties.map((property) => [property.location.lat, property.location.lng])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [properties]);

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoom}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.lat, property.location.lng]}
            icon={icon}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{property.title}</h3>
                <p className="text-sm text-gray-600">
                  {property.location.lat.toFixed(4)}, {property.location.lng.toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
} 