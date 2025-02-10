const initialFormState = {
  client: null,
  date: new Date().toISOString().substr(0, 10),
  time: '09:00',
  workType: null,
  peopleCount: 1,
  location: null,
  selectedEquipment: [],
  selectedServices: [],
  comment: '',
  promoCode: '',
  repeat: 'Не повторять',
  color: 'primary',
};

const formModule = {
  namespaced: true,
  
  state: () => ({
    isOpen: true,
    formData: { ...initialFormState },
    equipment: [
      { id: 1, name: 'Камера Sony A7III', price: 2000 },
      { id: 2, name: 'Штатив Manfrotto', price: 500 },
    ],
    services: [
      { id: 1, name: 'Цветокоррекция', price: 1000 },
      { id: 2, name: 'Ретушь', price: 1500 },
    ]
  }),

  mutations: {
    SET_IS_OPEN(state, isOpen) {
      state.isOpen = isOpen;
    },
    SET_FORM_DATA(state, formData) {
      state.formData = { ...formData };
      localStorage.setItem('formData', JSON.stringify(formData));
    },
    RESET_FORM(state) {
      state.formData = { ...initialFormState };
      localStorage.removeItem('formData');
    }
  },

  actions: {
    toggleForm({ commit, state }) {
      commit('SET_IS_OPEN', !state.isOpen);
    },
    
    initForm({ commit }) {
      const savedForm = localStorage.getItem('formData');
      if (savedForm) {
        commit('SET_FORM_DATA', JSON.parse(savedForm));
      } else {
        commit('SET_FORM_DATA', { ...initialFormState });
      }
    },

    clearFormData({ commit }) {
      commit('RESET_FORM');
    },

    saveFormData({ commit }, formData) {
      commit('SET_FORM_DATA', formData);
    }
  },

  getters: {
    isOpen: (state) => state.isOpen,
    formData: (state) => state.formData,
    equipment: (state) => state.equipment,
    services: (state) => state.services,
    
    totalPrice: (state) => {
      let total = 0;
      
      state.formData.selectedEquipment.forEach(equipId => {
        const equipment = state.equipment.find(e => e.id === equipId);
        if (equipment) total += equipment.price;
      });

      state.formData.selectedServices.forEach(serviceId => {
        const service = state.services.find(s => s.id === serviceId);
        if (service) total += service.price;
      });
      
      return total;
    }
  }
};

export default formModule;