import type { KnowledgeArticle } from "./knowledge-types";
import type { Lang } from "./i18n";

export const WEATHER_ARTICLES: KnowledgeArticle[] = [
  {
    id: "weather-reading",
    category: "weather",
    titleKey: "weatherReadingTitle",
    descKey: "weatherReadingDesc",
    icon: "☁️",
    order: 1,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "Cloud Types & Meanings",
            ru: "Типы облаков и значение",
            zh: "云类型与含义",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Cirrus (high, wispy): Fair weather, but may indicate front approaching in 24-48h",
                  "Cumulus (puffy, white): Fair weather if small and scattered",
                  "Cumulonimbus (towering, dark): Thunderstorms! Avoid.",
                  "Stratus (low, gray sheet): Overcast, light rain/drizzle",
                  "Nimbostratus (dark, thick): Steady rain",
                  "Cirrostratus (high, thin layer): Halo around sun/moon = rain in 12-24h",
                ],
                ru: [
                  "Перистые (высокие, тонкие): Хорошая погода, но может означать приближение фронта через 24-48ч",
                  "Кучевые (пухлые, белые): Хорошая погода, если маленькие и разрозненные",
                  "Кучево-дождевые (высокие, тёмные): Грозы! Избегайте.",
                  "Слоистые (низкие, серая пелена): Пасмурно, лёгкий дождь/морось",
                  "Слоисто-дождевые (тёмные, толстые): Затяжной дождь",
                  "Перисто-слоистые (высокие, тонкая пелена): Гало вокруг солнца/луны = дождь через 12-24ч",
                ],
                zh: [
                  "卷云（高、纤细）：好天气，但可能预示24-48小时后锋面到来",
                  "积云（蓬松、白色）：小而分散时为好天气",
                  "积雨云（高耸、黑暗）：雷暴！避开。",
                  "层云（低、灰色层）：阴天，小雨/毛毛雨",
                  "雨层云（暗、厚）：持续降雨",
                  "卷层云（高、薄层）：日/月晕 = 12-24小时后降雨",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Barometer Trends",
            ru: "Тренды барометра",
            zh: "气压计趋势",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Rising rapidly (3+ mb/3h): Strong winds coming",
                  "Rising slowly: Fair weather continuing or improving",
                  "Steady: Current weather continues",
                  "Falling slowly: Worsening weather, still time",
                  "Falling rapidly (3+ mb/3h): Storm approaching SOON!",
                ],
                ru: [
                  "Быстро растёт (3+ мб/3ч): Приближается сильный ветер",
                  "Медленно растёт: Хорошая погода продолжается или улучшается",
                  "Стабильный: Текущая погода продолжается",
                  "Медленно падает: Погода ухудшается, но время есть",
                  "Быстро падает (3+ мб/3ч): Шторм приближается СКОРО!",
                ],
                zh: [
                  "快速上升（3+ 毫巴/3小时）：强风来临",
                  "缓慢上升：好天气继续或改善",
                  "稳定：当前天气持续",
                  "缓慢下降：天气恶化，还有时间",
                  "快速下降（3+ 毫巴/3小时）：风暴即将到来！",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Trend matters more than absolute value. Rapid change = significant weather event.",
                ru: "Тренд важнее абсолютного значения. Быстрое изменение = значительное погодное явление.",
                zh: "趋势比绝对值更重要。快速变化 = 重大天气事件。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Beaufort Scale (Wind Estimation)",
            ru: "Шкала Бофорта (оценка ветра)",
            zh: "蒲福风级（风力估计）",
          }[l] as string,
          children: [
            {
              type: "table",
              rows: [
                { force: "0", wind: "0 kt", desc: { en: "Calm - mirror sea", ru: "Штиль - зеркальное море", zh: "无风 - 镜面海" }[l] },
                { force: "1-2", wind: "1-6 kt", desc: { en: "Light air - ripples", ru: "Лёгкий ветер - рябь", zh: "软风 - 涟漪" }[l] },
                { force: "3", wind: "7-10 kt", desc: { en: "Gentle - small waves", ru: "Слабый - маленькие волны", zh: "微风 - 小浪" }[l] },
                { force: "4", wind: "11-16 kt", desc: { en: "Moderate - whitecaps", ru: "Умеренный - барашки", zh: "和风 - 白沫浪花" }[l] },
                { force: "5", wind: "17-21 kt", desc: { en: "Fresh - many whitecaps", ru: "Свежий - много барашков", zh: "清劲风 - 大量白沫" }[l] },
                { force: "6", wind: "22-27 kt", desc: { en: "Strong - spray", ru: "Сильный - брызги", zh: "强风 - 浪花飞溅" }[l] },
                { force: "7", wind: "28-33 kt", desc: { en: "Near gale - breaking waves", ru: "Крепкий - ломающиеся волны", zh: "疾风 - 破浪" }[l] },
                { force: "8+", wind: "34+ kt", desc: { en: "Gale / Storm - don't go out!", ru: "Шторм / Буря - не выходите!", zh: "大风/风暴 - 不要出海！" }[l] },
              ],
            },
            {
              type: "note",
              content: {
                en: "For new sailors: comfortable max is Force 4-5 (< 20 kt). Force 6+ is challenging.",
                ru: "Для новичков: комфортный максимум - сила 4-5 (< 20 узлов). Сила 6+ сложна.",
                zh: "新手：舒适上限是4-5级（<20节）。6级以上具有挑战性。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Weather Sayings (That Actually Work)",
            ru: "Погодные приметы (которые работают)",
            zh: "天气谚语（真实有效）",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "'Red sky at night, sailor's delight' - True! Red sunset = high pressure, clear weather",
                  "'Red sky in morning, sailor's warning' - True! Red dawn = low pressure approaching",
                  "'Mackerel sky, not 24 hours dry' - True! Cirrocumulus clouds = rain coming",
                  "'Rainbow in morning, sailors take warning' - True! Rainbow west = weather coming",
                ],
                ru: [
                  "'Красное небо вечером - морякам на радость' - Правда! Красный закат = высокое давление, ясная погода",
                  "'Красное небо утром - морякам предупреждение' - Правда! Красный рассвет = приближается низкое давление",
                  "'Макрелевое небо - сутки не сухо' - Правда! Перисто-кучевые облака = дождь идёт",
                  "'Радуга утром - морякам осторожность' - Правда! Радуга на западе = погода идёт",
                ],
                zh: [
                  "'晚霞行千里' - 真的！红色日落 = 高气压，晴朗天气",
                  "'朝霞不出门' - 真的！红色黎明 = 低压接近",
                  "'鲭鱼天，雨不干' - 真的！卷积云 = 雨要来",
                  "'早虹雨，晚虹晴' - 真的！西边彩虹 = 天气来",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Wave Height vs Period",
            ru: "Высота волн против периода",
            zh: "浪高与周期",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Wave period (time between waves) is as important as height:",
                ru: "Период волн (время между волнами) так же важен как высота:",
                zh: "浪周期（浪间隔时间）与浪高同样重要：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Short period (< 6s) + big waves = choppy, uncomfortable",
                  "Long period (> 10s) + big waves = rolly but manageable",
                  "Period < height (e.g., 1m waves every 4s) = rough!",
                  "Period > 2x height (e.g., 2m waves every 10s) = smooth",
                ],
                ru: [
                  "Короткий период (< 6с) + большие волны = толчея, некомфортно",
                  "Длинный период (> 10с) + большие волны = качка, но терпимо",
                  "Период < высоты (напр., волны 1м каждые 4с) = жёстко!",
                  "Период > 2× высоты (напр., волны 2м каждые 10с) = гладко",
                ],
                zh: [
                  "短周期（<6秒）+ 大浪 = 颠簸，不舒服",
                  "长周期（>10秒）+ 大浪 = 摇晃但可控",
                  "周期<浪高（例如1米浪每4秒）= 粗糙！",
                  "周期>2×浪高（例如2米浪每10秒）= 平稳",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "tip",
          content: {
            en: "Check multiple sources: official forecast, GRIB files, pilot charts, local knowledge. Always add safety margin!",
            ru: "Проверяйте несколько источников: официальный прогноз, файлы GRIB, лоции, местные знания. Всегда добавляйте запас безопасности!",
            zh: "查看多个来源：官方预报、GRIB文件、航海图、本地知识。始终留有安全余量！",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "weather-sources",
    category: "weather",
    titleKey: "weatherSourcesTitle",
    descKey: "weatherSourcesDesc",
    icon: "📡",
    order: 2,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "VHF Weather",
            ru: "Погода по VHF",
            zh: "VHF天气",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "USA: NOAA Weather Radio (WX1-WX7)",
                  "UK: Inshore Waters Forecast (times vary by region)",
                  "Europe: Various national services on designated channels",
                  "Updates every 3-6 hours typically",
                ],
                ru: [
                  "США: Погодное радио NOAA (WX1-WX7)",
                  "Великобритания: Прогноз прибрежных вод (время по регионам)",
                  "Европа: Различные национальные службы на выделенных каналах",
                  "Обновления обычно каждые 3-6 часов",
                ],
                zh: [
                  "美国：NOAA气象广播（WX1-WX7）",
                  "英国：近海水域预报（时间因地区而异）",
                  "欧洲：各国服务在指定频道",
                  "通常每3-6小时更新",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Online / Apps",
            ru: "Онлайн / Приложения",
            zh: "在线/应用",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Windy.com: Excellent visualization, multiple models",
                  "PredictWind: Marine-specific, routing",
                  "Windfinder: Spot forecasts for coastal areas",
                  "Navionics Boating: Integrated with charts",
                  "XCWeather: Good for Europe",
                ],
                ru: [
                  "Windy.com: Отличная визуализация, несколько моделей",
                  "PredictWind: Морской специфичный, маршрутизация",
                  "Windfinder: Точечные прогнозы для прибрежных зон",
                  "Navionics Boating: Интегрирован с картами",
                  "XCWeather: Хорош для Европы",
                ],
                zh: [
                  "Windy.com：出色可视化，多模型",
                  "PredictWind：海事专用，航线规划",
                  "Windfinder：沿海区域点预报",
                  "Navionics Boating：与海图集成",
                  "XCWeather：适合欧洲",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Download forecasts before leaving! Don't rely on having cell signal.",
                ru: "Скачайте прогнозы перед выходом! Не полагайтесь на наличие сотовой связи.",
                zh: "出发前下载预报！不要依赖手机信号。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "GRIB Files",
            ru: "Файлы GRIB",
            zh: "GRIB文件",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Gridded weather data - works with chartplotters and apps:",
                ru: "Сеточные погодные данные - работают с картплоттерами и приложениями:",
                zh: "网格化天气数据 - 适用于海图机和应用：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Small file size (good for satellite phone download)",
                  "Shows wind, pressure, waves, clouds",
                  "Update 2x daily",
                  "Apps: Windy, PredictWind, OpenCPN",
                ],
                ru: [
                  "Маленький размер файла (хорош для загрузки через спутниковый телефон)",
                  "Показывает ветер, давление, волны, облака",
                  "Обновление 2 раза в день",
                  "Приложения: Windy, PredictWind, OpenCPN",
                ],
                zh: [
                  "文件小（适合卫星电话下载）",
                  "显示风、气压、浪、云",
                  "每天更新2次",
                  "应用：Windy、PredictWind、OpenCPN",
                ],
              }[l] as string[],
            },
          ],
        },
      ];
    },
  },
];

