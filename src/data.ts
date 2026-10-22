/*
 * Everything the site says about «Точка» lives here: contacts, hours, services and prices.
 * Prices come from the «Услуги» section of the VK group; facts from the Yandex Maps card.
 */

export const contacts = {
  phone: '+7 (951) 088-08-08',
  phoneHref: 'tel:+79510880808',
  max: 'https://max.ru/u/f9LHodD0cOJtuWpUMVEl1d3RjvFsxiJcRxX0uFvmcWH2zDxeghG_OmQJE7s',
  vk: 'https://vk.com/tochka_avtoservis',
  address: 'Курск, Кирпичная ул., 19',
  coords: [36.167072, 51.797523] as const,
  mapsOrg: 'https://yandex.ru/maps/org/tochka/86005171762/',
  reviews: 'https://yandex.ru/maps/org/tochka/86005171762/reviews/',
  reviewsWidget: 'https://yandex.ru/maps-reviews-widget/86005171762?comments',
};

/** daily 9:00–19:00, Moscow time */
export const hours = { open: 9, close: 19 };

export const rating = { value: '5.0', votes: 177, reviews: 73 };

export type Category = { id: string; title: string; short: string; icon: IconName; text: string };
export type IconName = 'drop' | 'disc' | 'engine' | 'scan' | 'gear' | 'spring' | 'bolt' | 'wheel';

export const categories: Category[] = [
  { id: 'to', title: 'ТО и жидкости', short: 'ТО', icon: 'drop', text: 'Масло, фильтры, свечи, тормозная и охлаждающая жидкость.' },
  { id: 'brakes', title: 'Тормоза', short: 'Тормоза', icon: 'disc', text: 'Колодки, диски, барабаны, суппорты, ручник.' },
  { id: 'engine', title: 'Двигатель и КПП', short: 'Двигатель', icon: 'engine', text: 'Клапаны, форсунки, дроссель, сцепление.' },
  { id: 'diag', title: 'Диагностика', short: 'Диагностика', icon: 'scan', text: 'Двигатель, коды ошибок, ходовая, свет фар.' },
];

export type Service = { name: string; price: number; cat: string; popular?: boolean };

export const services: Service[] = [
  { cat: 'to', name: 'Замена масла в двигателе', price: 800, popular: true },
  { cat: 'to', name: 'Замена масла в МКПП', price: 800 },
  { cat: 'to', name: 'Замена масла в АКПП (частичная)', price: 2500 },
  { cat: 'to', name: 'Замена воздушного фильтра', price: 200 },
  { cat: 'to', name: 'Замена салонного фильтра', price: 200 },
  { cat: 'to', name: 'Замена топливного фильтра', price: 600 },
  { cat: 'to', name: 'Замена свечей зажигания', price: 600 },
  { cat: 'to', name: 'Замена тормозной жидкости', price: 800 },
  { cat: 'to', name: 'Замена охлаждающей жидкости', price: 1200 },
  { cat: 'to', name: 'Замена щёток стеклоочистителей', price: 200 },
  { cat: 'to', name: 'Замена ламп', price: 100 },
  { cat: 'brakes', name: 'Замена передних тормозных колодок', price: 800, popular: true },
  { cat: 'brakes', name: 'Замена задних тормозных колодок', price: 1800 },
  { cat: 'brakes', name: 'Замена передних тормозных дисков и колодок', price: 1600 },
  { cat: 'brakes', name: 'Замена задних тормозных барабанов', price: 800 },
  { cat: 'brakes', name: 'Разработка суппортов со смазкой направляющих', price: 800 },
  { cat: 'brakes', name: 'Обслуживание тормозных механизмов', price: 800 },
  { cat: 'brakes', name: 'Регулировка стояночного тормоза', price: 800 },
  { cat: 'engine', name: 'Регулировка клапанов', price: 2000 },
  { cat: 'engine', name: 'Промывка форсунок', price: 1600 },
  { cat: 'engine', name: 'Очистка дроссельной заслонки', price: 1600 },
  { cat: 'engine', name: 'Замена сцепления в сборе', price: 6000, popular: true },
  { cat: 'diag', name: 'Диагностика двигателя', price: 800, popular: true },
  { cat: 'diag', name: 'Считывание кодов неисправностей', price: 800 },
  { cat: 'diag', name: 'Осмотр ходовой', price: 800 },
  { cat: 'diag', name: 'Проверка и регулировка света фар', price: 800 },
];

