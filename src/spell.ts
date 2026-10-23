const WORDS = [
  "ALPHA",
  "BRAVO",
  "CHARLIE",
  "DELTA",
  "ECHO",
  "FOXTROT",
  "GOLF",
  "HOTEL",
  "INDIA",
  "JULIET",
  "KILO",
  "LIMA",
  "MIKE",
  "NOVEMBER",
  "OSCAR",
  "PAPA",
  "QUEBEC",
  "ROMEO",
  "SIERRA",
  "TANGO",
  "UNIFORM",
  "VICTOR",
  "WHISKEY",
  "X-RAY",
  "YANKEE",
  "ZULU",
  " ",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
const NUMBERS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const SHORT = [
  "° ",
  "' ",
  "'' ",
  "N",
  "S",
  "E ",
  "W ",
  " degree ",
  " minutes ",
  " seconds ",
  "North",
  "South",
  "East ",
  "West ",
];

function spellDigits(num: number, lonDeg: boolean): string {
  if (num > 360) return "MISTAKE";
  const hundreds = Math.floor(num / 100);
  const tens = Math.floor((num - hundreds * 100) / 10);
  const ones = Math.floor(num - hundreds * 100 - tens * 10);
  if (lonDeg) return `${NUMBERS[hundreds]}-${NUMBERS[tens]}-${NUMBERS[ones]}`;
  return `${NUMBERS[tens]}-${NUMBERS[ones]}`;
}

export function spellNumbers(value: string): string {
  if (!value) return "";
  let out = "";
  for (const ch of value) {
    if (ch >= "0" && ch <= "9") out += `-${NUMBERS[Number(ch)]}`;
    else if (ch === "," || ch === ".") out += "-Decimal";
    else if (ch === ":") out += " ";
    else out += ch;
  }
  return out.startsWith("-") ? out.slice(1) : out;
}

export function spellLine(line: string): string {
  let out = "";
  const upper = line.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    const k = CHARS.indexOf(upper.charAt(i));
    out += k === -1 ? " " : ` ${WORDS[k]}`;
  }
  return out.trim();
}

function dmsParts(coordinates: number): { deg: number; min: number; sec: number } {
  const deg = Math.floor(coordinates);
  let sec = Math.floor((coordinates - Math.floor(coordinates)) * 3600);
  const min = Math.floor(sec / 60);
  sec = sec - min * 60;
  return { deg, min, sec };
}

function numberToCoordinates(coordinates: number, spoken: boolean): string {
  const { deg, min, sec } = dmsParts(coordinates);
  const offset = spoken ? 7 : 0;
  return `${deg}${SHORT[0 + offset]}${min}${SHORT[1 + offset]}${sec}${SHORT[2 + offset]}`;
}

function spellNumberToCoordinates(coordinates: number, lon: boolean): string {
  const { deg, min, sec } = dmsParts(coordinates);
  return `${spellDigits(deg, lon)}${SHORT[7]}${spellDigits(min, false)}${SHORT[8]}${spellDigits(sec, false)}${SHORT[9]}`;
}

export function locationToCoordinates(lat: number, lon: number, spoken: boolean): string {
  let result: string;
  if (!spoken) {
    result =
      lat >= 0
        ? numberToCoordinates(lat, false) + SHORT[3] + ","
        : numberToCoordinates(-lat, false) + SHORT[4] + ",";
    result +=
      lon >= 0
        ? " " + numberToCoordinates(lon, false) + SHORT[5]
        : " " + numberToCoordinates(-lon, false) + SHORT[6];
    return result;
  }

  result =
    lat >= 0
      ? spellNumberToCoordinates(lat, false) + SHORT[10] + ","
      : spellNumberToCoordinates(-lat, false) + SHORT[11] + ",";
  result +=
    lon >= 0
      ? " " + spellNumberToCoordinates(lon, true) + SHORT[12]
      : " " + spellNumberToCoordinates(-lon, true) + SHORT[13];
  return result;
}

export interface DmsInput {
  latD: string;
  latM: string;
  latS: string;
  latHem: "North" | "South";
  lonD: string;
  lonM: string;
  lonS: string;
  lonHem: "East" | "West";
}

export function formatManualCoordinates(input: DmsInput): string {
  return `${input.latD}˚ ${input.latM}' ${input.latS}'' ${input.latHem} ${input.lonD}˚ ${input.lonM}' ${input.lonS}' ${input.lonHem}`;
}

function pad(value: number, size: number): string {
  return String(Math.max(0, Math.floor(value))).padStart(size, "0");
}

export function decimalToDms(lat: number, lon: number): DmsInput {
  const latP = dmsParts(Math.abs(lat));
  const lonP = dmsParts(Math.abs(lon));
  return {
    latD: pad(latP.deg, 2),
    latM: pad(latP.min, 2),
    latS: pad(latP.sec, 2),
    latHem: lat >= 0 ? "North" : "South",
    lonD: pad(lonP.deg, 3),
    lonM: pad(lonP.min, 2),
    lonS: pad(lonP.sec, 2),
    lonHem: lon >= 0 ? "East" : "West",
  };
}

export function dmsToDecimal(input: DmsInput): { lat: number; lon: number } | null {
  const latD = Number(input.latD);
  const latM = Number(input.latM || "0");
  const latS = Number(input.latS || "0");
  const lonD = Number(input.lonD);
  const lonM = Number(input.lonM || "0");
  const lonS = Number(input.lonS || "0");
  if (![latD, latM, latS, lonD, lonM, lonS].every(Number.isFinite)) return null;
  if (latD > 90 || lonD > 180 || latM >= 60 || lonM >= 60 || latS >= 60 || lonS >= 60) {
    return null;
  }
  const latAbs = latD + latM / 60 + latS / 3600;
  const lonAbs = lonD + lonM / 60 + lonS / 3600;
  if (latAbs > 90 || lonAbs > 180) return null;
  return {
    lat: input.latHem === "South" ? -latAbs : latAbs,
    lon: input.lonHem === "West" ? -lonAbs : lonAbs,
  };
}

export const PHONETIC_ROWS: Array<[string, string]> = [
  ["A", "ALPHA"],
  ["B", "BRAVO"],
  ["C", "CHARLIE"],
  ["D", "DELTA"],
  ["E", "ECHO"],
  ["F", "FOXTROT"],
  ["G", "GOLF"],
  ["H", "HOTEL"],
  ["I", "INDIA"],
  ["J", "JULIET"],
  ["K", "KILO"],
  ["L", "LIMA"],
  ["M", "MIKE"],
  ["N", "NOVEMBER"],
  ["O", "OSCAR"],
  ["P", "PAPA"],
  ["Q", "QUEBEC"],
  ["R", "ROMEO"],
  ["S", "SIERRA"],
  ["T", "TANGO"],
  ["U", "UNIFORM"],
  ["V", "VICTOR"],
  ["W", "WHISKEY"],
  ["X", "X-RAY"],
  ["Y", "YANKEE"],
  ["Z", "ZULU"],
];
