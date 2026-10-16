import { EXTRA_LANGS, extraDict, type ExtraLang } from "./i18n-extra";

export type CoreLang = "en" | "ru" | "zh";
export type Lang = CoreLang | ExtraLang;

export const LANGS: Lang[] = ["en", "ru", "zh", ...EXTRA_LANGS];
export const PRIMARY_LANGS: Lang[] = ["en", "ru", "zh"];

export const LANG_META: Record<Lang, { code: string; name: string }> = {
  en: { code: "EN", name: "English" },
  ru: { code: "RU", name: "Русский" },
  zh: { code: "中", name: "中文" },
  de: { code: "DE", name: "Deutsch" },
  es: { code: "ES", name: "Español" },
  fr: { code: "FR", name: "Français" },
  it: { code: "IT", name: "Italiano" },
  nl: { code: "NL", name: "Nederlands" },
  sv: { code: "SV", name: "Svenska" },
  no: { code: "NO", name: "Norsk" },
  hr: { code: "HR", name: "Hrvatski" },
  cs: { code: "CZ", name: "Čeština" },
};

const LANG_KEY = "vhf-panic-lang";
const COMIC_LANGS: Lang[] = ["en", "ru", "zh"];

const LOCALE: Record<Lang, string> = {
  en: "en",
  ru: "ru",
  zh: "zh-CN",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  nl: "nl",
  sv: "sv",
  no: "nb",
  hr: "hr",
  cs: "cs",
};

type Dict = Record<string, { en: string; ru: string; zh: string }>;

