const FT = 0.3048;

function round(value: number, digits: number): number {
  const p = 10 ** digits;
  return Math.round(value * p) / p;
}

export function ftToM(ft: number): number {
  return round(ft * FT, 2);
}

export function mToFt(m: number): number {
  return round(m / FT, 1);
}

export function parseNum(raw: string): number | null {
  const n = Number(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
