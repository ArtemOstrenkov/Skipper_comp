import type { KnowledgeArticle } from "./knowledge-types";
import type { Lang } from "./i18n";

export const SEAMANSHIP_ARTICLES: KnowledgeArticle[] = [
  {
    id: "essential-knots",
    category: "seamanship",
    titleKey: "knotsTitle",
    descKey: "knotsDesc",
    icon: "🪢",
    order: 1,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "Master these essential knots - they cover 90% of situations aboard.",
            ru: "Освойте эти основные узлы - они покрывают 90% ситуаций на борту.",
            zh: "掌握这些基本绳结 - 它们涵盖船上90%的情况。",
          }[l] as string,
        },
        {
          type: "accordion",
          title: {
            en: "⭐ Bowline - MUST KNOW",
            ru: "⭐ Булинь - ОБЯЗАТЕЛЬНО",
            zh: "⭐ 单套结 - 必须掌握",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "The 'King of Knots' - creates a fixed loop that won't slip or jam.",
                ru: "'Король узлов' - создаёт фиксированную петлю, которая не проскальзывает и не заклинивает.",
                zh: "'绳结之王' - 形成固定环圈，不会滑动或卡住。",
              }[l] as string,
            },
            {
              type: "illustration",
              src: "/knowledge/illustrations/knot-bowline.jpg",
              alt: {
                en: "Bowline knot step-by-step diagram",
                ru: "Пошаговая схема узла булинь",
                zh: "单套结分步图解",
              }[l] as string,
              caption: {
                en: "Rabbit comes out of hole, around tree, back down hole",
                ru: "Кролик выходит из норы, вокруг дерева, обратно в нору",
                zh: "兔子从洞里出来，绕过树，回到洞里",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Uses", ru: "Применение", zh: "用途" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Attaching sheets to sail clew",
                  "Mooring lines to dock cleats",
                  "Rescue loops",
                  "Any time you need a secure loop",
                ],
                ru: [
                  "Крепление шкотов к шкотовому углу паруса",
                  "Швартовые концы к кнехтам",
                  "Спасательные петли",
                  "Любая ситуация, когда нужна надёжная петля",
                ],
                zh: [
                  "将帆脚索固定到帆角",
                  "将系泊缆绳固定到系船柱",
                  "救援环圈",
                  "任何需要安全环圈的时候",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "How to Tie", ru: "Как вязать", zh: "如何打结" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Make small loop (rabbit hole) in standing part",
                  "2. Working end comes up through hole (rabbit up)",
                  "3. Goes around behind standing part (around tree)",
                  "4. Goes back down through original hole (back down)",
                  "5. Pull tight",
                ],
                ru: [
                  "1. Сделайте маленькую петлю (нора кролика) в коренном конце",
                  "2. Ходовой конец проходит вверх через петлю (кролик выходит)",
                  "3. Идёт вокруг коренного конца (вокруг дерева)",
                  "4. Возвращается вниз через исходную петлю (обратно в нору)",
                  "5. Затяните",
                ],
                zh: [
                  "1. 在主绳上做一个小环（兔子洞）",
                  "2. 工作端从环中向上穿出（兔子出来）",
                  "3. 绕到主绳后面（绕树）",
                  "4. 从原来的环向下穿回（回洞）",
                  "5. 拉紧",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Mnemonic: 'Rabbit comes out of hole, around tree, back down hole'",
                ru: "Мнемоника: 'Кролик выходит из норы, вокруг дерева, обратно в нору'",
                zh: "记忆口诀：'兔子从洞里出来，绕过树，回到洞里'",
              }[l] as string,
            },
            {
              type: "tip",
              content: {
                en: "Can be tied one-handed! Essential skill for MOB rescue.",
                ru: "Можно вязать одной рукой! Важный навык для спасения человека за бортом.",
                zh: "可以单手打结！救援落水人员的必备技能。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "⭐ Cleat Hitch - MUST KNOW",
            ru: "⭐ Узел на утке - ОБЯЗАТЕЛЬНО",
            zh: "⭐ 系缆桩结 - 必须掌握",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Proper way to secure a line to a cleat (horn-shaped fitting).",
                ru: "Правильный способ крепления конца к утке (рогообразное устройство).",
                zh: "将缆绳固定到系缆桩（角状配件）的正确方法。",
              }[l] as string,
            },
            {
              type: "illustration",
              src: "/knowledge/illustrations/knot-cleat-hitch.jpg",
              alt: {
                en: "Cleat hitch step-by-step diagram",
                ru: "Пошаговая схема узла на утке",
                zh: "系缆桩结分步图解",
              }[l] as string,
              caption: {
                en: "Full turn, figure-8s, then locking turn",
                ru: "Полный оборот, восьмёрки, затем стопорящий шлаг",
                zh: "整圈、8字形、然后锁定圈",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "How to Tie", ru: "Как вязать", zh: "如何打结" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. One full turn around base",
                  "2. Figure-8 over horns (cross over top)",
                  "3. Another figure-8",
                  "4. Final underhand loop over one horn (locking turn)",
                ],
                ru: [
                  "1. Один полный оборот вокруг основания",
                  "2. Восьмёрка через рога (перекрест сверху)",
                  "3. Ещё одна восьмёрка",
                  "4. Финальная петля снизу на один рог (стопорящий шлаг)",
                ],
                zh: [
                  "1. 在底部绕一整圈",
                  "2. 在角上做8字形（从顶部交叉）",
                  "3. 再做一个8字形",
                  "4. 最后一个下手环套在一个角上（锁定圈）",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "NEVER tie multiple figure-8s without the locking turn - line can slip! One locking turn at the end is essential.",
                ru: "НИКОГДА не делайте несколько восьмёрок без стопорящего шлага - конец может проскользнуть! Один стопорящий шлаг в конце обязателен.",
                zh: "永远不要只打多个8字形而不加锁定圈 - 绳索会滑脱！最后的锁定圈至关重要。",
              }[l] as string,
            },
            {
              type: "tip",
              content: {
                en: "Quick release: skip the locking turn if you need to cast off fast (docking practice).",
                ru: "Быстрое освобождение: пропустите стопорящий шлаг, если нужно быстро отдать конец (при швартовке).",
                zh: "快速解脱：如果需要快速解缆（停靠练习），可省略锁定圈。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "⭐ Figure Eight",
            ru: "⭐ Восьмёрка",
            zh: "⭐ 8字结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Stopper knot - prevents line from running through blocks, cleats.",
                ru: "Стопорный узел - предотвращает проскальзывание конца через блоки, утки.",
                zh: "止索结 - 防止绳索从滑轮、系缆桩中滑出。",
              }[l] as string,
            },
            {
              type: "illustration",
              src: "/knowledge/illustrations/knot-figure-eight.jpg",
              alt: {
                en: "Figure eight knot step-by-step diagram",
                ru: "Пошаговая схема узла восьмёрка",
                zh: "8字结分步图解",
              }[l] as string,
              caption: {
                en: "Forms a figure-8 shape when tightened",
                ru: "Образует форму цифры 8 при затягивании",
                zh: "拉紧后形成8字形",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Uses", ru: "Применение", zh: "用途" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "End of all sheets (so they don't escape)",
                  "Halyards",
                  "Any line that runs through something",
                ],
                ru: [
                  "Конец всех шкотов (чтобы не убежали)",
                  "Фалы",
                  "Любой конец, проходящий через что-либо",
                ],
                zh: [
                  "所有帆脚索末端（防止脱落）",
                  "升降索",
                  "任何需要穿过物体的绳索",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "How to Tie", ru: "Как вязать", zh: "如何打结" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Make loop in rope",
                  "2. Bring working end around and under standing part",
                  "3. Thread through original loop",
                  "4. Tighten (looks like number 8)",
                ],
                ru: [
                  "1. Сделайте петлю в верёвке",
                  "2. Проведите ходовой конец вокруг и под коренным концом",
                  "3. Проденьте через исходную петлю",
                  "4. Затяните (похоже на цифру 8)",
                ],
                zh: [
                  "1. 在绳索上做一个环",
                  "2. 将工作端绕过并从主绳下穿过",
                  "3. 穿过原来的环",
                  "4. 拉紧（看起来像数字8）",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Preferred over overhand knot - easier to untie after loading.",
                ru: "Предпочтительнее простого узла - легче развязать после нагрузки.",
                zh: "优于单结 - 受力后更容易解开。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "⭐ Clove Hitch",
            ru: "⭐ Выбленочный узел",
            zh: "⭐ 双套结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Quick attachment to a post, rail, or ring.",
                ru: "Быстрое крепление к столбу, релингу или кольцу.",
                zh: "快速固定到柱子、栏杆或环上。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Uses", ru: "Применение", zh: "用途" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Temporary mooring to pile",
                  "Attaching fenders to rail",
                  "Quick lashing",
                ],
                ru: [
                  "Временная швартовка к свае",
                  "Крепление кранцев к релингу",
                  "Быстрая найтовка",
                ],
                zh: [
                  "临时系泊到桩上",
                  "将护舷固定到栏杆",
                  "快速捆绑",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "Can slip under intermittent loads. Add half-hitches or use different knot for critical applications.",
                ru: "Может проскользнуть при переменных нагрузках. Добавьте полуштыки или используйте другой узел для критичных случаев.",
                zh: "在间歇性负载下可能滑脱。关键应用中需加半结或使用其他绳结。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "⭐ Round Turn + 2 Half Hitches",
            ru: "⭐ Простой штык с двумя полуштыками",
            zh: "⭐ 圆木结+两半结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Secure, reliable way to tie to a post, ring, or rail.",
                ru: "Надёжный, проверенный способ крепления к столбу, кольцу или релингу.",
                zh: "安全可靠的方式固定到柱子、环或栏杆。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "How to Tie", ru: "Как вязать", zh: "如何打结" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Pass line around post twice (round turn)",
                  "2. Tie two half-hitches around standing part",
                  "3. Tighten",
                ],
                ru: [
                  "1. Обведите конец вокруг столба дважды (шлаг)",
                  "2. Завяжите два полуштыка вокруг коренного конца",
                  "3. Затяните",
                ],
                zh: [
                  "1. 将绳索绕柱两圈（圆木结）",
                  "2. 在主绳上打两个半结",
                  "3. 拉紧",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Round turn takes most of the load - you can tie the half-hitches while holding tension with the turn.",
                ru: "Шлаг принимает большую часть нагрузки - можно завязывать полуштыки, удерживая натяжение шлагом.",
                zh: "圆木结承受大部分负载 - 可以在保持圆木结张力的同时打半结。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Sheet Bend",
            ru: "Шкотовый узел",
            zh: "接绳结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Joins two ropes, especially of different diameters.",
                ru: "Соединяет два конца, особенно разного диаметра.",
                zh: "连接两根绳索，特别是不同直径的。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "How to Tie", ru: "Как вязать", zh: "如何打结" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Make bight (loop) in thicker rope",
                  "2. Pass thinner rope up through bight",
                  "3. Around behind both parts of bight",
                  "4. Tuck under itself",
                ],
                ru: [
                  "1. Сделайте колышку (петлю) в более толстом конце",
                  "2. Проведите тонкий конец вверх через колышку",
                  "3. Вокруг обеих частей колышки",
                  "4. Заведите под себя",
                ],
                zh: [
                  "1. 在较粗的绳索上做一个弯曲（环）",
                  "2. 将较细的绳索从弯曲中向上穿过",
                  "3. 绕过弯曲的两个部分",
                  "4. 塞进自身下面",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Double Sheet Bend: pass around bight twice before tucking. More secure for slippery ropes.",
                ru: "Двойной шкотовый: обведите вокруг колышки дважды перед заведением. Надёжнее для скользких концов.",
                zh: "双接绳结：在塞进前绕弯曲两圈。对滑溜的绳索更安全。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Rolling Hitch",
            ru: "Выбленочный узел со шлагом",
            zh: "滚动结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Attaches to another rope or spar, can slide but grips under load.",
                ru: "Крепится к другому концу или рею, может скользить, но держит под нагрузкой.",
                zh: "固定到另一根绳索或圆材，可以滑动但受力时抓牢。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Uses", ru: "Применение", zh: "用途" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Taking strain off a line (to clear winch override)",
                  "Attaching to spinnaker pole",
                  "Snubbing anchor rode",
                ],
                ru: [
                  "Снятие нагрузки с конца (для очистки захлёстнутой лебёдки)",
                  "Крепление к гику спинакера",
                  "Разгрузка якорной цепи",
                ],
                zh: [
                  "减轻绳索张力（清理绞盘卡死）",
                  "固定到大三角帆杆",
                  "缓冲锚链",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Reef Knot",
            ru: "Прямой узел",
            zh: "平结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Joins two ropes of SAME diameter. 'Left over right, right over left'.",
                ru: "Соединяет два конца ОДИНАКОВОГО диаметра. 'Левый над правым, правый над левым'.",
                zh: "连接两根相同直径的绳索。'左压右，右压左'。",
              }[l] as string,
            },
            {
              type: "warning",
              content: {
                en: "Can slip if ropes are different sizes or under intermittent load. Use Sheet Bend instead for critical applications.",
                ru: "Может проскользнуть, если концы разного размера или под переменной нагрузкой. Используйте шкотовый узел для критичных случаев.",
                zh: "如果绳索大小不同或间歇性负载可能滑脱。关键应用请使用接绳结。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Uses", ru: "Применение", zh: "用途" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: ["Reefing sail points", "Tying bundles", "Non-critical joins"],
                ru: ["Рифовые концы парусов", "Связывание тюков", "Некритичные соединения"],
                zh: ["缩帆点", "捆扎", "非关键连接"],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Constrictor Knot",
            ru: "Удавка",
            zh: "绞索结",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Binding knot - extremely tight, holds firmly.",
                ru: "Связывающий узел - очень тугой, держит крепко.",
                zh: "绑扎结 - 极其紧固，牢牢抓住。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Uses", ru: "Применение", zh: "用途" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Temporary whipping on rope end",
                  "Securing hose to fitting",
                  "Emergency repairs",
                  "Closing bags",
                ],
                ru: [
                  "Временная оплётка конца троса",
                  "Крепление шланга к фитингу",
                  "Аварийный ремонт",
                  "Закрытие мешков",
                ],
                zh: [
                  "绳索末端临时包扎",
                  "将软管固定到接头",
                  "紧急修理",
                  "封闭袋子",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "Very hard to untie - may need to cut. Don't use where you'll need to undo it!",
                ru: "Очень трудно развязать - может потребоваться разрезать. Не используйте там, где нужно будет развязывать!",
                zh: "很难解开 - 可能需要剪断。不要在需要解开的地方使用！",
              }[l] as string,
            },
          ],
        },
        {
          type: "tip",
          content: {
            en: "Practice these knots at home until you can tie them in the dark, with cold wet hands. In an emergency, you won't have time to think!",
            ru: "Тренируйте эти узлы дома, пока не сможете вязать их в темноте, холодными мокрыми руками. В чрезвычайной ситуации у вас не будет времени думать!",
            zh: "在家练习这些绳结，直到你能在黑暗中、用冷湿的手打结。紧急情况下你没有时间思考！",
          }[l] as string,
        },
      ];
    },
  },
  {
    id: "anchoring",
    category: "seamanship",
    titleKey: "anchoringTitle",
    descKey: "anchoringDesc",
    icon: "⚓",
    order: 2,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "accordion",
          title: {
            en: "Choosing an Anchorage",
            ru: "Выбор якорной стоянки",
            zh: "选择锚地",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Good Anchorage Has", ru: "Хорошая якорная стоянка имеет", zh: "良好锚地具备" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Protection from wind/swell (current forecast!)",
                  "Good holding ground (mud, sand, clay)",
                  "Adequate depth (check tide range!)",
                  "Swing room (360° radius = your rode + nearby boats)",
                  "Clear bottom (no cables, pipes, moorings)",
                  "Safe exit route if weather changes",
                ],
                ru: [
                  "Защита от ветра/волнения (проверьте прогноз!)",
                  "Хороший грунт (ил, песок, глина)",
                  "Достаточная глубина (проверьте прилив!)",
                  "Место для циркуляции (радиус 360° = ваша цепь + соседние яхты)",
                  "Чистое дно (нет кабелей, труб, бочек)",
                  "Безопасный выход, если погода изменится",
                ],
                zh: [
                  "避风/浪（查看预报！）",
                  "良好抓底地质（泥、沙、粘土）",
                  "足够深度（查潮汐范围！）",
                  "摆动空间（360°半径 = 您的锚链 + 附近船只）",
                  "底部干净（无电缆、管道、系泊浮标）",
                  "天气变化时的安全出口",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Ground Types", ru: "Типы грунта", zh: "底质类型" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "✅ Best: Mud (M), Clay (Cl)",
                  "✅ Good: Sand (S), Mixed (M/S)",
                  "⚠️ Poor: Rock (Rk), Gravel (G), Weed (Wd)",
                  "❌ Bad: Coral (Co) - also damages coral!",
                ],
                ru: [
                  "✅ Лучший: Ил (M), Глина (Cl)",
                  "✅ Хороший: Песок (S), Смешанный (M/S)",
                  "⚠️ Плохой: Скала (Rk), Галька (G), Водоросли (Wd)",
                  "❌ Ужасный: Коралл (Co) - также повреждает кораллы!",
                ],
                zh: [
                  "✅ 最佳：泥（M）、粘土（Cl）",
                  "✅ 良好：沙（S）、混合（M/S）",
                  "⚠️ 差：岩石（Rk）、砾石（G）、水草（Wd）",
                  "❌ 糟糕：珊瑚（Co）- 也会损坏珊瑚！",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Chart abbreviations show bottom type. Check before anchoring!",
                ru: "Сокращения на картах показывают тип грунта. Проверьте перед постановкой на якорь!",
                zh: "海图缩写显示底质类型。抛锚前请检查！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Scope Calculation",
            ru: "Расчёт вытравленной цепи",
            zh: "锚链长度计算",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Scope = Ratio of rode length to depth. More scope = better holding.",
                ru: "Вытравленная цепь = Соотношение длины якорного каната к глубине. Больше цепи = лучше держит.",
                zh: "锚链比 = 锚链长度与深度的比率。更多锚链 = 更好抓力。",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Calm weather: 5:1 (e.g., 5m depth = 25m rode)",
                  "Normal conditions: 7:1",
                  "Strong wind/overnight: 10:1",
                  "Storm: 10-15:1 or more",
                ],
                ru: [
                  "Спокойная погода: 5:1 (например, 5м глубина = 25м цепи)",
                  "Обычные условия: 7:1",
                  "Сильный ветер/ночь: 10:1",
                  "Шторм: 10-15:1 или больше",
                ],
                zh: [
                  "平静天气：5:1（例如5米深 = 25米锚链）",
                  "正常条件：7:1",
                  "强风/过夜：10:1",
                  "风暴：10-15:1或更多",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Depth Calculation", ru: "Расчёт глубины", zh: "深度计算" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Water depth + tide rise + bow height above water",
                  "Example: 4m chart depth + 1m tide + 1m bow = 6m",
                  "For 7:1 scope: need 42m of rode",
                ],
                ru: [
                  "Глубина воды + прилив + высота носа над водой",
                  "Пример: 4м на карте + 1м прилив + 1м нос = 6м",
                  "Для соотношения 7:1: нужно 42м цепи",
                ],
                zh: [
                  "水深 + 涨潮高度 + 船首高于水面",
                  "例：海图深度4米 + 潮汐1米 + 船首1米 = 6米",
                  "7:1锚链比：需要42米锚链",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Mark your anchor chain every 5-10m (paint, cable ties, different color shackles) so you know how much you've let out.",
                ru: "Отмечайте якорную цепь каждые 5-10м (краска, хомуты, скобы разного цвета), чтобы знать, сколько вытравили.",
                zh: "每5-10米标记您的锚链（油漆、扎带、不同颜色的卸扣），这样您就知道放出了多少。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Anchoring Procedure",
            ru: "Процедура постановки на якорь",
            zh: "抛锚程序",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Preparation", ru: "Подготовка", zh: "准备" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Prepare anchor (remove windlass brake)",
                  "Check rode (not tangled, clear to run)",
                  "Assign crew: helm, anchor, lookout",
                  "Brief crew on plan",
                ],
                ru: [
                  "Подготовьте якорь (снимите стопор брашпиля)",
                  "Проверьте цепь (не запутана, свободно травится)",
                  "Распределите экипаж: рулевой, якорщик, наблюдатель",
                  "Проинструктируйте экипаж о плане",
                ],
                zh: [
                  "准备锚（解除锚机制动）",
                  "检查锚链（无缠结、可自由放出）",
                  "分配船员：舵手、锚手、瞭望",
                  "向船员简述计划",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Setting the Anchor", ru: "Установка якоря", zh: "设定锚位" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Approach slowly into wind/current",
                  "2. Stop over chosen spot (use GPS or bearings)",
                  "3. Lower anchor (DON'T throw!)",
                  "4. Let boat drift back slowly",
                  "5. Pay out rode gradually as you drift",
                  "6. When desired scope reached, snub rode",
                  "7. Give short burst of reverse (engine or backing sail)",
                  "8. Check anchor is set (bearing, GPS track)",
                ],
                ru: [
                  "1. Подходите медленно против ветра/течения",
                  "2. Остановитесь над выбранным местом (GPS или пеленги)",
                  "3. Опустите якорь (НЕ бросайте!)",
                  "4. Дайте яхте медленно дрейфовать назад",
                  "5. Постепенно травите цепь при дрейфе",
                  "6. Когда достигнута нужная длина, задержите цепь",
                  "7. Дайте короткий импульс назад (мотор или задний ход под парусом)",
                  "8. Проверьте, что якорь держит (пеленг, трек GPS)",
                ],
                zh: [
                  "1. 缓慢迎风/流接近",
                  "2. 在选定位置停住（使用GPS或方位）",
                  "3. 放下锚（不要扔！）",
                  "4. 让船缓慢向后漂移",
                  "5. 漂移时逐渐放出锚链",
                  "6. 达到所需长度时收紧锚链",
                  "7. 短暂倒车（发动机或退帆）",
                  "8. 检查锚是否抓牢（方位、GPS轨迹）",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "Never drop anchor while moving forward - chain can tangle in prop!",
                ru: "Никогда не бросайте якорь при движении вперёд - цепь может намотаться на винт!",
                zh: "切勿在前进时抛锚 - 锚链可能缠绕螺旋桨！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Checking if Anchor Holds",
            ru: "Проверка держит ли якорь",
            zh: "检查锚是否抓牢",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Take compass bearings to 2-3 shore objects (90° apart)",
                  "Mark GPS position (anchor watch alarm)",
                  "Watch for 15-30 minutes",
                  "Signs of dragging:",
                  "  - Bearings change",
                  "  - GPS shows movement (> swing radius)",
                  "  - Chain vibrates / jerks (felt through hull)",
                  "  - You're closer to shore/other boats",
                ],
                ru: [
                  "Возьмите пеленги на 2-3 береговых объекта (разнесённых на 90°)",
                  "Отметьте позицию GPS (сигнал якорной тревоги)",
                  "Наблюдайте 15-30 минут",
                  "Признаки дрейфа:",
                  "  - Пеленги изменяются",
                  "  - GPS показывает движение (> радиус циркуляции)",
                  "  - Цепь вибрирует / дёргается (чувствуется через корпус)",
                  "  - Вы ближе к берегу/другим яхтам",
                ],
                zh: [
                  "用罗盘测量2-3个岸上物体的方位（相隔90°）",
                  "标记GPS位置（锚表警报）",
                  "观察15-30分钟",
                  "走锚迹象：",
                  "  - 方位改变",
                  "  - GPS显示移动（>摆动半径）",
                  "  - 锚链振动/抽动（通过船体感受）",
                  "  - 您更接近岸边/其他船只",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "If Dragging", ru: "Если дрейфует", zh: "如果走锚" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Let out more scope first",
                  "If still dragging: re-anchor in new spot",
                  "Don't drag onto rocks or other boats!",
                ],
                ru: [
                  "Сначала вытравите больше цепи",
                  "Если всё ещё дрейфует: перестаньте на якорь в новом месте",
                  "Не дрейфуйте на скалы или другие яхты!",
                ],
                zh: [
                  "首先放出更多锚链",
                  "如仍走锚：在新位置重新抛锚",
                  "不要漂向岩石或其他船只！",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Anchor Types",
            ru: "Типы якорей",
            zh: "锚的类型",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "CQR / Plow: Universal, good in most bottoms",
                  "Bruce / Claw: Modern, strong holding",
                  "Danforth: Excellent in sand/mud, poor in rocks",
                  "Rocna / Manson: Premium, best all-round",
                  "Fortress: Aluminum, lightweight, good holding-to-weight",
                ],
                ru: [
                  "CQR / Плуг: Универсальный, хорош на большинстве грунтов",
                  "Bruce / Коготь: Современный, хорошо держит",
                  "Danforth: Отличный на песке/иле, плохой на скалах",
                  "Rocna / Manson: Премиум, лучший универсальный",
                  "Fortress: Алюминиевый, лёгкий, хорошее соотношение держащей силы к весу",
                ],
                zh: [
                  "CQR/犁锚：通用，在大多数底质上良好",
                  "Bruce/爪锚：现代，抓力强",
                  "Danforth：在沙/泥中出色，在岩石中较差",
                  "Rocna/Manson：高级，最佳全能",
                  "Fortress：铝制，轻便，抓力重量比好",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Anchor size matters! Bigger = better holding. Check manufacturer's recommendations for your boat size.",
                ru: "Размер якоря имеет значение! Больше = лучше держит. Проверьте рекомендации производителя для вашей яхты.",
                zh: "锚的大小很重要！更大 = 更好抓力。查看制造商对您船只尺寸的建议。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Weighing Anchor",
            ru: "Подъём якоря",
            zh: "起锚",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "1. Start engine (for control)",
                  "2. Motor forward while crew hoists chain",
                  "3. Stop when boat is over anchor",
                  "4. Break anchor free (may need short reverse)",
                  "5. Hoist remaining rode",
                  "6. Check anchor is aboard and secured",
                  "7. Rinse chain if muddy",
                ],
                ru: [
                  "1. Запустите мотор (для контроля)",
                  "2. Двигайтесь вперёд, пока экипаж выбирает цепь",
                  "3. Остановитесь, когда яхта над якорем",
                  "4. Оторвите якорь (может потребоваться короткий задний ход)",
                  "5. Выберите оставшуюся цепь",
                  "6. Проверьте, что якорь на борту и закреплён",
                  "7. Промойте цепь, если грязная",
                ],
                zh: [
                  "1. 启动发动机（用于控制）",
                  "2. 向前移动，同时船员收锚链",
                  "3. 船在锚上方时停止",
                  "4. 拉起锚（可能需要短暂倒车）",
                  "5. 收起剩余锚链",
                  "6. 检查锚已上船并固定",
                  "7. 如有泥污请冲洗锚链",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Hauling anchor into wind is easier - wind helps break it free. But watch for drift onto other boats!",
                ru: "Поднимать якорь против ветра легче - ветер помогает оторвать его. Но следите, чтобы не снесло на другие яхты!",
                zh: "迎风起锚更容易 - 风有助于拉起锚。但注意不要漂向其他船只！",
              }[l] as string,
            },
          ],
        },
      ];
    },
  },
  {
    id: "docking",
    category: "seamanship",
    titleKey: "dockingTitle",
    descKey: "dockingDesc",
    icon: "🛥️",
    order: 3,
    content: [],
    getContent: (lang: Lang) => {
      const l = lang === "en" ? "en" : lang === "ru" ? "ru" : lang === "zh" ? "zh" : "en";
      return [
        {
          type: "text",
          content: {
            en: "Docking is often the most stressful part of sailing - but with preparation and practice, it becomes routine.",
            ru: "Швартовка часто самая стрессовая часть плавания - но с подготовкой и практикой она становится рутиной.",
            zh: "停靠通常是航行中压力最大的部分 - 但通过准备和练习，会成为常规操作。",
          }[l] as string,
        },
        {
          type: "accordion",
          title: {
            en: "Preparation",
            ru: "Подготовка",
            zh: "准备",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Fenders out (correct height for dock)",
                  "Lines ready (4 minimum: bow, stern, 2 springs)",
                  "Assign crew roles (who handles which line)",
                  "Brief the plan (which side, wind/current effect)",
                  "Slow down well before dock!",
                ],
                ru: [
                  "Кранцы выставлены (правильная высота для причала)",
                  "Концы готовы (минимум 4: носовой, кормовой, 2 шпринга)",
                  "Распределите роли экипажа (кто работает с каким концом)",
                  "Проинструктируйте план (какой борт, влияние ветра/течения)",
                  "Снизьте скорость задолго до причала!",
                ],
                zh: [
                  "护舷已放出（适合码头高度）",
                  "缆绳已准备（至少4根：首缆、尾缆、2根倒缆）",
                  "分配船员角色（谁负责哪根缆）",
                  "简述计划（哪侧、风流影响）",
                  "提前减速！",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Prepare fenders and lines EARLY, while still offshore. Don't scramble at the last minute!",
                ru: "Готовьте кранцы и концы ЗАРАНЕЕ, пока ещё в море. Не суетитесь в последний момент!",
                zh: "提前准备护舷和缆绳，在海上时就做好。不要最后一刻手忙脚乱！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Alongside / Berthing",
            ru: "Швартовка лагом",
            zh: "横靠/系泊",
          }[l] as string,
          children: [
            { 
              type: "heading", 
              content: { en: "Four Lines", ru: "Четыре конца", zh: "四根缆绳" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Bow line: forward from bow",
                  "Stern line: aft from stern",
                  "Forward spring: from bow leading aft",
                  "Aft spring: from stern leading forward",
                ],
                ru: [
                  "Носовой конец: вперёд с носа",
                  "Кормовой конец: назад с кормы",
                  "Носовой шпринг: с носа к корме",
                  "Кормовой шпринг: с кормы к носу",
                ],
                zh: [
                  "首缆：从船首向前",
                  "尾缆：从船尾向后",
                  "前倒缆：从船首向后",
                  "后倒缆：从船尾向前",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Springs prevent fore/aft movement. Bow/stern lines prevent leaving dock.",
                ru: "Шпринги предотвращают движение вперёд/назад. Носовой/кормовой концы не дают отойти от причала.",
                zh: "倒缆防止前后移动。首/尾缆防止离开码头。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Approach", ru: "Подход", zh: "进近" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Approach at 20-30° angle to dock",
                  "2. Into wind/current if possible",
                  "3. SLOW! Walking pace or less",
                  "4. Aim for mid-point of berth",
                  "5. Turn parallel just before reaching",
                  "6. Use reverse to stop forward motion",
                  "7. Spring line first (holds boat to dock)",
                  "8. Then bow, stern, remaining spring",
                ],
                ru: [
                  "1. Подходите под углом 20-30° к причалу",
                  "2. Против ветра/течения, если возможно",
                  "3. МЕДЛЕННО! Скорость пешехода или меньше",
                  "4. Целитесь в середину места",
                  "5. Разворачивайтесь параллельно перед контактом",
                  "6. Используйте задний ход для остановки",
                  "7. Сначала шпринг (удерживает яхту у причала)",
                  "8. Затем носовой, кормовой, оставшийся шпринг",
                ],
                zh: [
                  "1. 以20-30°角接近码头",
                  "2. 尽可能迎风/流",
                  "3. 慢！步行速度或更慢",
                  "4. 瞄准泊位中点",
                  "5. 到达前转平行",
                  "6. 用倒车停止前进",
                  "7. 先上倒缆（固定船到码头）",
                  "8. 然后首缆、尾缆、剩余倒缆",
                ],
              }[l] as string[],
            },
            {
              type: "warning",
              content: {
                en: "Wind/current pushing you OFF dock: approach at steeper angle. ON to dock: shallower angle and use reverse early.",
                ru: "Ветер/течение отжимает ОТ причала: подходите под более крутым углом. К причалу: меньший угол и ранний задний ход.",
                zh: "风流推离码头：陡角度接近。推向码头：浅角度并提前倒车。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Mediterranean Mooring (Stern-to)",
            ru: "Средиземноморская швартовка (кормой)",
            zh: "地中海式系泊（船尾靠泊）",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Anchoring bow, backing stern to dock. Common in Mediterranean marinas.",
                ru: "Якорь с носа, корма к причалу. Распространено в средиземноморских маринах.",
                zh: "船首抛锚，船尾倒入码头。地中海码头常见。",
              }[l] as string,
            },
            { 
              type: "heading", 
              content: { en: "Procedure", ru: "Процедура", zh: "程序" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "1. Set anchor 3-4 boat lengths from dock",
                  "2. Pay out chain while reversing toward dock",
                  "3. Prepare stern lines (crew ready with lines)",
                  "4. Approach dock slowly in reverse",
                  "5. Pass stern lines to dock",
                  "6. Tension anchor chain to pull bow away",
                  "7. Adjust position with chain and stern lines",
                ],
                ru: [
                  "1. Отдайте якорь на 3-4 длины корпуса от причала",
                  "2. Травите цепь, двигаясь назад к причалу",
                  "3. Подготовьте кормовые концы (экипаж готов)",
                  "4. Подходите к причалу медленно задним ходом",
                  "5. Подайте кормовые концы на причал",
                  "6. Натяните якорную цепь, оттягивая нос",
                  "7. Отрегулируйте позицию цепью и кормовыми концами",
                ],
                zh: [
                  "1. 在距码头3-4船长处抛锚",
                  "2. 倒车向码头同时放锚链",
                  "3. 准备尾缆（船员准备）",
                  "4. 缓慢倒车靠码头",
                  "5. 将尾缆递给码头",
                  "6. 拉紧锚链使船首离开",
                  "7. 用锚链和尾缆调整位置",
                ],
              }[l] as string[],
            },
            { 
              type: "heading", 
              content: { en: "Wind/Current", ru: "Ветер/Течение", zh: "风流" }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Side wind: anchor upwind, let wind blow stern to dock",
                  "Helps push you into position",
                ],
                ru: [
                  "Боковой ветер: якорь с наветренной стороны, пусть ветер сдувает корму к причалу",
                  "Помогает прижаться к месту",
                ],
                zh: [
                  "侧风：在上风侧抛锚，让风吹船尾向码头",
                  "帮助推入位置",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Practice in empty spot first! Med mooring is hard. Many marinas have staff to help catch lines.",
                ru: "Потренируйтесь на пустом месте сначала! Средиземноморская швартовка сложна. Во многих маринах есть персонал, помогающий принять концы.",
                zh: "先在空位练习！地中海式系泊很难。许多码头有工作人员帮助接缆。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Prop Walk Effect",
            ru: "Эффект шага винта",
            zh: "螺旋桨侧推效应",
          }[l] as string,
          children: [
            {
              type: "text",
              content: {
                en: "Right-hand prop (clockwise viewed from stern - most common):",
                ru: "Правый винт (по часовой стрелке со стороны кормы - наиболее распространённый):",
                zh: "右旋螺旋桨（从船尾看顺时针 - 最常见）：",
              }[l] as string,
            },
            {
              type: "list",
              items: {
                en: [
                  "Forward gear: stern pushes slightly to starboard",
                  "Reverse gear: stern pushes strongly to port",
                ],
                ru: [
                  "Передний ход: корму слегка тянет вправо",
                  "Задний ход: корму сильно тянет влево",
                ],
                zh: [
                  "前进：船尾略向右偏",
                  "倒车：船尾强烈向左偏",
                ],
              }[l] as string[],
            },
            {
              type: "note",
              content: {
                en: "Use this! Reverse into dock port-side-to, and prop walk helps push you in. Starboard-side-to fights you.",
                ru: "Используйте это! Задним ходом к причалу левым бортом - шаг винта помогает прижаться. Правым бортом - мешает.",
                zh: "利用这点！倒车左舷靠泊，侧推帮你靠拢。右舷靠泊会阻碍。",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Wind & Current Strategy",
            ru: "Стратегия с ветром и течением",
            zh: "风流策略",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "Wind off dock (pushing away): Approach at steeper angle, get line ashore FAST",
                  "Wind onto dock (pushing you in): Shallow angle, use reverse early to control",
                  "Wind along dock: Approach from downwind, let wind blow you in",
                  "Current: Face into it when possible, like wind",
                ],
                ru: [
                  "Ветер от причала (отжимает): Подходите под более крутым углом, быстро подайте конец на берег",
                  "Ветер на причал (прижимает): Меньший угол, используйте задний ход заранее",
                  "Ветер вдоль причала: Подходите с подветренной стороны, пусть ветер вас прижмёт",
                  "Течение: Идите против него, когда возможно, как с ветром",
                ],
                zh: [
                  "风离码头（推开）：陡角度接近，快速上缆",
                  "风向码头（推入）：浅角度，提前倒车控制",
                  "风沿码头：从下风接近，让风吹你入泊",
                  "流：尽可能迎流，如同迎风",
                ],
              }[l] as string[],
            },
            {
              type: "tip",
              content: {
                en: "Can't dock nicely? Circle and try again. Better to repeat approach than crash!",
                ru: "Не получается красиво пришвартоваться? Сделайте круг и повторите. Лучше повторить подход, чем врезаться!",
                zh: "无法顺利停靠？绕圈重试。重复进近总比撞上好！",
              }[l] as string,
            },
          ],
        },
        {
          type: "accordion",
          title: {
            en: "Common Mistakes",
            ru: "Частые ошибки",
            zh: "常见错误",
          }[l] as string,
          children: [
            {
              type: "list",
              items: {
                en: [
                  "❌ Coming in too fast (most common!)",
                  "❌ Not preparing lines/fenders early",
                  "❌ Wrong side (fenders on wrong side)",
                  "❌ Not briefing crew",
                  "❌ Ignoring wind/current",
                  "❌ Throttle panic (too much throttle when worried)",
                  "❌ Not using springs (boat moves fore/aft)",
                ],
                ru: [
                  "❌ Слишком быстрый подход (самое частое!)",
                  "❌ Не подготовили концы/кранцы заранее",
                  "❌ Не тот борт (кранцы не на том борту)",
                  "❌ Не проинструктировали экипаж",
                  "❌ Игнорирование ветра/течения",
                  "❌ Паника с газом (слишком много газа от волнения)",
                  "❌ Не используют шпринги (яхта движется вперёд/назад)",
                ],
                zh: [
                  "❌ 速度太快（最常见！）",
                  "❌ 未提前准备缆绳/护舷",
                  "❌ 错侧（护舷在错侧）",
                  "❌ 未向船员简述",
                  "❌ 忽视风流",
                  "❌ 油门恐慌（紧张时油门过大）",
                  "❌ 不用倒缆（船前后移动）",
                ],
              }[l] as string[],
            },
          ],
        },
        {
          type: "note",
          content: {
            en: "Remember: slow is smooth, smooth is fast. There's no prize for quick docking, but there's a penalty for crashing!",
            ru: "Помните: медленно - значит плавно, плавно - значит быстро. Нет приза за быструю швартовку, но есть штраф за столкновение!",
            zh: "记住：慢即顺，顺即快。快速停靠无奖励，撞击有惩罚！",
          }[l] as string,
        },
      ];
    },
  },
];
