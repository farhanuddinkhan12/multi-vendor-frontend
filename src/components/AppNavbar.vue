<template>
  <nav class="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white shadow-md sticky top-0 z-50">
    <div class="container mx-auto flex flex-wrap items-center justify-between px-6 py-4 gap-4">
      <!-- Logo -->
      <router-link to="/" class="text-2xl font-bold tracking-wide hover:text-gray-200 whitespace-nowrap">
        MultiVendor<span class="text-yellow-300">Hub</span>
      </router-link>

      <!-- Search Bar -->
      <div class="flex-1 max-w-xl mx-auto hidden md:flex items-center relative">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search for products, brands..."
          class="w-full rounded-full px-5 py-2 text-gray-800 focus:outline-none"
        />
        <button
          @click="searchProducts"
          class="absolute right-1 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-full transition"
        >
          <i class="fas fa-search"></i>
        </button>
      </div>

      <!-- Right Menu -->
      <div class="flex items-center gap-6 flex-shrink-0">
        <!-- Categories -->
        <router-link to="/categories" class="hover:text-yellow-200 hidden md:block">Categories</router-link>

        <!-- Cart -->
        <router-link to="/cart" class="relative flex items-center hover:text-yellow-200">
          <i class="fas fa-shopping-cart text-xl"></i>
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5"
          >
            {{ cartItemCount }}
          </span>
        </router-link>

        <!-- Admin Panel -->
        <router-link 
          v-if="userRole === 'admin'" 
          to="/admin/products" 
          class="hover:text-yellow-400"
        >
          Admin Panel
        </router-link>

        <!-- Auth Buttons -->
        <template v-if="isLoggedIn">
          <router-link to="/dashboard" class="hover:text-yellow-200">Dashboard</router-link>
          <button @click="logout" class="hover:text-yellow-200">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="hover:text-yellow-200">Login</router-link>
          <router-link to="/register" class="hover:text-yellow-200">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
    name: "AppNavbar",
    data() {
        return {
            searchQuery: ""
        }
    },
    computed: {
        userRole(){
            return this.$store.state.auth.user?.role || null;
        },
        isLoggedIn() {
            return !!this.$store.state.auth.token;
        },
        cartCount() {
          return this.$store.state.cart?.items?.length || 0
        },
        ...mapGetters('cart', ['cartItemCount']),
    },
     methods: {
    async logout() {
    try {
        const token = localStorage.getItem("token");

        if (token) {
        await axios.post("http://localhost:8000/api/logout", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        }

        // ✅ Call Vuex logout
        this.$store.dispatch("logoutUser");

        // ✅ Redirect
        this.$router.push("/login");

    } catch (error) {
        console.error("Logout failed:", error);
        this.$store.dispatch("logoutUser"); // still clear everything
        this.$router.push("/login");
    }
    }

  }
}
</script>


<style scoped>
.container {
  max-width: 1200px;
}
</style>