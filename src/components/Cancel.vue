<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center">
    <div class="bg-white p-10 rounded-2xl shadow-lg">
      <h1 class="text-4xl font-bold text-red-600 mb-4">❌ Payment Canceled!</h1>
      <p class="text-gray-700 text-lg mb-6">
        Your payment was canceled. You can try again anytime.
      </p>
      <router-link
        to="/checkout"
        class="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Back to Checkout
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CancelView",
};
</script>
