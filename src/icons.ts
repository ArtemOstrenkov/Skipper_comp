export function icon(name: IconName): string {
  return ICONS[name];
}

export type IconName =
  | "siren"
  | "anchor"
  | "ship"
  | "info"
  | "message"
  | "book"
  | "gps"
  | "copy"
  | "home"
  | "back"
  | "radio"
  | "wave"
  | "check"
  | "pin"
  | "speak"
  | "sun"
  | "moon"
  | "sail";

const ICONS: Record<IconName, string> = {
  siren: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a6 6 0 0 1 6 6v4.2l1.4 2.1A1 1 0 0 1 18.6 17H5.4a1 1 0 0 1-.8-1.7L6 13.2V9a6 6 0 0 1 6-6Zm-2 16h4a2 2 0 0 1-4 0Z"/></svg>`,
  anchor: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a2.5 2.5 0 0 1 1 4.8V9h3v2h-3v7.1A8 8 0 0 0 20 12h-2a6 6 0 0 1-5 5.9V11H10V9h3V6.8A2.5 2.5 0 0 1 12 2Zm0 13.1A6 6 0 0 1 7 12H5a8 8 0 0 0 7 7.9V22h2v-2.1A8 8 0 0 0 19 12Z"/></svg>`,
  ship: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 18.2 3 16l9-3 9 3-1 2.2A3 3 0 0 1 17.2 20H6.8A3 3 0 0 1 4 18.2ZM11 4h2l.6 7.2-1.6-.5-1.6.5L11 4Z"/></svg>`,
  info: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 8a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm0-3.5A1.25 1.25 0 1 0 12 10a1.25 1.25 0 0 0 0-2.5Z"/></svg>`,
  message: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5 4h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm2 5v2h10V9H7Z"/></svg>`,
  book: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6 3h11a3 3 0 0 1 3 3v13.5a.5.5 0 0 1-.8.4L16 17H6a2 2 0 0 0-2 2V6a3 3 0 0 1 2-3Z"/></svg>`,
  gps: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a8 8 0 0 1 8 8c0 5.25-8 12-8 12S4 15.25 4 10a8 8 0 0 1 8-8Zm0 5.5A2.5 2.5 0 1 0 12 12a2.5 2.5 0 0 0 0-4.5Z"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 7h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm-4 2H4a2 2 0 0 0-2 2v9a3 3 0 0 0 3 3h9v-2H5a1 1 0 0 1-1-1V9Z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4 3 12h2v8h6v-5h2v5h6v-8h2L12 4Z"/></svg>`,
  back: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.4 5.4 8.8 12l6.6 6.6-1.4 1.4L6 12l8-8 1.4 1.4Z"/></svg>`,
  radio: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 3h2v4h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3h1V3Zm5 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>`,
  wave: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 16c2.4 0 2.4-2 4.8-2s2.4 2 4.8 2 2.4-2 4.8-2 2.4 2 4.6 2v2c-2.4 0-2.4-2-4.6-2s-2.4 2-4.8 2-2.4-2-4.8-2-2.4 2-4.8 2v-2Zm0-6c2.4 0 2.4-2 4.8-2s2.4 2 4.8 2 2.4-2 4.8-2 2.4 2 4.6 2v2c-2.4 0-2.4-2-4.6-2s-2.4 2-4.8 2-2.4-2-4.8-2-2.4 2-4.8 2V10Z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m9.5 16.2-3.7-3.7 1.4-1.4 2.3 2.3 7.3-7.3 1.4 1.4-8.7 8.7Z"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 4.5A2.5 2.5 0 1 0 12 11a2.5 2.5 0 0 0 0-4.5Z"/></svg>`,
  speak: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4 9v6h3.2L12 19V5L7.2 9H4Zm11.5 1.5a3 3 0 0 1 0 3l-1.2-1.2a1.3 1.3 0 0 0 0-.6l1.2-1.2Zm2.2-2.2a6 6 0 0 1 0 8.4l-1.3-1.3a4.2 4.2 0 0 0 0-5.8l1.3-1.3Z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0-5.5a1 1 0 0 1 1 1v1.4a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm0 16.6a1 1 0 0 1 1 1V21a1 1 0 1 1-2 0v-1.4a1 1 0 0 1 1-1ZM3 11h1.4a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Zm16.6 0H21a1 1 0 1 1 0 2h-1.4a1 1 0 1 1 0-2ZM5.05 5.05a1 1 0 0 1 1.42 0l1 1a1 1 0 1 1-1.42 1.42l-1-1a1 1 0 0 1 0-1.42Zm11.48 11.48a1 1 0 0 1 1.42 0l1 1a1 1 0 0 1-1.42 1.42l-1-1a1 1 0 0 1 0-1.42ZM5.05 18.95a1 1 0 0 1 0-1.42l1-1a1 1 0 1 1 1.42 1.42l-1 1a1 1 0 0 1-1.42 0Zm11.48-11.48a1 1 0 0 1 0-1.42l1-1a1 1 0 1 1 1.42 1.42l-1 1a1 1 0 0 1-1.42 0Z"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.2 3.1A8.6 8.6 0 1 0 20.9 15 7.2 7.2 0 0 1 15.2 3.1Z"/></svg>`,
  sail: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.2 19.5 16H12V3.2ZM11 5.6 6 16h5V5.6ZM4.6 18.2 6.4 17h11.2l1.8 1.2c.4.3.2.8-.3.8H4.9c-.5 0-.7-.5-.3-.8Z"/></svg>`,
};
