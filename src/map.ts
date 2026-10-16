import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_LAT = 37.0;
const DEFAULT_LON = 25.0;

let map: L.Map | null = null;
let marker: L.Marker | null = null;

const pin = L.divIcon({
  className: "yacht-marker",
  html: `<span class="yacht-marker-pin"></span>`,
  iconSize: [28, 36],
  iconAnchor: [14, 34],
});

export function mountMapPicker(
  el: HTMLElement,
  opts: {
    lat?: number | null;
    lon?: number | null;
    onPick: (lat: number, lon: number) => void;
  },
): () => void {
  map?.remove();
  map = null;
  marker = null;

  const hasFix = opts.lat != null && opts.lon != null;
  const startLat = hasFix ? opts.lat! : DEFAULT_LAT;
  const startLon = hasFix ? opts.lon! : DEFAULT_LON;

  map = L.map(el, { zoomControl: true, attributionControl: true }).setView(
    [startLat, startLon],
    hasFix ? 12 : 6,
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  const place = (lat: number, lon: number, report: boolean): void => {
    if (marker) marker.setLatLng([lat, lon]);
    else {
      marker = L.marker([lat, lon], { icon: pin, draggable: true }).addTo(map!);
      marker.on("dragend", () => {
        const pos = marker?.getLatLng();
        if (pos) opts.onPick(pos.lat, pos.lng);
      });
    }
    if (report) opts.onPick(lat, lon);
  };

  if (hasFix) place(opts.lat!, opts.lon!, true);

  map.on("click", (event: L.LeafletMouseEvent) => {
    place(event.latlng.lat, event.latlng.lng, true);
  });

  const resize = window.setTimeout(() => map?.invalidateSize(), 80);
  const resize2 = window.setTimeout(() => map?.invalidateSize(), 400);

  return () => {
    window.clearTimeout(resize);
    window.clearTimeout(resize2);
    map?.remove();
    map = null;
    marker = null;
  };
}
