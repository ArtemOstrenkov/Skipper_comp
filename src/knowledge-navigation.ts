import type { KnowledgeArticle, ContentBlock } from "./knowledge-types";
import type { Lang } from "./i18n";

function getContent(lang: Lang, contentMap: Record<string, ContentBlock[]>): ContentBlock[] {
  return contentMap[lang] || contentMap["en"] || [];
}

// Power-driven vessel lights with visual diagram
const powerDrivenContent: Record<string, ContentBlock[]> = {
  en: [
    { type: "heading", content: "Underway" },
    {
      type: "illustration",
      src: "/knowledge/illustrations/nav-lights-power-vessel.jpg",
      alt: "Power vessel navigation lights from ahead",
      caption: "Green = starboard (right), Red = port (left), White = forward",
    },
    {
      type: "list",
      items: [
        "Green light: starboard (right) side",
        "Red light: port (left) side",
        "White masthead light(s): forward",
        "White stern light: aft",
      ],
    },
    {
      type: "list",
      items: [
        "Length < 50m: 2 white masthead lights",
        "Length ≥ 50m: 3 white masthead lights (forward higher)",
      ],
    },
    { type: "heading", content: "At Anchor" },
    {
      type: "list",
      items: ["White all-round light visible 360°"],
    },
    { type: "heading", content: "Towing" },
    {
      type: "list",
      items: [
        "2 masthead lights + yellow towing light aft",
        "If tow > 200m: 3 masthead lights",
      ],
    },
  ],
  ru: [
    { type: "heading", content: "На ходу" },
    {
      type: "illustration",
      src: "/knowledge/illustrations/nav-lights-power-vessel.jpg",
      alt: "Огни моторного судна спереди",
      caption: "Зелёный = правый борт, Красный = левый борт, Белый = впереди",
    },
    {
      type: "list",
      items: [
        "Зелёный огонь: правый борт (старборд)",
        "Красный огонь: левый борт (порт)",
        "Белый топовый огонь: впереди",
        "Белый кормовой огонь: сзади",
      ],
    },
    {
      type: "list",
      items: [
        "Длина < 50м: 2 белых топовых огня",
        "Длина ≥ 50м: 3 белых топовых огня (передний выше)",
      ],
    },
    { type: "heading", content: "На якоре" },
    {
      type: "list",
      items: ["Белый круговой огонь видимый на 360°"],
    },
    { type: "heading", content: "Буксировка" },
    {
      type: "list",
      items: [
        "2 топовых огня + жёлтый буксировочный огонь на корме",
        "Если буксир > 200м: 3 топовых огня",
      ],
    },
  ],
  zh: [
    { type: "heading", content: "航行中" },
    {
      type: "illustration",
      src: "/knowledge/illustrations/nav-lights-power-vessel.jpg",
      alt: "机动船导航灯从前方看",
      caption: "绿色 = 右舷，红色 = 左舷，白色 = 前方",
    },
    {
      type: "list",
      items: [
        "绿灯：右舷",
        "红灯：左舷",
        "白色桁灯：前方",
        "白色尾灯：后方",
      ],
    },
    {
      type: "list",
      items: [
        "长度 < 50米：2盏白色桁灯",
        "长度 ≥ 50米：3盏白色桁灯（前面较高）",
      ],
    },
    { type: "heading", content: "锚泊" },
    {
      type: "list",
      items: ["白色全方位灯，360°可见"],
    },
    { type: "heading", content: "拖带" },
    {
      type: "list",
      items: [
        "2盏桁灯 + 黄色拖带灯（船尾）",
        "拖带 > 200米：3盏桁灯",
      ],
    },
  ],
};

const sailingContent: Record<string, ContentBlock[]> = {
  en: [
    { type: "heading", content: "Under Sail Only" },
    {
      type: "illustration",
      src: "/knowledge/illustrations/nav-lights-sailing-vessel.jpg",
      alt: "Sailing vessel navigation lights",
      caption: "No white forward light = sailing vessel",
    },
    {
      type: "list",
      items: [
        "Green (starboard) + Red (port) sidelights",
        "White stern light",
        "OR: Tricolor light at masthead (< 20m only)",
      ],
    },
    { type: "heading", content: "Under Power (engine on)" },
    {
      type: "list",
      items: [
        "Show lights as power-driven vessel",
        "Daytime: black cone point-down forward",
      ],
    },
    {
      type: "warning",
      content: "If your engine is running, you are a POWER vessel under COLREGS, even if sails are up!",
    },
  ],
  ru: [
    { type: "heading", content: "Только под парусами" },
    {
      type: "illustration",
      src: "/knowledge/illustrations/nav-lights-sailing-vessel.jpg",
      alt: "Огни парусного судна",
      caption: "Нет белого огня спереди = парусное судно",
    },
    {
      type: "list",
      items: [
        "Зелёный (старборд) + Красный (порт) бортовые огни",
        "Белый кормовой огонь",
        "ИЛИ: Трёхцветный огонь на мачте (только < 20м)",
      ],
    },
    { type: "heading", content: "Под мотором (двигатель включён)" },
    {
      type: "list",
      items: [
        "Показывать огни как моторное судно",
        "Днём: чёрный конус вершиной вниз впереди",
      ],
    },
    {
      type: "warning",
      content: "Если двигатель работает, вы - МОТОРНОЕ судно по МППСС, даже если паруса подняты!",
    },
  ],
  zh: [
    { type: "heading", content: "仅帆航行" },
    {
      type: "illustration",
      src: "/knowledge/illustrations/nav-lights-sailing-vessel.jpg",
      alt: "帆船导航灯",
      caption: "前方无白灯 = 帆船",
    },
    {
      type: "list",
      items: [
        "绿灯（右舷）+ 红灯（左舷）舷灯",
        "白色尾灯",
        "或：桅顶三色灯（仅限< 20米）",
      ],
    },
    { type: "heading", content: "机动（发动机开启）" },
    {
      type: "list",
      items: [
        "显示机动船灯光",
        "白天：前方黑色圆锥体尖端向下",
      ],
    },
    {
      type: "warning",
      content: "如果发动机运转，根据COLREGS你是机动船，即使帆升起！",
    },
  ],
};

