import { createStore } from 'vuex';
import auth from './auth';
import cart from './cart';
import axios from 'axios';
import category from './category';

export default createStore({
  modules: {
    auth,
    cart,
    category
  },
  state: {
    products: [],
    featuredProducts: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    }, 
    ADD_PRODUCT(state, product){
      state.products.unshift(product);
    },
    setFeaturedProducts(state, products) {
      state.featuredProducts = products;
    }
  },
  actions: {
    // async fetchProducts({ commit, rootState }) {
    //   try {
    //     const token = rootState.auth.token || localStorage.getItem('token'); // ✅ Correct way to get the token
    //     if (!token) {
    //       throw new Error("No token found, please log in.");
    //     }

    //     const response = await axios.get('http://localhost:8000/api/products', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });

    //     commit('SET_PRODUCTS', response.data);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }
    // }, 
    async fetchProducts({ commit, rootState }) {
      try {
        // Get token if available
        const token = rootState.auth.token || localStorage.getItem('token');

        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {}; // if guest, no header

        const response = await axios.get('http://localhost:8000/api/products', { headers });
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
        const response = await axios.post('http://127.0.0.1:8000/api/vendor/products', formData, {
          headers: {
            'Content-Type': 'multipart/formData',
            Authorization: `Bearer ${token}`,
          }
          
        });
        commit('ADD_PRODUCT', response.data.product);

      }catch(error){
        console.error('Error adding product: ', error);
      }
    },
    async fetchFeaturedProducts({commit}) {
      const response = await fetch('http://127.0.0.1:8000/api/featured-products');
      const data = await response.json();
      commit('setFeaturedProducts', data);
    },
    async approveProduct({dispatch, rootState}, productId) {
      try {
        const token = rootState.auth.token || localStorage.getItem("token");
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/admin/products/${productId}/approve`,
          {},
          {
            headers: {
              Authorization:  `Bearer ${token}`,
            },
          }
        );
        dispatch("fetchProducts");
        return response.data;
      } catch ( error) {
        console.error("Error approving product:", error);
      }
    },
    async rejectProduct({ dispatch, rootState }, productId) {
      try {
        const token = rootState.auth.token || localStorage.getItem("token");
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/admin/products/${productId}/reject`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }, 
          }
        );

        dispatch("fetchProducts");
        return response.data;
      } catch (error) {
        console.error("Error rejecting product:",  error);
      }
    },
    async toggleFeatured({ dispatch, rootState}, productId) {
      try {
        const token = rootState.auth.token || localStorage.getItem("token");
         const response = await axios.patch(
          `http://127.0.0.1:8000/api/admin/products/${productId}/toggle-feature`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }, 
          }
        );
      dispatch("fetchProducts");
      return response.data;
    } catch (error) {
      console.error("Error toggling featured status:", error);
    }
    },
    async fetchAdminProducts({ commit, rootState }) {
      const token = rootState.auth.token || localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/admin/products', {
        headers: {Authorization: `Bearer ${token}`},
      });
      commit('SET_PRODUCTS', response.data);
    }
  },
  getters: {
    allProducts: state => state.products,
    featuredProducts: (state) => state.featuredProducts,
}
});