export const NAV_BASICS_ARTICLES: KnowledgeArticle[] = [
  {
    id: "chart-reading",
    category: "nav-basics",
    titleKey: "chartReadingTitle",
    descKey: "chartReadingDesc",
    icon: "🗺️",
    order: 1,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "Common Chart Symbols",
            ru: "Общие символы карт",
            zh: "常见海图符号",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Depth numbers: meters or fathoms (check chart datum!)",
                  "Blue/white: water (darker = deeper)",
                  "Green: very shallow / drying (exposed at low tide)",
                  "Yellow/tan: land",
                  "Magenta: human-made (buoys, lights, harbors)",
                  "Rocks:",
                  "  • (dot) + depth = underwater rock",
                  "  * (asterisk) = rock awash at chart datum",
                  "  + = rock always above water",
                ],
                ru: [
                  "Цифры глубин: метры или сажени (проверьте датум карты!)",
                  "Синий/белый: вода (темнее = глубже)",
                  "Зелёный: очень мелко / осыхающие (обнажаются при отливе)",
                  "Жёлтый/рыжий: суша",
                  "Пурпурный: искусственное (буи, огни, порты)",
                  "Скалы:",
                  "  • (точка) + глубина = подводная скала",
                  "  * (звёздочка) = скала на уровне датума",
                  "  + = скала всегда над водой",
                ],
                zh: [
                  "水深数字：米或英寻（检查图基准！）",
                  "蓝/白：水（越暗越深）",
                  "绿色：极浅/干出（低潮露出）",
                  "黄/棕：陆地",
                  "品红：人工（浮标、灯、港口）",
                  "礁石：",
                  "  •（点）+深度 = 水下礁石",
                  "  *（星号）= 在图基准处礁石",
                  "  + = 礁石始终露出",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Magnetic vs True",
            ru: "Магнитный против истинного",
            zh: "磁北与真北",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Compass points to magnetic north, not true north:",
                ru: "Компас указывает на магнитный север, а не на истинный:",
                zh: "罗盘指向磁北，而非真北：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Variation: angle between true & magnetic north (shown on chart)",
                  "Deviation: local errors from boat's metal/electronics",
                  "True → Magnetic: subtract easterly variation (or add westerly)",
                  "Magnetic → True: add easterly variation (or subtract westerly)",
                ],
                ru: [
                  "Магнитное склонение: угол между истинным и магнитным севером (показан на карте)",
                  "Девиация: локальные ошибки от металла/электроники яхты",
                  "Истинный → Магнитный: вычитайте восточное склонение (или добавляйте западное)",
                  "Магнитный → Истинный: добавляйте восточное склонение (или вычитайте западное)",
                ],
                zh: [
                  "磁偏角：真北与磁北间的角度（图上标明）",
                  "自差：船上金属/电子设备的局部误差",
                  "真 → 磁：减东偏（或加西偏）",
                  "磁 → 真：加东偏（或减西偏）",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Mnemonic: 'True Virgins Make Dull Company, Add Whiskey' (True + Variation = Magnetic + Deviation = Compass, Add West)",
                ru: "Мнемоника: 'True Virgins Make Dull Company, Add Whiskey' (Истинный + Склонение = Магнитный + Девиация = Компас, Добавь Запад)",
                zh: "助记：'True Virgins Make Dull Company, Add Whiskey'（真+磁偏=磁+自差=罗经，加西）",
              }[l] as string,
            },
          ],
        },
        {
          type: "tip",
          content: {
            en: "Always verify chartplotter with visual bearings and depth sounder. Electronics can fail!",
            ru: "Всегда проверяйте картплоттер визуальными пеленгами и эхолотом. Электроника может отказать!",
            zh: "始终用目视方位和测深仪验证海图机。电子设备可能故障！",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "dead-reckoning",
    category: "nav-basics",
    titleKey: "deadReckoningTitle",
    descKey: "deadReckoningDesc",
    icon: "📐",
    order: 2,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "Estimating position based on course, speed, and time - essential backup if GPS fails.",
            ru: "Оценка позиции по курсу, скорости и времени - необходимый резерв при отказе GPS.",
            zh: "根据航向、速度和时间估算位置 - GPS故障时的必备后备。",
          }[l] as string,
        },
        {
          type: "accordion",
          title: {
            en: "Basic DR",
            ru: "Основы счисления",
            zh: "基础推算",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "1. Note last known position (GPS, visual fix)",
                  "2. Note course steered (compass)",
                  "3. Note speed (log, estimate)",
                  "4. Calculate: Distance = Speed × Time",
                  "5. Plot: from last position, direction = course, distance = calculated",
                ],
                ru: [
                  "1. Отметьте последнюю известную позицию (GPS, визуальная засечка)",
                  "2. Отметьте курс (компас)",
                  "3. Отметьте скорость (лаг, оценка)",
                  "4. Рассчитайте: Расстояние = Скорость × Время",
                  "5. Нанесите на карту: от последней позиции, направление = курс, расстояние = рассчитанное",
                ],
                zh: [
                  "1. 记录最后已知位置（GPS、目视定位）",
                  "2. 记录航向（罗盘）",
                  "3. 记录速度（计程仪、估算）",
                  "4. 计算：距离 = 速度 × 时间",
                  "5. 绘图：从上一位置，方向=航向，距离=计算值",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "DR doesn't account for current/leeway - it's an estimate! Check with visual bearings when possible.",
                ru: "Счисление не учитывает течение/снос - это оценка! Проверяйте визуальными пеленгами когда возможно.",
                zh: "推算不考虑流和偏流 - 这是估算！尽可能用目视方位核对。",
              }[l] as string,
            },
          ],
        },
      ];
    },
  },
];

