import { t, type Lang } from "./i18n";
import type { AppState } from "./state";
import { spellLine } from "./spell";

export interface MessageBlock {
  hint?: string;
  lines: string[];
}

export function composeMessage(state: AppState, lang: Lang): MessageBlock {
  const calling = (state.callingName || "").toUpperCase();
  const marina = (state.marina || "").toUpperCase();
  const boat = (state.boatName || "").toUpperCase();
  const spelled = spellLine(boat);
  const position = (state.myPosition || "NONE").toUpperCase();
  const assistance = state.marinaAssistance ? ["We need assistance"] : [];

  if (state.event === "Routine") {
    switch (state.step) {
      case "CALLVESSEL":
        if (position === "NONE") {
          return {
            hint: t(lang, "hint06"),
            lines: [
              `${calling}, ${calling}, ${calling}`,
              `This is ${boat}, ${boat}, ${boat} (${spelled})`,
              "Switch to VHF channel ZERO-SIX",
              "Over",
            ],
          };
        }
        return {
          hint: t(lang, "hint06"),
          lines: [
            `${calling}, ${calling}, ${calling}`,
            `This is sailing yacht ${boat} on your ${position}`,
            "Switch to VHF channel ZERO-SIX",
            "Over",
          ],
        };
      case "rbYOUGiveaWay":
        return {
          hint: t(lang, "hint06"),
          lines: [
            `${calling}, ${calling}, ${calling}`,
            `This is sailing yacht ${boat} on your ${position}`,
            "I will pass you on your stern",
            "I am giving you way",
            "Over",
          ],
        };
      case "rbASKtheWAY":
        return {
          hint: t(lang, "hint06"),
          lines: [
            `${calling}, ${calling}, ${calling}`,
            `This is sailing yacht ${boat} on your ${position}`,
            "I am sailing now",
            "I am asking you to let me pass on your bow",
            "Over",
          ],
        };
      case "rbClarifyIntention":
        return {
          hint: t(lang, "hint06"),
          lines: [
            `${calling}, ${calling}, ${calling}`,
            `This is sailing yacht ${boat} on your ${position}`,
            "I am sailing now",
            "You are on the collision course, what is your intention, please",
            "Over",
          ],
        };
      case "PLACETOSTAY":
        return {
          hint: t(lang, "hintMarina"),
          lines: [
            `MARINA ${marina}, MARINA ${marina}, MARINA ${marina}`,
            `This is sailing yacht ${boat}, ${boat}, ${boat}`,
            "Need a place to stay",
            ...assistance,
            "Over",
          ],
        };
      case "HOMEMARINE":
        return {
          hint: t(lang, "hintMarina"),
          lines: [
            `MARINA ${marina}, MARINA ${marina}, MARINA ${marina}`,
            `This is sailing yacht ${boat}, ${boat}, ${boat}`,
            "We are coming home",
            ...assistance,
            "Over",
          ],
        };
      case "CUSTOMS":
        return {
          hint: t(lang, "hintMarina"),
          lines: [
            `${marina}, ${marina}, ${marina}`,
            `This is sailing yacht ${boat}, ${boat}, ${boat} (${spelled})`,
            "I am asking a place at the customs pier to pass border formalities",
            ...assistance,
            "Over",
          ],
        };
      default:
        return { lines: [t(lang, "noMessage")] };
    }
  }

  if (state.event === "Emergency") {
    switch (state.step) {
      case "MAYDAY":
        return {
          lines: [
            "MAYDAY, MAYDAY, MAYDAY",
            "ALL SHIPS, ALL SHIPS, ALL SHIPS",
            `This is ${boat}, ${boat}, ${boat} (${spelled})`,
            `The nature of distress is ${(state.typeOf || "").toUpperCase()}`,
            `Position: ${(state.longGps || "").toUpperCase()}`,
            `${state.howMuchTime}. There are ${state.crew} people on board.`,
            "OVER",
            (state.shortGps || "").toUpperCase(),
          ],
        };
      case "PANPAN":
        return {
          lines: [
            "PANPAN, PANPAN, PANPAN",
            "ALL SHIPS, ALL SHIPS, ALL SHIPS",
            `This is ${boat}, ${boat}, ${boat} (${spelled})`,
            `The nature of distress is ${(state.typeOf || "").toUpperCase()}`,
            `Position: ${(state.longGps || "").toUpperCase()}`,
            `${state.howMuchTime}. There are ${state.crew} people on board.`,
            "OVER",
          ],
        };
      case "MAYDAY RELAY":
        return {
          lines: [
            "MAYDAY RELAY, MAYDAY RELAY, MAYDAY RELAY",
            "ALL SHIPS, ALL SHIPS, ALL SHIPS",
            `This is sailing yacht ${boat}, ${boat}, ${boat}`,
            `RECEIVED MAYDAY at ${(state.timeOfMessage || "").toUpperCase()}`,
            "---------------------",
            state.receivedMessage || "",
            "---------------------",
            "OVER",
          ],
        };
      case "CANCELDISTRESS":
        return {
          lines: [
            "ALL STATIONS, ALL STATIONS, ALL STATIONS",
            `This is sailing yacht ${boat}, ${boat}, ${boat}`,
            `Position: ${(state.longGps || "").toUpperCase()}`,
            `CANCEL MY DISTRESS ALERT OF ${state.dateOfDistress} ${state.monthOfDistress} at ${state.timeOfMessage}`,
            "OVER",
          ],
        };
      default:
        return { lines: [t(lang, "noMessage")] };
    }
  }

  return { lines: [t(lang, "noMessage")] };
}

export function messageToText(block: MessageBlock): string {
  return [block.hint, ...block.lines].filter(Boolean).join("\n");
}

export function boatSummary(state: AppState, lang: Lang): string {
  return t(lang, "boatSummary", {
    name: state.boatName,
    loaFt: state.lengthFt,
    loaM: state.lengthM,
    draught: state.draught,
    beam: state.width,
    gps: state.shortGps,
  });
}
