import type { KnowledgeArticle, ContentBlock } from "./knowledge-types";
import type { Lang } from "./i18n";

// Multilingual content helper
function getContent(lang: Lang, contentMap: Record<string, ContentBlock[]>): ContentBlock[] {
  return contentMap[lang] || contentMap["en"] || [];
}

const vhfChannelsContent: Record<string, ContentBlock[]> = {
  en: [
    { type: "heading", content: "Distress & Safety" },
    {
      type: "list",
      items: [
        "Ch 16: Emergency, DSC alerts, initial contact (Monitor ALWAYS!)",
        "Ch 13: Bridge-to-bridge (bridges, locks, large vessels)",
        "Ch 70: DSC digital calls only",
      ],
    },
    { type: "heading", content: "Working Channels" },
    {
      type: "list",
      items: [
        "Ch 06: Ship-to-ship (after initial contact on Ch 16)",
        "Ch 08: Ship-to-ship (commercial)",
        "Ch 09: Ship-to-ship / Port operations",
        "Ch 72: Ship-to-ship (recreational)",
        "Ch 77: Ship-to-ship (recreational)",
      ],
    },
    { type: "heading", content: "Marina & Harbor" },
    {
      type: "list",
      items: [
        "Ch 09: Marinas, docks (USA)",
        "Ch 12, 14: Harbormasters (varies by country)",
        "Ch 80-87: UK marinas",
      ],
    },
    { type: "heading", content: "Weather" },
    {
      type: "list",
      items: [
        "WX1-WX7: NOAA Weather (USA) - receive only!",
        "Ch 67, 68: Small craft (local)",
      ],
    },
    {
      type: "tip",
      content: "Always listen before transmitting. Channel 16 is for emergencies and initial contact only - then switch to a working channel!",
    },
  ],
  ru: [
    { type: "heading", content: "Бедствие и безопасность" },
    {
      type: "list",
      items: [
        "Канал 16: Аварийная связь, DSC сигналы, первый контакт (Слушать ВСЕГДА!)",
        "Канал 13: Мостик-мостик (мосты, шлюзы, крупные суда)",
        "Канал 70: Только DSC цифровые вызовы",
      ],
    },
    { type: "heading", content: "Рабочие каналы" },
    {
      type: "list",
      items: [
        "Канал 06: Судно-судно (после первого контакта на 16)",
        "Канал 08: Судно-судно (коммерческие)",
        "Канал 09: Судно-судно / Портовые операции",
        "Канал 72: Судно-судно (прогулочные)",
        "Канал 77: Судно-судно (прогулочные)",
      ],
    },
    { type: "heading", content: "Марины и гавани" },
    {
      type: "list",
      items: [
        "Канал 09: Марины, доки (США)",
        "Каналы 12, 14: Капитаны портов (зависит от страны)",
        "Каналы 80-87: Марины Великобритании",
      ],
    },
    { type: "heading", content: "Погода" },
    {
      type: "list",
      items: [
        "WX1-WX7: Погода NOAA (США) - только приём!",
        "Каналы 67, 68: Малые суда (местное)",
      ],
    },
    {
      type: "tip",
      content: "Всегда слушайте перед передачей. Канал 16 только для чрезвычайных ситуаций и первого контакта - затем переходите на рабочий канал!",
    },
  ],
  zh: [
    { type: "heading", content: "遇险与安全" },
    {
      type: "list",
      items: [
        "第16频道：紧急情况、DSC警报、初次联系（务必监听！）",
        "第13频道：驾驶台间通信（桥梁、船闸、大型船舶）",
        "第70频道：仅DSC数字呼叫",
      ],
    },
    { type: "heading", content: "工作频道" },
    {
      type: "list",
      items: [
        "第06频道：船对船（16频道初次联系后）",
        "第08频道：船对船（商业）",
        "第09频道：船对船/港口作业",
        "第72频道：船对船（娱乐用）",
        "第77频道：船对船（娱乐用）",
      ],
    },
    { type: "heading", content: "码头与港口" },
    {
      type: "list",
      items: [
        "第09频道：码头、停泊区（美国）",
        "第12、14频道：港务长（因国家而异）",
        "第80-87频道：英国码头",
      ],
    },
    { type: "heading", content: "天气" },
    {
      type: "list",
      items: [
        "WX1-WX7：NOAA天气（美国）- 仅接收！",
        "第67、68频道：小型船艇（本地）",
      ],
    },
    {
      type: "tip",
      content: "发送前务必先收听。第16频道仅用于紧急情况和初次联系 - 然后切换到工作频道！",
    },
  ],
};

