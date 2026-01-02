<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Vendor Dashboard</h1>
    <p>Welcome, {{ vendorName }}!</p>

    <ul class="mt-4 list-disc ml-6">
      <li>Your total products: {{ stats.products }}</li>
      <li>Your pending orders: {{ stats.orders }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vendorName: this.$store.state.auth.user?.name,
      stats: { products: 8, orders: 15 } // later fetch from API
    }
  }
};
</script>
