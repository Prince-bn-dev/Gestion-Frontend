import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TestMap = () => {
  return (
    <div style={{ height: '500px' , margin:'20px'}}>
      <MapContainer center={[6.3703, 2.3912]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[6.3703, 2.3912]} />
      </MapContainer>
    </div>
  );
};

export default TestMap;