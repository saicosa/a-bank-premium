export const brand = {
  name: "A-bank",
  tagline: "Единый контур для рублей и мира",
  statement:
    "Электронный кошелёк, в котором рубли и стейблкоины живут в одном контуре — хранение, обмен, карты, оплата.",
  walletUrl: "https://wallet.a-bank.ru",
  siteUrl: "https://a-bank.ru",
} as const;

export const navItems = [
  { id: "manifesto", label: "Суть", index: "01" },
  { id: "scale", label: "Масштаб", index: "02" },
  { id: "contour", label: "Продукты", index: "03" },
  { id: "services", label: "Сервисы", index: "04" },
  { id: "flow", label: "Путь", index: "05" },
  { id: "security", label: "Защита", index: "06" },
  { id: "threshold", label: "Вход", index: "07" },
] as const;

export const stats = [
  { value: 300, suffix: "к+", label: "Пользователей в экосистеме" },
  { value: 0, suffix: "%", label: "Комиссия за пополнение RUB" },
  { value: 0, suffix: "%", label: "Операции по картам МИР и Visa" },
  { value: 24, suffix: "/7", label: "Доступ к кошельку" },
] as const;

export const contourProducts = [
  {
    id: "wallet",
    index: "01",
    title: "Криптокошелёк",
    subtitle: "RUB + USDT",
    copy: "Один баланс для рублей и стейблкоинов. Пополнение, вывод, история — синхронно в браузере и Telegram.",
    meta: "Web · Telegram",
  },
  {
    id: "mir",
    index: "02",
    title: "Карта МИР",
    subtitle: "Россия",
    copy: "Виртуальная рублёвая карта для онлайн- и офлайн-покупок везде, где принимают российские карты.",
    meta: "После верификации",
  },
  {
    id: "visa",
    index: "03",
    title: "Visa USD",
    subtitle: "Мир",
    copy: "Долларовая виртуальная карта для оплат за рубежом. Поддержка Apple Pay и Google Pay.",
    meta: "Apple Pay · Google Pay",
  },
  {
    id: "exchange",
    index: "04",
    title: "Обмен USDT",
    subtitle: "Сети",
    copy: "Обмен между сетями и направление USDT ↔ RUB. Прозрачный курс, понятная комиссия брокера.",
    meta: "TRON · Solana · др.",
  },
  {
    id: "everyday",
    index: "05",
    title: "Повседневное",
    subtitle: "Сервисы",
    copy: "QR-оплата из кошелька, связь и ЖКХ, Apple Gift Card — без смены региона App Store.",
    meta: "QR · ЖКХ · App Store",
  },
] as const;

export const services = [
  {
    id: "topup",
    index: "01",
    title: "Пополнение",
    copy: "СБП с собственных счетов любого банка РФ, USDT / USDC, банковский перевод или карта.",
  },
  {
    id: "spend",
    index: "02",
    title: "Платежи в РФ и за рубежом",
    copy: "Рублёвая МИР для России. Visa для зарубежных сервисов и подписок — из одного кошелька.",
  },
  {
    id: "qr",
    index: "03",
    title: "Оплата по QR",
    copy: "Платите с баланса в офлайн-точках напрямую из кошелька A-bank.",
  },
  {
    id: "bills",
    index: "04",
    title: "Связь и ЖКХ",
    copy: "Мобильная связь, интернет, коммунальные платежи — бытовые операции в том же контуре.",
  },
  {
    id: "apple",
    index: "05",
    title: "Apple Gift Card",
    copy: "Пополнение App Store без смены региона. Подписки и приложения снова доступны.",
  },
  {
    id: "access",
    index: "06",
    title: "Два входа, один баланс",
    copy: "wallet.a-bank.ru и Telegram-бот. История и баланс синхронизируются мгновенно.",
  },
] as const;

export const flowSteps = [
  {
    id: "verify",
    index: "01",
    title: "Верификация",
    copy: "Паспорт онлайн. Несколько минут. Без неё кошелёк закрыт — так защищён аккаунт.",
  },
  {
    id: "fund",
    index: "02",
    title: "Пополнение",
    copy: "Рубли со своих счетов или стейблкоины. Только со счетов на ваше имя.",
  },
  {
    id: "move",
    index: "03",
    title: "Движение",
    copy: "Обмен, карта, QR, сервисы. Средства остаются в одном пространстве.",
  },
  {
    id: "world",
    index: "04",
    title: "Выход в мир",
    copy: "Visa за рубежом, МИР в России, вывод на свои реквизиты — когда нужно.",
  },
] as const;

export const securityLayers = [
  {
    id: "identity",
    title: "Идентичность",
    copy: "Обязательная проверка личности. Операции — только после подтверждения.",
  },
  {
    id: "encryption",
    title: "Шифрование",
    copy: "Данные и средства защищены современными методами шифрования.",
  },
  {
    id: "ownership",
    title: "Владение",
    copy: "Пополнение только со счетов на ваше имя. Чужие переводы отсекаются.",
  },
  {
    id: "discipline",
    title: "Дисциплина",
    copy: "PIN, пароли и SMS-коды — только у вас. Даже если кто-то представляется поддержкой.",
  },
] as const;

export const legal = {
  entity: 'ООО "Агрегатор"',
  basis: "Кошелёк A-bank базируется на РНКО «АЛТЫН».",
  license:
    "Лицензия Национального банка Республики Абхазии №005 от 11.05.2011",
  address: "г. Сухум, ул. Агумаа, д. 6",
} as const;
