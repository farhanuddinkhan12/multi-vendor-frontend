<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center">
        <div class="bg-white p-10 rounded-2xl show-lg">
            <h1 class="text-4xl font-bold text-green-600 mb-4">🎉 Payment Successful!</h1>
            <p class="text-gray-700 text-lg mb-6">
                Thank you for your purchase. Your payment has been processed successfully.
            </p>
            <router-link to="/" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
                 Back to Home
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: "SuccessView",
};
</script>