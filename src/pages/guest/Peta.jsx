import React, { useState } from "react";
import MapComponent from "../../components/MapComponent";
import {
  FaTree,
  FaFilter,
  FaLayerGroup,
  FaInfoCircle,
  FaTimes,
  FaPagelines,
  FaRoad,
  FaBuilding,
  FaMountain,
  FaShapes,
  FaMonument,
  FaMap,
} from "react-icons/fa";
import { GiTombstone } from "react-icons/gi";

const Peta = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedRth, setSelectedRth] = useState(null);
  const [pekanbaruBoundary, setPekanbaruBoundary] = useState(null);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  const [filters, setFilters] = useState({
    taman: true,
    hutan: true,
    jalur: true,
    private: true,
    wisata: true,
    pemakaman: true,
    lainnya: true,
    boundary: true,
  });

  // Fetch Data
  React.useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const { rthService } = await import("../../services/rthService");
        const data = await rthService.getAll();
        if (data) {
          const mappedMarkers = data
            .map((item) => {
              // Determine color based on category
              let color = "text-gray-800 bg-gray-100"; // Default/Lainnya
              if (item.kategori === "Taman Kota")
                color = "text-green-800 bg-green-100";
              else if (item.kategori === "Hutan Kota")
                color = "text-emerald-800 bg-emerald-100";
              else if (item.kategori === "Jalur Hijau")
                color = "text-lime-800 bg-lime-100";
              else if (item.kategori === "RTH Private")
                color = "text-orange-800 bg-orange-100";
              else if (item.kategori === "Taman Wisata Alam")
                color = "text-teal-800 bg-teal-100";
              else if (item.kategori === "Pemakaman")
                color = "text-indigo-800 bg-indigo-100";

              return {
                id: item.id,
                nama: item.nama,
                kategori: item.kategori,
                luas: item.luas + " Ha",
                posisi: [item.lat || 0, item.long || 0],
                geojson_url: item.geojson_file,
                gambar: item.foto_utama,
                alamat: item.alamat,
                color: color,
              };
            })
            .filter((m) => m.posisi[0] !== 0);
          setMarkers(mappedMarkers);
          setFilteredMarkers(mappedMarkers);
        }
      } catch (e) {
        console.error("Error loading markers:", e);
      }
    };
    fetchMarkers();

    // Fetch Pekanbaru Boundary
    fetch("/geojson_PKU/Pekanbaru.geojson")
      .then((res) => res.json())
      .then((data) => {
        console.log("Boundary data loaded:", data);
        // Filter only Pekanbaru features
        const pekanbaruFeatures = data.features.filter((feature) => {
          const kabupaten = feature.properties?.WADMKK || "";
          return kabupaten.toUpperCase().includes("PEKANBARU");
        });

        const filteredData = {
          ...data,
          features: pekanbaruFeatures,
        };

        setPekanbaruBoundary(filteredData);

        // Extract unique Kecamatan names
        const kecamatans = [
          ...new Set(
            pekanbaruFeatures.map((f) => f.properties?.NAMOBJ).filter(Boolean)
          ),
        ].sort();
        setKecamatanList(kecamatans);
      })
      .catch((err) => console.error("Error loading boundary:", err));
  }, []);

  // Filter Logic
  React.useEffect(() => {
    let result = markers;

    // 1. Category Filter
    result = result.filter((item) => {
      let matchesCategory = false;
      if (filters.taman && item.kategori === "Taman Kota")
        matchesCategory = true;
      else if (filters.hutan && item.kategori === "Hutan Kota")
        matchesCategory = true;
      else if (filters.jalur && item.kategori === "Jalur Hijau")
        matchesCategory = true;
      else if (filters.private && item.kategori === "RTH Private")
        matchesCategory = true;
      else if (filters.wisata && item.kategori === "Taman Wisata Alam")
        matchesCategory = true;
      else if (filters.pemakaman && item.kategori === "Pemakaman")
        matchesCategory = true;
      else if (
        filters.lainnya &&
        ![
          "Taman Kota",
          "Hutan Kota",
          "Jalur Hijau",
          "RTH Private",
          "Taman Wisata Alam",
          "Pemakaman",
        ].includes(item.kategori)
      )
        matchesCategory = true;
      return matchesCategory;
    });

    // Filter Helper: Point in Polygon
    const isPointInFeature = (point, feature) => {
      // point: [lat, lng]
      const x = point[1]; // lng
      const y = point[0]; // lat

      const pointInPoly = (poly) => {
        let inside = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const xi = poly[i][0],
            yi = poly[i][1];
          const xj = poly[j][0],
            yj = poly[j][1];

          const intersect =
            yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) inside = !inside;
        }
        return inside;
      };

      const { type, coordinates } = feature.geometry;
      if (type === "Polygon") {
        return pointInPoly(coordinates[0]);
      } else if (type === "MultiPolygon") {
        return coordinates.some((polyCoords) => pointInPoly(polyCoords[0]));
      }
      return false;
    };

    // 2. Kecamatan Filter (Spatial)
    if (selectedKecamatan && pekanbaruBoundary) {
      const targetFeature = pekanbaruBoundary.features.find(
        (f) => f.properties?.NAMOBJ === selectedKecamatan
      );
      if (targetFeature) {
        result = result.filter((item) =>
          isPointInFeature(item.posisi, targetFeature)
        );
      }
    }

    setFilteredMarkers(result);
  }, [filters, markers, selectedKecamatan, pekanbaruBoundary]);

  // Search Logic & Suggestions
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const matches = markers.filter((item) =>
        item.nama.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (rth) => {
    setSearchTerm(rth.nama);
    setSuggestions([]);
    setSelectedRth(rth); // Notify MapComponent
  };

  return (
    <div className="relative flex h-[calc(100vh-100px)] overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Filters */}
      <aside
        className={`
          absolute z-50 bg-white shadow-2xl rounded-tr-2xl rounded-br-2xl lg:rounded-2xl
          flex flex-col transition-transform duration-300 ease-in-out border border-gray-100
          
          /* Mobile Sizing & Pos */
          top-0 left-0 h-full w-4/5 max-w-[320px] 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}

          /* Desktop Sizing & Pos (Floating Panel) */
          lg:translate-x-0 lg:top-4 lg:left-4 lg:h-[calc(100%-32px)] lg:w-80
        `}
      >
        {/* Header Section */}
        <div className="px-6 py-6 pb-4 flex-shrink-0 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-primary-dark font-outfit mb-1">
              Peta Sebaran
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed font-outfit">
              Eksplorasi <strong>{markers.length} Titik</strong> RTH (
              {markers
                .reduce(
                  (acc, curr) =>
                    acc +
                    (parseFloat(
                      curr.luas.replace(" Ha", "").replace(",", ".")
                    ) || 0),
                  0
                )
                .toLocaleString("id-ID", { maximumFractionDigits: 2 })}{" "}
              Ha)
            </p>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-primary-dark transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search & Filter Content */}
        <div className="flex-1 overflow-y-auto px-6 py-2 pb-6 custom-scrollbar space-y-6">
          {/* Search Input with Suggestions */}
          <div className="relative group z-50">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaTree className="text-gray-400 group-focus-within:text-primary-dark transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Cari lokasi RTH..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchTerm.length > 0) {
                  const matches = markers.filter((item) =>
                    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  setSuggestions(matches);
                }
              }}
              onBlur={() => setTimeout(() => setSuggestions([]), 200)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none transition-all text-sm font-medium font-outfit shadow-sm"
            />
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-h-60 overflow-y-auto z-50">
                {suggestions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                      <FaTree size={12} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 font-outfit line-clamp-1">
                        {item.nama}
                      </p>
                      <p className="text-xs text-gray-500 font-outfit">
                        {item.kategori}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filter Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800 font-outfit text-sm">
                Kategori & Layer
              </h3>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold bg-gray-100 px-2 py-0.5 rounded-full">
                Filter
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  id: "taman",
                  label: "Taman Kota",
                  icon: FaTree,
                  color: "bg-green-500",
                  iconColor: "text-green-600",
                  activeClass: "border-green-500 bg-green-50 text-green-800",
                  filterKey: "Taman Kota",
                },
                {
                  id: "hutan",
                  label: "Hutan Kota",
                  icon: FaPagelines,
                  color: "bg-emerald-700",
                  iconColor: "text-emerald-700",
                  activeClass:
                    "border-emerald-700 bg-emerald-50 text-emerald-800",
                  filterKey: "Hutan Kota",
                },
                {
                  id: "jalur",
                  label: "Jalur Hijau",
                  icon: FaRoad,
                  color: "bg-lime-500",
                  iconColor: "text-lime-600",
                  activeClass: "border-lime-500 bg-lime-50 text-lime-800",
                  filterKey: "Jalur Hijau",
                },
                {
                  id: "private",
                  label: "RTH Private",
                  icon: FaBuilding,
                  color: "bg-orange-400",
                  iconColor: "text-orange-500",
                  activeClass: "border-orange-500 bg-orange-50 text-orange-800",
                  filterKey: "RTH Private",
                },
                {
                  id: "wisata",
                  label: "Wisata Alam",
                  icon: FaMountain,
                  color: "bg-teal-500",
                  iconColor: "text-teal-600",
                  activeClass: "border-teal-500 bg-teal-50 text-teal-800",
                  filterKey: "Taman Wisata Alam",
                },
                {
                  id: "pemakaman",
                  label: "Pemakaman",
                  icon: GiTombstone,
                  color: "bg-indigo-500",
                  iconColor: "text-indigo-600",
                  activeClass: "border-indigo-500 bg-indigo-50 text-indigo-800",
                  filterKey: "Pemakaman",
                },
                {
                  id: "lainnya",
                  label: "Lainnya",
                  icon: FaShapes,
                  color: "bg-gray-500",
                  iconColor: "text-gray-500",
                  activeClass: "border-gray-500 bg-gray-50 text-gray-800",
                  filterKey: "Lainnya",
                },
                {
                  id: "boundary",
                  label: "Batas Wilayah",
                  icon: FaMap,
                  color: "bg-slate-500",
                  iconColor: "text-slate-600",
                  activeClass: "border-slate-500 bg-slate-50 text-slate-800",
                  filterKey: "BOUNDARY",
                },
              ].map((cat) => {
                // Calculate Stats per Category
                let stats = { count: 0, luas: 0 };

                if (cat.id === "boundary") {
                  // Special case for boundary
                  stats = { count: 1, luas: 632.26 }; // Approximate Pekanbaru area or static
                } else {
                  stats = markers.reduce(
                    (acc, item) => {
                      const isMatch =
                        cat.filterKey === "Lainnya"
                          ? ![
                              "Taman Kota",
                              "Hutan Kota",
                              "Jalur Hijau",
                              "RTH Private",
                              "Taman Wisata Alam",
                              "Pemakaman",
                            ].includes(item.kategori)
                          : item.kategori === cat.filterKey;

                      if (isMatch) {
                        acc.count += 1;
                        acc.luas +=
                          parseFloat(
                            item.luas.replace(" Ha", "").replace(",", ".")
                          ) || 0;
                      }
                      return acc;
                    },
                    { count: 0, luas: 0 }
                  );
                }

                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        [cat.id]: !prev[cat.id],
                      }))
                    }
                    className={`
                    relative p-3 rounded-xl border text-left flex flex-col gap-3 transition-all duration-200 group
                    ${
                      filters[cat.id]
                        ? `${cat.activeClass} shadow-sm ring-1 ring-inset ring-black/5`
                        : "border-gray-100 bg-white text-gray-400 hover:bg-gray-50 hover:border-gray-200"
                    }
                  `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <cat.icon
                        className={`text-xl transition-colors ${
                          filters[cat.id] ? cat.iconColor : "text-gray-300"
                        }`}
                      />
                      <div className="flex flex-col items-end">
                        <span
                          className={`w-2.5 h-2.5 rounded-full shadow-sm mb-1 transition-transform duration-300 ${
                            filters[cat.id]
                              ? "scale-100"
                              : "scale-75 opacity-50"
                          } ${cat.color}`}
                        />
                        <span className="text-[10px] font-bold text-gray-400">
                          {stats.count} Lokasi
                        </span>
                      </div>
                    </div>

                    <div className="w-full">
                      <span className="text-xs font-bold font-outfit truncate w-full block">
                        {cat.label}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">
                        Total:{" "}
                        {stats.luas.toLocaleString("id-ID", {
                          maximumFractionDigits: 2,
                        })}{" "}
                        Ha
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kecamatan Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 font-outfit text-sm">
                Filter Wilayah
              </h3>
              {selectedKecamatan && (
                <button
                  onClick={() => setSelectedKecamatan("")}
                  className="text-[10px] text-red-500 hover:text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded-full transition-colors"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={selectedKecamatan}
                onChange={(e) => setSelectedKecamatan(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-outfit text-gray-700 focus:ring-2 focus:ring-primary-dark/20 focus:border-primary-dark outline-none appearance-none cursor-pointer transition-all hover:bg-white"
              >
                <option value="">Semua Kecamatan</option>
                {kecamatanList.map((kec) => (
                  <option key={kec} value={kec}>
                    {kec}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <FaMap className="text-xs" />
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-blue-50/80 p-4 rounded-xl border border-blue-100/50 backdrop-blur-sm">
            <div className="flex gap-3">
              <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-blue-800 font-outfit">
                  Informasi Peta
                </p>
                <p className="text-[11px] text-blue-600/80 leading-relaxed font-outfit">
                  Warna pada tombol filter sesuai dengan warna area/marker di
                  peta. Klik tombol untuk menyembunyikan atau menampilkan
                  kategori.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Map Area */}
      <main className="w-full h-full bg-white relative">
        <MapComponent
          markers={filteredMarkers}
          selectedRth={selectedRth}
          pekanbaruBoundary={pekanbaruBoundary}
          showBoundary={filters.boundary}
        />

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden absolute bottom-6 right-6 bg-primary-dark text-white p-4 rounded-full shadow-lg z-[30] hover:scale-105 active:scale-95 transition-all duration-200 group"
          aria-label="Filter Peta"
        >
          <FaFilter className="text-xl group-hover:rotate-12 transition-transform" />
        </button>
      </main>
    </div>
  );
};

export default Peta;
