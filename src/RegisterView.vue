<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-emerald-50 px-4">
    <div class="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-gray-100">
      
      <!-- Logo / Header -->
      <div class="text-center">
        <img
          src="https://www.svgrepo.com/show/375698/user-add.svg"
          alt="Register Icon"
          class="mx-auto h-16 w-16 mb-4 drop-shadow-md"
        />
        <h2 class="text-3xl font-bold text-gray-800">Create an Account ✨</h2>
        <p class="text-gray-500 text-sm mt-2">
          Already have an account?
          <button
            @click="goToLogin"
            class="text-emerald-600 hover:text-emerald-800 font-medium transition"
          >
            Sign in
          </button>
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="register" class="mt-8 space-y-5">
        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="John Doe"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            v-model="email"
            type="email"
            placeholder="user@example.com"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
          />
        </div>

        <!-- Password -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm</label>
            <input
              v-model="password_confirmation"
              type="password"
              placeholder="••••••••"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
            />
          </div>
        </div>

        <!-- Role -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
          <select
            v-model="role"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
          >
            <option value="customer">Customer</option>
            <option value="vendor">Vendor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <!-- Vendor Section -->
        <transition name="fade">
          <div v-if="role === 'vendor'" class="border-t pt-4 mt-2">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>🏪</span> Vendor Details
            </h3>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                <input
                  v-model="store_name"
                  type="text"
                  placeholder="My Store"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  v-model="address"
                  type="text"
                  placeholder="123 Main Street"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  v-model="phone_number"
                  type="text"
                  placeholder="+92 300 1234567"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
                />
              </div>
            </div>
          </div>
        </transition>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
        >
          Register
        </button>

        <!-- Messages -->
        <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-3">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="text-green-500 text-sm text-center mt-3">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
    export default {
        name: "RegisterView",

        data(){
            return{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: 'customer',
                store_name: '',
                address: '',
                phone_number: '',
                errorMessage: '',
                successMessage: '',
            };
        },
        methods: {
            ...mapActions(['registerUser']),
            async register(){
                try{
                    const userData = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                        role: this.role,
                    };

                    if (this.role === 'vendor') {
                        userData.store_name = this.store_name;
                        userData.address = this.address;
                        userData.phone_number = this.phone_number;
                    }
                    const response = await this.registerUser(userData);
                    this.successMessage = response.message;
                    this.errorMessage = '';


                    this.$router.push('/');

                } catch(error){
                    this.errorMessage = error.respons?.data?.message || 'Registration failed';
                    this.successMessage = '';
                }
            }
        }
    }
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>