const dict: Dict = {
  appName: { en: "Skipper's Companion", ru: "Справочник Шкипера", zh: "船长指南" },
  tagline: {
    en: "Your complete guide to safe sailing: VHF radio, navigation, safety, and practical seamanship.",
    ru: "Полный справочник безопасного плавания: VHF радио, навигация, безопасность и морское дело.",
    zh: "安全航行完整指南：VHF 无线电、导航、安全和实用航海技术。",
  },
  continue: { en: "Continue", ru: "Продолжить", zh: "继续" },
  next: { en: "Next", ru: "Далее", zh: "下一步" },
  back: { en: "Back", ru: "Назад", zh: "返回" },
  save: { en: "Save", ru: "Сохранить", zh: "保存" },
  home: { en: "Home", ru: "Домой", zh: "首页" },
  copy: { en: "Copy", ru: "Копировать", zh: "复制" },
  copied: { en: "Message copied", ru: "Сообщение скопировано", zh: "已复制报文" },
  copyFailed: { en: "Copy failed", ru: "Не удалось скопировать", zh: "复制失败" },
  saved: { en: "Vessel info saved", ru: "Данные судна сохранены", zh: "船舶资料已保存" },
  start: { en: "Start", ru: "Начать", zh: "开始" },
  about: { en: "About", ru: "О приложении", zh: "关于应用" },
  gpsUpdate: { en: "Determine GPS", ru: "Определить GPS", zh: "确定 GPS" },
  gpsPending: { en: "GPS pending", ru: "GPS ожидается", zh: "GPS 等待中" },
  gpsOk: { en: "GPS OK", ru: "GPS есть", zh: "GPS 正常" },
  gpsFailed: { en: "GPS failed", ru: "GPS нет", zh: "无 GPS" },
  gpsToast: { en: "GPS — {value}", ru: "GPS — {value}", zh: "GPS — {value}" },
  gpsTitle: { en: "Determine GPS", ru: "Определить GPS", zh: "确定 GPS" },
  gpsCurrent: { en: "Current position", ru: "Текущая позиция", zh: "当前位置" },
  gpsUndefined: { en: "Not defined yet", ru: "Ещё не задана", zh: "尚未设定" },
  gpsAuto: { en: "Get automatically", ru: "Получить автоматически", zh: "自动获取" },
  gpsAutoTrying: {
    en: "Asking the device for a fix…",
    ru: "Запрашиваем координаты у устройства…",
    zh: "正在向设备请求定位…",
  },
  gpsAutoOk: {
    en: "Position received from the device.",
    ru: "Координаты получены с устройства.",
    zh: "已从设备获得位置。",
  },
  gpsAutoFail: {
    en: "The device could not get a fix. Enter coordinates or mark the yacht on the map.",
    ru: "Устройство не смогло определить позицию. Введите координаты или отметьте яхту на карте.",
    zh: "设备无法定位。请手动输入坐标，或在地图上标记游艇。",
  },
  gpsManual: { en: "Enter coordinates", ru: "Ввести вручную", zh: "手动输入" },
  gpsMap: { en: "Pick on map", ru: "Указать на карте", zh: "在地图上标注" },
  gpsMapTitle: { en: "Yacht on the map", ru: "Яхта на карте", zh: "地图上的游艇" },
  gpsMapHint: {
    en: "Tap the map to drop a marker where the yacht is. You can drag it.",
    ru: "Нажмите на карте, где яхта. Маркер можно подвинуть.",
    zh: "点击地图标记游艇位置，可拖动标记。",
  },
  gpsMapConfirm: { en: "Use this point", ru: "Взять эту точку", zh: "使用此点" },
  gpsSave: { en: "Save position", ru: "Сохранить позицию", zh: "保存位置" },
  errGps: { en: "Set a position first", ru: "Сначала укажите позицию", zh: "请先设定位置" },
  errMap: { en: "Tap the map to place a marker", ru: "Поставьте маркер на карте", zh: "请在地图上放置标记" },
  boatCardMeta: {
    en: "{loaFt} ft / {loaM} m · draught {draught} m · beam {beam} m · crew {crew}",
    ru: "{loaFt} фут / {loaM} м · осадка {draught} м · ширина {beam} м · экипаж {crew}",
    zh: "{loaFt} 英尺 / {loaM} 米 · 吃水 {draught} 米 · 船宽 {beam} 米 · 船员 {crew}",
  },

  emergency: { en: "Emergency", ru: "Авария", zh: "紧急" },
  callMarine: { en: "Call marina", ru: "Вызов марины", zh: "呼叫码头" },
  callVessel: { en: "Call vessel", ru: "Вызов судна", zh: "呼叫船舶" },
  vesselInfo: { en: "Vessel info", ru: "О судне", zh: "船舶资料" },
  lastMessage: { en: "Message", ru: "Сообщение", zh: "报文" },
  vhfManual: { en: "Phonetic alphabet", ru: "Фонетический алфавит", zh: "音标字母" },

  welcomeTitle: {
    en: "A calm voice on Channel 16",
    ru: "Спокойный голос на 16-м канале",
    zh: "16 频道上的冷静声音",
  },
  welcomeLead: {
    en: "VHF Panic is a pocket prompt for new skippers: it helps you say the right words on the radio in Seaspeak when it matters.",
    ru: "VHF Panic — подсказка для новых шкиперов приложение помогает сказать правильные слова в рацию на Seaspeak, когда это важно.",
    zh: "VHF Panic 是给新船长的口袋提示：在关键时刻帮你用 Seaspeak 在电台上说出正确的话。",
  },
  speak: { en: "Speak", ru: "Озвучить", zh: "朗读" },
  speaking: { en: "Stop", ru: "Стоп", zh: "停止" },
  welcomeHow: { en: "How it works", ru: "Как пользоваться", zh: "如何使用" },
  welcomeStep1: {
    en: "Fill in your yacht: name, length, beam, draught and crew.",
    ru: "Заполните данные яхты: имя, длину, ширину, осадку и экипаж.",
    zh: "填写游艇资料：船名、船长、船宽、吃水和船员。",
  },
  welcomeStep2: {
    en: "Choose the situation: distress, marina or another vessel.",
    ru: "Выберите ситуацию: авария, марина или другое судно.",
    zh: "选择情景：遇险、码头或他船。",
  },
  welcomeStep3: {
    en: "Read the finished message slowly, calmly and loudly on VHF.",
    ru: "Прочитайте готовый текст медленно, спокойно и громко по УКВ.",
    zh: "在 VHF 上缓慢、冷静、大声读出生成的报文。",
  },
  welcomeNote: {
    en: "Radio phrases stay in English — that is the language of VHF. The rest of the app can be switched to your language.",
    ru: "Фразы для рации остаются на английском — так принято на VHF. Интерфейс можно переключить на ваш язык.",
    zh: "电台用语保持英语——这是 VHF 的语言。界面可切换为你的语言。",
  },
  comicAlt: {
    en: "Seven-panel comic: a yacht crew hopes they will not need the radio, then a cargo ship appears and they call with VHF Panic.",
    ru: "Комикс из семи кадров: экипаж яхты надеется, что по рации говорить не придётся, затем появляется сухогруз и они вызывают его через VHF Panic.",
    zh: "七格漫画：游艇船员希望不必用电台，随后货轮出现，他们用 VHF Panic 呼叫。",
  },
  themeLight: { en: "Light theme", ru: "Светлая тема", zh: "浅色主题" },
  themeDark: { en: "Dark theme", ru: "Тёмная тема", zh: "深色主题" },
  moreLanguages: { en: "More languages", ru: "Другие языки", zh: "更多语言" },
  statsTitle: { en: "Statistics", ru: "Статистика", zh: "统计" },
  statsLoading: { en: "Loading…", ru: "Загрузка…", zh: "加载中…" },
  statsFailed: { en: "Could not load statistics", ru: "Не удалось загрузить статистику", zh: "无法加载统计" },
  statsVisits: { en: "Visits", ru: "Посещения", zh: "访问" },
  statsProcesses: { en: "Calls", ru: "Вызовы", zh: "呼叫" },
  statsMonth: { en: "Month", ru: "Месяц", zh: "月份" },
  statsChart: { en: "Visits and calls by month", ru: "Посещения и вызовы по месяцам", zh: "按月的访问和呼叫" },
  statsHint: {
    en: "A visit is counted once per session. A call is each finished Seaspeak message.",
    ru: "Посещение считается один раз за сеанс. Вызов — каждое готовое Seaspeak-сообщение.",
    zh: "一次会话只计一次访问。每份完成的 Seaspeak 报文计为一次呼叫。",
  },

  mayday: { en: "MAYDAY — life at risk", ru: "MAYDAY — жизнь в опасности", zh: "MAYDAY — 生命危险" },
  panpan: { en: "PANPAN — boat in danger", ru: "PANPAN — судно в опасности", zh: "PANPAN — 船舶遇险" },
  receivedMayday: { en: "Received MAYDAY", ru: "Принят MAYDAY", zh: "收到 MAYDAY" },
  cancelDistress: { en: "Cancel my distress", ru: "Отмена distress", zh: "取消遇险" },

  whatGoingOn: { en: "What is going on?", ru: "Что происходит?", zh: "发生了什么？" },
  choosePurpose: { en: "Choose your call purpose", ru: "Цель вызова", zh: "呼叫目的" },
  indicateSituation: { en: "Indicate your situation", ru: "Ваша ситуация", zh: "说明情况" },
  indicateVessel: { en: "Indicate vessel name or type", ru: "Имя или тип судна", zh: "船名或船型" },
  yourPosition: { en: "Your position?", ru: "Ваше место относительно него?", zh: "你的相对位置？" },
  howMuchTime: { en: "How much time do you have?", ru: "Сколько у вас времени?", zh: "还有多少时间？" },
  definePosition: { en: "Define your position", ru: "Укажите координаты", zh: "设定坐标" },
  phonetic: { en: "Phonetic alphabet", ru: "Фонетический алфавит", zh: "音标字母" },
  calmLoud: { en: "Calm and loud", ru: "Спокойно и громко", zh: "冷静大声" },
  messageTitle: { en: "Message", ru: "Сообщение", zh: "报文" },
  seaspeakNote: {
    en: "Read in English. This is the text for the radio.",
    ru: "Читайте по-английски. Это текст для рации.",
    zh: "请用英语读出。这是电台文本。",
  },

  disasterMob: { en: "Man overboard", ru: "Человек за бортом", zh: "人员落水" },
  disasterFire: { en: "On fire", ru: "Пожар", zh: "火灾" },
  disasterSinking: { en: "Sinking", ru: "Затопление", zh: "沉没" },
  disasterCollision: { en: "Collision", ru: "Столкновение", zh: "碰撞" },
  disasterDrift: { en: "Disabled and drift", ru: "Потеря хода, дрейф", zh: "失去动力并漂流" },
  disasterMed: { en: "Need medical assistance", ru: "Нужна медпомощь", zh: "需要医疗援助" },
  disasterEvac: { en: "Need medical evacuation", ru: "Нужна эвакуация", zh: "需要医疗撤离" },
  disasterEpirb: { en: "EPIRB emission", ru: "Сработал EPIRB", zh: "EPIRB 已启动" },
  disasterGround: { en: "Grounding", ru: "Посадка на мель", zh: "搁浅" },
  disasterFlood: { en: "Flooding", ru: "Поступление воды", zh: "进水" },
  disasterAbandon: { en: "Abandoning boat", ru: "Покидаем судно", zh: "弃船" },

  timeLeave: { en: "We are leaving the boat", ru: "Покидаем судно", zh: "我们正在离船" },
  time30: { en: "About 30 minutes", ru: "Около 30 минут", zh: "大约 30 分钟" },
  time1h: { en: "1 hour", ru: "1 час", zh: "1 小时" },
  time2h: { en: "2 hours", ru: "2 часа", zh: "2 小时" },
  time3h: { en: "3 hours", ru: "3 часа", zh: "3 小时" },
  time4h: { en: "4 hours", ru: "4 часа", zh: "4 小时" },
  time10h: { en: "10 hours", ru: "10 часов", zh: "10 小时" },

  placeToStay: { en: "We need a place to stay", ru: "Нужно место на стоянке", zh: "需要泊位" },
  homeMarina: { en: "We are coming to home marina", ru: "Идём в домашнюю марину", zh: "正在返回母港码头" },
  customs: {
    en: "I am asking a place at the customs pier to pass border formalities",
    ru: "Прошу место у таможенного причала для оформления",
    zh: "请求海关码头泊位办理进出境手续",
  },
  marinaName: { en: "Name of calling marina", ru: "Название марины", zh: "码头名称" },
  marinaPlaceholder: { en: "Marina name", ru: "Имя марины", zh: "码头名" },
  needAssist: { en: "Need assistance", ru: "Нужна помощь", zh: "需要协助" },

  vesselCall: { en: "Call vessel", ru: "Вызвать судно", zh: "呼叫船舶" },
  giveWay: { en: "Inform that you are giving way", ru: "Сообщить, что уступаем дорогу", zh: "告知正在让路" },
  askWay: { en: "Ask to give way", ru: "Попросить уступить дорогу", zh: "请求让路" },
  clarify: { en: "Clarify intentions of another ship", ru: "Уточнить намерения другого судна", zh: "询问他船意图" },
  vesselName: { en: "Vessel name", ru: "Имя судна", zh: "船名" },
  vesselNamePh: { en: "Write vessel name here", ru: "Введите имя судна", zh: "在此输入船名" },
  sailingYacht: { en: "Sailing yacht", ru: "Парусная яхта", zh: "帆船" },
  motorYacht: { en: "Motor yacht", ru: "Моторная яхта", zh: "摩托艇" },
  cargoShip: { en: "Cargo ship", ru: "Грузовое судно", zh: "货船" },
  passengersShip: { en: "Passenger ship", ru: "Пассажирское судно", zh: "客船" },

  posBow: { en: "1 — Bow", ru: "1 — Нос", zh: "1 — 船首" },
  posPort: { en: "2 — Port", ru: "2 — Левый борт", zh: "2 — 左舷" },
  posStarboard: { en: "3 — Starboard", ru: "3 — Правый борт", zh: "3 — 右舷" },
  posStern: { en: "4 — Stern", ru: "4 — Корма", zh: "4 — 船尾" },
  shipsAlt: {
    en: "Your yacht relative to another vessel: 1 bow, 2 port, 3 starboard, 4 stern",
    ru: "Ваша яхта относительно другого судна: 1 нос, 2 левый борт, 3 правый борт, 4 корма",
    zh: "本船相对他船：1 船首，2 左舷，3 右舷，4 船尾",
  },

  lat: { en: "Latitude", ru: "Широта", zh: "纬度" },
  lon: { en: "Longitude", ru: "Долгота", zh: "经度" },
  latShort: { en: "LAT", ru: "Ш", zh: "纬" },
  lonShort: { en: "LON", ru: "Д", zh: "经" },
  deg: { en: "Deg", ru: "Град", zh: "度" },
  min: { en: "Min", ru: "Мин", zh: "分" },
  sec: { en: "Sec", ru: "Сек", zh: "秒" },
  checkVhf: { en: "Check your VHF for coordinates.", ru: "Сверьте координаты с УКВ.", zh: "请与 VHF 上的坐标核对。" },

  cancelIntro: {
    en: "Write date and time of your distress signal.",
    ru: "Укажите дату и время вашего сигнала бедствия.",
    zh: "填写遇险信号的日期和时间。",
  },
  timeOfMessage: { en: "Time of the message", ru: "Время сообщения", zh: "报文时间" },
  dateOfMessage: { en: "Date of the message", ru: "Дата сообщения", zh: "报文日期" },
  receivedMessage: { en: "Received message", ru: "Принятое сообщение", zh: "收到的报文" },

  boatName: { en: "Boat name", ru: "Имя яхты", zh: "船名" },
  fillManual: { en: "Fill manually", ru: "Вручную", zh: "手动填写" },
  fillTemplate: { en: "Yacht series", ru: "Серия яхты", zh: "游艇系列" },
  seriesHint: {
    en: "Pick a model to fill LOA, beam and draught. You can still edit the numbers.",
    ru: "Выберите модель — заполнятся длина, ширина и осадка. Цифры можно поправить.",
    zh: "选择型号以填写船长、船宽和吃水，数字仍可修改。",
  },
  seriesSearch: { en: "Search series…", ru: "Найти серию…", zh: "搜索系列…" },
  loaFt: { en: "L.O.A. (feet)", ru: "Длина наибольшая, футы", zh: "总长（英尺）" },
  loaM: { en: "L.O.A. (metres)", ru: "Длина наибольшая, метры", zh: "总长（米）" },
  draught: { en: "Draught (metres)", ru: "Осадка, метры", zh: "吃水（米）" },
  beam: { en: "Beam (metres)", ru: "Ширина, метры", zh: "船宽（米）" },
  crew: { en: "Crew on board", ru: "Экипаж на борту", zh: "在船船员" },
  selectedYacht: { en: "Selected yacht", ru: "Выбранная яхта", zh: "已选游艇" },
  builder: { en: "Builder", ru: "Верфь", zh: "船厂" },

  errPurpose: { en: "Choose the call purpose", ru: "Выберите цель вызова", zh: "请选择呼叫目的" },
  errDisaster: { en: "Choose what is going on", ru: "Выберите, что происходит", zh: "请选择当前情况" },
  errTime: { en: "Choose how much time you have", ru: "Выберите, сколько есть времени", zh: "请选择剩余时间" },
  errVariant: { en: "Check the variant", ru: "Отметьте вариант", zh: "请选择一项" },
  errVessel: { en: "Check vessel type or put the name", ru: "Укажите тип или имя судна", zh: "请填写船型或船名" },
  errPosition: { en: "Define your position", ru: "Укажите вашу позицию", zh: "请设定你的位置" },
  noMessage: { en: "No message yet.", ru: "Сообщения ещё нет.", zh: "尚无报文。" },
  boatSummary: {
    en: "Boat {name}. Length {loaFt} ft / {loaM} m, draught {draught} m, beam {beam} m, GPS: {gps}",
    ru: "Яхта {name}. Длина {loaFt} фут / {loaM} м, осадка {draught} м, ширина {beam} м, GPS: {gps}",
    zh: "游艇 {name}。船长 {loaFt} 英尺 / {loaM} 米，吃水 {draught} 米，船宽 {beam} 米，GPS：{gps}",
  },
  hint06: {
    en: "If nothing specific, use channels 06 or 13",
    ru: "Если в лоции не указано иначе — каналы 06 или 13",
    zh: "如无特别规定，使用 06 或 13 频道",
  },
  hintMarina: {
    en: "If nothing specific in the pilot, use channels 09, 72, 71",
    ru: "Если в лоции не указано иначе — каналы 09, 72, 71",
    zh: "如航海指南无特别规定，使用 09、72、71 频道",
  },

  // Knowledge Base
  skippersGuide: { en: "Skipper's Guide", ru: "Справочник шкипера", zh: "船长指南" },
  knowledge: { en: "Knowledge", ru: "Знания", zh: "知识库" },

  // Categories
  catNavigation: { en: "Navigation & Safety", ru: "Навигация и безопасность", zh: "导航与安全" },
  catNavigationDesc: {
    en: "Lights, COLREGS, buoys, emergencies",
    ru: "Огни, МППСС, буи, аварии",
    zh: "灯光、避碰规则、浮标、紧急情况",
  },
  catSeamanship: { en: "Seamanship", ru: "Морское дело", zh: "航海技能" },
  catSeamanshipDesc: {
    en: "Knots, anchoring, docking",
    ru: "Узлы, якорная стоянка, швартовка",
    zh: "绳结、抛锚、停靠",
  },
  catVhf: { en: "VHF Radio Guide", ru: "Справочник VHF", zh: "VHF 无线电指南" },
  catVhfDesc: {
    en: "Channels, procedures, DSC",
    ru: "Каналы, процедуры, DSC",
    zh: "频道、程序、DSC",
  },
  catMedical: { en: "Medical & Comfort", ru: "Медицина и комфорт", zh: "医疗与舒适" },
  catMedicalDesc: {
    en: "Seasickness, first aid",
    ru: "Укачивание, первая помощь",
    zh: "晕船、急救",
  },
  catChecklists: { en: "Checklists", ru: "Чеклисты", zh: "检查清单" },
  catChecklistsDesc: {
    en: "Pre-charter, departure, daily",
    ru: "Приёмка, выход, ежедневные",
    zh: "租船前、出发、每日",
  },
  catWeather: { en: "Weather", ru: "Погода", zh: "天气" },
  catWeatherDesc: {
    en: "Reading forecasts, barometer",
    ru: "Чтение прогнозов, барометр",
    zh: "预报解读、气压计",
  },
  catNavBasics: { en: "Navigation Basics", ru: "Основы навигации", zh: "导航基础" },
  catNavBasicsDesc: {
    en: "Charts, bearings, dead reckoning",
    ru: "Карты, пеленги, счисление",
    zh: "海图、方位、推算定位",
  },
  catTroubleshooting: { en: "Troubleshooting", ru: "Неисправности", zh: "故障排除" },
  catTroubleshootingDesc: {
    en: "Engine, electrical problems",
    ru: "Двигатель, электрика",
    zh: "发动机、电气问题",
  },

  // VHF Articles
  vhfChannelsTitle: { en: "VHF Channels Reference", ru: "Справочник каналов VHF", zh: "VHF 频道参考" },
  vhfChannelsDesc: {
    en: "What each channel is for",
    ru: "Для чего каждый канал",
    zh: "各频道用途",
  },
  vhfDscTitle: { en: "DSC (Digital Selective Calling)", ru: "DSC (цифровой избирательный вызов)", zh: "DSC（数字选择呼叫）" },
  vhfDscDesc: {
    en: "Automatic MAYDAY and MMSI registration",
    ru: "Автоматический MAYDAY и регистрация MMSI",
    zh: "自动 MAYDAY 和 MMSI 注册",
  },
  vhfEtiquetteTitle: { en: "Radio Etiquette & Procedures", ru: "Этикет и процедуры", zh: "无线电礼仪与程序" },
  vhfEtiquetteDesc: {
    en: "How to speak on VHF, radio check",
    ru: "Как говорить по VHF, проверка связи",
    zh: "如何使用 VHF、通信检查",
  },

  // Checklist Articles
  preCharterTitle: { en: "Pre-Charter Inspection", ru: "Приёмка яхты", zh: "租船前检查" },
  preCharterDesc: {
    en: "Complete checklist before leaving",
    ru: "Полный чеклист перед выходом",
    zh: "离港前完整清单",
  },
  beforeDepartureTitle: { en: "Before Departure", ru: "Перед выходом", zh: "出发前" },
  beforeDepartureDesc: {
    en: "Weather, route, crew, systems",
    ru: "Погода, маршрут, экипаж, системы",
    zh: "天气、航线、船员、系统",
  },
  dailyChecksTitle: { en: "Daily Checks", ru: "Ежедневные проверки", zh: "每日检查" },
  dailyChecksDesc: {
    en: "Morning and evening routine",
    ru: "Утренний и вечерний осмотр",
    zh: "早晚常规检查",
  },
  emergencyBagTitle: { en: "Emergency Grab Bag", ru: "Аварийная сумка", zh: "应急包" },
  emergencyBagDesc: {
    en: "What to take if abandoning vessel",
    ru: "Что взять при покидании судна",
    zh: "弃船时携带物品",
  },

  // Navigation Articles
  navLightsTitle: { en: "Navigation Lights & Shapes", ru: "Навигационные огни и знаки", zh: "导航灯与标识" },
  navLightsDesc: {
    en: "Identify vessels at night",
    ru: "Опознавание судов ночью",
    zh: "夜间识别船舶",
  },
  colregsTitle: { en: "COLREGS Rules", ru: "Правила МППСС", zh: "避碰规则" },
  colregsDesc: {
    en: "Who gives way, right of way",
    ru: "Кто уступает, право пути",
    zh: "让路、优先通行权",
  },
  buoysTitle: { en: "Buoys & Marks", ru: "Буи и знаки", zh: "浮标与标志" },
  buoysDesc: {
    en: "IALA A/B, lateral, cardinal",
    ru: "IALA A/B, латеральные, кардинальные",
    zh: "IALA A/B、侧面、基点",
  },
  emergenciesTitle: { en: "Emergency Procedures", ru: "Аварийные процедуры", zh: "紧急程序" },
  emergenciesDesc: {
    en: "MOB, grounding, fire, flooding",
    ru: "ЧЗБ, посадка, пожар, затопление",
    zh: "落水、搁浅、火灾、进水",
  },

  // Seamanship Articles
  knotsTitle: { en: "Essential Knots", ru: "Основные узлы", zh: "基本绳结" },
  knotsDesc: {
    en: "Bowline, cleat hitch, figure eight",
    ru: "Булинь, кнехт, восьмёрка",
    zh: "单套结、系缆桩、八字结",
  },
  anchoringTitle: { en: "Anchoring", ru: "Якорная стоянка", zh: "抛锚" },
  anchoringDesc: {
    en: "Choosing spot, setting, scope",
    ru: "Выбор места, постановка, вытравливание",
    zh: "选址、下锚、锚链长度",
  },
  dockingTitle: { en: "Docking & Mooring", ru: "Швартовка", zh: "停靠与系泊" },
  dockingDesc: {
    en: "Alongside, Mediterranean mooring",
    ru: "Лагом, средиземноморская",
    zh: "靠泊、地中海式",
  },

  // Medical Articles
  seasicknessTitle: { en: "Seasickness", ru: "Укачивание", zh: "晕船" },
  seasicknessDesc: {
    en: "Prevention and treatment",
    ru: "Профилактика и лечение",
    zh: "预防与治疗",
  },
  firstAidTitle: { en: "First Aid Essentials", ru: "Основы первой помощи", zh: "急救要点" },
  firstAidDesc: {
    en: "Medical kit, common injuries",
    ru: "Аптечка, типичные травмы",
    zh: "医疗包、常见伤害",
  },

  // Weather Articles
  weatherReadingTitle: { en: "Weather Interpretation", ru: "Понимание погоды", zh: "天气解读" },
  weatherReadingDesc: {
    en: "Clouds, barometer, Beaufort",
    ru: "Облака, барометр, Бофорт",
    zh: "云层、气压计、蒲福风级",
  },
  weatherSourcesTitle: { en: "Weather Sources", ru: "Источники прогнозов", zh: "天气来源" },
  weatherSourcesDesc: {
    en: "VHF, apps, GRIB files",
    ru: "VHF, приложения, GRIB",
    zh: "VHF、应用、GRIB",
  },

  // Nav Basics Articles
  chartReadingTitle: { en: "Chart Reading", ru: "Чтение карт", zh: "海图阅读" },
  chartReadingDesc: {
    en: "Symbols, magnetic vs true",
    ru: "Символы, магн./ист. курс",
    zh: "符号、磁北与真北",
  },
  deadReckoningTitle: { en: "Dead Reckoning", ru: "Счисление пути", zh: "推算定位" },
  deadReckoningDesc: {
    en: "Position without GPS",
    ru: "Позиция без GPS",
    zh: "无 GPS 定位",
  },

  // Troubleshooting Articles
  engineProblemsTitle: { en: "Engine Troubleshooting", ru: "Неисправности двигателя", zh: "发动机故障" },
  engineProblemsDesc: {
    en: "Won't start, overheating",
    ru: "Не заводится, перегрев",
    zh: "无法启动、过热",
  },
  electricalProblemsTitle: { en: "Electrical Problems", ru: "Электрика", zh: "电气问题" },
  electricalProblemsDesc: {
    en: "Battery, charging, circuits",
    ru: "Аккумулятор, зарядка, цепи",
    zh: "电池、充电、电路",
  },

  // UI elements
  searchKnowledge: { en: "Search...", ru: "Поиск...", zh: "搜索..." },
  noResults: { en: "No results found", ru: "Ничего не найдено", zh: "未找到结果" },
  articles: { en: "articles", ru: "статей", zh: "篇" },
};

