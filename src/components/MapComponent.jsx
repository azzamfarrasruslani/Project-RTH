import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  FaTree,
  FaPagelines,
  FaRoad,
  FaBuilding,
  FaMountain,
  FaShapes,
  FaMonument,
} from "react-icons/fa";
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

const MapComponent = ({ markers = [], selectedRth = null }) => {
  // Coordinates for Pekanbaru
  const position = [0.507068, 101.447779]; // Pekanbaru Coordinate

  // State for GeoJSONs
  const [geojsons, setGeojsons] = React.useState([]);
  const markerRefs = React.useRef({}); // Store refs to markers
  const mapRef = React.useRef(null); // Ref to Map instance

  // Effect to load GeoJSONs when markers change
  React.useEffect(() => {
    const fetchGeoJSONs = async () => {
      const geojsonPromises = markers
        .filter((m) => m.geojson_url)
        .map(async (m) => {
          try {
            const res = await fetch(m.geojson_url);
            const json = await res.json();
            return {
              id: m.id,
              data: json,
              nama: m.nama,
              kategori: m.kategori,
            };
          } catch (err) {
            console.error("Failed to load geojson for", m.nama, err);
            return null;
          }
        });

      const loadedGeojsons = (await Promise.all(geojsonPromises)).filter(
        Boolean
      );
      setGeojsons(loadedGeojsons);
    };

    if (markers.length > 0) {
      fetchGeoJSONs();
    }
  }, [markers]);

  // Effect to handle selection (Search)
  React.useEffect(() => {
    if (selectedRth && mapRef.current) {
      // 1. Fly to location
      mapRef.current.flyTo(selectedRth.posisi, 17, {
        duration: 1.5,
      });

      // 2. Open Popup
      const marker = markerRefs.current[selectedRth.id];
      if (marker) {
        setTimeout(() => {
          marker.openPopup();
        }, 1000); // Wait for flyTo or just a slight delay for better UX
      }
    }
  }, [selectedRth]);

  // Helper to get GeoJSON Color based on category
  const getGeoJsonColor = (kategori) => {
    switch (kategori) {
      case "Taman Kota":
        return "#22c55e"; // green-500
      case "Hutan Kota":
        return "#047857"; // emerald-700
      case "Jalur Hijau":
        return "#a3e635"; // lime-400
      case "RTH Private":
        return "#fb923c"; // orange-400
      case "Taman Wisata Alam":
        return "#14b8a6"; // teal-500
      case "Pemakaman":
        return "#6366f1"; // indigo-500
      default:
        return "#6b7280"; // gray-500 (Lainnya)
    }
  };

  const getCategoryIcon = (kategori) => {
    switch (kategori) {
      case "Taman Kota":
        return <FaTree />;
      case "Hutan Kota":
        return <FaPagelines />;
      case "Jalur Hijau":
        return <FaRoad />;
      case "RTH Private":
        return <FaBuilding />;
      case "Taman Wisata Alam":
        return <FaMountain />;
      case "Pemakaman":
        return <FaMonument />;
      default:
        return <FaShapes />;
    }
  };

  const createCustomIcon = (color, iconNode) => {
    const iconHtml = renderToStaticMarkup(iconNode);
    return L.divIcon({
      className: "custom-marker-icon",
      html: `<div style="
        background-color: ${color};
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
      ">
        ${iconHtml}
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full rounded-none lg:rounded-2xl z-0"
      ref={mapRef}
    >
      <LayersControl position="topright">
        {/* Basemap Options */}
        <LayersControl.BaseLayer checked name="Esri World Imagery (Satelit)">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="CartoDB Voyager (Modern)">
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
      </LayersControl>

      {/* RTH Markers */}
      {markers.map((item) => (
        <Marker
          key={item.id}
          position={item.posisi}
          icon={createCustomIcon(
            getGeoJsonColor(item.kategori),
            getCategoryIcon(item.kategori)
          )}
          ref={(el) => (markerRefs.current[item.id] = el)}
        >
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
                className="block w-full text-center bg-primary-dark hover:bg-green-800 !text-white text-xs font-medium py-1.5 rounded transition-colors"
                style={{ color: "white" }}
              >
                Lihat Detail
              </a>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Render GeoJSON Layers */}
      {geojsons
        .filter((g) => markers.some((m) => m.id === g.id))
        .map((g) => (
          <GeoJSON
            key={g.id}
            data={g.data} // Leaflet automatically handles Polygon/MultiPolygon
            style={() => ({
              color: getGeoJsonColor(g.kategori),
              weight: 2,
              opacity: 1,
              fillOpacity: 0.4,
              fillColor: getGeoJsonColor(g.kategori),
            })}
            onEachFeature={(feature, layer) => {
              layer.on({
                mouseover: (e) => {
                  e.target.setStyle({ fillOpacity: 0.8, weight: 3 });
                },
                mouseout: (e) => {
                  e.target.setStyle({ fillOpacity: 0.4, weight: 2 });
                },
              });
              layer.bindPopup(g.nama);
            }}
          ></GeoJSON>
        ))}
    </MapContainer>
  );
};

export default MapComponent;
