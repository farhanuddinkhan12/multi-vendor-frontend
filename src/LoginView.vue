<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-emerald-50 px-4">
    <div class="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-100">
      
      <!-- Logo -->
      <div class="text-center">
        <img
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Login Icon"
          class="mx-auto h-16 w-16 mb-4 drop-shadow-md"
        />
        <h2 class="text-3xl font-bold text-gray-800">Welcome Back 👋</h2>
        <p class="text-gray-500 text-sm mt-2">Sign in to your account to continue</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="login" class="mt-8 space-y-5">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
          />
        </div>

        <!-- Remember & Forgot -->
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center text-gray-600">
            <input
              type="checkbox"
              v-model="rememberMe"
              class="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <span class="ml-2">Remember me</span>
          </label>

          <button
            type="button"
            class="text-emerald-600 hover:text-emerald-800 transition font-medium"
          >
            Forgot password?
          </button>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
        >
          Sign in
        </button>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-3">
          {{ errorMessage }}
        </p>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-6">
        <div class="flex-grow border-t border-gray-200"></div>
        <span class="mx-3 text-gray-400 text-sm">OR</span>
        <div class="flex-grow border-t border-gray-200"></div>
      </div>

      <!-- Register Button -->
      <p class="text-center text-sm text-gray-600">
        Don’t have an account?
        <button
          @click="goToRegister"
          class="text-emerald-600 font-semibold hover:text-emerald-800 transition"
        >
          Create one
        </button>
      </p>
    </div>
  </div>
</template>



<script>
import { mapActions } from 'vuex';
export default {
    data(){
        return {
            email: '',
            password: '',
            errorMessage: '',
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        async login(){
            try{
                await this.loginUser({
                    email: this.email,
                    password: this.password
                });
                this.$router.push('/');
            }catch(error){
                this.errorMessage = error.response?.data?.message || 'Login failed';
            }
        },
        goToRegister(){
            this.$router.push('/register');
        }
    }

}
</script>