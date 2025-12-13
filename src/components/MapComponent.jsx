import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = () => {
  // Coordinates for Pekanbaru
  const position = [0.507068, 101.447779]; // Pekanbaru Coordinate

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full rounded-none lg:rounded-2xl z-0"
    >
      <LayersControl position="topright">
        {/* Basemap Options */}
        <LayersControl.BaseLayer checked name="CartoDB Voyager (Modern)">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="OpenStreetMap (Standard)">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Esri World Imagery (Satelit)">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        {/* Example Overlay (Optional) */}
        {/* <LayersControl.Overlay checked name="RTH Markers">
           <LayerGroup>...</LayerGroup>
        </LayersControl.Overlay> */}
      </LayersControl>

      {/* RTH Markers */}
      <Marker position={position}>
        <Popup className="font-outfit">
          <div className="text-center">
            <h3 className="font-bold text-primary-dark">
              Pusat Kota Pekanbaru
            </h3>
            <p className="text-xs text-gray-600">Titik Referensi</p>
          </div>
        </Popup>
      </Marker>

      {/* Dummy Data - Taman Kota */}
      <Marker position={[0.52, 101.45]}>
        <Popup className="font-outfit">
          <div className="min-w-[150px]">
            <h3 className="font-bold text-primary-dark mb-1">
              Taman Kota Pekanbaru
            </h3>
            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-medium">
              Taman Kota
            </span>
            <p className="text-xs text-gray-600 mt-2">
              Luas Area: <strong>2.5 Ha</strong>
              <br />
              Fasilitas: Jogging Track, WiFi
            </p>
          </div>
        </Popup>
      </Marker>

      {/* Dummy Data - Hutan Kota */}
      <Marker position={[0.49, 101.43]}>
        <Popup className="font-outfit">
          <div className="min-w-[150px]">
            <h3 className="font-bold text-primary-dark mb-1">
              Hutan Kota Diponegoro
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-medium">
              Hutan Kota
            </span>
            <p className="text-xs text-gray-600 mt-2">
              Luas Area: <strong>5.4 Ha</strong>
              <br />
              Status:{" "}
              <span className="text-green-600 font-semibold">Terawat</span>
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
