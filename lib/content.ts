export type Lang = "ru" | "en";

export interface Module {
  n: string;
  title: string;
  desc: string;
}

export interface FormatPart {
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
}

export interface Person {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  nav: {
    about: string;
    format: string;
    modules: string;
    audience: string;
    speaker: string;
    pricing: string;
    contacts: string;
    cta: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  about: {
    tag: string;
    title: string;
    paragraphs: string[];
    radar: { letter: string; word: string }[];
  };
  format: {
    tag: string;
    title: string;
    intro: string;
    parts: FormatPart[];
  };
  modules: {
    tag: string;
    title: string;
    intro: string;
    list: Module[];
  };
  audience: {
    tag: string;
    title: string;
    intro: string;
    list: { title: string; desc: string }[];
  };
  speaker: {
    tag: string;
    title: string;
    name: string;
    role: string;
    bio: string[];
    producerName: string;
    producerRole: string;
  };
  gallery: { tag: string; title: string; subtitle: string };
  pricing: {
    tag: string;
    title: string;
    intro: string;
    cards: { title: string; price: string; desc: string; featured?: boolean }[];
    note: string;
  };
  contacts: {
    tag: string;
    title: string;
    intro: string;
    persons: Person[];
    form: {
      name: string;
      phone: string;
      email: string;
      message: string;
      submit: string;
      success: string;
    };
  };
  footer: { rights: string; tagline: string };
}

const ru: Dictionary = {
  meta: {
    title: "RADAR RACES — РазГОНИ свой управленческий радар",
    description:
      "Управленческий интенсив нового формата: развитие лидерских навыков топ-менеджеров через опыт автогонок и стратегические сессии. Программа уровня Executive MBA.",
  },
  nav: {
    about: "О проекте",
    format: "Формат",
    modules: "Программа",
    audience: "Кому подходит",
    speaker: "Спикер",
    pricing: "Стоимость",
    contacts: "Контакты",
    cta: "Оставить заявку",
  },
  hero: {
    badge: "Международная программа уровня Executive MBA",
    title: "РазГОНИ свой",
    titleAccent: "управленческий радар",
    subtitle:
      "Уникальные управленческие сессии, сочетающие экстремальный опыт автогонок на профессиональной трассе с глубоким анализом лидерских компетенций.",
    lead: "1–2–3-дневные интенсивы и стратегические сессии для топ-менеджеров и собственников бизнеса.",
    ctaPrimary: "Оставить заявку",
    ctaSecondary: "Узнать о программе",
    stats: [
      { value: "200+", label: "часов тренингов для руководителей за год" },
      { value: "6", label: "модулей программы Executive MBA" },
      { value: "3", label: "трассы: Москва · Сочи · Дубай" },
    ],
  },
  about: {
    tag: "О проекте",
    title: "Обучение через опыт, который меняет мышление",
    paragraphs: [
      "RADAR RACES — это инновационный подход к развитию лидерских навыков топ-менеджеров. Мы соединяем экстремальный опыт автогонок с глубоким анализом управленческих компетенций.",
      "Формат Experiential Learning («обучение через получение нового опыта») позволяет участникам выйти за рамки привычного, переосмыслить управленческий стиль и обрести новые инсайты для повышения эффективности в роли лидера.",
      "Гоночная трасса становится метафорой бизнеса: те же скорость, риски и решения в условиях неопределённости — но здесь их можно прожить, осознать и натренировать.",
    ],
    radar: [
      { letter: "Р", word: "Решения в условиях скорости и риска" },
      { letter: "А", word: "Адаптивность и гибкость мышления" },
      { letter: "Д", word: "Действие на основе осознанности" },
      { letter: "А", word: "Анализ реакций и поведенческих паттернов" },
      { letter: "Р", word: "Рост личного и управленческого потенциала" },
    ],
  },
  format: {
    tag: "Формат",
    title: "Две части одного интенсива",
    intro:
      "Обучение через получение нового опыта: сначала — заезды на профессиональной трассе, затем — разбор осознанных и неосознанных реакций и работа над лидерскими компетенциями.",
    parts: [
      {
        tag: "Часть 1 · Трасса",
        title: "Гоночные заезды и разбор реакций",
        desc: "Участие в заездах на профессиональной трассе с дальнейшим разбором осознанных и неосознанных реакций.",
        bullets: [
          "Опыт принятия быстрых решений в стрессовых ситуациях",
          "Навыки управления рисками и оценки ситуации в реальном времени",
          "Понимание своих реакций и поведенческих паттернов в экстремальных условиях",
          "Осознание личных ограничений и потенциала для роста",
          "Практика командного взаимодействия в нестандартной обстановке",
        ],
      },
      {
        tag: "Часть 2 · Сессия",
        title: "Осознанное управление собой как лидером",
        desc: "Сессия по осознанному управлению личными и профессиональными навыками, талантами и энергией.",
        bullets: [
          "Глубокое понимание сильных сторон и зон развития как лидера",
          "Инструменты для повышения личной и профессиональной эффективности",
          "Стратегии управления энергией и ресурсным состоянием",
          "Навыки осознанного лидерства и эмоционального интеллекта",
          "План действий по развитию ключевых управленческих компетенций",
        ],
      },
    ],
  },
  modules: {
    tag: "Программа",
    title: "6 модулей уровня Executive MBA",
    intro:
      "Каждый модуль длится 3–4 дня, после обучения — поддержка и менторинг (чат-бот, экспертное сопровождение). При прохождении всех модулей — диплом Московской Бизнес Академии «Executive MBA».",
    list: [
      {
        n: "01",
        title: "Раскрытие управленческого потенциала",
        desc: "Тренировки на гоночной трассе (Москва, Сочи, Дубай — партнёр Kamensky Racing School) и сессия по осознанному управлению личной и профессиональной эффективностью лидера.",
      },
      {
        n: "02",
        title: "Управленческое бизнес-моделирование",
        desc: "Построение лидерской бизнес-модели управленца и новой бизнес-модели компании. Антикризисные преобразования для устойчивого развития бизнеса.",
      },
      {
        n: "03",
        title: "Искусственный интеллект в управлении",
        desc: "Практика внедрения ИИ в процесс принятия и проверки управленческих решений.",
      },
      {
        n: "04",
        title: "Автоматизация и аналитика",
        desc: "Выстраивание системы аналитики и системного управления бизнес-процессами.",
      },
      {
        n: "05",
        title: "Управление продуктом",
        desc: "Создание и улучшение продукта, обогащение клиентского опыта, точки роста, оценка гипотез, CJM, управление продуктовыми процессами.",
      },
      {
        n: "06",
        title: "Собственный управленческий проект",
        desc: "Переупаковка собственного продукта и бизнеса. Защита проекта, возможность двойного диплома.",
      },
    ],
  },
  audience: {
    tag: "Кому подходит",
    title: "Для тех, кто принимает стратегические решения",
    intro: "Программа создана для лидеров, отвечающих за развитие и будущее бизнеса.",
    list: [
      { title: "Высший менеджмент", desc: "Руководители, отвечающие за стратегические решения и их внедрение." },
      { title: "Собственники бизнеса", desc: "Цели: развитие бизнеса, поиск новых возможностей и рынков." },
      { title: "Советники собственников", desc: "Поиск и внедрение инноваций, операционная эффективность, антикризис." },
      { title: "Директора по развитию", desc: "Разработка, принятие и реализация стратегических решений." },
    ],
  },
  speaker: {
    tag: "Спикер",
    title: "Руководитель программы",
    name: "Гордеева Юлия Владимировна",
    role: "Руководитель корпоративного блока обучения Московской Бизнес Академии",
    bio: [
      "За 2024 год лично провела более 200 часов корпоративных тренингов и стратегических сессий для руководителей.",
      "Руководитель НИР «Стратегическая компетентность» МГУ им. Ломоносова.",
      "Спикер и руководитель MBA-программ: РАНХиГС, РУДН.",
      "Член экспертного сообщества бизнес-преподавателей Skolkovo School of Management.",
      "До 2023 — руководитель международных программ Международной Школы Бизнеса РЭУ им. Плеханова (IBS Plekhanov).",
      "Эксперт-спикер площадок по развитию бизнеса от Московского Правительства: МБМ, ЦДП, Агентство Инноваций.",
    ],
    producerName: "Кузминская Лада Леонидовна",
    producerRole: "Академический директор Московской Бизнес Академии, продюсер программы",
  },
  gallery: {
    tag: "Галерея",
    title: "Там, где рождаются решения",
    subtitle: "Профессиональная трасса, пит-лейн и команда в действии.",
  },
  pricing: {
    tag: "Стоимость",
    title: "Инвестиция в управленческий рост",
    intro: "Организация модуля включает выездное мероприятие, двух экспертов, сопровождение после модуля, оформление договоров и сертификатов.",
    cards: [
      {
        title: "Индивидуальный модуль",
        price: "≈ $10 000",
        desc: "Организация одного модуля: выездное мероприятие в Дубай, 2 эксперта, сопровождение, договоры и сертификаты.",
      },
      {
        title: "Корпоративный заказ",
        price: "≈ $15 000",
        desc: "Обучение 10–15 директоров за один модуль с полной кастомизацией под отрасль и международную деятельность компании.",
        featured: true,
      },
      {
        title: "Полная программа",
        price: "Executive MBA",
        desc: "Все 6 модулей с менторингом и дипломом Московской Бизнес Академии. Возможен двойной диплом с защитой в Чехии.",
      },
    ],
    note: "Точная стоимость зависит от формата, состава группы и локации. Оставьте заявку — рассчитаем под ваш запрос.",
  },
  contacts: {
    tag: "Контакты",
    title: "Оставьте заявку",
    intro: "Расскажите о задаче — подберём формат интенсива под вашу команду и цели.",
    persons: [
      {
        name: "Гордеева Юлия Владимировна",
        role: "Директор корпоративного обучения",
        phone: "+7 (916) 637-49-86",
        email: "Prof@jgordeeva.ru",
      },
      {
        name: "Кузминская Лада Леонидовна",
        role: "Академический директор",
        phone: "+7 (909) 912-27-25",
        email: "lada.kuzminskaya@gmail.com",
      },
    ],
    form: {
      name: "Ваше имя",
      phone: "Телефон",
      email: "Email",
      message: "Расскажите о задаче",
      submit: "Отправить заявку",
      success: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    },
  },
  footer: {
    rights: "Московская Бизнес Академия",
    tagline: "Управленческие интенсивы нового формата",
  },
};

const en: Dictionary = {
  meta: {
    title: "RADAR RACES — Accelerate your management radar",
    description:
      "A new-format leadership intensive: developing executives' leadership skills through motorsport experience and strategic sessions. Executive MBA level program.",
  },
  nav: {
    about: "About",
    format: "Format",
    modules: "Program",
    audience: "Who it's for",
    speaker: "Speaker",
    pricing: "Pricing",
    contacts: "Contacts",
    cta: "Request a call",
  },
  hero: {
    badge: "International Executive MBA level program",
    title: "Accelerate your",
    titleAccent: "management radar",
    subtitle:
      "Unique management sessions blending the extreme experience of racing on a professional track with a deep analysis of leadership competencies.",
    lead: "1–2–3 day intensives and strategic sessions for top managers and business owners.",
    ctaPrimary: "Request a call",
    ctaSecondary: "Explore the program",
    stats: [
      { value: "200+", label: "hours of executive training per year" },
      { value: "6", label: "Executive MBA program modules" },
      { value: "3", label: "tracks: Moscow · Sochi · Dubai" },
    ],
  },
  about: {
    tag: "About",
    title: "Learning through experience that changes thinking",
    paragraphs: [
      "RADAR RACES is an innovative approach to developing executives' leadership skills. We combine the extreme experience of motorsport with a deep analysis of management competencies.",
      "The Experiential Learning format lets participants step beyond the familiar, rethink their management style and gain new insights to become more effective as leaders.",
      "The race track becomes a metaphor for business: the same speed, risk and decisions under uncertainty — but here they can be lived through, understood and trained.",
    ],
    radar: [
      { letter: "R", word: "Rapid decisions under speed and risk" },
      { letter: "A", word: "Adaptive and flexible thinking" },
      { letter: "D", word: "Deliberate action through awareness" },
      { letter: "A", word: "Analysis of reactions and behavioral patterns" },
      { letter: "R", word: "Rise of personal and managerial potential" },
    ],
  },
  format: {
    tag: "Format",
    title: "Two parts of one intensive",
    intro:
      "Learning through new experience: first — laps on a professional track, then — a debrief of conscious and unconscious reactions and work on leadership competencies.",
    parts: [
      {
        tag: "Part 1 · Track",
        title: "Racing laps and reaction debrief",
        desc: "Participation in laps on a professional track followed by an analysis of conscious and unconscious reactions.",
        bullets: [
          "Experience of fast decision-making under stress",
          "Risk management and real-time situation assessment skills",
          "Understanding your reactions and behavioral patterns in extreme conditions",
          "Awareness of personal limits and growth potential",
          "Team interaction practice in an unconventional setting",
        ],
      },
      {
        tag: "Part 2 · Session",
        title: "Conscious self-management as a leader",
        desc: "A session on the conscious management of personal and professional skills, talents and energy.",
        bullets: [
          "Deep understanding of strengths and growth areas as a leader",
          "Tools to boost personal and professional effectiveness",
          "Strategies for managing energy and resourceful states",
          "Conscious leadership and emotional intelligence skills",
          "An action plan to develop key management competencies",
        ],
      },
    ],
  },
  modules: {
    tag: "Program",
    title: "6 Executive MBA level modules",
    intro:
      "Each module lasts 3–4 days, followed by support and mentoring (chat-bot, expert guidance). Completing all modules earns the Moscow Business Academy Executive MBA diploma.",
    list: [
      {
        n: "01",
        title: "Unlocking management potential",
        desc: "Race track training (Moscow, Sochi, Dubai — partner Kamensky Racing School) and a session on conscious management of the leader's personal and professional effectiveness.",
      },
      {
        n: "02",
        title: "Management business modeling",
        desc: "Building the leader's business model and a new company business model. Anti-crisis transformations for sustainable growth.",
      },
      {
        n: "03",
        title: "Artificial intelligence in management",
        desc: "Practical adoption of AI in making and validating management decisions.",
      },
      {
        n: "04",
        title: "Automation and analytics",
        desc: "Building an analytics system and systematic management of business processes.",
      },
      {
        n: "05",
        title: "Product management",
        desc: "Creating and improving products, enriching customer experience, growth points, hypothesis testing, CJM, product process management.",
      },
      {
        n: "06",
        title: "Your own management project",
        desc: "Repackaging your own product and business. Project defense, option for a double diploma.",
      },
    ],
  },
  audience: {
    tag: "Who it's for",
    title: "For those who make strategic decisions",
    intro: "The program is built for leaders responsible for the growth and future of the business.",
    list: [
      { title: "Top management", desc: "Leaders responsible for strategic decisions and their implementation." },
      { title: "Business owners", desc: "Goals: business growth, finding new opportunities and markets." },
      { title: "Owners' advisors", desc: "Finding and adopting innovation, operational efficiency, anti-crisis work." },
      { title: "Development directors", desc: "Designing, approving and implementing strategic decisions." },
    ],
  },
  speaker: {
    tag: "Speaker",
    title: "Program director",
    name: "Yulia Gordeeva",
    role: "Head of Corporate Training at the Moscow Business Academy",
    bio: [
      "In 2024 personally delivered over 200 hours of corporate trainings and strategic sessions for executives.",
      "Head of the research project 'Strategic Competence' at Lomonosov Moscow State University.",
      "Speaker and director of MBA programs: RANEPA, RUDN.",
      "Member of the business educators expert community at Skolkovo School of Management.",
      "Until 2023 — head of international programs at the Plekhanov International School of Business (IBS Plekhanov).",
      "Expert speaker at business development venues of the Moscow Government: MBM, CDP, Innovation Agency.",
    ],
    producerName: "Lada Kuzminskaya",
    producerRole: "Academic Director of the Moscow Business Academy, program producer",
  },
  gallery: {
    tag: "Gallery",
    title: "Where decisions are born",
    subtitle: "Professional track, pit lane and the team in action.",
  },
  pricing: {
    tag: "Pricing",
    title: "An investment in management growth",
    intro: "A module includes the off-site event, two experts, post-module support, contracts and certificates.",
    cards: [
      {
        title: "Single module",
        price: "≈ $10,000",
        desc: "Organizing one module: off-site event in Dubai, 2 experts, support, contracts and certificates.",
      },
      {
        title: "Corporate order",
        price: "≈ $15,000",
        desc: "Training 10–15 directors per module with full customization for the company's industry and international operations.",
        featured: true,
      },
      {
        title: "Full program",
        price: "Executive MBA",
        desc: "All 6 modules with mentoring and the Moscow Business Academy diploma. Double diploma with defense in Czechia available.",
      },
    ],
    note: "The exact cost depends on the format, group composition and location. Leave a request — we'll tailor it to you.",
  },
  contacts: {
    tag: "Contacts",
    title: "Request a call",
    intro: "Tell us about your goal — we'll tailor the intensive to your team and objectives.",
    persons: [
      {
        name: "Yulia Gordeeva",
        role: "Director of Corporate Training",
        phone: "+7 (916) 637-49-86",
        email: "Prof@jgordeeva.ru",
      },
      {
        name: "Lada Kuzminskaya",
        role: "Academic Director",
        phone: "+7 (909) 912-27-25",
        email: "lada.kuzminskaya@gmail.com",
      },
    ],
    form: {
      name: "Your name",
      phone: "Phone",
      email: "Email",
      message: "Tell us about your goal",
      submit: "Send request",
      success: "Thank you! We'll get in touch with you shortly.",
    },
  },
  footer: {
    rights: "Moscow Business Academy",
    tagline: "New-format management intensives",
  },
};

export const dictionaries: Record<Lang, Dictionary> = { ru, en };
