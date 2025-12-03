import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  // Coordinates for Pekanbaru
  const position = [0.5071, 101.4478];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="h-full w-full rounded-xl z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Pekanbaru City Center <br /> RTH Point.
        </Popup>
      </Marker>
      
      {/* Dummy Data Markers */}
      <Marker position={[0.5200, 101.4500]}>
        <Popup>
          Taman Kota A <br /> Luas: 2Ha
        </Popup>
      </Marker>
      <Marker position={[0.4900, 101.4300]}>
        <Popup>
          Hutan Kota B <br /> Luas: 5Ha
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
