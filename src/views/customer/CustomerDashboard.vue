<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Customer Dashboard</h1>
    <p>Hello, {{ userName }}!</p>

    <ul class="mt-4 list-disc ml-6">
      <li>Orders placed: {{ stats.orders }}</li>
      <li>Items in cart: {{ stats.cart }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$store.state.auth.user?.name,
      stats: { orders: 3, cart: 5 } // later fetch from API
    }
  }
};
</script>
