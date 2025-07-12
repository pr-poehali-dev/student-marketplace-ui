import { Listing, FilterOptions } from "@/types";

export const vipListings: Listing[] = [
  {
    id: 1,
    title: 'MacBook Pro 14" M3',
    price: "85 000 ₽",
    description: "Как новый, гарантия до 2025 года",
    image: "/img/816a7c3b-6f30-4725-9463-6c8e08377da5.jpg",
    verified: true,
    dormitory: "7",
    category: "Электроника",
  },
  {
    id: 2,
    title: "Комплект учебников по математике",
    price: "3 500 ₽",
    description: "Все учебники за 1-2 курс, отличное состояние",
    image: "/img/c9f47189-cf58-4488-b450-1afb51e90349.jpg",
    verified: true,
    dormitory: "12",
    category: "Учебники",
  },
];

export const regularListings: Listing[] = [
  {
    id: 3,
    title: "Велосипед складной",
    price: "12 000 ₽",
    description: "Отлично подходит для поездок по кампусу",
    image: "/img/19fcc879-a72f-40bf-ace2-5e85cb6fd86d.jpg",
    verified: false,
    dormitory: "3",
    category: "Транспорт",
    pushed: true,
  },
  {
    id: 4,
    title: "Репетиторство по физике",
    price: "800 ₽/час",
    description: "Помогу подготовиться к экзаменам",
    image: "/placeholder.svg",
    verified: true,
    dormitory: "8",
    category: "Услуги",
    pushed: true,
  },
  {
    id: 5,
    title: "Настольная лампа IKEA",
    price: "1 200 ₽",
    description: "Почти новая, идеальная для учебы",
    image: "/placeholder.svg",
    verified: false,
    dormitory: "5",
    category: "Мебель",
    pushed: false,
  },
  {
    id: 6,
    title: "Планшет Samsung Galaxy Tab",
    price: "18 000 ₽",
    description: "Для заметок и чтения, с стилусом",
    image: "/placeholder.svg",
    verified: true,
    dormitory: "11",
    category: "Электроника",
    pushed: false,
  },
  {
    id: 7,
    title: "Кофемашина Delonghi",
    price: "15 000 ₽",
    description: "Для общей кухни в общаге",
    image: "/placeholder.svg",
    verified: false,
    dormitory: "2",
    category: "Техника",
    pushed: false,
  },
  {
    id: 8,
    title: "Курсовые и дипломы на заказ",
    price: "от 5 000 ₽",
    description: "Качественное выполнение работ",
    image: "/placeholder.svg",
    verified: true,
    dormitory: "9",
    category: "Услуги",
    pushed: false,
  },
];

export const filterOptions: FilterOptions = {
  categories: [
    {
      name: "Электроника",
      subcategories: [
        "Ноутбуки",
        "Планшеты",
        "Телефоны",
        "Наушники",
        "Аксессуары",
      ],
    },
    {
      name: "Учебники",
      subcategories: [
        "Математика",
        "Физика",
        "Химия",
        "Языки",
        "Экономика",
        "История",
      ],
    },
    {
      name: "Мебель",
      subcategories: ["Столы", "Стулья", "Освещение", "Полки", "Декор"],
    },
    {
      name: "Одежда",
      subcategories: [
        "Верхняя одежда",
        "Повседневная",
        "Спортивная",
        "Обувь",
        "Аксессуары",
      ],
    },
    {
      name: "Транспорт",
      subcategories: ["Велосипеды", "Самокаты", "Запчасти", "Аксессуары"],
    },
    {
      name: "Услуги",
      subcategories: [
        "Репетиторство",
        "Курсовые",
        "Переводы",
        "Помощь с учебой",
      ],
    },
    {
      name: "Техника",
      subcategories: [
        "Бытовая техника",
        "Кухонная техника",
        "Для уборки",
        "Прочее",
      ],
    },
    {
      name: "Спорт",
      subcategories: ["Тренажеры", "Инвентарь", "Одежда", "Абонементы"],
    },
  ],
  dormitories: [
    "Все общежития",
    "Общаги 1-3",
    "Общаги 4-6",
    "Общаги 7-9",
    "Общаги 10-13",
  ],
  priceRanges: [
    { value: "0-1000", label: "До 1 000 ₽" },
    { value: "1000-5000", label: "1 000 - 5 000 ₽" },
    { value: "5000-15000", label: "5 000 - 15 000 ₽" },
    { value: "15000+", label: "От 15 000 ₽" },
  ],
  sortOptions: [
    { value: "newest", label: "Сначала новые" },
    { value: "price-low", label: "Сначала дешевые" },
    { value: "price-high", label: "Сначала дорогие" },
    { value: "popular", label: "Популярные" },
  ],
};
