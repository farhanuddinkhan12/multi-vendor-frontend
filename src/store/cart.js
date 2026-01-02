// store/cart.js
import axios from "axios";

export default {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);   // ✅ Only works if state.cart is already an array
      }
    },

    SET_CART(state, items) {
      state.cart = items;
    }
  },
  actions: {
    async addToCart({ commit, rootState }, { product_id, quantity = 1 }) {
      const token = rootState.auth?.token || localStorage.getItem("token");
      if (!token) throw new Error("No token found, please log in.");
      try {
        const response = await axios.post(
          "http://localhost:8000/api/cart",
          { product_id, quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Add to Vuex state
        commit("ADD_TO_CART", {
          id: response.data.cart.id,
          product_id: response.data.cart.product_id,
          quantity: response.data.cart.quantity,
          product: response.data.cart.product, // if loaded
        });


        return response.data;
      } catch (err) {
        console.error("Error adding to cart:", err.response?.data || err);
        throw err;
      }
    },

    async fetchCart({ commit, rootState }) {
      try {
        const token = rootState.auth?.token || localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        commit("SET_CART", res.data.cart);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    },
    async removeFromCart({ state, commit, rootState}, itemId) {
      const token = rootState.auth?.token || localStorage.getItem("token");
      if (!token) throw new Error("No token found, please log in.");
      try {
        await axios.delete(`http://localhost:8000/api/cart/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const updatedCart = state.cart.filter(item => item.id !== itemId);
        commit("SET_CART", updatedCart);
      } catch (err) {
        console.error("Error removing from cart:", err.response?.data || err);
        throw err;
      }
    }
  },
  getters: {
    cartItemCount: (state) => state.cart?.length || 0,
    cartItems: (state) => state.cart || [],
  },
};
