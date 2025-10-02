<template>
    <div class="flex justify-center items-center">
        <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-700">Email</label>
                    <input type="email" v-model="email" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                    <label for="" class="block text-gray-700">Password</label>
                    <input type="password" v-model="password" class="w-full p-2 border rounded">
                </div>

                <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                 Login
                </button>

                <p v-if="errorMessage" class="text-red-500 mt-3">{{ errorMessage }}</p>
                <div class="mt-4 text-center">
                    <p>Don't have an account?</p>
                    <button @click="goToRegister" class="mt-2 bg-gray-300 text-black p-2 rounded hover:big-gray-">
                        Register
                    </button>
                </div>
            </form>
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