const calendarModule = {
  state: {
    calendarState: {},
  },
  mutations: {
    SET_CALENDAR_STATE(state, payload) {
      state.calendarState = payload;
      localStorage.setItem('calendarState', JSON.stringify(payload));
    }
  },
  actions: {
    getCashedCalendarState({commit}) {
      let calendarState = localStorage.getItem('calendarState');
      if (!calendarState) {
          return
      }
      calendarState = JSON.parse(calendarState);
      calendarState.date = new Date(calendarState.date);
      commit('SET_CALENDAR_STATE', calendarState);
    }
  },
  namespaced: true,
}


export default calendarModule;