export function isLang(value: string | undefined | null): value is Lang {
  return Boolean(value && (LANGS as string[]).includes(value));
}

export function htmlLang(lang: Lang): string {
  return LOCALE[lang];
}

export function comicSrc(lang: Lang): string {
  const file = COMIC_LANGS.includes(lang) ? lang : "en";
  return `/comic/${file}.jpg`;
}

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* ignore */
  }
  const nav = navigator.language.toLowerCase();
  const prefix = nav.slice(0, 2);
  if (prefix === "nb" || prefix === "nn") return "no";
  if (prefix === "cz") return "cs";
  if (isLang(prefix)) return prefix;
  return "en";
}

export function persistLang(lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang);
}

export function t(lang: Lang, key: string, vars?: Record<string, string>): string {
  let out: string;
  if (lang === "en" || lang === "ru" || lang === "zh") {
    const row = dict[key];
    out = row ? row[lang] || row.en : key;
  } else {
    out = extraDict[key]?.[lang] || dict[key]?.en || key;
  }
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      out = out.replaceAll(`{${name}}`, value);
    }
  }
  return out;
}

const CORE_MONTHS: Record<CoreLang, string[]> = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ru: [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ],
  zh: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
};

export function monthNames(lang: Lang): string[] {
  if (lang === "en" || lang === "ru" || lang === "zh") return CORE_MONTHS[lang];
  return Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(htmlLang(lang), { month: "long" }).format(new Date(2020, i, 1)),
  );
}

export const MONTHS = new Proxy({} as Record<Lang, string[]>, {
  get(_target, prop: string) {
    return isLang(prop) ? monthNames(prop) : undefined;
  },
});

export const MONTHS_RADIO = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