// DSC Functions multilingual content
const dscContent: Record<string, ContentBlock[]> = {
  en: [
    {
      type: "text",
      content: "DSC (Digital Selective Calling) automatically sends MAYDAY with GPS coordinates. Requires MMSI registration.",
    },
    { type: "heading", content: "Functions" },
    {
      type: "list",
      items: [
        "DISTRESS: Red button under cover - auto sends MAYDAY + GPS",
        "All Ships Call: Like voice call on Ch 16",
        "Individual Call: Direct call to vessel by MMSI",
        "Position Request: Ask another vessel for GPS coordinates",
      ],
    },
    { type: "heading", content: "MMSI Registration" },
    {
      type: "list",
      items: [
        "USA: BoatUS, Sea Tow, or FCC",
        "Europe: National regulators",
        "FREE registration!",
        "9-digit number unique to your vessel",
      ],
    },
    {
      type: "warning",
      content: "Without MMSI, your DSC emergency call won't include vessel identification!",
    },
  ],
  ru: [
    {
      type: "text",
      content: "DSC (Цифровой Избирательный Вызов) автоматически отправляет MAYDAY с GPS координатами. Требует регистрацию MMSI.",
    },
    { type: "heading", content: "Функции" },
    {
      type: "list",
      items: [
        "БЕДСТВИЕ: Красная кнопка под крышкой - автоматически отправляет MAYDAY + GPS",
        "Вызов всех судов: Как голосовой вызов на канале 16",
        "Индивидуальный вызов: Прямой вызов судна по MMSI",
        "Запрос позиции: Запросить у другого судна GPS координаты",
      ],
    },
    { type: "heading", content: "Регистрация MMSI" },
    {
      type: "list",
      items: [
        "США: BoatUS, Sea Tow, или FCC",
        "Европа: Национальные регуляторы",
        "БЕСПЛАТНАЯ регистрация!",
        "9-значный номер уникальный для вашего судна",
      ],
    },
    {
      type: "warning",
      content: "Без MMSI ваш аварийный вызов DSC не будет содержать идентификацию судна!",
    },
  ],
  zh: [
    {
      type: "text",
      content: "DSC（数字选择性呼叫）自动发送MAYDAY和GPS坐标。需要MMSI注册。",
    },
    { type: "heading", content: "功能" },
    {
      type: "list",
      items: [
        "遇险：红色按钮在盖板下 - 自动发送MAYDAY + GPS",
        "全船呼叫：类似16频道的语音呼叫",
        "单独呼叫：通过MMSI直接呼叫船只",
        "位置请求：向其他船只询问GPS坐标",
      ],
    },
    { type: "heading", content: "MMSI注册" },
    {
      type: "list",
      items: [
        "美国：BoatUS、Sea Tow或FCC",
        "欧洲：国家监管机构",
        "免费注册！",
        "船只唯一的9位数字",
      ],
    },
    {
      type: "warning",
      content: "没有MMSI，您的DSC紧急呼叫将不包含船只识别信息！",
    },
  ],
};

