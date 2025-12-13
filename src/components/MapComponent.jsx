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

  // Dummy Data Markers (Sebaiknya sama dengan di DetailPage atau dari API)
  const markers = [
    {
      id: 1,
      nama: "Taman Kota Pekanbaru",
      kategori: "Taman Kota",
      luas: "2.5 Ha",
      posisi: [0.52, 101.45],
      color: "text-green-800 bg-green-100",
    },
    {
      id: 2,
      nama: "Hutan Kota Diponegoro",
      kategori: "Hutan Kota",
      luas: "5.4 Ha",
      posisi: [0.49, 101.43],
      color: "text-emerald-800 bg-emerald-100",
    },
  ];

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

      {/* Render Markers from Array */}
      {markers.map((item) => (
        <Marker key={item.id} position={item.posisi}>
          <Popup className="font-outfit">
            <div className="min-w-[160px]">
              <h3 className="font-bold text-primary-dark mb-1 text-sm">
                {item.nama}
              </h3>
              <span
                className={`${item.color} text-[10px] px-2 py-0.5 rounded-full font-medium inline-block mb-2`}
              >
                {item.kategori}
              </span>
              <p className="text-xs text-gray-600 mb-3">
                Luas Area: <strong>{item.luas}</strong>
              </p>
              <a
                href={`/peta/${item.id}`}
                className="block w-full text-center bg-primary-dark hover:bg-green-800 text-white text-xs font-medium py-1.5 rounded transition-colors"
              >
                Lihat Detail
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
