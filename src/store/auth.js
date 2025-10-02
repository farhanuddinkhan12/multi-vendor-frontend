import axios from "axios";

export default {
    state: {
        user: null,
        token: localStorage.getItem('token') || '',
    },
    mutations: {
        SET_USER(state, user){
            state.user = user;
        }, 
        SET_TOKEN(state, token){
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    },
    actions: {
        async registerUser(_, userData){
            const response = await axios.post('http://127.0.0.1:8000/api/register', userData);
            return response.data;
        },
        async loginUser ({commit}, userData){
            const response = await axios.post('http://localhost:8000/api/login', userData);
            commit('SET_USER', response.data.user);
            commit('SET_TOKEN', response.data.token);
            return response.data;
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => state.user,
    }
}