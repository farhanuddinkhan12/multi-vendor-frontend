import axios from "axios";

export default {
    state: {
        categories: [],
    },
    mutations: {
        SET_Categories(state, categories) {
            state.categories = categories;
        },
        ADD_CATEGORY(state, category) {
            state.categories.unshift(category);
        },
        UPDATE_CATEGORY(state, updatedCategory) {
            const index = state.categories.findIndex(category => category.id === updatedCategory.id);
            if(index !== -1) state.categories[index] = updatedCategory;
        },
        DELETE_CATEGORY(state, id) {
            state.categories = state.categories.filter(category => category.id !== id);
        }
    },
    actions: {
        async fetchCategories({ commit}) {
            const response = await axios.get("http://127.0.0.1:8000/api/categories");
            //const data = await response.json();
            commit("SET_Categories", response.data.categories);
        }, 
        async addCategory({ commit}, formData) {
            const response = await axios.post("http://127.0.0.1:8000/api/categories", formData,{
                headers: { 'Content-Type': 'multipart/form-data'},

            });
            commit("ADD_CATEGORY", response.data.category);
        },
        async updateCategory({ commit}, {id, formData}) {
            formData.append("_method", "PUT");
            const response = await axios.post(`http://127.0.0.1:8000/api/categories/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data'},
            });
            commit("UPDATE_CATEGORY", response.data.category);
        },
        async deleteCategory({ commit}, id) {
            await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
            commit("DELETE_CATEGORY", id);
        }
    },
    getters: {
        allCategories: state => state.categories,
    },
};