import { DEFAULT_YACHT_ID, findYacht } from "./yachts";

const KEY = "vhf-panic-state";
const PROFILE = 3;

export type Screen =
  | "welcome"
  | "home"
  | "emergency"
  | "disaster"
  | "coordinates"
  | "gps"
  | "map"
  | "time"
  | "marine"
  | "vessel"
  | "position"
  | "boat"
  | "cancel"
  | "relay"
  | "message"
  | "last"
  | "manual"
  | "knowledge"
  | "knowledge-category"
  | "knowledge-article";

export interface AppState {
  profile: number;
  seenWelcome: boolean;
  boatName: string;
  boatModel: string;
  draught: string;
  lengthFt: string;
  lengthM: string;
  width: string;
  crew: string;
  shortGps: string;
  longGps: string;
  gpsLat: number | null;
  gpsLon: number | null;
  sensorGps: "OK" | "Failed" | "Pending";
  event: "Emergency" | "Routine" | "";
  step: string;
  typeOf: string;
  howMuchTime: string;
  marina: string;
  marinaAssistance: string;
  callingName: string;
  myPosition: string;
  timeOfMessage: string;
  timeFormat: string;
  dateOfDistress: string;
  monthOfDistress: string;
  receivedMessage: string;
  lastMessage: string;
}

const anemelia = findYacht(DEFAULT_YACHT_ID)!;

export const DEFAULT_STATE: AppState = {
  profile: PROFILE,
  seenWelcome: false,
  boatName: "Anemelia",
  boatModel: DEFAULT_YACHT_ID,
  draught: String(anemelia.draughtM),
  lengthFt: String(anemelia.loaFt),
  lengthM: String(anemelia.loaM),
  width: String(anemelia.beamM),
  crew: "6",
  shortGps: "NOT DEFINED",
  longGps: "NOT DEFINED",
  gpsLat: null,
  gpsLon: null,
  sensorGps: "Pending",
  event: "",
  step: "",
  typeOf: "",
  howMuchTime: "",
  marina: "",
  marinaAssistance: "",
  callingName: "",
  myPosition: "NONE",
  timeOfMessage: "NOT DEFINED",
  timeFormat: "Local",
  dateOfDistress: "1",
  monthOfDistress: "January",
  receivedMessage: "NOT DEFINED",
  lastMessage: "",
};

function isPlaceholderName(name: string | undefined): boolean {
  return !name || name === "'boatname'" || name === "boatname" || name === "BigHope";
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as Partial<AppState> & { length?: string };
    const merged: AppState = { ...DEFAULT_STATE, ...parsed };
    if (!merged.lengthFt && parsed.length) merged.lengthFt = parsed.length;
    if (parsed.profile !== PROFILE && isPlaceholderName(parsed.boatName)) {
      return {
        ...DEFAULT_STATE,
        seenWelcome: Boolean(parsed.seenWelcome),
        lastMessage: parsed.lastMessage || "",
      };
    }
    if (!merged.boatModel) merged.boatModel = DEFAULT_YACHT_ID;
    if (typeof merged.gpsLat !== "number") merged.gpsLat = null;
    if (typeof merged.gpsLon !== "number") merged.gpsLon = null;
    if (!merged.lengthM && merged.lengthFt) {
      const n = Number(merged.lengthFt);
      if (Number.isFinite(n)) merged.lengthM = String(Math.round(n * 0.3048 * 100) / 100);
    }
    return merged;
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function patchState(state: AppState, patch: Partial<AppState>): AppState {
  const next = { ...state, ...patch, profile: PROFILE };
  saveState(next);
  return next;
}