export const NAVIGATION_ARTICLES: KnowledgeArticle[] = [
  {
    id: "nav-lights",
    category: "navigation",
    titleKey: "navLightsTitle",
    descKey: "navLightsDesc",
    icon: "🔦",
    order: 1,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "Navigation lights help identify vessel type, direction, and activity at night or in poor visibility.",
            ru: "Навигационные огни помогают определить тип судна, направление и деятельность ночью или при плохой видимости.",
            zh: "导航灯有助于在夜间或能见度差时识别船只类型、方向和活动。",
          }[l] as string,
        },
        {
          type: "accordion",
          title: {
            en: "Power-Driven Vessels (Motor)",
            ru: "Моторные суда",
            zh: "机动船",
          }[l] as string,
          children: getContent(lang, powerDrivenContent),
        },
        {
          type: "accordion",
          title: {
            en: "Sailing Vessels",
            ru: "Парусные суда",
            zh: "帆船",
          }[l] as string,
          children: getContent(lang, sailingContent),
        },
        {
          type: "accordion",
          title: {
            en: "Vessels Restricted in Ability to Maneuver",
            ru: "Суда с ограниченной манёвренностью",
            zh: "操纵受限船只",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Red-White-Red lights vertical + normal navigation lights",
                  "Examples: dredging, cable laying, survey work",
                  "Green side = safe to pass, Red side = obstruction",
                ],
                ru: [
                  "Красный-Белый-Красный огни вертикально + обычные навигационные огни",
                  "Примеры: дноуглубление, прокладка кабелей, изыскательские работы",
                  "Зелёная сторона = можно пройти, Красная сторона = препятствие",
                ],
                zh: [
                  "红-白-红垂直灯 + 正常导航灯",
                  "示例：挖泥、铺设电缆、测量作业",
                  "绿色侧 = 可通过，红色侧 = 障碍物",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Stay clear of these vessels - they CANNOT maneuver to avoid you!",
                ru: "Держитесь подальше от этих судов - они НЕ МОГУТ маневрировать, чтобы избежать вас!",
                zh: "远离这些船只 - 它们无法机动避让你！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Fishing Vessels",
            ru: "Рыболовные суда",
            zh: "渔船",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Trawling: Red over White vertical",
                  "Other fishing: Green over White vertical",
                  "+ normal sidelights & stern light",
                ],
                ru: [
                  "Траление: Красный над Белым вертикально",
                  "Другой промысел: Зелёный над Белым вертикально",
                  "+ обычные бортовые и кормовой огни",
                ],
                zh: [
                  "拖网：红色在白色上方",
                  "其他捕鱼：绿色在白色上方",
                  "+ 正常舷灯和尾灯",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Vessel Not Under Command",
            ru: "Судно лишённое возможности управляться",
            zh: "失控船只",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "2 Red all-round lights vertical",
                  "Example: engine failure, steering loss",
                  "Cannot maneuver - stay clear!",
                ],
                ru: [
                  "2 Красных круговых огня вертикально",
                  "Пример: отказ двигателя, потеря управления",
                  "Не может маневрировать - держитесь в стороне!",
                ],
                zh: [
                  "2盏红色全方位灯垂直",
                  "示例：发动机故障、失去转向",
                  "无法机动 - 保持距离！",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Day Shapes",
            ru: "Дневные знаки",
            zh: "日间标志",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Black ball: At anchor",
                  "Black cone point-down: Sailing vessel under power",
                  "Black cylinder: Restricted in ability to maneuver",
                  "Black diamond: Vessel towing (+ tow shows diamond)",
                  "2 black cones base-to-base: Fishing vessel",
                  "2 black balls: Not under command",
                ],
                ru: [
                  "Чёрный шар: На якоре",
                  "Чёрный конус вершиной вниз: Парусное судно под мотором",
                  "Чёрный цилиндр: Ограниченная манёвренность",
                  "Чёрный ромб: Судно на буксире (+ буксируемое показывает ромб)",
                  "2 чёрных конуса основаниями вместе: Рыболовное судно",
                  "2 чёрных шара: Лишено возможности управляться",
                ],
                zh: [
                  "黑球：锚泊",
                  "黑色圆锥尖端向下：机动中的帆船",
                  "黑色圆柱：操纵受限",
                  "黑色菱形：拖带船只（+ 被拖船显示菱形）",
                  "2个黑色圆锥底对底：渔船",
                  "2个黑球：失控",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "note",
          content: {
            en: "Memorization tip: Red = Port (both 4 letters). Green = Starboard. White = All-round visibility.",
            ru: "Мнемоника: Красный = Левый борт (оба 'ый'). Зелёный = Правый/Старборд.",
            zh: "记忆提示：红色 = 左舷（红左都简单）。绿色 = 右舷。",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "colregs",
    category: "navigation",
    titleKey: "colregsTitle",
    descKey: "colregsDesc",
    icon: "⚖️",
    order: 2,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "International Regulations for Preventing Collisions at Sea (COLREGS) - the 'rules of the road' on water.",
            ru: "Международные правила предупреждения столкновений судов в море (МППСС) - 'правила дорожного движения' на воде.",
            zh: "国际海上避碰规则（COLREGS）- 水上的'交通规则'。",
          }[l] as string,
        },
        {
          type: "accordion",
          title: {
            en: "Sailing Vessels vs Sailing Vessels",
            ru: "Парусное судно против парусного",
            zh: "帆船对帆船",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Port tack gives way to starboard tack",
                  "Both on same tack: windward vessel gives way",
                  "Windward vessel unsure of other's tack: gives way",
                ],
                ru: [
                  "Левый галс уступает правому галсу",
                  "Оба на одном галсе: наветренное судно уступает",
                  "Наветренное судно не уверено в галсе другого: уступает",
                ],
                zh: [
                  "左舷受风让路给右舷受风",
                  "同舷受风：上风船让路",
                  "上风船不确定对方舷位：让路",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Port tack = wind coming from port side. Starboard tack = wind from starboard.",
                ru: "Левый галс = ветер с левого борта. Правый галс = ветер с правого борта.",
                zh: "左舷受风 = 风从左舷来。右舷受风 = 风从右舷来。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Sailing vs Power",
            ru: "Парусное против моторного",
            zh: "帆船对动力船",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "General rule: Power gives way to sail",
                  "EXCEPTIONS:",
                  "  - Sailboat overtaking power vessel: sailboat gives way",
                  "  - Vessel restricted in ability: sailboat gives way",
                  "  - Large vessel in narrow channel/fairway: sailboat gives way",
                ],
                ru: [
                  "Общее правило: Моторное уступает парусному",
                  "ИСКЛЮЧЕНИЯ:",
                  "  - Парусное обгоняет моторное: парусное уступает",
                  "  - Судно ограничено в маневре: парусное уступает",
                  "  - Большое судно в узком канале/фарватере: парусное уступает",
                ],
                zh: [
                  "一般规则：动力船让帆船",
                  "例外：",
                  "  - 帆船超越动力船：帆船让路",
                  "  - 操纵受限船：帆船让路",
                  "  - 大船在狭窄水道/航道：帆船让路",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "In narrow channels, don't be 'technically right' - large ships CANNOT maneuver. Stay clear!",
                ru: "В узких каналах не будьте 'формально правы' - большие суда НЕ МОГУТ маневрировать. Держитесь в стороне!",
                zh: "在狭窄水道中，不要'技术上正确' - 大船无法机动。请避让！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Power Vessels vs Power Vessels",
            ru: "Моторное против моторного",
            zh: "动力船对动力船",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Head-on", ru: "Встречный курс", zh: "对遇" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Both vessels alter course to starboard",
                  "Pass port-to-port (left to left)",
                ],
                ru: [
                  "Оба судна изменяют курс вправо",
                  "Расходятся левыми бортами",
                ],
                zh: [
                  "两船均向右转向",
                  "左舷对左舷通过",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Crossing", ru: "Пересекающиеся курсы", zh: "交叉" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Vessel with other on STARBOARD side gives way",
                  "'If to starboard Red appear, it is your duty to keep clear'",
                ],
                ru: [
                  "Судно, видящее другое справа, уступает",
                  "'Если справа красный - твой долг уступить'",
                ],
                zh: [
                  "右侧见到他船的船只让路",
                  "'右侧红灯现，有责让路先'",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Overtaking", ru: "Обгон", zh: "追越" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Overtaking vessel ALWAYS gives way",
                  "Overtaking = approaching from more than 22.5° abaft the beam",
                ],
                ru: [
                  "Обгоняющее судно ВСЕГДА уступает",
                  "Обгон = подход под углом более 22.5° от траверза к корме",
                ],
                zh: [
                  "追越船只总是让路",
                  "追越 = 从正横后22.5°以上接近",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Narrow Channels & Fairways",
            ru: "Узкие каналы и фарватеры",
            zh: "狭窄水道与航道",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Stay to starboard (right) side of channel",
                  "Vessels < 20m or sailing: don't impede large vessels",
                  "Cross channels perpendicularly and quickly",
                  "Don't anchor in narrow channels",
                  "Sound signals: 1 short blast = altering course to starboard",
                  "                2 short blasts = altering course to port",
                  "                3 short blasts = operating astern (reversing)",
                ],
                ru: [
                  "Держитесь правого (правого борта) края канала",
                  "Суда < 20м или парусные: не мешайте большим судам",
                  "Пересекайте каналы перпендикулярно и быстро",
                  "Не становитесь на якорь в узких каналах",
                  "Звуковые сигналы: 1 короткий = изменяю курс вправо",
                  "                  2 коротких = изменяю курс влево",
                  "                  3 коротких = работаю задним ходом",
                ],
                zh: [
                  "保持在航道右侧（右舷）",
                  "船长<20米或帆船：不得妨碍大船",
                  "垂直快速穿越航道",
                  "不要在狭窄水道锚泊",
                  "声号：1短声 = 向右转向",
                  "      2短声 = 向左转向",
                  "      3短声 = 倒车",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "When in doubt in a channel: monitor VHF Ch 13 and communicate your intentions!",
                ru: "При сомнении в канале: слушайте VHF 13 канал и сообщайте свои намерения!",
                zh: "在水道中如有疑问：监听VHF 13频道并通报你的意图！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Hierarchy (Who Gives Way)",
            ru: "Иерархия (Кто уступает)",
            zh: "优先级（谁让路）",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "In order of priority (top = most restricted, others must avoid):",
                ru: "В порядке приоритета (сверху = наиболее ограничен, остальные обязаны уступить):",
                zh: "优先顺序（顶部=最受限，其他船避让）：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Vessel not under command",
                  "2. Vessel restricted in ability to maneuver",
                  "3. Vessel constrained by draught (deep draft in shallow water)",
                  "4. Fishing vessel (actively fishing)",
                  "5. Sailing vessel",
                  "6. Power-driven vessel",
                ],
                ru: [
                  "1. Судно, лишённое возможности управляться",
                  "2. Судно, ограниченное в манёвре",
                  "3. Судно, стеснённое осадкой (глубокая осадка на мелководье)",
                  "4. Рыболовное судно (активно ловит рыбу)",
                  "5. Парусное судно",
                  "6. Судно с механическим двигателем",
                ],
                zh: [
                  "1. 失控船",
                  "2. 操纵受限船",
                  "3. 吃水受限船（浅水中的深吃水船）",
                  "4. 捕鱼船（正在作业）",
                  "5. 帆船",
                  "6. 机动船",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Lookout & Safe Speed",
            ru: "Наблюдение и безопасная скорость",
            zh: "瞭望与安全航速",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Maintain proper lookout at ALL times (sight, hearing, ALL available means)",
                  "Proceed at safe speed (able to stop in time)",
                  "Safe speed depends on: visibility, traffic density, vessel maneuverability, sea state, proximity to hazards",
                ],
                ru: [
                  "Поддерживайте надлежащее наблюдение ВСЕГДА (зрением, слухом, ВСЕМИ доступными средствами)",
                  "Двигайтесь на безопасной скорости (способность остановиться вовремя)",
                  "Безопасная скорость зависит от: видимости, плотности движения, маневренности судна, состояния моря, близости опасностей",
                ],
                zh: [
                  "始终保持正规瞭望（视觉、听觉、所有可用手段）",
                  "以安全航速行驶（能及时停船）",
                  "安全航速取决于：能见度、交通密度、船舶操纵性、海况、距危险物的距离",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "Autopilot is NOT a lookout! Maintain visual watch, especially at night.",
                ru: "Автопилот НЕ наблюдатель! Ведите визуальную вахту, особенно ночью.",
                zh: "自动驾驶不是瞭望！保持目视观察，特别是夜间。",
              }[l] as string,
            },
          ],
        },
        {
          type: "note",
          content: {
            en: "Remember: Rules are for preventing collisions, but seamanship and common sense trump all. If unsure, communicate and give way!",
            ru: "Помните: Правила для предотвращения столкновений, но морская практика и здравый смысл важнее всего. При сомнении - общайтесь и уступайте!",
            zh: "记住：规则是为了防止碰撞，但航海技术和常识高于一切。如有疑问，通信并让路！",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "buoys-marks",
    category: "navigation",
    titleKey: "buoysTitle",
    descKey: "buoysDesc",
    icon: "🟢",
    order: 3,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "IALA (International Association of Lighthouse Authorities) system has two regions: A (most of world) and B (Americas, Japan, Philippines).",
            ru: "Система IALA (Международная ассоциация маячных служб) имеет два региона: A (большая часть мира) и B (Америки, Япония, Филиппины).",
            zh: "IALA（国际航标协会）系统分为两个区域：A（世界大部分地区）和B（美洲、日本、菲律宾）。",
          }[l] as string,
        },
        {
          type: "accordion",
          title: {
            en: "IALA Region A (Europe, Asia, Africa, Australia)",
            ru: "Регион IALA A (Европа, Азия, Африка, Австралия)",
            zh: "IALA A区（欧洲、亚洲、非洲、澳大利亚）",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: {
                en: "Lateral Marks (entering port from sea)",
                ru: "Латеральные знаки (заход в порт с моря)",
                zh: "侧面标志（从海上进港）",
              }[l] as string,
            },
            {
              type: "illustration",
              src: "/knowledge/illustrations/iala-region-a.jpg",
              alt: {
                en: "IALA Region A lateral marks diagram",
                ru: "Диаграмма латеральных знаков региона IALA A",
                zh: "IALA A区侧面标志图",
              }[l] as string,
              caption: {
                en: "Region A: Red LEFT when returning from sea",
                ru: "Регион A: Красный СЛЕВА при заходе с моря",
                zh: "A区：返港时红色在左",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Port (left): RED cylinders, even numbers, red light",
                  "Starboard (right): GREEN cones, odd numbers, green light",
                ],
                ru: [
                  "Левый борт: КРАСНЫЕ цилиндры, чётные номера, красный огонь",
                  "Правый борт: ЗЕЛЁНЫЕ конусы, нечётные номера, зелёный огонь",
                ],
                zh: [
                  "左舷：红色圆柱体，偶数，红灯",
                  "右舷：绿色圆锥体，奇数，绿灯",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Mnemonic: 'Red Right Returning' DOES NOT apply to IALA A! Red is LEFT when returning from sea.",
                ru: "Мнемоника: 'Red Right Returning' НЕ действует в регионе IALA A! Красный СЛЕВА при возврате с моря.",
                zh: "记忆法：'Red Right Returning'（红右返航）不适用于IALA A！红色在左侧返港。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "IALA Region B (Americas)",
            ru: "Регион IALA B (Америки)",
            zh: "IALA B区（美洲）",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: {
                en: "Lateral Marks (entering port from sea)",
                ru: "Латеральные знаки (заход в порт с моря)",
                zh: "侧面标志（从海上进港）",
              }[l] as string,
            },
            {
              type: "illustration",
              src: "/knowledge/illustrations/iala-region-b.jpg",
              alt: {
                en: "IALA Region B lateral marks diagram",
                ru: "Диаграмма латеральных знаков региона IALA B",
                zh: "IALA B区侧面标志图",
              }[l] as string,
              caption: {
                en: "Region B: Red RIGHT when returning from sea",
                ru: "Регион B: Красный СПРАВА при заходе с моря",
                zh: "B区：返港时红色在右",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Port (left): GREEN cylinders, odd numbers, green light",
                  "Starboard (right): RED cones, even numbers, red light",
                ],
                ru: [
                  "Левый борт: ЗЕЛЁНЫЕ цилиндры, нечётные номера, зелёный огонь",
                  "Правый борт: КРАСНЫЕ конусы, чётные номера, красный огонь",
                ],
                zh: [
                  "左舷：绿色圆柱体，奇数，绿灯",
                  "右舷：红色圆锥体，偶数，红灯",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Mnemonic: 'Red Right Returning' - red on starboard when returning from sea.",
                ru: "Мнемоника: 'Red Right Returning' - красный справа при возврате с моря.",
                zh: "记忆法：'红右返航' - 返港时红色在右舷。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Cardinal Marks (same worldwide)",
            ru: "Кардинальные знаки (одинаковые во всём мире)",
            zh: "基本方位标志（全球通用）",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Indicate safe water relative to mark. Pass on the named side:",
                ru: "Указывают безопасную воду относительно знака. Проходите с указанной стороны:",
                zh: "指示相对标志的安全水域。从指定侧通过：",
              }[l] as string,
            },
            {
              type: "illustration",
              src: "/knowledge/illustrations/cardinal-marks.jpg",
              alt: {
                en: "Cardinal marks diagram showing all four directions",
                ru: "Диаграмма кардинальных знаков всех четырёх направлений",
                zh: "基本方位标志四个方向图",
              }[l] as string,
              caption: {
                en: "Cardinal marks show safe passage direction",
                ru: "Кардинальные знаки показывают направление безопасного прохода",
                zh: "基本方位标志显示安全通过方向",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "North: 2 black cones points UP (like N points up). Pass NORTH of mark.",
                  "South: 2 black cones points DOWN. Pass SOUTH of mark.",
                  "East: 2 black cones base-to-base (like E points outward). Pass EAST.",
                  "West: 2 black cones point-to-point (like W points inward). Pass WEST.",
                ],
                ru: [
                  "Север: 2 чёрных конуса вершинами ВВЕРХ (как N указывает вверх). Проходите СЕВЕРНЕЕ.",
                  "Юг: 2 чёрных конуса вершинами ВНИЗ. Проходите ЮЖНЕЕ.",
                  "Восток: 2 чёрных конуса основаниями друг к другу (как E указывает наружу). Проходите ВОСТОЧНЕЕ.",
                  "Запад: 2 чёрных конуса вершинами друг к другу (как W указывает внутрь). Проходите ЗАПАДНЕЕ.",
                ],
                zh: [
                  "北：2个黑色锥体尖端向上（如N指向上）。从北侧通过。",
                  "南：2个黑色锥体尖端向下。从南侧通过。",
                  "东：2个黑色锥体底对底（如E指向外）。从东侧通过。",
                  "西：2个黑色锥体尖对尖（如W指向内）。从西侧通过。",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Special Marks",
            ru: "Специальные знаки",
            zh: "特殊标志",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Isolated Danger: Red-Black-Red horizontal bands, 2 black balls. Danger beneath, but navigable water around.",
                  "Safe Water: Red-White vertical stripes, red sphere on top. Safe water all around (mid-channel, landfall).",
                  "Special Purpose: Yellow (X-shape topmark). Indicates: traffic separation, pipelines, recreation zones, cables, etc.",
                ],
                ru: [
                  "Отдельная опасность: Красно-Чёрно-Красные горизонтальные полосы, 2 чёрных шара. Опасность под знаком, но вокруг судоходно.",
                  "Чистая вода: Красно-Белые вертикальные полосы, красная сфера сверху. Чистая вода вокруг (середина фарватера, приход к берегу).",
                  "Специального назначения: Жёлтый (крестообразный верхний знак). Означает: разделение движения, трубопроводы, зоны отдыха, кабели и т.д.",
                ],
                zh: [
                  "孤立危险：红-黑-红水平条纹，2个黑球。下方有危险，但周围可航行。",
                  "安全水域：红白垂直条纹，顶部红球。周围全是安全水域（航道中央、登陆点）。",
                  "特殊用途：黄色（X形顶标）。表示：交通分隔、管道、娱乐区、电缆等。",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "tip",
          content: {
            en: "Always check which IALA region you're in! App or chart will indicate. Getting it wrong can put you on rocks!",
            ru: "Всегда проверяйте, в каком регионе IALA вы находитесь! Приложение или карта укажут. Ошибка может посадить вас на камни!",
            zh: "务必检查你在哪个IALA区域！应用或海图会显示。搞错可能会让你触礁！",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "emergencies",
    category: "navigation",
    titleKey: "emergenciesTitle",
    descKey: "emergenciesDesc",
    icon: "🆘",
    order: 4,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "Man Overboard (MOB)",
            ru: "Человек за бортом (ЧЗБ)",
            zh: "落水人员（MOB）",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Immediate Actions", ru: "Немедленные действия", zh: "立即行动" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. SHOUT 'Man Overboard!' + side (port/starboard)",
                  "2. Throw life ring + dan buoy (smoke/light)",
                  "3. Assign spotter (NEVER lose visual contact!)",
                  "4. Press MOB button on chartplotter/GPS",
                  "5. Note time and position",
                  "6. Begin recovery maneuver",
                ],
                ru: [
                  "1. КРИЧИТЕ 'Человек за бортом!' + борт (левый/правый)",
                  "2. Бросьте спасательный круг + буй (дым/свет)",
                  "3. Назначьте наблюдателя (НИКОГДА не теряйте визуальный контакт!)",
                  "4. Нажмите кнопку MOB на плоттере/GPS",
                  "5. Отметьте время и позицию",
                  "6. Начните манёвр спасения",
                ],
                zh: [
                  "1. 大喊'落水人员！' + 方位（左舷/右舷）",
                  "2. 投掷救生圈 + 浮标（烟雾/灯光）",
                  "3. 指派观察员（绝不能失去目视！）",
                  "4. 按海图仪/GPS上的MOB按钮",
                  "5. 记录时间和位置",
                  "6. 开始救援机动",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Recovery Maneuvers", ru: "Манёвры спасения", zh: "救援机动" }[l] as string,
            },
            {
              type: "text",
              content: {
                en: "Sailboat - Quick Stop:",
                ru: "Парусная яхта - Быстрая остановка:",
                zh: "帆船 - 快速停止：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Immediately head up into wind",
                  "Drop headsail (jib/genoa)",
                  "Hold mainsail in tight reach position",
                  "Circle back to MOB",
                  "Approach into wind, person to windward",
                ],
                ru: [
                  "Немедленно привестись к ветру",
                  "Спустите передний парус (стаксель/генуя)",
                  "Удерживайте грот в положении крутой галфвинд",
                  "Развернитесь к ЧЗБ",
                  "Подходите против ветра, человек с наветренного борта",
                ],
                zh: [
                  "立即迎风转向",
                  "放下前帆（艏帆/热那亚帆）",
                  "主帆保持紧迎风位置",
                  "绕回落水者",
                  "迎风接近，人在上风侧",
                ],
              }[l] as string[],
            },
            {
              type: "text",
              content: {
                en: "Power Vessel - Williamson Turn:",
                ru: "Моторное судно - Поворот Уильямсона:",
                zh: "动力船 - 威廉姆森转向：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Full turn 60° away from MOB side",
                  "Then hard over to opposite direction",
                  "When heading 180° from original: straighten course",
                  "Approach MOB slowly from downwind",
                ],
                ru: [
                  "Полный поворот на 60° от борта ЧЗБ",
                  "Затем перекладка руля в противоположную сторону",
                  "Когда курс 180° от исходного: выпрямите курс",
                  "Подходите к ЧЗБ медленно с подветренной стороны",
                ],
                zh: [
                  "从落水侧全速转向60°",
                  "然后硬转向相反方向",
                  "当航向与原航向相差180°时：摆正航向",
                  "从下风侧缓慢接近落水者",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "Engine in neutral when person is near prop! Many MOB fatalities are from propeller strikes during rescue.",
                ru: "Двигатель на нейтраль, когда человек рядом с винтом! Многие случаи гибели ЧЗБ - от ударов винтом при спасении.",
                zh: "人接近螺旋桨时发动机挂空档！许多落水死亡事故是救援时被螺旋桨打伤。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Getting Person Aboard", ru: "Подъём человека на борт", zh: "将人救上船" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Use swim ladder if available",
                  "Throw line with loop for person to hold",
                  "Use halyard + winch to hoist if exhausted",
                  "Consider cutting away lifelines if needed",
                  "Check for hypothermia, injuries",
                ],
                ru: [
                  "Используйте трап, если есть",
                  "Бросьте конец с петлёй для человека",
                  "Используйте фал + лебёдку для подъёма, если истощён",
                  "Рассмотрите перерезание леера, если нужно",
                  "Проверьте на гипотермию, травмы",
                ],
                zh: [
                  "如有游泳梯请使用",
                  "投掷带环的绳索给落水者抓",
                  "如筋疲力尽，用升降索+绞盘吊起",
                  "必要时考虑割断救生索",
                  "检查低体温、伤情",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "VHF MAYDAY", ru: "VHF MAYDAY", zh: "VHF求救" }[l] as string,
            },
            {
              type: "text",
              content: {
                en: "If cannot recover quickly or person injured:",
                ru: "Если не можете быстро спасти или человек ранен:",
                zh: "如无法快速救援或人员受伤：",
              }[l] as string,
            },
            {
              type: "code",
              content: {
                en: `"MAYDAY, MAYDAY, MAYDAY
ALL SHIPS, ALL SHIPS, ALL SHIPS
This is [VESSEL NAME] x3
MAN OVERBOARD
Position: [GPS]
[NUMBER] person in water
Over"`,
                ru: `"MAYDAY, MAYDAY, MAYDAY
ALL SHIPS, ALL SHIPS, ALL SHIPS
This is [ИМЯ СУДНА] x3
MAN OVERBOARD (ЧЕЛОВЕК ЗА БОРТОМ)
Position: [GPS]
[ЧИСЛО] человек в воде
Over"`,
                zh: `"MAYDAY, MAYDAY, MAYDAY
ALL SHIPS, ALL SHIPS, ALL SHIPS
This is [船名] x3
MAN OVERBOARD (落水人员)
Position: [GPS]
[人数] 人在水中
Over"`,
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Grounding",
            ru: "Посадка на мель",
            zh: "搁浅",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Immediate Actions", ru: "Немедленные действия", zh: "立即行动" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. DON'T immediately shut off engine!",
                  "2. Check for hull damage / leaks",
                  "3. Sound bilges (any water ingress?)",
                  "4. Note tide state (rising or falling?)",
                  "5. Note wind/wave direction",
                ],
                ru: [
                  "1. НЕ глушите двигатель сразу!",
                  "2. Проверьте повреждения корпуса / протечки",
                  "3. Проверьте трюм (есть ли поступление воды?)",
                  "4. Отметьте состояние прилива (прибывает или отливает?)",
                  "5. Отметьте направление ветра/волн",
                ],
                zh: [
                  "1. 不要立即关闭发动机！",
                  "2. 检查船体损坏/漏水",
                  "3. 探测舱底（有进水吗？）",
                  "4. 注意潮汐状态（涨潮还是退潮？）",
                  "5. 注意风浪方向",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Soft Grounding (sand/mud)", ru: "Мягкая посадка (песок/ил)", zh: "软搁浅（沙/泥）" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Try gentle reverse (don't dig in deeper)",
                  "Heel boat to reduce draft (crew to one side / boom out)",
                  "If tide rising: wait (kedge anchor if drifting)",
                  "If tide falling: prepare to stay grounded until next tide",
                ],
                ru: [
                  "Попробуйте мягкий задний ход (не закапывайтесь глубже)",
                  "Накрените яхту для уменьшения осадки (экипаж на один борт / вынос гика)",
                  "Если прилив прибывает: ждите (завезите якорь, если сносит)",
                  "Если прилив отливает: готовьтесь оставаться на мели до следующего прилива",
                ],
                zh: [
                  "尝试轻柔倒车（不要陷得更深）",
                  "让船倾侧以减少吃水（船员移向一侧/桁外伸）",
                  "如涨潮：等待（如漂移则抛锚）",
                  "如退潮：准备搁浅至下次涨潮",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Hard Grounding (rock)", ru: "Жёсткая посадка (скала)", zh: "硬搁浅（岩石）" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Do NOT try to power off (may damage hull more)",
                  "Check for damage immediately",
                  "Pump bilges continuously if leaking",
                  "Kedge anchor technique: row anchor out, winch boat off",
                  "Wait for high tide if not critical",
                  "Consider calling for tow assistance",
                ],
                ru: [
                  "НЕ пытайтесь сняться силой (может ещё больше повредить корпус)",
                  "Немедленно проверьте повреждения",
                  "Откачивайте трюм непрерывно, если течёт",
                  "Техника верпования: завезите якорь, выбирайтесь на лебёдке",
                  "Ждите высокой воды, если не критично",
                  "Рассмотрите вызов буксира",
                ],
                zh: [
                  "不要试图强行脱离（可能造成更大损坏）",
                  "立即检查损坏",
                  "如漏水持续抽舱底",
                  "抛锚技术：划船运锚，用绞盘拉船",
                  "如非紧急等待高潮",
                  "考虑呼叫拖带协助",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Kedge Anchor Technique", ru: "Техника верпования", zh: "抛锚技术" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Load kedge anchor in dinghy",
                  "Row out perpendicular to direction you want to pull",
                  "Drop anchor 100-200m away",
                  "Return to yacht",
                  "Winch on anchor line (halyard winch for power)",
                  "May need to heel boat simultaneously",
                ],
                ru: [
                  "Загрузите верп в динги",
                  "Выгребайте перпендикулярно направлению, в котором хотите тянуть",
                  "Отдайте якорь в 100-200м",
                  "Вернитесь на яхту",
                  "Выбирайте якорный канат на лебёдке (фаловая лебёдка для мощности)",
                  "Может потребоваться одновременный крен",
                ],
                zh: [
                  "在橡皮艇装载锚",
                  "划向垂直于拉力方向",
                  "在100-200米处抛锚",
                  "返回游艇",
                  "用绞盘收锚链（升降索绞盘更有力）",
                  "可能需要同时让船倾侧",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "If holed and leaking badly, DON'T pull off until temporary patch applied! Grounding may be only thing preventing sinking.",
                ru: "Если пробоина и сильная течь, НЕ снимайтесь, пока не поставите временную заплатку! Посадка на мель может быть единственным, что не даёт затонуть.",
                zh: "如破洞严重漏水，不要在临时修补前脱离！搁浅可能是防止沉船的唯一方法。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Fire",
            ru: "Пожар",
            zh: "火灾",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Immediate Actions", ru: "Немедленные действия", zh: "立即行动" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. SHOUT 'Fire!'",
                  "2. Turn off gas + electrical systems (if source)",
                  "3. Close hatches/doors (starve oxygen)",
                  "4. Grab fire extinguisher",
                  "5. Don life jackets (prepare to abandon)",
                ],
                ru: [
                  "1. КРИЧИТЕ 'Пожар!'",
                  "2. Отключите газ + электросистемы (если источник)",
                  "3. Закройте люки/двери (лишить кислорода)",
                  "4. Хватайте огнетушитель",
                  "5. Наденьте спасжилеты (готовьтесь покинуть судно)",
                ],
                zh: [
                  "1. 大喊'着火！'",
                  "2. 关闭燃气+电气系统（如是源头）",
                  "3. 关闭舱口/门（隔绝氧气）",
                  "4. 抓灭火器",
                  "5. 穿上救生衣（准备弃船）",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Fighting Fire", ru: "Борьба с огнём", zh: "灭火" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Use correct extinguisher type:",
                  "  - A: Wood, paper, cloth (water OK)",
                  "  - B: Fuel, oil, grease (foam/CO2, NO WATER!)",
                  "  - C: Electrical (CO2, NO WATER!)",
                  "Aim at BASE of flames, sweep side-to-side",
                  "Stay low (smoke rises)",
                  "Approach from upwind if possible",
                  "Have escape route",
                ],
                ru: [
                  "Используйте правильный тип огнетушителя:",
                  "  - A: Дерево, бумага, ткань (вода OK)",
                  "  - B: Топливо, масло, жир (пена/CO2, БЕЗ ВОДЫ!)",
                  "  - C: Электрика (CO2, БЕЗ ВОДЫ!)",
                  "Целиться в ОСНОВАНИЕ пламени, подметать из стороны в сторону",
                  "Держитесь низко (дым поднимается)",
                  "Подходите с наветренной стороны, если возможно",
                  "Имейте путь отхода",
                ],
                zh: [
                  "使用正确的灭火器类型：",
                  "  - A：木材、纸张、布（可用水）",
                  "  - B：燃料、油、油脂（泡沫/CO2，禁用水！）",
                  "  - C：电气（CO2，禁用水！）",
                  "瞄准火焰底部，左右扫射",
                  "保持低姿（烟雾上升）",
                  "尽可能从上风侧接近",
                  "保留逃生路线",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "If engine fire: don't open engine compartment! Oxygen rush can cause explosion. Use CO2 system if installed.",
                ru: "Если пожар двигателя: не открывайте моторный отсек! Приток кислорода может вызвать взрыв. Используйте систему CO2, если установлена.",
                zh: "如发动机着火：不要打开机舱！氧气涌入可能引起爆炸。如已安装请使用CO2系统。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "When to Abandon", ru: "Когда покидать судно", zh: "何时弃船" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Fire out of control (entire cabin involved)",
                  "Fuel/gas lines threatened",
                  "Smoke too thick to breathe",
                  "Explosive materials nearby",
                ],
                ru: [
                  "Пожар вышел из-под контроля (охвачена вся каюта)",
                  "Под угрозой топливные/газовые магистрали",
                  "Дым слишком густой для дыхания",
                  "Взрывоопасные материалы рядом",
                ],
                zh: [
                  "火势失控（整个舱室着火）",
                  "燃料/燃气管路受威胁",
                  "烟雾太浓无法呼吸",
                  "附近有爆炸物",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Stay with vessel as long as safe - it's bigger, more visible than life raft. Abandon only when necessary.",
                ru: "Оставайтесь с судном, пока безопасно - оно больше и заметнее спасплота. Покидайте только когда необходимо.",
                zh: "只要安全就留在船上 - 它比救生筏更大、更显眼。只在必要时弃船。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Flooding",
            ru: "Затопление",
            zh: "进水",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Immediate Actions", ru: "Немедленные действия", zh: "立即行动" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Locate source of water",
                  "2. Start ALL bilge pumps (manual + electric)",
                  "3. All hands bail (buckets, pots, anything!)",
                  "4. Try to reduce inflow",
                ],
                ru: [
                  "1. Найдите источник воды",
                  "2. Запустите ВСЕ осушительные помпы (ручные + электрические)",
                  "3. Все вычерпывают (ведра, кастрюли, всё что есть!)",
                  "4. Попытайтесь уменьшить поток",
                ],
                zh: [
                  "1. 找到进水源",
                  "2. 启动所有舱底泵（手动+电动）",
                  "3. 全员舀水（桶、锅、任何东西！）",
                  "4. 试图减少进水",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Reducing Inflow", ru: "Уменьшение потока", zh: "减少进水" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Through-hull damage: push cushion/mattress against hole",
                  "Seacock failure: stuff rags, wedge wood, apply collision mat",
                  "Hose failure: clamp, tape, or cut and plug seacock",
                  "Deck leak: tarps, duct tape, anything to cover",
                ],
                ru: [
                  "Повреждение корпуса: прижмите подушку/матрас к пробоине",
                  "Поломка кингстона: затолкайте тряпки, вбейте дерево, приложите пластырь",
                  "Разрыв шланга: зажмите, обмотайте, или обрежьте и заглушите кингстон",
                  "Течь с палубы: брезент, скотч, чем угодно закройте",
                ],
                zh: [
                  "穿孔损坏：用垫子/床垫堵住破洞",
                  "海底阀失效：塞破布、楔木头、敷碰撞垫",
                  "软管破裂：夹紧、胶带或割断并堵海底阀",
                  "甲板漏水：篷布、胶带、任何东西覆盖",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Temporary Patches", ru: "Временные заплатки", zh: "临时修补" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Collision mat (canvas + lines): drape over hole from outside, water pressure holds it",
                  "Pillows/cushions tied with lines: push into hole",
                  "Wood + underwater epoxy: if you have time",
                  "Duct tape: surprisingly effective on small holes",
                ],
                ru: [
                  "Пластырь (брезент + концы): накиньте на пробоину снаружи, давление воды прижмёт",
                  "Подушки/матрацы привязанные концами: втолкните в пробоину",
                  "Дерево + подводная эпоксидка: если есть время",
                  "Скотч: удивительно эффективен на небольших пробоинах",
                ],
                zh: [
                  "碰撞垫（帆布+绳索）：从外侧盖住破洞，水压会压住",
                  "枕头/垫子用绳绑：塞进破洞",
                  "木头+水下环氧树脂：如有时间",
                  "胶带：对小洞出奇有效",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "If water ingress exceeds pump capacity and can't be stopped: prepare to abandon. Send MAYDAY before electrical systems fail!",
                ru: "Если поток воды превышает мощность помп и не может быть остановлен: готовьтесь к покиданию. Отправьте MAYDAY до отказа электросистем!",
                zh: "如进水超过泵能力且无法阻止：准备弃船。在电气系统失效前发送求救！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Medical Emergencies",
            ru: "Медицинские чрезвычайные ситуации",
            zh: "医疗紧急情况",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Severe Injury / Illness", ru: "Тяжёлая травма / Болезнь", zh: "严重伤病" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Assess: Breathing? Bleeding? Conscious?",
                  "Stabilize: Stop bleeding, secure airway, CPR if needed",
                  "Radio for advice: VHF Ch 16 → Coast Guard → Medical consultation",
                  "Consider evacuation: PAN-PAN MEDICO or MAYDAY if life-threatening",
                ],
                ru: [
                  "Оцените: Дышит? Кровотечение? В сознании?",
                  "Стабилизируйте: Остановите кровотечение, обеспечьте дыхательные пути, СЛР если нужно",
                  "Вызовите по радио консультацию: VHF 16 канал → Береговая охрана → Медицинская консультация",
                  "Рассмотрите эвакуацию: PAN-PAN MEDICO или MAYDAY, если угрожает жизни",
                ],
                zh: [
                  "评估：呼吸？出血？有意识？",
                  "稳定：止血、确保气道、必要时CPR",
                  "无线电求助：VHF 16频道 → 海岸警卫队 → 医疗咨询",
                  "考虑疏散：PAN-PAN MEDICO或危及生命时MAYDAY",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "When to Call for Evacuation", ru: "Когда вызывать эвакуацию", zh: "何时呼叫疏散" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Unconsciousness (not seasickness)",
                  "Severe bleeding (can't control)",
                  "Chest pain (potential heart attack)",
                  "Difficulty breathing (not asthma with inhaler working)",
                  "Suspected stroke (facial droop, arm weakness, speech difficulty)",
                  "Severe burns (>10% body or face/hands)",
                  "Spinal injury (don't move person!)",
                ],
                ru: [
                  "Потеря сознания (не морская болезнь)",
                  "Сильное кровотечение (не можете остановить)",
                  "Боль в груди (возможный инфаркт)",
                  "Затруднённое дыхание (не астма с работающим ингалятором)",
                  "Подозрение на инсульт (опущение лица, слабость руки, проблемы с речью)",
                  "Тяжёлые ожоги (>10% тела или лицо/руки)",
                  "Травма позвоночника (не двигайте человека!)",
                ],
                zh: [
                  "失去意识（非晕船）",
                  "严重出血（无法控制）",
                  "胸痛（可能心脏病发作）",
                  "呼吸困难（非哮喘吸入剂有效）",
                  "疑似中风（面部下垂、手臂无力、言语困难）",
                  "严重烧伤（>10%身体或脸/手）",
                  "脊柱损伤（不要移动患者！）",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Radio Call", ru: "Радиовызов", zh: "无线电呼叫" }[l] as string,
            },
            {
              type: "code",
              content: {
                en: `PAN-PAN MEDICO (urgency):
"PAN-PAN, PAN-PAN, PAN-PAN
ALL SHIPS, ALL SHIPS, ALL SHIPS
This is [VESSEL] x3
Position: [GPS]
Medical emergency
[Brief description: unconscious crew, chest pain, etc.]
Requesting medical advice
Over"

MAYDAY (life-threatening):
"MAYDAY, MAYDAY, MAYDAY
Medical evacuation required
[Details]"`,
                ru: `PAN-PAN MEDICO (срочность):
"PAN-PAN, PAN-PAN, PAN-PAN
ALL SHIPS, ALL SHIPS, ALL SHIPS
This is [СУДНО] x3
Position: [GPS]
Medical emergency (Медицинская чрезвычайная ситуация)
[Краткое описание: без сознания, боль в груди и т.д.]
Requesting medical advice
Over"

MAYDAY (угрожает жизни):
"MAYDAY, MAYDAY, MAYDAY
Medical evacuation required
[Детали]"`,
                zh: `PAN-PAN MEDICO（紧急）：
"PAN-PAN, PAN-PAN, PAN-PAN
ALL SHIPS, ALL SHIPS, ALL SHIPS
This is [船舶] x3
Position: [GPS]
Medical emergency（医疗紧急情况）
[简要描述：船员昏迷、胸痛等]
Requesting medical advice
Over"

MAYDAY（危及生命）：
"MAYDAY, MAYDAY, MAYDAY
Medical evacuation required
[详情]"`,
              }[l] as string,
            },
            {
              type: "tip",
              content: {
                en: "Coast Guard can patch you through to doctors for remote consultation. Have patient details ready: age, symptoms, vital signs, medications.",
                ru: "Береговая охрана может соединить вас с врачами для дистанционной консультации. Подготовьте данные пациента: возраст, симптомы, жизненные показатели, лекарства.",
                zh: "海岸警卫队可以为您接通医生进行远程咨询。准备好患者详情：年龄、症状、生命体征、用药。",
              }[l] as string,
            },
          ],
        },
      ];
    },
  },
];
