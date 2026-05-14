import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fixed default Leaflet marker icons in Vite/React
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

//destination marker notes with x and y coordinates
const locations: Record<string, any> = {
    Accra: {
        position: [5.6037, -0.1870],
        note: "Arrival, culture, rooftop dining, nightlife, departure",
    },
    Aburi: {
        position: [5.8480, -0.1745],
        note: "Mountain escape, gardens, and cocoa farm",
    },
    "Boti Falls": {
        position: [6.1667, -0.2167],
        note: "Twin waterfalls and forest scenery",
    },
    "Shai Hills": {
        position: [5.9094, 0.0606],
        note: "Safari reserve and wildlife experience",
    },
    "Ada Foah": {
        position: [5.7833, 0.6333],
        note: "Volta River, islands, and waterfront leisure",
    },
    "Cape Coast": {
        position: [5.1053, -1.2466],
        note: "Historic castles and coastal stay",
    },
    Elmina: {
        position: [5.0847, -1.3509],
        note: "Oceanfront heritage and castle history",
    },
    "Kakum National Park": {
        position: [5.3500, -1.3833],
        note: "Rainforest canopy walk",
    },
    Busua: {
        position: [4.8060, -1.9340],
        note: "Western coast beach escape",
    },
    Nzulezu: {
        position: [5.0200, -2.5900],
        note: "Stilt village by canoe",
    },
    "Volta Region": {
        position: [6.6000, 0.4500],
        note: "Mountains, waterfalls, and Lake Volta views",
    },
    "Wli Waterfalls": {
        position: [7.1480, 0.4736],
        note: "Tallest waterfall in Ghana",
    },
    "Mount Afadjato": {
        position: [7.0600, 0.5760],
        note: "Scenic mountain hike",
    },
    Kumasi: {
        position: [6.6885, -1.6244],
        note: "Ashanti culture and royal heritage",
    },
    Tamale: {
        position: [9.4075, -0.8533],
        note: "Northern Ghana travel connection",
    },
    "Mole National Park": {
        position: [9.7000, -1.8400],
        note: "Safari, elephants, and Savannah lodge",
    },
};

//creating a "matches" string array to hold all the location strings triggered with search strings
function getLocations(dayTitle: string) {
    const title = dayTitle.toLowerCase();
    const matches: string[] = [];

    if (
        title.includes("arrival") ||
        title.includes("Accra") ||
        title.includes("departure") ||
        title.includes("rooftop") ||
        title.includes("cultural Accra") ||
        title.includes("beach") ||
        title.includes("nightlife") ||
        title.includes("fine dining")
    ) {
        matches.push("Accra");
    }

    if (title.includes("aburi")) {
        matches.push("Aburi");
    }


    if (title.includes("boti")){
        matches.push("Boti Falls");
    }

    if (title.includes("shai")) {
        matches.push("Shai Hills", "Accra");
    }

    if (title.includes("ada") || title.includes("island")) {
        matches.push("Ada Foah");
    }

    if (title.includes("cape")) {
        matches.push("Cape Coast");
    }

    if (title.includes("elmina")) {
        matches.push("Elmina");
    }

    if (title.includes("kakum")) {
        matches.push("Kakum National Park");
    }

    if (title.includes("busua")) {
        matches.push("Busua");
    }

    if (title.includes("nzulezu")) {
        matches.push("Nzulezu");
    }

    if (title.includes("volta")) {
        matches.push("Volta Region");
    }

    if (title.includes("wli")) {
        matches.push("Wli Waterfalls");
    }

    if (title.includes("afadjato")) {
        matches.push("Mount Afadjato");
    }

    if (title.includes("kumasi") || title.includes("ashanti")) {
        matches.push("Kumasi");
    }

    if (title.includes("tamale")) {
        matches.push("Tamale");
    }

    if (title.includes("mole")||title.includes("safari experience")) {
        matches.push("Mole National Park");
    }

    return matches.length
        ? [...new Set(matches)]
        : ["Accra"];
}

//creating interactive Leaflet Map
export default function GhanaLeafletMap({ day }: any) {
    const activeLocationNames = getLocations(day.title);

    const activeLocations = activeLocationNames
        .map((name) => {
            const location = locations[name];

            if (!location) {
                console.warn(`Missing map location for: ${name}`);
                return null;
            }

            return {
                name,
                ...location,
            };
        })
        .filter(Boolean);

    const routePositions = activeLocations.map((location) => location.position);

    return (

        <div className="
            bg-gradient-to-br
            from-black/80
            via-emerald-950/80
            to-amber-950/60
            border border-amber-400/20
            rounded-[24px] md:rounded-[32px]
            overflow-hidden
            shadow-2xl
            backdrop-blur-xl
            p-4 sm:p-6
        ">
            <div className="mb-4">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                    Interactive Ghana Map
                </p>

                <h3 className="text-xl sm:text-2xl font-black text-amber-100 mt-2">
                    Day {day.day}: {day.title}
                </h3>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
                <MapContainer
                    center={[7.9465, -1.0232]}
                    zoom={6}
                    scrollWheelZoom={false}
                    // className="h-[520px] w-full z-0"
                    className="h-[320px] sm:h-[420px] lg:h-[520px] w-full z-0"
                >

                    {/* SATELLITE BASE MAP */}
                    <TileLayer
                        attribution='Tiles &copy; Esri'
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    />

                    {/* CITY / PLACE LABELS OVERLAY */}
                    <TileLayer
                        attribution='Labels &copy; Esri'
                        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                    />

                    {/* TRANSPORT / ROADS / REGIONAL CONTEXT OVERLAY */}
                    <TileLayer
                        attribution='Reference &copy; Esri'
                        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                        opacity={0.75}
                    />

                    {activeLocations.length > 1 && (
                        <Polyline
                            positions={routePositions}
                            pathOptions={{
                                color: "#facc15",
                                weight: 4,
                                opacity: 0.85,
                                dashArray: "8 10",
                            }}
                        />
                    )}

                    {activeLocations.map((location) => (
                        <Marker
                            key={location.name}
                            position={location.position}
                            icon={markerIcon}
                        >
                            <Popup>
                                <strong>{location.name}</strong>
                                <br />
                                {location.note}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            <p className="text-center text-xs text-amber-100/70 mt-4">
                Click each marker to explore destinations synced with the selected itinerary day.
            </p>
        </div>
    );
}