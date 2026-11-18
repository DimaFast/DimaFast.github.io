const catalog = {
  gynecologyInitial: ["Акушер-гінеколог — первинна консультація", "800 грн"],
  gynecologyFollowup: ["Акушер-гінеколог — повторна консультація", "600 грн"],
  oncologyInitial: ["Консультація гінеколога-онколога експертного рівня — первинна", "1200 грн"],
  oncologyFollowup: ["Консультація гінеколога-онколога експертного рівня — повторна", "800 грн"],
  online: ["Онлайн консультація", "1000 грн"],
  pelvicUltrasound: ["Органи малого тазу", "700 грн"],
  breastUltrasound: ["Молочні залози", "700 грн"],
  abdominalUltrasound: ["Черевна порожнина", "700 грн"],
  thyroidUltrasound: ["Щитоподібна залоза", "600 грн"],
  colposcopy: ["Кольпоскопія з консультацією", "1500 грн"],
  hpvVaccine: ["Вакцина", "5300 грн"],
  hpvVisit: ["Консультація + введення", "900 грн"],
  papillomaRemoval: ["Видалення папілом", "від 500 грн"],
  cervicalExcision: ["Ексцизія шийки матки + гістологія", "2500 грн"],
  cervicalPolyp: ["Видалення поліпа цервікального каналу + гістологія", "1500 грн"],
  iudInsertion: ["Постановка ВМС", "1200 грн"],
  iudRemoval: ["Зняття ВМС", "1000 грн"],
  mirena: ["Внутрішньоматкова система «Мірена»", "2800 грн"],
  breastConsultation: ["Консультація мамолога з УЗД молочних залоз", "1500 грн"],
  liquidCytology: ["Рідинна цитологія шийки матки", "800 грн"],
  glassCytology: ["Цитологія на склі", "500 грн"],
  biopsy: ["Забір біопсійного матеріалу", "1200 грн"],
  histology: ["Гістологічне дослідження", "1000 грн"],
} as const;

type PriceKey = keyof typeof catalog;

export function servicePrice(key: PriceKey, label?: string) {
  const [name, amount] = catalog[key];
  return { label: label ?? name, amount };
}

export const prices = [
  ["Послуга", "Вартість"],
  ["КОНСУЛЬТАЦІЇ"],
  catalog.gynecologyInitial,
  catalog.gynecologyFollowup,
  catalog.oncologyInitial,
  catalog.oncologyFollowup,
  catalog.online,
  ["УЗД ДІАГНОСТИКА"],
  catalog.pelvicUltrasound,
  catalog.breastUltrasound,
  catalog.abdominalUltrasound,
  catalog.thyroidUltrasound,
  ["КОЛЬПОСКОПІЯ"],
  catalog.colposcopy,
  ["ВАКЦИНАЦІЯ ВПЛ"],
  catalog.hpvVaccine,
  catalog.hpvVisit,
  catalog.papillomaRemoval,
  catalog.cervicalExcision,
  catalog.cervicalPolyp,
  catalog.iudInsertion,
  catalog.iudRemoval,
] as const;
