<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-semibold text-center mb-4">Register</h2>
        
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Name</label>
                    <input v-model="name" type="text" class="w-full p-2 border rounded-md" required />
                </div>
                <div class="mb-4">
                <label class="block text-sm font-medium">Email</label>
                <input v-model="email" type="email" class="w-full p-2 border rounded-md" required />
                </div>
                <div class="mb-4">
                <label class="block text-sm font-medium">Password</label>
                <input v-model="password" type="password" class="w-full p-2 border rounded-md" required />
                </div>

                <div class="mb-4">
                <label class="block text-sm font-medium">Confirm Password</label>
                <input v-model="password_confirmation" type="password" class="w-full p-2 border rounded-md" required />
                </div>

                <div class="mb-4">
                <label class="block text-sm font-medium">Role</label>
                <select v-model="role" class="w-full p-2 border rounded-md">
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                </select>
                </div>

                <div v-if="role === 'vendor'">
                <div class="mb-4">
                    <label class="block text-sm font-medium">Store Name</label>
                    <input v-model="store_name" type="text" class="w-full p-2 border rounded-md" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Address</label>
                    <input v-model="address" type="text" class="w-full p-2 border rounded-md" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium">Phone Number</label>
                    <input v-model="phone_number" type="text" class="w-full p-2 border rounded-md" required />
                </div>
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Register
                </button>
            </form>

            <p v-if="errorMessage" class="text-red-500 mt-2 text-center">{{ errorMessage }}</p>
      <p v-if="successMessage" class="text-green-500 mt-2 text-center">{{ successMessage }}</p>
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

<style>
    input, select {
        outline:none;
        border: 1px solid #ccc;
    }
</style>