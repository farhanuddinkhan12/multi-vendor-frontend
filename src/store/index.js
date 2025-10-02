import { createStore } from 'vuex';
import auth from './auth';
import axios from 'axios';

export default createStore({
  modules: {
    auth,
  },
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    }, 
    ADD_PRODUCT(state, product){
      state.products.push(product);
    }
  },
  actions: {
    async fetchProducts({ commit, rootState }) {
      try {
        const token = rootState.auth.token || localStorage.getItem('token'); // ✅ Correct way to get the token
        if (!token) {
          throw new Error("No token found, please log in.");
        }

        const response = await axios.get('http://localhost:8000/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        commit('SET_PRODUCTS', response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }, 
    async addNewProduct({ commit, rootState }, formData){
      try{
        const token = rootState.auth.token || localStorage.getItem('token');
        if(!token){
          throw new Error("No token found, please log in.");
        }
        const response = await axios.post('http://localhost:8000/api/vendor/products', formData, {
          headers: {
            'Content-Type': 'multipart/formData',
            Authorization: `Bearer ${token}`,
          }
          
        });
        commit('ADD_PRODUCT', response.data);

      }catch(error){
        console.error('Error adding product: ', error);
      }
    }
  },
  getters: {
    allProducts: state => state.products
  }
});
