import { dmsToDecimal, locationToCoordinates, type DmsInput } from "./spell";

export interface GpsFix {
  ok: boolean;
  shortGps: string;
  longGps: string;
  latitude?: number;
  longitude?: number;
  error?: string;
}

function readPosition(position: GeolocationPosition): GpsFix {
  const { latitude, longitude } = position.coords;
  return {
    ok: true,
    latitude,
    longitude,
    shortGps: locationToCoordinates(latitude, longitude, false),
    longGps: locationToCoordinates(latitude, longitude, true),
  };
}

export function fixFromLatLon(lat: number, lon: number): GpsFix {
  return {
    ok: true,
    latitude: lat,
    longitude: lon,
    shortGps: locationToCoordinates(lat, lon, false),
    longGps: locationToCoordinates(lat, lon, true),
  };
}

export function fixFromDms(input: DmsInput): GpsFix | null {
  const dec = dmsToDecimal(input);
  if (!dec) return null;
  return fixFromLatLon(dec.lat, dec.lon);
}

export function requestGps(): Promise<GpsFix> {
  if (!navigator.geolocation) {
    return Promise.resolve({
      ok: false,
      shortGps: "Failed",
      longGps: "Failed",
      error: "Geolocation is not supported",
    });
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(readPosition(pos)),
      (err) =>
        resolve({
          ok: false,
          shortGps: "Failed",
          longGps: "Failed",
          error: err.message || "GPS failed",
        }),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30_000 },
    );
  });
}
