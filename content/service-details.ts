import { servicePrice } from "@/content/pricing";
import { services, type Card } from "@/lib/site";

type ServiceSection = {
  title: string;
  description?: string;
  items?: string[];
};

type ServicePrice = {
  label: string;
  amount: string;
};

type ServiceDetail = {
  photo?: string;
  sections: [ServiceSection, ...ServiceSection[]];
  prices: [ServicePrice, ...ServicePrice[]];
  priceNote?: string;
  related: [string, string];
};

const serviceDetails: Record<string, ServiceDetail> = {
  "gynecologist-consultation": {
    photo: "/media/article-gynecology.webp",
    sections: [
      {
        title: "Первинна консультація",
        description: "Лікар розпитає про скарги, цикл і попередні обстеження. На прийомі можна обговорити симптоми, гормональне здоров’я та профілактику.",
        items: [
          "Гінекологічний огляд із оцінкою стану шийки матки та органів репродуктивної системи.",
          "Розбір результатів аналізів, УЗД та інших обстежень.",
          "Індивідуальний план додаткової діагностики або лікування й рекомендації лікаря.",
        ],
      },
      {
        title: "Повторна консультація",
        description: "Лікар оцінює результати призначених обстежень, контролює перебіг лікування й за потреби коригує рекомендації.",
      },
      {
        title: "Встановлення ВМС «Мірена»",
        description: "«Мірена» — гормональна внутрішньоматкова система для контрацепції та лікування гінекологічних станів. На консультації можна обговорити її встановлення, зокрема з огляду на рясні або болючі менструації.",
      },
    ],
    prices: [
      servicePrice("gynecologyInitial", "Акушер-гінеколог · первинний прийом"),
      servicePrice("gynecologyFollowup", "Акушер-гінеколог · повторний прийом"),
      servicePrice("oncologyInitial", "Онкогінеколог · первинний прийом"),
      servicePrice("oncologyFollowup", "Онкогінеколог · повторний прийом"),
      servicePrice("mirena"),
      servicePrice("iudInsertion", "Встановлення ВМС"),
    ],
    related: ["ultrasound-diagnostics", "online-consultations-with-specialists"],
  },
  "ultrasound-diagnostics": {
    photo: "/media/blog-ultrasound.webp",
    sections: [
      {
        title: "УЗД органів малого таза",
        description: "Під час обстеження лікар оцінює стан матки, ендометрію, яєчників і прилеглих структур. УЗД допомагає виявити кісти, міоми, поліпи, ознаки запальних процесів, ендометріозу та інші зміни.",
        items: [
          "Біль унизу живота, порушення циклу, рясні або болючі менструації.",
          "Планування вагітності та контроль овуляції.",
          "Профілактичне обстеження чи контроль після лікування або операції.",
        ],
      },
      {
        title: "УЗД молочних залоз і консультація мамолога",
        description: "УЗД молочних залоз можна пройти разом із консультацією мамолога.",
        items: [
          "Біль, ущільнення, виділення із сосків, зміни форми або стану шкіри молочної залози.",
          "Профілактичне обстеження, зокрема за наявності захворювань молочних залоз у сімейному анамнезі.",
          "Спостереження під час гормональних змін, планування вагітності або після лікування.",
        ],
      },
      {
        title: "Інші види УЗД",
        items: ["УЗД щитоподібної залози.", "УЗД органів черевної порожнини."],
      },
    ],
    prices: [
      servicePrice("pelvicUltrasound", "Органи малого таза"),
      servicePrice("breastUltrasound"),
      servicePrice("thyroidUltrasound"),
      servicePrice("abdominalUltrasound", "Органи черевної порожнини"),
      servicePrice("breastConsultation"),
    ],
    related: ["gynecologist-consultation", "gynecological-oncology"],
  },
  colposcopy: {
    photo: "/media/article-cervix.webp",
    sections: [
      {
        title: "Як проходить обстеження",
        description: "Лікар оглядає шийку матки під збільшенням. Кольпоскопія допомагає виявити дисплазію, передракові та інші зміни. У вартість входить консультація гінеколога або онкогінеколога.",
      },
      {
        title: "Коли призначають кольпоскопію",
        items: [
          "Зміни за результатами ПАП-тесту.",
          "Виявлення ВПЛ високого онкогенного ризику.",
          "Дисплазія шийки матки.",
          "Контроль після лікування патології шийки матки.",
        ],
      },
    ],
    prices: [servicePrice("colposcopy")],
    related: ["cytology", "gynecological-oncology"],
  },
  cytology: {
    photo: "/media/blog-cytology.webp",
    sections: [
      {
        title: "Для чого роблять ПАП-тест",
        description: "Цитологія допомагає виявити клітинні зміни шийки матки, зокрема передракові, ще до появи симптомів. Її також використовують для контролю стану шийки матки при ВПЛ.",
      },
      {
        title: "Рідинна цитологія",
        description: "Клітини зберігають у спеціальному розчині. Це допомагає підготувати зразок до оцінки з меншою кількістю домішок слизу й крові.",
      },
      {
        title: "Цитологія на склі",
        description: "Класичний метод, за якого клітини шийки матки досліджують під мікроскопом для виявлення запальних процесів та атипових клітин.",
      },
    ],
    prices: [
      servicePrice("liquidCytology"),
      servicePrice("glassCytology"),
    ],
    related: ["colposcopy", "hpv-vaccination-consultation"],
  },
  "gynecological-oncology": {
    photo: "/media/article-oncology.webp",
    sections: [
      {
        title: "Що включає консультація",
        items: [
          "Оцінку результатів цитології, кольпоскопії, біопсії, УЗД, КТ або МРТ.",
          "Консультацію щодо дисплазії, ВПЛ-асоційованих змін і новоутворень жіночої репродуктивної системи.",
          "План додаткової діагностики, лікування чи спостереження.",
          "Другу думку щодо діагнозу, оперативного лікування або післяопераційного супроводу.",
        ],
      },
      {
        title: "Коли звернутися",
        items: [
          "Позитивний тест на ВПЛ високого онкогенного ризику або зміни за результатами цитології чи кольпоскопії.",
          "Виявлена дисплазія або підозра на новоутворення.",
          "Незвичні кров’янисті виділення, біль або інші симптоми, що турбують.",
        ],
      },
    ],
    prices: [
      servicePrice("oncologyInitial", "Первинна консультація"),
      servicePrice("oncologyFollowup", "Повторна консультація"),
    ],
    related: ["colposcopy", "operative-interventions"],
  },
  "hpv-vaccination-consultation": {
    sections: [
      {
        title: "Що обговорюємо на консультації",
        description: "Лікар пояснює, від яких типів вірусу папіломи людини захищає вакцина та як вакцинація допомагає запобігати захворюванням, пов’язаним із ВПЛ, зокрема раку шийки матки. Рекомендації для підлітків і дорослих підбирають індивідуально.",
      },
      {
        title: "Консультація та вакцинація",
        description: "Під час запису можна уточнити наявність вакцини й вартість. Перед щепленням проводимо індивідуальну консультацію.",
      },
    ],
    prices: [
      servicePrice("hpvVaccine", "Вакцина проти ВПЛ"),
      servicePrice("hpvVisit", "Консультація та введення вакцини"),
    ],
    priceNote: "Вартість складових наведена за загальним прайсом. Підсумкову суму уточніть під час запису.",
    related: ["gynecologist-consultation", "cytology"],
  },
  "online-consultations-with-specialists": {
    sections: [
      {
        title: "Що включає онлайн-консультація",
        description: "На первинній або повторній консультації акушер-гінеколог дистанційно розбирає ваші скарги й результати аналізів та надає рекомендації щодо подальших обстежень.",
      },
    ],
    prices: [servicePrice("online", "Онлайн-консультація за загальним прайсом")],
    priceNote: "Вартість первинного й повторного прийому уточнює адміністратор під час запису.",
    related: ["gynecologist-consultation", "gynecological-oncology"],
  },
  "operative-interventions": {
    photo: "/media/article-surgery.webp",
    sections: [
      {
        title: "Забір біопсійного матеріалу",
        description: "Лікар бере зразок тканини для гістологічного дослідження. Виконуємо біопсію ендометрію, шийки матки та піхви, ПАП-біопсію, видалення і дослідження поліпів.",
      },
      {
        title: "Видалення папілом",
        description: "Папіломи — доброякісні утворення на шкірі або слизових. Лікар оцінює утворення, якщо воно травмується, спричиняє дискомфорт або змінюється. Видалення проводимо амбулаторно.",
      },
    ],
    prices: [
      servicePrice("biopsy"),
      servicePrice("histology"),
      servicePrice("papillomaRemoval"),
    ],
    priceNote: "Вартість видалення залежить від кількості утворень. Уточніть її під час запису.",
    related: ["gynecological-oncology", "colposcopy"],
  },
};

export const serviceSlugs = Object.keys(serviceDetails);

export type ServicePage = Card & ServiceDetail & { relatedServices: Card[] };

export function getServicePage(slug: string): ServicePage | undefined {
  const card = services.find((service) => service.slug === slug);
  if (!card || !Object.hasOwn(serviceDetails, slug)) return undefined;

  const detail = serviceDetails[slug];
  const relatedServices = detail.related.flatMap((relatedSlug) =>
    services.filter((service) => service.slug === relatedSlug),
  );

  return { ...card, ...detail, relatedServices };
}
