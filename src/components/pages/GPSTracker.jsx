import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const vehicleIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/61/61231.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

function GPSTracker({ latitude, longitude, vehicule }) {
  return (
    <div className="gps-container">
      <h2>Suivi GPS du véhicule</h2>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        scrollWheelZoom={true}
        className="gps-map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={vehicleIcon}>
          <Popup>
            {vehicule.marque} - {vehicule.modele}<br />
            Immat: {vehicule.immatriculation}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default GPSTracker;
