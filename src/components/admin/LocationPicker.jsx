import React, { useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition]
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span className="text-center font-medium">
          Geser saya ke lokasi RTH
        </span>
      </Popup>
    </Marker>
  );
};

const LocationPicker = ({ initialLat, initialLong, onConfirm, geojson }) => {
  // Default Pekanbaru if no coordinates provided
  const [position, setPosition] = useState({
    lat: initialLat ? parseFloat(initialLat) : 0.507068,
    lng: initialLong ? parseFloat(initialLong) : 101.447779,
  });

  const handleConfirm = () => {
    onConfirm(position.lat, position.lng);
  };

  return (
    <div className="space-y-3">
      <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <DraggableMarker position={position} setPosition={setPosition} />
          {geojson && <GeoJSON data={geojson} />}
        </MapContainer>
      </div>

      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
        <div className="text-sm">
          <p className="text-gray-500">Koordinat Terpilih:</p>
          <p className="font-mono text-blue-700 font-bold">
            {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </p>
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Konfirmasi Titik Ini
        </button>
      </div>
    </div>
  );
};

export default LocationPicker;