export const VHF_ARTICLES: KnowledgeArticle[] = [
  {
    id: "vhf-channels",
    category: "vhf",
    titleKey: "vhfChannelsTitle",
    descKey: "vhfChannelsDesc",
    icon: "📻",
    order: 1,
    content: [],
    getContent: (lang: Lang) => getContent(lang, vhfChannelsContent),
  },
  {
    id: "vhf-dsc",
    category: "vhf",
    titleKey: "vhfDscTitle",
    descKey: "vhfDscDesc",
    icon: "🔴",
    order: 2,
    content: [],
    getContent: (lang: Lang) => getContent(lang, dscContent),
  },
  {
    id: "vhf-etiquette",
    category: "vhf",
    titleKey: "vhfEtiquetteTitle",
    descKey: "vhfEtiquetteDesc",
    icon: "🎙️",
    order: 3,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        { 
          type: "heading", 
          content: {
            en: "Radio Procedures",
            ru: "Процедуры радиосвязи",
            zh: "无线电程序",
          }[l] as string,
        },
        {
          type: "list",
          items: {
            en: [
              "LISTEN before transmit (check channel is free)",
              "Think before speaking (prepare your message)",
              "Press PTT → wait 0.5s → speak → release",
              "Speak clearly, slowly, near microphone",
              "Use Seaspeak / Plain Language (avoid slang)",
              'Say "OVER" when done, "OUT" to end conversation',
              "Don't hog the channel (be brief)",
            ],
            ru: [
              "СЛУШАЙТЕ перед передачей (проверьте, что канал свободен)",
              "Думайте перед тем как говорить (подготовьте сообщение)",
              "Нажмите PTT → подождите 0.5с → говорите → отпустите",
              "Говорите чётко, медленно, возле микрофона",
              "Используйте морской язык / простой язык (без сленга)",
              'Говорите "ПРИЁМ" когда закончили, "КОНЕЦ" для завершения',
              "Не занимайте канал (будьте кратки)",
            ],
            zh: [
              "发送前先收听（检查频道是否空闲）",
              "说话前先思考（准备好信息）",
              "按PTT → 等0.5秒 → 说话 → 松开",
              "靠近麦克风清晰缓慢地说话",
              "使用海事英语/简明语言（避免俚语）",
              '完成时说"OVER"，结束对话说"OUT"',
              "不要霸占频道（简短）",
            ],
          }[l] as string[],
        },
        {
          type: "tip",
          content: {
            en: "Professional = brief, clear, polite. You're on a party line - everyone hears you!",
            ru: "Профессионализм = краткость, чёткость, вежливость. Вы на общей линии - все вас слышат!",
            zh: "专业 = 简短、清晰、礼貌。这是公共频道 - 所有人都听得到！",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "vhf-phonetic",
    category: "vhf",
    titleKey: "vhfManual",
    descKey: "vhfManualDesc",
    icon: "🔤",
    order: 4,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "Use phonetic alphabet to spell vessel names, call signs, or unclear words.",
            ru: "Используйте фонетический алфавит для по-буквенной передачи названий судов, позывных или неясных слов.",
            zh: "使用音标字母拼读船名、呼号或不清楚的词语。",
          }[l] as string,
        },
        {
          type: "table",
          rows: [
            { letter: "A", word: "ALPHA" },
            { letter: "B", word: "BRAVO" },
            { letter: "C", word: "CHARLIE" },
            { letter: "D", word: "DELTA" },
            { letter: "E", word: "ECHO" },
            { letter: "F", word: "FOXTROT" },
            { letter: "G", word: "GOLF" },
            { letter: "H", word: "HOTEL" },
            { letter: "I", word: "INDIA" },
            { letter: "J", word: "JULIET" },
            { letter: "K", word: "KILO" },
            { letter: "L", word: "LIMA" },
            { letter: "M", word: "MIKE" },
            { letter: "N", word: "NOVEMBER" },
            { letter: "O", word: "OSCAR" },
            { letter: "P", word: "PAPA" },
            { letter: "Q", word: "QUEBEC" },
            { letter: "R", word: "ROMEO" },
            { letter: "S", word: "SIERRA" },
            { letter: "T", word: "TANGO" },
            { letter: "U", word: "UNIFORM" },
            { letter: "V", word: "VICTOR" },
            { letter: "W", word: "WHISKEY" },
            { letter: "X", word: "X-RAY" },
            { letter: "Y", word: "YANKEE" },
            { letter: "Z", word: "ZULU" },
          ],
        },
      ];
    },
  },
];
