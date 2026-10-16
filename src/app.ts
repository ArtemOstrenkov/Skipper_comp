import { fixFromDms, fixFromLatLon, requestGps, type GpsFix } from "./gps";
import { icon, type IconName } from "./icons";
import {
  LANGS,
  LANG_META,
  MONTHS,
  MONTHS_RADIO,
  PRIMARY_LANGS,
  comicSrc,
  detectLang,
  htmlLang,
  isLang,
  persistLang,
  t,
  type Lang,
} from "./i18n";
import { mountMapPicker } from "./map";
import { boatSummary, composeMessage, messageToText } from "./messages";
import {
  decimalToDms,
  formatManualCoordinates,
  PHONETIC_ROWS,
  spellNumbers,
  type DmsInput,
} from "./spell";
import {
  type AppState,
  type Screen,
  loadState,
  patchState,
} from "./state";
import { canSpeak, stopSpeak, toggleSpeak } from "./speak";
import { fetchStats, noteProcess, noteVisit, statsBody, statsPanel } from "./stats";
import { applyTheme, detectTheme, persistTheme, type Theme } from "./theme";
import { ftToM, mToFt, parseNum } from "./units";
import { DEFAULT_YACHT_ID, YACHTS, findYacht, yachtBuilders } from "./yachts";
import { getCategoriesWithCounts, getArticlesByCategory, getArticleById } from "./knowledge";
import type { KnowledgeCategory } from "./knowledge-types";
import { renderCategoryCard, renderArticleCard, renderArticleContent } from "./knowledge-render";

const DISASTERS = [
  { key: "disasterMob", value: "MAN OVERBOARD" },
  { key: "disasterFire", value: "FIRE" },
  { key: "disasterSinking", value: "Sinking" },
  { key: "disasterCollision", value: "Collision" },
  { key: "disasterDrift", value: "Disabled and drift" },
  { key: "disasterMed", value: "Medical consulting" },
  { key: "disasterEvac", value: "Medical evacuation" },
  { key: "disasterEpirb", value: "LAUNCH THE EPIRB" },
  { key: "disasterGround", value: "Grounding" },
  { key: "disasterFlood", value: "Flooding" },
  { key: "disasterAbandon", value: "ABANDONING THE BOAT" },
] as const;

const TIMES = [
  { key: "timeLeave", value: "WE ARE LEAVING BOAT" },
  { key: "time30", value: "WE HAVE ABOUT THREE ZERO MINUTES" },
  { key: "time1h", value: "WE HAVE ABOUT ONE HOUR" },
  { key: "time2h", value: "WE HAVE ABOUT TWO HOUR" },
  { key: "time3h", value: "WE HAVE ABOUT THREE HOURS" },
  { key: "time4h", value: "WE HAVE ABOUT FOUR HOURS" },
  { key: "time10h", value: "WE HAVE ABOUT ONE ZERO HOURS" },
] as const;

const POSITIONS = [
  { key: "posBow", value: "BOW" },
  { key: "posPort", value: "PORT" },
  { key: "posStarboard", value: "STARBOARD" },
  { key: "posStern", value: "STERN" },
] as const;

const TIME_FORMATS = ["Local", "UTC", "GMT"];
const CREW = Array.from({ length: 15 }, (_, i) => String(i + 1));