export const TROUBLESHOOTING_ARTICLES: KnowledgeArticle[] = [
  {
    id: "engine-problems",
    category: "troubleshooting",
    titleKey: "engineProblemsTitle",
    descKey: "engineProblemsDesc",
    icon: "🔧",
    order: 1,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "Won't Start",
            ru: "Не заводится",
            zh: "无法启动",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Checklist", ru: "Чеклист", zh: "检查单" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "☐ Battery charged? (check voltage, try lights)",
                  "☐ Battery switches ON?",
                  "☐ Kill switch / cutoff engaged?",
                  "☐ Neutral safety (must be in neutral)",
                  "☐ Fuel: tank not empty? Fuel valve open?",
                  "☐ Air: air filter clogged?",
                  "☐ Glow plugs warmed up? (diesel)",
                ],
                ru: [
                  "☐ Батарея заряжена? (проверьте напряжение, попробуйте свет)",
                  "☐ Выключатели батареи ВКЛ?",
                  "☐ Аварийный стоп включён?",
                  "☐ Блокировка нейтрали (должна быть на нейтрали)",
                  "☐ Топливо: бак не пуст? Топливный кран открыт?",
                  "☐ Воздух: воздушный фильтр забит?",
                  "☐ Свечи накаливания прогреты? (дизель)",
                ],
                zh: [
                  "☐ 电池充电？（检查电压、试灯）",
                  "☐ 电池开关开启？",
                  "☐ 紧急停车开关/切断启动？",
                  "☐ 空档安全（必须在空档）",
                  "☐ 燃油：油箱非空？燃油阀打开？",
                  "☐ 空气：空气滤清器堵塞？",
                  "☐ 预热塞已预热？（柴油）",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Engine needs 3 things: fuel, air, spark (or compression for diesel). Check each!",
                ru: "Двигателю нужны 3 вещи: топливо, воздух, искра (или компрессия для дизеля). Проверьте каждое!",
                zh: "发动机需要3样：燃油、空气、火花（柴油则需压缩）。逐项检查！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Overheating",
            ru: "Перегрев",
            zh: "过热",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Immediate Action", ru: "Немедленные действия", zh: "立即行动" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. STOP engine immediately (prevents serious damage)",
                  "2. Let cool 30+ minutes before investigating",
                  "3. Don't open coolant cap when hot!",
                ],
                ru: [
                  "1. Немедленно ОСТАНОВИТЕ двигатель (предотвращает серьёзные повреждения)",
                  "2. Дайте остыть 30+ минут перед проверкой",
                  "3. Не открывайте крышку охлаждения пока горячо!",
                ],
                zh: [
                  "1. 立即停机（防止严重损坏）",
                  "2. 冷却30分钟以上再检查",
                  "3. 热时不要打开冷却液盖！",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Causes", ru: "Причины", zh: "原因" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Seawater intake clogged (weed, plastic bag)",
                  "Impeller failed (rubber blades worn/broken)",
                  "Coolant low (leak?)",
                  "Thermostat stuck",
                  "Belt loose/broken",
                ],
                ru: [
                  "Забит забортник (водоросль, пластиковый пакет)",
                  "Отказ импеллера (резиновые лопасти изношены/сломаны)",
                  "Низкий уровень охлаждающей жидкости (течь?)",
                  "Термостат заклинило",
                  "Ремень ослаб/сломан",
                ],
                zh: [
                  "海水进口堵塞（海草、塑料袋）",
                  "叶轮故障（橡胶叶片磨损/断裂）",
                  "冷却液不足（泄漏？）",
                  "恒温器卡住",
                  "皮带松/断",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Checks", ru: "Проверки", zh: "检查" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "☐ Water exiting exhaust? (should be steady stream)",
                  "☐ Seawater strainer clean?",
                  "☐ Impeller blades intact? (count them!)",
                  "☐ Coolant level OK?",
                  "☐ Belts tight?",
                ],
                ru: [
                  "☐ Вода выходит из выхлопа? (должна быть стабильная струя)",
                  "☐ Забортный фильтр чист?",
                  "☐ Лопасти импеллера целые? (пересчитайте!)",
                  "☐ Уровень охлаждающей жидкости в норме?",
                  "☐ Ремни натянуты?",
                ],
                zh: [
                  "☐ 排气口有水？（应有稳定水流）",
                  "☐ 海水过滤器干净？",
                  "☐ 叶轮叶片完好？（数一数！）",
                  "☐ 冷却液液位正常？",
                  "☐ 皮带紧？",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Loss of Power / Won't Rev",
            ru: "Потеря мощности / Не набирает обороты",
            zh: "动力丧失/不提速",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Fuel filter clogged (common!)",
                  "Air in fuel lines (diesel)",
                  "Propeller fouled (rope, net, weed)",
                  "Transmission slipping",
                ],
                ru: [
                  "Топливный фильтр забит (часто!)",
                  "Воздух в топливных магистралях (дизель)",
                  "Винт загрязнён (верёвка, сеть, водоросли)",
                  "Редуктор проскальзывает",
                ],
                zh: [
                  "燃油滤清器堵塞（常见！）",
                  "燃油管路有空气（柴油）",
                  "螺旋桨缠绕（绳、网、海草）",
                  "变速箱打滑",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "If engine runs but boat slow: check prop! Diver may be needed to clear.",
                ru: "Если двигатель работает, но яхта медленная: проверьте винт! Может понадобиться ныряльщик для очистки.",
                zh: "如发动机运转但船慢：检查螺旋桨！可能需要潜水员清理。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "When to Call for Tow",
            ru: "Когда вызывать буксир",
            zh: "何时呼叫拖船",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Can't diagnose problem",
                  "Don't have spare parts",
                  "Approaching danger (rocks, reef)",
                  "Weather worsening",
                  "Crew exhausted / unsafe",
                ],
                ru: [
                  "Не можете диагностировать проблему",
                  "Нет запчастей",
                  "Приближается опасность (скалы, риф)",
                  "Погода ухудшается",
                  "Экипаж устал / небезопасно",
                ],
                zh: [
                  "无法诊断问题",
                  "无备件",
                  "接近危险（礁石、暗礁）",
                  "天气恶化",
                  "船员疲惫/不安全",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "No shame in calling for help! Better safe than sorry. Most insurance covers towing.",
                ru: "Нет стыда в вызове помощи! Лучше перестраховаться. Большинство страховок покрывают буксировку.",
                zh: "求助无可耻！宁可安全。多数保险涵盖拖带。",
              }[l] as string,
            },
          ],
        },
      ];
    },
  },
  {
    id: "electrical-problems",
    category: "troubleshooting",
    titleKey: "electricalProblemsTitle",
    descKey: "electricalProblemsDesc",
    icon: "⚡",
    order: 2,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "Battery Won't Charge",
            ru: "Батарея не заряжается",
            zh: "电池不充电",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "☐ Alternator belt broken/loose?",
                  "☐ Battery switch on correct bank?",
                  "☐ Connections corroded?",
                  "☐ Alternator failed? (voltmeter: should be 13.5-14.5V when running)",
                ],
                ru: [
                  "☐ Ремень генератора сломан/ослаб?",
                  "☐ Выключатель батареи на правильном банке?",
                  "☐ Соединения окислены?",
                  "☐ Генератор отказал? (вольтметр: должно быть 13.5-14.5В на ходу)",
                ],
                zh: [
                  "☐ 发电机皮带断/松？",
                  "☐ 电池开关在正确组？",
                  "☐ 连接腐蚀？",
                  "☐ 发电机故障？（电压表：运转时应为13.5-14.5V）",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Nothing Works / Dead",
            ru: "Ничего не работает / Мёртво",
            zh: "全不工作/失灵",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "1. Check battery voltage (multimeter)",
                  "2. Check battery switches (both OFF?)",
                  "3. Check main fuse/breaker",
                  "4. Individual circuit breakers tripped?",
                ],
                ru: [
                  "1. Проверьте напряжение батареи (мультиметр)",
                  "2. Проверьте выключатели батареи (оба ВЫКЛ?)",
                  "3. Проверьте главный предохранитель/автомат",
                  "4. Отдельные автоматы сработали?",
                ],
                zh: [
                  "1. 检查电池电压（万用表）",
                  "2. 检查电池开关（都关？）",
                  "3. 检查主保险/断路器",
                  "4. 单个断路器跳闸？",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "tip",
          content: {
            en: "Carry spare fuses and know where fuse panel is! Label all breakers clearly.",
            ru: "Имейте запасные предохранители и знайте где панель! Чётко маркируйте все автоматы.",
            zh: "携带备用保险丝并知道保险盒位置！清楚标记所有断路器。",
          }[l] as string,
        },
      ];
    },
  },
];
