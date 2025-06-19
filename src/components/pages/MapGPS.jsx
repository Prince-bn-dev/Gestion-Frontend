import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { getVehiculeGps } from '../../api/vehiculeApi';
import L from 'leaflet';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);
  return null;
}

function MapGPS({ vehiculeId }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchGps = async () => {
      try {
        const gps = await getVehiculeGps(vehiculeId);
        if (gps) {
          setPosition([gps.lat, gps.lng]);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération GPS", err);
      }
    };

    fetchGps();
    const interval = setInterval(fetchGps, 10000); 
    return () => clearInterval(interval);
  }, [vehiculeId]);

  if (!position) return <p>Chargement de la position GPS...</p>;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer center={position} zoom={14} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={position} icon={vehicleIcon}>
          <Popup>Position actuelle du véhicule</Popup>
        </Marker>
        <RecenterMap position={position} />
      </MapContainer>
    </div>
  );
}

export default MapGPS;
