const initialFormState = {
  client: null,
  date: new Date().toISOString().substr(0, 10),
  time: "09:00",
  workType: null,
  peopleCount: 1,
  location: null,
  selectedEquipment: [],
  selectedServices: [],
  comment: "",
  promoCode: "",
  repeat: "Не повторять",
  repeatStartDate: null,
  repeatEndDate: null,
  color: "primary",
};

const equipment = [
  {
    id: 1,
    name: "Камера Sony A7III",
    price: 2000,
    category: "Камеры",
    image: "/images/camera.png",
    inStock: 3,
    description: {
      characteristics: [
        "Оптический зум",
        "Цифровая зеркальная камера",
        "APS-C CMOS",
        "24.2 МП",
        "10 кадров/с",
        "ISO 100-25600",
      ],
      text: "Камера Sony A7III - это цифровая зеркальная камера с оптическим зумом, APS-C CMOS матрицей, 24.2 МП, 10 кадров/с и диапазоном чувствительности ISO 100-25600. Она идеально подходит для фотосъемки и видеосъемки.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 2,
    name: "Штатив Manfrotto",
    price: 500,
    category: "Штативы",
    image: "/images/tripod.png",
    inStock: 3,
    description: {
      characteristics: [
        "высота до 180 см",
        "гладкий алюминий с гравировкой",
        "размеры: 40x40x180 см",
        "вес: 1.5 кг",
      ],
      text: "Штатив Manfrotto - это штатив с оптическим зумом, APS-C CMOS матрицей, 24.2 МП, 10 кадров/с и диапазоном чувствительности ISO 100-25600. Он идеально подходит для фотосъемки и видеосъемки.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 3,
    name: "Педаль Pearl 100P",
    price: 100,
    category: "Ударные",
    image: "/images/drum-pedal.png",
    inStock: 3,
    description: {
      characteristics: [
        "Прочная конструкция",
        "Плавный ход",
        "Регулируемая пружина",
      ],
      text: "Педаль Pearl 100P - это надежная и прочная педаль для барабанов с плавным ходом и регулируемой пружиной. Идеально подходит для начинающих и профессиональных барабанщиков.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 4,
    name: "Педаль Iron Cobra 200",
    price: 100,
    category: "Ударные",
    image: "/images/drum-pedal.png",
    inStock: 3,
    description: {
      characteristics: [
        "Высокая точность",
        "Долговечность",
        "Регулируемый угол наклона",
      ],
      text: "Педаль Iron Cobra 200 - это профессиональная педаль для барабанов с высокой точностью и долговечностью. Регулируемый угол наклона позволяет настроить педаль под индивидуальные предпочтения.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 5,
    name: "Педаль Yamaha",
    price: 100,
    category: "Ударные",
    image: "/images/drum-pedal.png",
    inStock: 3,
    description: {
      characteristics: ["Легкий вес", "Простота использования", "Надежность"],
      text: "Педаль Yamaha - это легкая и надежная педаль для барабанов, которая подходит как для начинающих, так и для опытных музыкантов. Простота использования делает ее отличным выбором для любой ударной установки.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 6,
    name: "Тарелка Crash",
    price: 200,
    category: "Ударные",
    image: "/images/crash-cymbal.png",
    inStock: 3,
    description: {
      characteristics: [
        "Яркий звук",
        "Долговечность",
        "Высокое качество материала",
      ],
      text: "Тарелка Crash - это тарелка с ярким и мощным звуком, идеально подходящая для акцентов и финальных ударов. Высокое качество материала обеспечивает долговечность и стабильность звучания.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 7,
    name: "Тарелка Ride",
    price: 100,
    category: "Ударные",
    image: "/images/ride-cymbal.png",
    inStock: 3,
    description: {
      characteristics: [
        "Чистый звук",
        "Универсальность",
        "Прочная конструкция",
      ],
      text: "Тарелка Ride - это универсальная тарелка с чистым и четким звуком, подходящая для различных стилей музыки. Прочная конструкция обеспечивает долгий срок службы.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 8,
    name: "Тарелка Hi-hat",
    price: 100,
    category: "Ударные",
    image: "/images/hi-hat-cymbal.png",
    inStock: 3,
    description: {
      characteristics: ["Компактность", "Четкий звук", "Регулируемая высота"],
      text: "Тарелка Hi-hat - это компактная и удобная тарелка с четким звуком, идеально подходящая для ритмических рисунков. Регулируемая высота позволяет настроить тарелку под индивидуальные предпочтения.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 9,
    name: "Малый барабан Yamaha",
    price: 100,
    category: "Ударные",
    image: "/images/small-drum.png",
    inStock: 3,
    description: {
      characteristics: [
        "Качественный материал",
        "Яркий звук",
        "Простота настройки",
      ],
      text: "Малый барабан Yamaha - это барабан с ярким и четким звуком, изготовленный из качественных материалов. Простота настройки делает его отличным выбором для любого барабанщика.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 10,
    name: "Электронная гитара Kramer Striker",
    price: 100,
    category: "Электрогитары",
    image: "/images/electric-guitar.png",
    inStock: 1,
    description: {
      characteristics: [
        "Стильный дизайн",
        "Высокое качество звука",
        "Удобный гриф",
      ],
      text: "Электронная гитара Kramer Striker - это стильная и мощная гитара с высоким качеством звука и удобным грифом. Идеально подходит для рок-музыки и других жанров.",
      image: "/images/big-drum.png",
    },
  },
];

const services = [
  {
    id: 1,
    name: "Отпариватель",
    price: 200,
    category: "Категория 1",
    image: "/images/steamer.png",
    inStock: 3,
    description: {
      characteristics: [
        "Компактный размер",
        "Быстрый нагрев",
        "Эффективное удаление складок",
      ],
      text: "Отпариватель - это удобное устройство для быстрого и эффективного удаления складок с одежды. Компактный размер и быстрый нагрев делают его идеальным для домашнего использования.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 2,
    name: "Гримерка",
    price: 200,
    category: "Категория 1",
    image: "/images/dressing-room.png",
    inStock: 3,
    description: {
      characteristics: [
        "Комфортное пространство",
        "Зеркало с подсветкой",
        "Удобное расположение",
      ],
      text: "Гримерка - это комфортное пространство для подготовки к выступлениям или съемкам. Оснащена зеркалом с подсветкой и удобным расположением для максимального комфорта.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 3,
    name: "Запись гитары",
    price: 100,
    category: "Категория 2",
    image: "/images/guitar-recording.png",
    inStock: 1,
    description: {
      characteristics: [
        "Профессиональное оборудование",
        "Высокое качество звука",
        "Индивидуальный подход",
      ],
      text: "Услуга записи гитары включает использование профессионального оборудования для достижения высокого качества звука. Индивидуальный подход к каждому клиенту.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 4,
    name: "Запись вокала",
    price: 150,
    category: "Категория 2",
    image: "/images/vocal-recording.png",
    inStock: 2,
    description: {
      characteristics: [
        "Студийное оборудование",
        "Опытный звукорежиссер",
        "Высокое качество записи",
      ],
      text: "Запись вокала осуществляется с использованием студийного оборудования под руководством опытного звукорежиссера. Гарантируется высокое качество записи.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 5,
    name: "Аренда студии",
    price: 500,
    category: "Категория 2",
    image: "/images/studio-rental.png",
    inStock: 1,
    description: {
      characteristics: [
        "Просторное помещение",
        "Профессиональное оборудование",
        "Комфортная атмосфера",
      ],
      text: "Аренда студии предоставляет просторное помещение с профессиональным оборудованием для записи и репетиций. Комфортная атмосфера способствует творческому процессу.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 6,
    name: "Микрофон",
    price: 150,
    category: "Категория 1",
    image: "/images/microphone.png",
    inStock: 2,
    description: {
      characteristics: [
        "Высокое качество звука",
        "Универсальность",
        "Простота использования",
      ],
      text: "Микрофон обеспечивает высокое качество звука и подходит для различных задач, включая запись вокала и инструментов. Простота использования делает его доступным для всех.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 7,
    name: "Светодиодная лампа",
    price: 100,
    category: "Категория 1",
    image: "/images/led-lamp.png",
    inStock: 5,
    description: {
      characteristics: [
        "Энергоэффективность",
        "Долгий срок службы",
        "Яркий свет",
      ],
      text: "Светодиодная лампа - это энергоэффективное решение с долгим сроком службы и ярким светом. Идеально подходит для освещения студий и гримерок.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 8,
    name: "Зеркало с подсветкой",
    price: 250,
    category: "Категория 1",
    image: "/images/mirror.png",
    inStock: 1,
    description: {
      characteristics: [
        "Регулируемая подсветка",
        "Большой размер",
        "Стильный дизайн",
      ],
      text: "Зеркало с подсветкой - это стильный аксессуар с регулируемой подсветкой, который идеально подходит для гримерок и студий. Большой размер обеспечивает удобство использования.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 9,
    name: "Запись барабанов",
    price: 300,
    category: "Категория 2",
    image: "/images/drum-recording.png",
    inStock: 1,
    description: {
      characteristics: [
        "Профессиональное оборудование",
        "Высокое качество звука",
        "Индивидуальный подход",
      ],
      text: "Услуга записи барабанов включает использование профессионального оборудования для достижения высокого качества звука. Индивидуальный подход к каждому клиенту.",
      image: "/images/big-drum.png",
    },
  },
  {
    id: 10,
    name: "Аренда звукового оборудования",
    price: 400,
    category: "Категория 2",
    image: "/images/sound-equipment.png",
    inStock: 2,
    description: {
      characteristics: [
        "Широкий выбор оборудования",
        "Высокое качество",
        "Профессиональная поддержка",
      ],
      text: "Аренда звукового оборудования предоставляет широкий выбор устройств высокого качества. Профессиональная поддержка гарантирует удобство использования.",
      image: "/images/big-drum.png",
    },
  },
];

const promos = [
  {
     promo: 'MKVDL3A0',
     time: '-10%',
     pos: '-10%',
     source: 'Внутренний',
     description: 'Корректировка ошибки диспетчера',
  },
  {
     promo: 'MKVDL3A0',
     time: '-10%',
     pos: '-10%',
     source: 'Внутренний',
     description: 'Корректировка ошибки диспетчера',
  },
  {
     promo: 'MKVDL3A0',
     time: '-10%',
     pos: '-10%',
     source: 'Внутренний',
     description: 'Корректировка ошибки диспетчера',
  },
  {
     promo: 'MKVDL3A0',
     time: '-10%',
     pos: '-10%',
     source: 'Внутренний',
     description: 'Корректировка ошибки диспетчера',
  },

];

const formModule = {
  namespaced: true,

  state: () => ({
    isOpen: true,
    formData: { ...initialFormState },
    equipment: [...equipment],
    services: [...services],
    totalByEquipment: 0,
    totalByServices: 0,
    promo: [...promos],
  }),

  mutations: {
    SET_IS_OPEN(state, isOpen) {
      state.isOpen = isOpen;
    },
    SET_FORM_DATA(state, formData) {
      state.formData = { ...formData };
      localStorage.setItem("formData", JSON.stringify(formData));
    },
    RESET_FORM(state) {
      state.formData = { ...initialFormState };
      localStorage.removeItem("formData");
    },
    SET_TOTAL_BY_EQUIPMENT(state, total) {
      state.totalByEquipment = total;
    },
    SET_TOTAL_BY_SERVICES(state, total) {
      state.totalByServices = total;
    },
  },

  actions: {
    toggleForm({ commit, state }) {
      commit("SET_IS_OPEN", !state.isOpen);
    },

    initForm({ commit }) {
      const savedForm = localStorage.getItem("formData");
      if (savedForm) {
        commit("SET_FORM_DATA", JSON.parse(savedForm));
      } else {
        commit("SET_FORM_DATA", { ...initialFormState });
      }
    },

    clearFormData({ commit }) {
      commit("RESET_FORM");
    },

    saveFormData({ commit }, formData) {
      commit("SET_FORM_DATA", formData);
    },
    updateTotalByEquipment({ commit }, total) {
      commit("SET_TOTAL_BY_EQUIPMENT", total);
    },
    updateTotalByServices({ commit }, total) {
      commit("SET_TOTAL_BY_SERVICES", total);
    },
  },

  getters: {
    isOpen: (state) => state.isOpen,
    formData: (state) => state.formData,
    equipment: (state) => state.equipment,
    services: (state) => state.services,
    promo: (state) => state.promo,

    totalPrice: (state) => {
      let total = 0;

      state.formData.selectedEquipment.forEach((equipId) => {
        const equipment = state.equipment.find((e) => e.id === equipId);
        if (equipment) total += equipment.price;
      });

      state.formData.selectedServices.forEach((serviceId) => {
        const service = state.services.find((s) => s.id === serviceId);
        if (service) total += service.price;
      });

      return total;
    },
  },
};

export default formModule;
