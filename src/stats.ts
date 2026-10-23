import { htmlLang, type Lang } from "./i18n";

export type MonthPoint = {
  month: string;
  visits: number;
  processes: number;
};

const VISIT_KEY = "vhf-stats-visit";

export function noteVisit(): void {
  try {
    if (sessionStorage.getItem(VISIT_KEY)) return;
    sessionStorage.setItem(VISIT_KEY, "1");
  } catch {
    return;
  }
  void sendStat("visit");
}

export function noteProcess(): void {
  void sendStat("process");
}

async function sendStat(type: "visit" | "process"): Promise<void> {
  try {
    await fetch("/api/event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type }),
      keepalive: true,
    });
  } catch {
    /* local preview has no stats server */
  }
}

export async function fetchStats(): Promise<MonthPoint[]> {
  const response = await fetch("/api/stats");
  if (!response.ok) throw new Error(String(response.status));
  const data = (await response.json()) as { months?: MonthPoint[] };
  return Array.isArray(data.months) ? data.months : [];
}

export function statsPanel(title: string, loading: string): string {
  return `
    <section class="stats-card glass">
      <h2>${title}</h2>
      <p class="note" id="stats-status">${loading}</p>
      <div id="stats-body"></div>
    </section>
  `;
}

function locale(lang: Lang): string {
  return htmlLang(lang);
}

function monthLabel(iso: string, lang: Lang, withYear: boolean): string {
  const [year, month] = iso.split("-").map(Number);
  const date = new Date(year, (month || 1) - 1, 1);
  const short = new Intl.DateTimeFormat(locale(lang), { month: "short" }).format(date).replace(".", "");
  return withYear ? `${short} ${year}` : short;
}

export function statsBody(
  months: MonthPoint[],
  lang: Lang,
  labels: {
    visits: string;
    processes: string;
    month: string;
    chart: string;
    hint: string;
  },
): string {
  const visits = months.reduce((sum, item) => sum + item.visits, 0);
  const processes = months.reduce((sum, item) => sum + item.processes, 0);
  const max = Math.max(1, ...months.map((item) => Math.max(item.visits, item.processes)));
  const width = Math.max(320, months.length * 52);
  const bars = months
    .map((item, index) => {
      const x = index * 52;
      const visitH = item.visits === 0 ? 2 : Math.max(4, Math.round((item.visits / max) * 112));
      const processH = item.processes === 0 ? 2 : Math.max(4, Math.round((item.processes / max) * 112));
      const label = monthLabel(item.month, lang, false);
      return `
        <g transform="translate(${x},0)">
          <title>${label}: ${labels.visits} ${item.visits}, ${labels.processes} ${item.processes}</title>
          <rect class="bar-visits" x="8" y="${128 - visitH}" width="16" height="${visitH}" rx="3"></rect>
          <rect class="bar-processes" x="28" y="${128 - processH}" width="16" height="${processH}" rx="3"></rect>
          <text x="26" y="148" text-anchor="middle">${label}</text>
        </g>
      `;
    })
    .join("");
  const rows = months
    .map(
      (item) =>
        `<tr><td>${monthLabel(item.month, lang, true)}</td><td>${item.visits}</td><td>${item.processes}</td></tr>`,
    )
    .join("");
  return `
    <div class="stats-totals">
      <div><span>${labels.visits}</span><strong>${visits}</strong></div>
      <div><span>${labels.processes}</span><strong>${processes}</strong></div>
    </div>
    <div class="stats-legend">
      <span><i class="legend-swatch visits"></i>${labels.visits}</span>
      <span><i class="legend-swatch processes"></i>${labels.processes}</span>
    </div>
    <div class="stats-scroll">
      <svg class="stats-chart" viewBox="0 0 ${width} 164" role="img" aria-label="${labels.chart}">
        <line x1="0" y1="128" x2="${width}" y2="128" class="stats-axis"></line>
        ${bars}
      </svg>
    </div>
    <table class="stats-table">
      <thead><tr><th>${labels.month}</th><th>${labels.visits}</th><th>${labels.processes}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p class="stats-note">${labels.hint}</p>
  `;
}