const VESSEL_TYPES = [
  { id: "name", value: "", key: "vesselName" },
  { id: "sailing", value: "Sailing Yacht", key: "sailingYacht" },
  { id: "motor", value: "MOTORYACHT", key: "motorYacht" },
  { id: "cargo", value: "CARGO SHIP", key: "cargoShip" },
  { id: "passengers", value: "PASSENGERS SHIP", key: "passengersShip" },
] as const;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function nowTime(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function labeledButton(kind: string, label: string, iconName: IconName, extra = ""): string {
  return `<button type="button" class="btn ${extra}" data-act="${kind}">${icon(iconName)}<span>${esc(label)}</span></button>`;
}

export function mountApp(root: HTMLElement): void {
  let state = loadState();
  let lang: Lang = detectLang();
  let langMenuOpen = false;
  let theme: Theme = detectTheme();
  applyTheme(theme);
  noteVisit();
  let screen: Screen = state.seenWelcome ? "home" : "welcome";
  const stack: Screen[] = [];
  let toastTimer = 0;
  let copyBuffer = "";
  let speakBuffer = "";
  let marinePurpose = "";
  let marineStep = 1;
  let vesselPurpose = "";
  let vesselStep = 1;
  let vesselKind = "";
  let vesselNameDraft = "";
  let relativePosition = "";
  let seriesQuery = "";
  let latHem: "North" | "South" = "North";
  let lonHem: "East" | "West" = "East";
  let gpsFrom: "home" | "distress" = "home";
  let gpsAutoNote: "none" | "trying" | "ok" | "fail" = "none";
  let mapPick: { lat: number; lon: number } | null = null;
  let unmountMap: (() => void) | null = null;
  let currentCategory: KnowledgeCategory | null = null;
  let currentArticleId: string | null = null;

  function tr(key: string, vars?: Record<string, string>): string {
    return t(lang, key, vars);
  }

  function toast(text: string): void {
    let node = document.querySelector(".toast");
    if (!node) {
      node = document.createElement("div");
      node.className = "toast";
      document.body.appendChild(node);
    }
    node.textContent = text;
    node.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node?.classList.remove("show"), 2800);
  }

  type NavSnap = {
    v: 1;
    index: number;
    screen: Screen;
    stack: Screen[];
    marineStep: number;
    vesselStep: number;
    marinePurpose: string;
    vesselPurpose: string;
    vesselKind: string;
    vesselNameDraft: string;
    relativePosition: string;
    currentCategory: KnowledgeCategory | null;
    currentArticleId: string | null;
    gpsFrom: "home" | "distress";
  };

  let pendingHome = false;

  function isSnap(value: unknown): value is NavSnap {
    if (!value || typeof value !== "object") return false;
    const snap = value as NavSnap;
    return snap.v === 1 && typeof snap.index === "number" && typeof snap.screen === "string";
  }

  function capture(index: number): NavSnap {
    return {
      v: 1,
      index,
      screen,
      stack: [...stack],
      marineStep,
      vesselStep,
      marinePurpose,
      vesselPurpose,
      vesselKind,
      vesselNameDraft,
      relativePosition,
      currentCategory,
      currentArticleId,
      gpsFrom,
    };
  }

  function restore(snap: NavSnap): void {
    screen = snap.screen;
    stack.length = 0;
    stack.push(...(snap.stack || []));
    marineStep = snap.marineStep || 1;
    vesselStep = snap.vesselStep || 1;
    marinePurpose = snap.marinePurpose || "";
    vesselPurpose = snap.vesselPurpose || "";
    vesselKind = snap.vesselKind || "";
    vesselNameDraft = snap.vesselNameDraft || "";
    relativePosition = snap.relativePosition || "";
    currentCategory = snap.currentCategory;
    currentArticleId = snap.currentArticleId;
    gpsFrom = snap.gpsFrom === "distress" ? "distress" : "home";
  }

  function navIndex(): number {
    return isSnap(history.state) ? history.state.index : 0;
  }

  function historyUrl(index: number): string {
    const base = `${location.pathname}${location.search}`;
    return index > 0 ? `${base}#s${index}` : base;
  }

  function replaceHistory(): void {
    const index = navIndex();
    history.replaceState(capture(index), "", historyUrl(index));
  }

  function pushHistory(): void {
    const index = navIndex() + 1;
    history.pushState(capture(index), "", historyUrl(index));
  }

  function resetToHome(): void {
    stack.length = 0;
    screen = "home";
    marineStep = 1;
    vesselStep = 1;
  }

  function go(next: Screen): void {
    langMenuOpen = false;
    replaceHistory();
    stack.push(screen);
    screen = next;
    pushHistory();
    render();
  }

  function advanceWizard(apply: () => void): void {
    langMenuOpen = false;
    replaceHistory();
    apply();
    pushHistory();
    render();
  }

  function back(): void {
    langMenuOpen = false;
    if (navIndex() > 0) {
      history.back();
      return;
    }
    unmountMap?.();
    unmountMap = null;
    screen = stack.pop() || "home";
    render();
  }

  function home(): void {
    langMenuOpen = false;
    const index = navIndex();
    if (index > 0) {
      pendingHome = true;
      history.go(-index);
      return;
    }
    resetToHome();
    replaceHistory();
    render();
  }

  function onPopState(event: PopStateEvent): void {
    langMenuOpen = false;
    if (pendingHome) {
      pendingHome = false;
      resetToHome();
      history.replaceState(capture(0), "", historyUrl(0));
      render();
      return;
    }
    if (!isSnap(event.state)) return;
    restore(event.state);
    render();
  }

  function setLang(next: Lang): void {
    lang = next;
    langMenuOpen = false;
    persistLang(lang);
    document.documentElement.lang = htmlLang(lang);
    render();
  }

  function setTheme(next: Theme): void {
    theme = next;
    persistTheme(theme);
    render();
  }

  function applyGps(fix: GpsFix, silent = false): void {
    if (fix.ok) {
      state = patchState(state, {
        sensorGps: "OK",
        shortGps: fix.shortGps,
        longGps: fix.longGps,
        gpsLat: fix.latitude ?? state.gpsLat,
        gpsLon: fix.longitude ?? state.gpsLon,
      });
    } else if (state.sensorGps !== "OK") {
      state = patchState(state, { sensorGps: "Failed" });
    }
    if (!silent) toast(tr("gpsToast", { value: fix.ok ? fix.shortGps : tr("gpsFailed") }));
  }

  function hasFix(): boolean {
    return state.sensorGps === "OK" && Boolean(state.shortGps) && state.shortGps !== "NOT DEFINED";
  }

  async function refreshGps(silent = false): Promise<boolean> {
    const fix = await requestGps();
    applyGps(fix, silent);
    if (screen === "home" || screen === "gps" || !silent) render();
    return fix.ok;
  }

  async function openGps(from: "home" | "distress"): Promise<void> {
    gpsFrom = from;
    gpsAutoNote = "trying";
    go("gps");
    const fix = await requestGps();
    gpsAutoNote = fix.ok ? "ok" : "fail";
    applyGps(fix, true);
    if (screen === "gps") render();
  }

  function afterDisaster(): void {
    if (hasFix()) go("time");
    else void openGps("distress");
  }

  function openComposed(): void {
    const block = composeMessage(state, lang);
    state = patchState(state, { lastMessage: block.lines.join("\n") });
    noteProcess();
    go("message");
  }

  function langSwitch(): string {
    const extra = !PRIMARY_LANGS.includes(lang);
    const moreLabel = extra ? LANG_META[lang].code : "⋯";
    const menu = langMenuOpen
      ? `<div class="lang-menu" role="listbox">
          ${LANGS.map((code) => {
            const meta = LANG_META[code];
            return `<button type="button" class="lang-menu-item ${
              lang === code ? "is-active" : ""
            }" data-lang="${code}" role="option" aria-selected="${lang === code}">
              <span class="lang-menu-code">${esc(meta.code)}</span>
              <span>${esc(meta.name)}</span>
            </button>`;
          }).join("")}
        </div>`
      : "";
    return `
      <div class="lang-switch">
        ${PRIMARY_LANGS.map(
          (code) =>
            `<button type="button" class="lang-btn ${
              lang === code ? "is-active" : ""
            }" data-lang="${code}">${esc(LANG_META[code].code)}</button>`,
        ).join("")}
        <div class="lang-more">
          <button type="button" class="lang-btn lang-more-btn ${
            extra ? "is-active" : ""
          } ${langMenuOpen ? "is-open" : ""}" data-act="lang-more" aria-haspopup="listbox" aria-expanded="${
            langMenuOpen ? "true" : "false"
          }" aria-label="${esc(tr("moreLanguages"))}">${esc(moreLabel)}</button>
          ${menu}
        </div>
      </div>
    `;
  }

  function themeToggle(): string {
    const next = theme === "dark" ? "light" : "dark";
    return `<button type="button" class="icon-btn" data-act="theme" aria-label="${esc(
      tr(next === "light" ? "themeLight" : "themeDark"),
    )}">${icon(theme === "dark" ? "sun" : "moon")}</button>`;
  }

  function shell(opts: {
    title: string;
    body: string;
    footer?: string;
    onBack?: boolean;
    dock?: boolean;
  }): string {
    const showBack =
      opts.onBack === true ||
      (opts.onBack !== false && screen !== "home" && screen !== "welcome");
    const branded = !showBack;
    return `
      <div class="page${screen === "home" ? " is-home" : ""}${screen === "welcome" ? " is-welcome" : ""}">
        <header class="top${branded ? " is-brand" : ""}">
          ${
            showBack
              ? `<button type="button" class="icon-btn" data-act="back" aria-label="${esc(tr("back"))}">${icon("back")}</button>`
              : ""
          }
          <h1>${
            branded
              ? `<img class="brand-mark" src="/icons/icon-192.png" width="28" height="28" alt="" />`
              : ""
          }<span>${esc(opts.title)}</span></h1>
          <div class="top-tools">
            ${themeToggle()}
            ${langSwitch()}
          </div>
        </header>
        <main class="body">${opts.body}</main>
        ${
          opts.footer
            ? `<footer class="foot${opts.dock ? " dock" : ""}">${opts.footer}</footer>`
            : ""
        }
      </div>
    `;
  }

  function radios(
    name: string,
    items: Array<{ label: string; value: string }>,
    current: string,
  ): string {
    return items
      .map(
        (item) => `
        <label class="choice">
          <input type="radio" name="${name}" value="${esc(item.value)}" ${
            current === item.value ? "checked" : ""
          } />
          <span>${esc(item.label)}</span>
        </label>`,
      )
      .join("");
  }

  function continueBtn(): string {
    return labeledButton("next", tr("continue"), "check", "primary");
  }

  function gpsChip(): string {
    if (state.sensorGps === "OK") return `<span class="chip ok">${esc(tr("gpsOk"))}</span>`;
    if (state.sensorGps === "Failed") return `<span class="chip bad">${esc(tr("gpsFailed"))}</span>`;
    return `<span class="chip">${esc(tr("gpsPending"))}</span>`;
  }

  function boatCard(): string {
    const yacht = findYacht(state.boatModel);
    const photo = yacht?.image
      ? `<img class="yacht-photo" src="${esc(yacht.image)}" alt="${esc(yacht.name)}" />`
      : "";
    return `
      <button type="button" class="boat-card glass" data-act="boat">
        ${photo}
        <div class="pad">
          <h2>${esc(state.boatName)}</h2>
          ${yacht ? `<p class="model">${esc(yacht.name)}</p>` : ""}
          <p class="meta">${esc(
            tr("boatCardMeta", {
              loaFt: state.lengthFt,
              loaM: state.lengthM,
              draught: state.draught,
              beam: state.width,
              crew: state.crew,
            }),
          )}</p>
          <div class="status-row">${gpsChip()}</div>
        </div>
      </button>
    `;
  }

  function dockBtn(kind: string, label: string, iconName: IconName): string {
    return `<button type="button" class="dock-btn" data-act="${kind}">${icon(iconName)}<span>${esc(
      label,
    )}</span></button>`;
  }

  function renderWelcome(): string {
    return shell({
      title: tr("appName"),
      onBack: state.seenWelcome,
      body: `
        <img class="comic" src="${esc(comicSrc(lang))}" alt="${esc(tr("comicAlt"))}" />
        <section class="welcome-hero glass">
          <h1>${esc(tr("welcomeTitle"))}</h1>
          <p class="lead">${esc(tr("welcomeLead"))}</p>
          <p class="note">${esc(tr("welcomeHow"))}</p>
          <ol>
            <li>${esc(tr("welcomeStep1"))}</li>
            <li>${esc(tr("welcomeStep2"))}</li>
            <li>${esc(tr("welcomeStep3"))}</li>
          </ol>
          <p class="note">${esc(tr("welcomeNote"))}</p>
        </section>
      `,
      footer: `
        ${labeledButton("start", state.seenWelcome ? tr("home") : tr("start"), "wave", "primary")}
        ${statsPanel(esc(tr("statsTitle")), esc(tr("statsLoading")))}
      `,
    });
  }

  function renderHome(): string {
    return shell({
      title: tr("appName"),
      onBack: false,
      dock: true,
      body: `
        <p class="lead">${esc(tr("tagline"))}</p>
        ${boatCard()}
        ${labeledButton("emergency", tr("emergency"), "siren", "emergency")}
        <div class="split home-grid">
          ${labeledButton("marine", tr("callMarine"), "anchor", "marine")}
          ${labeledButton("vessel", tr("callVessel"), "ship", "marine")}
          ${labeledButton("boat", tr("vesselInfo"), "info")}
          ${labeledButton("last", tr("lastMessage"), "message")}
        </div>
      `,
      footer: `
        ${dockBtn("knowledge", tr("skippersGuide"), "book")}
        ${dockBtn("welcome", tr("about"), "info")}
        ${dockBtn("gps", tr("gpsUpdate"), "gps")}
      `,
    });
  }

  function renderEmergency(): string {
    return shell({
      title: tr("emergency"),
      body: `
        ${labeledButton("mayday", tr("mayday"), "siren", "emergency")}
        ${labeledButton("panpan", tr("panpan"), "wave", "warn")}
        ${labeledButton("relay", tr("receivedMayday"), "radio", "marine")}
        ${labeledButton("cancel", tr("cancelDistress"), "check")}
      `,
    });
  }

  function renderDisaster(): string {
    return shell({
      title: tr("whatGoingOn"),
      body: `<div class="stack">${radios(
        "disaster",
        DISASTERS.map((item) => ({ label: tr(item.key), value: item.value })),
        state.typeOf,
      )}</div>`,
      footer: continueBtn(),
    });
  }

  function renderTime(): string {
    return shell({
      title: tr("howMuchTime"),
      body: `<div class="stack">${radios(
        "time",
        TIMES.map((item) => ({ label: tr(item.key), value: item.value })),
        state.howMuchTime,
      )}</div>`,
      footer: continueBtn(),
    });
  }

  function currentDms(): DmsInput {
    if (state.gpsLat != null && state.gpsLon != null) {
      const dms = decimalToDms(state.gpsLat, state.gpsLon);
      latHem = dms.latHem;
      lonHem = dms.lonHem;
      return dms;
    }
    return {
      latD: "",
      latM: "",
      latS: "",
      latHem,
      lonD: "",
      lonM: "",
      lonS: "",
      lonHem,
    };
  }

  function readDmsForm(): DmsInput {
    latHem =
      root.querySelector<HTMLInputElement>('input[name="latHem"]:checked')?.value === "South"
        ? "South"
        : "North";
    lonHem =
      root.querySelector<HTMLInputElement>('input[name="lonHem"]:checked')?.value === "West"
        ? "West"
        : "East";
    return {
      latD: (root.querySelector("#latD") as HTMLInputElement | null)?.value || "",
      latM: (root.querySelector("#latM") as HTMLInputElement | null)?.value || "",
      latS: (root.querySelector("#latS") as HTMLInputElement | null)?.value || "",
      latHem,
      lonD: (root.querySelector("#lonD") as HTMLInputElement | null)?.value || "",
      lonM: (root.querySelector("#lonM") as HTMLInputElement | null)?.value || "",
      lonS: (root.querySelector("#lonS") as HTMLInputElement | null)?.value || "",
      lonHem,
    };
  }

  function hemPair(
    name: "latHem" | "lonHem",
    a: { value: string; label: string },
    b: { value: string; label: string },
    current: string,
  ): string {
    return `<div class="hem">
      <label class="hem-btn"><input type="radio" name="${name}" value="${a.value}" ${
        current === a.value ? "checked" : ""
      } />${a.label}</label>
      <label class="hem-btn"><input type="radio" name="${name}" value="${b.value}" ${
        current === b.value ? "checked" : ""
      } />${b.label}</label>
    </div>`;
  }

  function renderGps(): string {
    const dms = currentDms();
    const autoNote =
      gpsAutoNote === "trying"
        ? tr("gpsAutoTrying")
        : gpsAutoNote === "ok"
          ? tr("gpsAutoOk")
          : gpsAutoNote === "fail"
            ? tr("gpsAutoFail")
            : "";
    const preview = hasFix() ? state.shortGps : tr("gpsUndefined");
    const saveLabel = gpsFrom === "distress" ? tr("continue") : tr("gpsSave");
    return shell({
      title: tr("gpsTitle"),
      body: `
        <h2 class="gps-fix">${esc(preview)}</h2>
        ${autoNote ? `<p class="note">${esc(autoNote)}</p>` : ""}
        ${labeledButton("gps-auto", tr("gpsAuto"), "gps")}
        ${labeledButton("gps-map", tr("gpsMap"), "pin")}
        <p class="note">${esc(tr("gpsManual"))}</p>
        <div class="dms-stack">
          <div class="dms-row">
            <span class="dms-tag">${esc(tr("latShort"))}</span>
            <input id="latD" class="dms-in" inputmode="numeric" maxlength="2" size="2" value="${esc(dms.latD)}" aria-label="${esc(tr("lat"))} ${esc(tr("deg"))}" />
            <span class="dms-u">°</span>
            <input id="latM" class="dms-in" inputmode="numeric" maxlength="2" size="2" value="${esc(dms.latM)}" aria-label="${esc(tr("lat"))} ${esc(tr("min"))}" />
            <span class="dms-u">′</span>
            <input id="latS" class="dms-in" inputmode="numeric" maxlength="2" size="2" value="${esc(dms.latS)}" aria-label="${esc(tr("lat"))} ${esc(tr("sec"))}" />
            <span class="dms-u">″</span>
            ${hemPair("latHem", { value: "North", label: "N" }, { value: "South", label: "S" }, dms.latHem)}
          </div>
          <div class="dms-row">
            <span class="dms-tag">${esc(tr("lonShort"))}</span>
            <input id="lonD" class="dms-in w3" inputmode="numeric" maxlength="3" size="3" value="${esc(dms.lonD)}" aria-label="${esc(tr("lon"))} ${esc(tr("deg"))}" />
            <span class="dms-u">°</span>
            <input id="lonM" class="dms-in" inputmode="numeric" maxlength="2" size="2" value="${esc(dms.lonM)}" aria-label="${esc(tr("lon"))} ${esc(tr("min"))}" />
            <span class="dms-u">′</span>
            <input id="lonS" class="dms-in" inputmode="numeric" maxlength="2" size="2" value="${esc(dms.lonS)}" aria-label="${esc(tr("lon"))} ${esc(tr("sec"))}" />
            <span class="dms-u">″</span>
            ${hemPair("lonHem", { value: "East", label: "E" }, { value: "West", label: "W" }, dms.lonHem)}
          </div>
        </div>
        <p class="note">${esc(tr("checkVhf"))}</p>
      `,
      footer: labeledButton("next", saveLabel, "check", "primary"),
    });
  }

  function renderMap(): string {
    return shell({
      title: tr("gpsMapTitle"),
      body: `
        <p class="note">${esc(tr("gpsMapHint"))}</p>
        <div class="map-frame" id="osm-map"></div>
        <p class="preview glass" id="map-preview">${esc(
          mapPick ? fixFromLatLon(mapPick.lat, mapPick.lon).shortGps : tr("gpsUndefined"),
        )}</p>
      `,
      footer: labeledButton("map-confirm", tr("gpsMapConfirm"), "check", "primary"),
    });
  }

  function renderMarine(): string {
    const purposes = [
      { label: tr("placeToStay"), value: "PLACETOSTAY" },
      { label: tr("homeMarina"), value: "HOMEMARINE" },
      { label: tr("customs"), value: "CUSTOMS" },
    ];
    if (marineStep === 1) {
      return shell({
        title: tr("choosePurpose"),
        body: `<div class="stack">${radios("marine", purposes, marinePurpose)}</div>`,
        footer: continueBtn(),
      });
    }
    const chosen = purposes.find((item) => item.value === marinePurpose)?.label || "";
    return shell({
      title: tr("choosePurpose"),
      body: `
        <p class="chip">${esc(chosen)}</p>
        <label>${esc(tr("marinaName"))}
          <input id="marina-name" value="${esc(state.marina)}" placeholder="${esc(tr("marinaPlaceholder"))}" />
        </label>
        <label class="choice">
          <input type="checkbox" id="need-assist" ${state.marinaAssistance ? "checked" : ""} />
          <span>${esc(tr("needAssist"))}</span>
        </label>
      `,
      footer: continueBtn(),
    });
  }

  function renderVessel(): string {
    const purposes = [
      { label: tr("vesselCall"), value: "CALLVESSEL" },
      { label: tr("giveWay"), value: "rbYOUGiveaWay" },
      { label: tr("askWay"), value: "rbASKtheWAY" },
      { label: tr("clarify"), value: "rbClarifyIntention" },
    ];
    if (vesselStep === 1) {
      return shell({
        title: tr("indicateSituation"),
        body: `<div class="stack">${radios("vessel-purpose", purposes, vesselPurpose)}</div>`,
        footer: continueBtn(),
      });
    }
    const chosen = purposes.find((item) => item.value === vesselPurpose)?.label || "";
    return shell({
      title: tr("indicateVessel"),
      body: `
        <p class="chip">${esc(chosen)}</p>
        <div class="stack">
          <label class="choice">
            <input type="radio" name="vessel-kind" value="name" ${vesselKind === "name" ? "checked" : ""} />
            <span>
              ${esc(tr("vesselName"))}
              <input id="other-name" placeholder="${esc(tr("vesselNamePh"))}" value="${esc(vesselNameDraft)}" />
            </span>
          </label>
          ${VESSEL_TYPES.filter((item) => item.id !== "name")
            .map(
              (item) => `
            <label class="choice">
              <input type="radio" name="vessel-kind" value="${item.id}" ${
                vesselKind === item.id ? "checked" : ""
              } />
              <span>${esc(tr(item.key))}</span>
            </label>`,
            )
            .join("")}
        </div>
      `,
      footer: continueBtn(),
    });
  }

  function renderPosition(): string {
    return shell({
      title: tr("yourPosition"),
      body: `
        <div class="position-grid">
          <div class="stack">
            ${radios(
              "rel-pos",
              POSITIONS.map((item) => ({ label: tr(item.key), value: item.value })),
              relativePosition,
            )}
          </div>
          <img class="ships" src="/ships.png" alt="${esc(tr("shipsAlt"))}" />
        </div>
      `,
      footer: continueBtn(),
    });
  }

  function yachtOptions(): string {
    const q = seriesQuery.trim().toLowerCase();
    return yachtBuilders()
      .map((builder) => {
        const items = YACHTS.filter(
          (yacht) =>
            yacht.builder === builder &&
            (!q || `${yacht.name} ${yacht.builder}`.toLowerCase().includes(q)),
        );
        if (!items.length) return "";
        return `<optgroup label="${esc(builder)}">${items
          .map(
            (yacht) =>
              `<option value="${esc(yacht.id)}" ${
                state.boatModel === yacht.id ? "selected" : ""
              }>${esc(yacht.name)}</option>`,
          )
          .join("")}</optgroup>`;
      })
      .join("");
  }

  function renderBoat(): string {
    const yacht = findYacht(state.boatModel);
    return shell({
      title: tr("vesselInfo"),
      body: `
        <label>${esc(tr("boatName"))}
          <input id="boat-name" value="${esc(state.boatName)}" />
        </label>
        <p class="note">${esc(tr("seriesHint"))}</p>
        <label>${esc(tr("fillTemplate"))}
          <input id="series-search" placeholder="${esc(tr("seriesSearch"))}" value="${esc(seriesQuery)}" />
        </label>
        <select id="boat-model">${yachtOptions()}</select>
        <div class="row">
          <label>${esc(tr("loaFt"))}
            <input id="boat-loa-ft" inputmode="decimal" value="${esc(state.lengthFt)}" />
          </label>
          <label>${esc(tr("loaM"))}
            <input id="boat-loa-m" inputmode="decimal" value="${esc(state.lengthM)}" />
          </label>
        </div>
        <label>${esc(tr("draught"))}
          <input id="boat-draught" inputmode="decimal" value="${esc(state.draught)}" />
        </label>
        <label>${esc(tr("beam"))}
          <input id="boat-width" inputmode="decimal" value="${esc(state.width)}" />
        </label>
        <label>${esc(tr("crew"))}
          <select id="boat-crew">
            ${CREW.map(
              (n) => `<option value="${n}" ${state.crew === n ? "selected" : ""}>${n}</option>`,
            ).join("")}
          </select>
        </label>
        ${
          yacht
            ? `<figure class="yacht-card glass">
                <img class="yacht-photo" src="${esc(yacht.image)}" alt="${esc(yacht.name)}" />
                <figcaption class="meta">${esc(yacht.name)} · ${esc(yacht.builder)} · ${yacht.loaFt} ft / ${yacht.loaM} m</figcaption>
              </figure>`
            : ""
        }
      `,
      footer: labeledButton("save-boat", tr("save"), "check", "primary"),
    });
  }

  function renderCancel(): string {
    const today = new Date().getDate().toString();
    const monthIndex = new Date().getMonth();
    return shell({
      title: tr("cancelDistress"),
      body: `
        <p class="lead">${esc(tr("cancelIntro"))}</p>
        <label>${esc(tr("timeOfMessage"))}
          <div class="row">
            <input id="cancel-time" value="${nowTime()}" maxlength="5" />
            <select id="cancel-format">
              ${TIME_FORMATS.map((item) => `<option>${item}</option>`).join("")}
            </select>
          </div>
        </label>
        <label>${esc(tr("dateOfMessage"))}
          <div class="row">
            <select id="cancel-date">
              ${Array.from({ length: 31 }, (_, i) => {
                const d = String(i + 1);
                return `<option ${d === today ? "selected" : ""}>${d}</option>`;
              }).join("")}
            </select>
            <select id="cancel-month">
              ${MONTHS_RADIO.map(
                (item, index) =>
                  `<option value="${item}" ${index === monthIndex ? "selected" : ""}>${MONTHS[lang][index]}</option>`,
              ).join("")}
            </select>
          </div>
        </label>
      `,
      footer: continueBtn(),
    });
  }

  function renderRelay(): string {
    return shell({
      title: tr("receivedMayday"),
      body: `
        <label>${esc(tr("timeOfMessage"))}
          <div class="row">
            <input id="relay-time" value="${nowTime()}" maxlength="5" />
            <select id="relay-format">
              ${TIME_FORMATS.map((item) => `<option>${item}</option>`).join("")}
            </select>
          </div>
        </label>
        <label>${esc(tr("receivedMessage"))}
          <textarea id="relay-text" rows="10">MAYDAY

'vessel name and call sign'

POSITION 'coordinates' AT 'time' UTC

'accident description'
</textarea>
        </label>
      `,
      footer: continueBtn(),
    });
  }

  function renderMessage(lastOnly: boolean): string {
    const block = lastOnly
      ? {
          hint: undefined as string | undefined,
          lines: (state.lastMessage || tr("noMessage")).split("\n"),
        }
      : composeMessage(state, lang);
    copyBuffer = messageToText(block);
    speakBuffer = block.lines.filter((line) => line.trim()).join(". ");
    const speakBtn = canSpeak()
      ? labeledButton("speak", tr("speak"), "speak")
      : "";
    return shell({
      title: lastOnly ? tr("messageTitle") : tr("calmLoud"),
      body: `
        <p class="hint">${esc(tr("seaspeakNote"))}</p>
        ${block.hint ? `<p class="hint">${esc(block.hint)}</p>` : ""}
        <article class="radio-card glass">
          ${block.lines.map((line) => `<p>${esc(line)}</p>`).join("")}
        </article>
        <p class="note">${esc(boatSummary(state, lang))}</p>
        <div class="split">
          ${labeledButton("copy", tr("copy"), "copy")}
          ${speakBtn}
        </div>
        ${lastOnly ? "" : labeledButton("home", tr("home"), "home")}
      `,
    });
  }

  function renderManual(): string {
    return shell({
      title: tr("phonetic"),
      body: `
        <table class="alpha glass">
          <tbody>
            ${PHONETIC_ROWS.map(
              ([letter, word]) => `<tr><th>${letter}</th><td>${word}</td></tr>`,
            ).join("")}
          </tbody>
        </table>
      `,
    });
  }

  function renderKnowledge(): string {
    const categories = getCategoriesWithCounts();
    return shell({
      title: tr("skippersGuide"),
      body: `
        <p class="lead">${esc(tr("knowledge"))}</p>
        <div class="knowledge-grid">
          ${categories.map((cat) => renderCategoryCard(cat, lang)).join("")}
        </div>
      `,
    });
  }

  function renderKnowledgeCategory(): string {
    if (!currentCategory) {
      screen = "knowledge";
      render();
      return "";
    }
    const articles = getArticlesByCategory(currentCategory);
    const catMeta = getCategoriesWithCounts().find((c) => c.id === currentCategory);
    return shell({
      title: catMeta ? tr(catMeta.titleKey) : "Knowledge",
      body: `
        <div class="knowledge-list">
          ${articles.map((art) => renderArticleCard(art, lang)).join("")}
        </div>
      `,
    });
  }

  function renderKnowledgeArticle(): string {
    if (!currentArticleId) {
      screen = "knowledge";
      render();
      return "";
    }
    const article = getArticleById(currentArticleId);
    if (!article) {
      screen = "knowledge";
      render();
      return "";
    }
    return shell({
      title: tr(article.titleKey),
      body: renderArticleContent(article, lang),
    });
  }

  function readBoatPatch(): Partial<AppState> {
    const name = (root.querySelector("#boat-name") as HTMLInputElement | null)?.value.trim();
    const ft = (root.querySelector("#boat-loa-ft") as HTMLInputElement | null)?.value.trim();
    const meters = (root.querySelector("#boat-loa-m") as HTMLInputElement | null)?.value.trim();
    const draught = (root.querySelector("#boat-draught") as HTMLInputElement | null)?.value.trim();
    const width = (root.querySelector("#boat-width") as HTMLInputElement | null)?.value.trim();
    const crew = (root.querySelector("#boat-crew") as HTMLSelectElement | null)?.value;
    const model = (root.querySelector("#boat-model") as HTMLSelectElement | null)?.value;
    return {
      boatName: name || state.boatName,
      lengthFt: ft || state.lengthFt,
      lengthM: meters || state.lengthM,
      draught: draught || state.draught,
      width: width || state.width,
      crew: crew || state.crew,
      boatModel: model || state.boatModel,
    };
  }

  function persistBoat(): void {
    state = patchState(state, readBoatPatch());
  }

  function applyYacht(id: string): void {
    const yacht = findYacht(id) || findYacht(DEFAULT_YACHT_ID)!;
    state = patchState(state, {
      boatModel: yacht.id,
      lengthFt: String(yacht.loaFt),
      lengthM: String(yacht.loaM),
      draught: String(yacht.draughtM),
      width: String(yacht.beamM),
    });
    render();
  }

  function bind(): void {
    root.querySelectorAll<HTMLButtonElement>("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = btn.dataset.lang;
        if (isLang(next)) setLang(next);
      });
    });
    root.querySelector("[data-act=lang-more]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      langMenuOpen = !langMenuOpen;
      render();
    });
    if (langMenuOpen) {
      requestAnimationFrame(() => {
        document.addEventListener(
          "click",
          () => {
            if (!langMenuOpen) return;
            langMenuOpen = false;
            render();
          },
          { once: true },
        );
      });
    }
    root.querySelector("[data-act=back]")?.addEventListener("click", () => {
      if (screen === "boat") persistBoat();
      back();
    });
    root.querySelector("[data-act=home]")?.addEventListener("click", home);
    root.querySelector("[data-act=start]")?.addEventListener("click", () => {
      state = patchState(state, { seenWelcome: true });
      home();
    });
    root.querySelector("[data-act=welcome]")?.addEventListener("click", () => go("welcome"));
    root.querySelector("[data-act=theme]")?.addEventListener("click", () => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    root.querySelector("[data-act=emergency]")?.addEventListener("click", () => {
      state = patchState(state, { event: "Emergency", step: "" });
      go("emergency");
    });
    root.querySelector("[data-act=marine]")?.addEventListener("click", () => {
      state = patchState(state, { event: "Routine" });
      marinePurpose = "";
      marineStep = 1;
      go("marine");
    });
    root.querySelector("[data-act=vessel]")?.addEventListener("click", () => {
      state = patchState(state, { event: "Routine", step: "None", myPosition: "NONE" });
      vesselPurpose = "";
      vesselStep = 1;
      vesselKind = "";
      vesselNameDraft = "";
      go("vessel");
    });
    root.querySelectorAll("[data-act=boat]").forEach((el) => {
      el.addEventListener("click", () => go("boat"));
    });
    root.querySelector("[data-act=last]")?.addEventListener("click", () => go("last"));
    root.querySelector("[data-act=manual]")?.addEventListener("click", () => go("manual"));
    root.querySelector("[data-act=knowledge]")?.addEventListener("click", () => {
      currentCategory = null;
      currentArticleId = null;
      go("knowledge");
    });
    root.querySelectorAll("[data-act=open-category]").forEach((el) => {
      el.addEventListener("click", () => {
        const cat = el.getAttribute("data-category");
        if (cat) {
          currentCategory = cat as KnowledgeCategory;
          currentArticleId = null;
          go("knowledge-category");
        }
      });
    });
    root.querySelectorAll("[data-act=open-article]").forEach((el) => {
      el.addEventListener("click", () => {
        const artId = el.getAttribute("data-article");
        if (artId) {
          currentArticleId = artId;
          go("knowledge-article");
        }
      });
    });
    root.querySelector("[data-act=gps]")?.addEventListener("click", () => {
      void openGps("home");
    });
    root.querySelector("[data-act=gps-auto]")?.addEventListener("click", () => {
      if (gpsAutoNote === "trying") return;
      gpsAutoNote = "trying";
      render();
      void (async () => {
        const fix = await requestGps();
        gpsAutoNote = fix.ok ? "ok" : "fail";
        applyGps(fix, true);
        if (screen === "gps") render();
        toast(tr("gpsToast", { value: fix.ok ? fix.shortGps : tr("gpsFailed") }));
      })();
    });
    root.querySelector("[data-act=gps-map]")?.addEventListener("click", () => {
      mapPick =
        state.gpsLat != null && state.gpsLon != null
          ? { lat: state.gpsLat, lon: state.gpsLon }
          : mapPick;
      go("map");
    });
    root.querySelector("[data-act=map-confirm]")?.addEventListener("click", () => {
      if (!mapPick) return toast(tr("errMap"));
      applyGps(fixFromLatLon(mapPick.lat, mapPick.lon));
      back();
    });

    root.querySelector("[data-act=mayday]")?.addEventListener("click", () => {
      state = patchState(state, { step: "MAYDAY" });
      go("disaster");
    });
    root.querySelector("[data-act=panpan]")?.addEventListener("click", () => {
      state = patchState(state, { step: "PANPAN" });
      go("disaster");
    });
    root.querySelector("[data-act=relay]")?.addEventListener("click", () => {
      state = patchState(state, { step: "MAYDAY RELAY" });
      go("relay");
    });
    root.querySelector("[data-act=cancel]")?.addEventListener("click", () => {
      state = patchState(state, { step: "CANCELDISTRESS" });
      go("cancel");
    });

    root.querySelectorAll<HTMLInputElement>('input[name="disaster"]').forEach((input) => {
      input.addEventListener("change", () => {
        state = patchState(state, { typeOf: input.value });
      });
    });
    root.querySelectorAll<HTMLInputElement>('input[name="time"]').forEach((input) => {
      input.addEventListener("change", () => {
        state = patchState(state, { howMuchTime: input.value });
      });
    });
    root.querySelectorAll<HTMLInputElement>('input[name="marine"]').forEach((input) => {
      input.addEventListener("change", () => {
        marinePurpose = input.value;
      });
    });
    root.querySelectorAll<HTMLInputElement>('input[name="vessel-purpose"]').forEach((input) => {
      input.addEventListener("change", () => {
        vesselPurpose = input.value;
      });
    });
    root.querySelectorAll<HTMLInputElement>('input[name="vessel-kind"]').forEach((input) => {
      input.addEventListener("change", () => {
        vesselKind = input.value;
      });
    });
    root.querySelector("#other-name")?.addEventListener("input", (event) => {
      vesselNameDraft = (event.target as HTMLInputElement).value;
      vesselKind = "name";
      const radio = root.querySelector<HTMLInputElement>('input[name="vessel-kind"][value="name"]');
      if (radio) radio.checked = true;
    });
    root.querySelectorAll<HTMLInputElement>('input[name="rel-pos"]').forEach((input) => {
      input.addEventListener("change", () => {
        relativePosition = input.value;
      });
    });

    const preview = root.querySelector("#coord-preview");
    const updatePreview = (): void => {
      if (!preview) return;
      preview.textContent = formatManualCoordinates(readDmsForm());
    };
    root
      .querySelectorAll("#latD, #latM, #latS, #lonD, #lonM, #lonS, input[name=latHem], input[name=lonHem]")
      .forEach((el) => el.addEventListener("input", updatePreview));
    root.querySelectorAll("input[name=latHem], input[name=lonHem]").forEach((el) => {
      el.addEventListener("change", updatePreview);
    });

    root.querySelector("#series-search")?.addEventListener("input", (event) => {
      seriesQuery = (event.target as HTMLInputElement).value;
      render();
      const search = root.querySelector("#series-search") as HTMLInputElement | null;
      if (search) {
        search.focus();
        search.setSelectionRange(seriesQuery.length, seriesQuery.length);
      }
    });
    root.querySelector("#boat-model")?.addEventListener("change", (event) => {
      applyYacht((event.target as HTMLSelectElement).value);
    });
    root.querySelector("#boat-loa-ft")?.addEventListener("input", (event) => {
      const n = parseNum((event.target as HTMLInputElement).value);
      const meters = root.querySelector("#boat-loa-m") as HTMLInputElement | null;
      if (n != null && meters) meters.value = String(ftToM(n));
      persistBoat();
    });
    root.querySelector("#boat-loa-m")?.addEventListener("input", (event) => {
      const n = parseNum((event.target as HTMLInputElement).value);
      const feet = root.querySelector("#boat-loa-ft") as HTMLInputElement | null;
      if (n != null && feet) feet.value = String(mToFt(n));
      persistBoat();
    });
    ["#boat-name", "#boat-draught", "#boat-width", "#boat-crew"].forEach((sel) => {
      root.querySelector(sel)?.addEventListener("input", persistBoat);
      root.querySelector(sel)?.addEventListener("change", persistBoat);
    });

    root.querySelector("[data-act=save-boat]")?.addEventListener("click", () => {
      persistBoat();
      toast(tr("saved"));
      home();
    });

    root.querySelector("[data-act=copy]")?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(copyBuffer);
        toast(tr("copied"));
      } catch {
        toast(tr("copyFailed"));
      }
    });
    root.querySelector("[data-act=speak]")?.addEventListener("click", () => {
      const btn = root.querySelector("[data-act=speak]");
      const label = btn?.querySelector("span");
      const reset = (): void => {
        if (label) label.textContent = tr("speak");
        btn?.classList.remove("is-active");
      };
      const speaking = toggleSpeak(speakBuffer, reset);
      if (label) label.textContent = speaking ? tr("speaking") : tr("speak");
      btn?.classList.toggle("is-active", speaking);
    });

    root.querySelector("[data-act=next]")?.addEventListener("click", () => {
      if (screen === "disaster") {
        if (!state.typeOf) return toast(tr("errDisaster"));
        afterDisaster();
        return;
      }
      if (screen === "time") {
        if (!state.howMuchTime) return toast(tr("errTime"));
        openComposed();
        return;
      }
      if (screen === "gps" || screen === "coordinates") {
        const fromForm = fixFromDms(readDmsForm());
        if (fromForm) applyGps(fromForm, true);
        else if (!hasFix()) return toast(tr("errGps"));
        if (gpsFrom === "distress") go("time");
        else {
          toast(tr("gpsToast", { value: state.shortGps }));
          home();
        }
        return;
      }
      if (screen === "marine") {
        if (marineStep === 1) {
          if (!marinePurpose) return toast(tr("errPurpose"));
          advanceWizard(() => {
            marineStep = 2;
          });
          return;
        }
        const marina =
          (root.querySelector("#marina-name") as HTMLInputElement | null)?.value.trim() ||
          state.marina;
        const assist = Boolean(
          (root.querySelector("#need-assist") as HTMLInputElement | null)?.checked,
        );
        state = patchState(state, {
          step: marinePurpose,
          marina,
          marinaAssistance: assist ? "We need assistance" : "",
        });
        openComposed();
        return;
      }
      if (screen === "vessel") {
        if (vesselStep === 1) {
          if (!vesselPurpose) return toast(tr("errVariant"));
          advanceWizard(() => {
            vesselStep = 2;
          });
          return;
        }
        if (!vesselKind) return toast(tr("errVessel"));
        const type = VESSEL_TYPES.find((item) => item.id === vesselKind);
        const callingName =
          vesselKind === "name"
            ? vesselNameDraft.trim()
            : type?.value || vesselNameDraft.trim();
        if (!callingName) return toast(tr("errVessel"));
        state = patchState(state, {
          step: vesselPurpose,
          callingName,
          myPosition: "NONE",
        });
        if (vesselPurpose === "CALLVESSEL" && vesselKind === "name") openComposed();
        else go("position");
        return;
      }
      if (screen === "position") {
        if (!relativePosition) return toast(tr("errPosition"));
        state = patchState(state, { myPosition: relativePosition });
        openComposed();
        return;
      }
      if (screen === "cancel") {
        const time = (root.querySelector("#cancel-time") as HTMLInputElement).value;
        const format = (root.querySelector("#cancel-format") as HTMLSelectElement).value;
        state = patchState(state, {
          timeFormat: format,
          timeOfMessage: `${spellNumbers(time)} ${format}`,
          dateOfDistress: (root.querySelector("#cancel-date") as HTMLSelectElement).value,
          monthOfDistress: (root.querySelector("#cancel-month") as HTMLSelectElement).value,
        });
        openComposed();
        return;
      }
      if (screen === "relay") {
        const time = (root.querySelector("#relay-time") as HTMLInputElement).value;
        const format = (root.querySelector("#relay-format") as HTMLSelectElement).value;
        const received = (root.querySelector("#relay-text") as HTMLTextAreaElement).value;
        state = patchState(state, {
          timeFormat: format,
          timeOfMessage: `${spellNumbers(time)} ${format}`,
          receivedMessage: received,
        });
        openComposed();
      }
    });
  }

  function fillStats(): void {
    const status = root.querySelector("#stats-status") as HTMLElement | null;
    const body = root.querySelector("#stats-body") as HTMLElement | null;
    if (!status || !body) return;
    fetchStats()
      .then((months) => {
        if (!root.contains(status) || !root.contains(body)) return;
        status.hidden = true;
        body.innerHTML = statsBody(months, lang, {
          visits: esc(tr("statsVisits")),
          processes: esc(tr("statsProcesses")),
          month: esc(tr("statsMonth")),
          chart: esc(tr("statsChart")),
          hint: esc(tr("statsHint")),
        });
      })
      .catch(() => {
        if (!root.contains(status)) return;
        status.hidden = false;
        status.textContent = tr("statsFailed");
      });
  }

  function render(): void {
    stopSpeak();
    unmountMap?.();
    unmountMap = null;
    const mapScreens: Record<Screen, () => string> = {
      welcome: renderWelcome,
      home: renderHome,
      emergency: renderEmergency,
      disaster: renderDisaster,
      coordinates: renderGps,
      gps: renderGps,
      map: renderMap,
      time: renderTime,
      marine: renderMarine,
      vessel: renderVessel,
      position: renderPosition,
      boat: renderBoat,
      cancel: renderCancel,
      relay: renderRelay,
      message: () => renderMessage(false),
      last: () => renderMessage(true),
      manual: renderManual,
      knowledge: renderKnowledge,
      "knowledge-category": renderKnowledgeCategory,
      "knowledge-article": renderKnowledgeArticle,
    };
    document.documentElement.lang = htmlLang(lang);
    root.innerHTML = mapScreens[screen]();
    bind();
    if (screen === "welcome") fillStats();
    if (screen === "map") {
      const el = root.querySelector<HTMLElement>("#osm-map");
      if (el) {
        unmountMap = mountMapPicker(el, {
          lat: mapPick?.lat ?? state.gpsLat,
          lon: mapPick?.lon ?? state.gpsLon,
          onPick: (lat, lon) => {
            mapPick = { lat, lon };
            const node = root.querySelector("#map-preview");
            if (node) node.textContent = fixFromLatLon(lat, lon).shortGps;
          },
        });
      }
    }
  }

  if (isSnap(history.state)) restore(history.state);
  else history.replaceState(capture(0), "", historyUrl(0));
  window.addEventListener("popstate", onPopState);

  render();
  void refreshGps(true);
}