/** work types from the Yandex card that have no fixed price */
export const alsoDo = ['Развал-схождение', 'Шиномонтаж', 'Ремонт ходовой', 'Замена ГРМ', 'Ремонт АКПП и DSG', 'Ремонт генераторов', 'Сигнализации', 'Сварочные работы', 'Выездной сервис'];

/**
 * Logos in public/brands, shown monochrome. Sources: Simple Icons (CC0) for most marks;
 * Wikimedia Commons for Chery, Haval, Geely, Genesis and Lexus; car-logos-dataset for Daewoo.
 */
export const brands = [
  { name: 'Lada', file: 'lada.svg' }, { name: 'Kia', file: 'kia.svg' }, { name: 'Hyundai', file: 'hyundai.svg' },
  { name: 'Toyota', file: 'toyota.svg' }, { name: 'Lexus', file: 'lexus.svg' }, { name: 'Mitsubishi', file: 'mitsubishi.svg' },
  { name: 'Mazda', file: 'mazda.svg' }, { name: 'Chery', file: 'chery.svg' }, { name: 'Haval', file: 'haval.svg' },
  { name: 'Geely', file: 'geely.svg' }, { name: 'Genesis', file: 'genesis.svg' }, { name: 'Renault', file: 'renault.svg' },
  { name: 'Volkswagen', file: 'volkswagen.svg' }, { name: 'Škoda', file: 'skoda.svg' }, { name: 'Audi', file: 'audi.svg' },
  { name: 'Mercedes-Benz', file: 'mercedes.svg' }, { name: 'Ford', file: 'ford.svg' }, { name: 'Chevrolet', file: 'chevrolet.svg' },
  { name: 'Daewoo', file: 'daewoo.png' }, { name: 'Peugeot', file: 'peugeot.svg' },
];

export const perks = [
  { title: 'Цена до начала работ', text: 'Осматриваем, называем стоимость и только потом берёмся за ремонт.' },
  { title: 'Гарантия', text: 'Отвечаем за выполненные работы.' },
  { title: 'Запчасти в наличии', text: 'Для отечественных автомобилей и иномарок — не ждёте доставку.' },
  { title: 'Выездной сервис', text: 'Приедем, если машина не на ходу.' },
  { title: 'Удобно ждать', text: 'Wi-Fi, кофе, можно прийти с питомцем.' },
  { title: 'Любая оплата', text: 'Карта, СБП, QR-код, наличные, безнал.' },
];

export const faq: [string, string][] = [
  ['Сколько стоит работа?', 'Цены на популярные работы — в прайсе выше. Нормочас — от 1 000 до 2 000 ₽. Точную стоимость называем после осмотра, до начала ремонта.'],
  ['Есть ли запчасти?', 'Да, запчасти для отечественных автомобилей и иномарок есть в наличии.'],
  ['Даёте гарантию?', 'Да, на выполненные работы даётся гарантия.'],
  ['Можно ли записаться заранее?', 'Да. Оставьте заявку на сайте, напишите в MAX или ВКонтакте, или позвоните — подберём удобное время.'],
  ['Как можно оплатить?', 'Картой, по СБП или QR-коду, наличными и банковским переводом.'],
  ['Машина не на ходу — что делать?', 'Позвоните: у нас есть выездной сервис.'],
  ['Где припарковаться?', 'У сервиса есть парковка, в том числе места для людей с инвалидностью.'],
];

export const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽';
