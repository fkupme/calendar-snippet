const notificationsModule = {
  namespaced: true,
  
  state: () => ({
    notifications: []
  }),
  
  mutations: {
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    
    REMOVE_NOTIFICATION(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    }
  },
  
  actions: {
    show({ commit }, notification) {
      const id = Date.now();
      commit('ADD_NOTIFICATION', { id, ...notification });
      
      if (notification.timeout) {
        setTimeout(() => {
          commit('REMOVE_NOTIFICATION', id);
        }, notification.timeout);
      }
    }
  }
};

export default notificationsModule;