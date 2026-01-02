import axios from 'axios';
export default {
  // namespaced: true,  <-- remove this line
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    SET_USER(state, user) { state.user = user },
    SET_TOKEN(state, token) { 
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  actions: {
    async loginUser({ commit }, userData) {
      const response = await axios.post('http://localhost:8000/api/login', userData);
      commit('SET_USER', response.data.user);
      commit('SET_TOKEN', response.data.token);
      return response.data;
    },
    async logoutUser({ commit }) {
      commit('LOGOUT');
    },
    async fetchUser({ commit, state }) {
      if (!state.token) return Promise.resolve();
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        commit('SET_USER', response.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        commit('LOGOUT');
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user,
  }
};
