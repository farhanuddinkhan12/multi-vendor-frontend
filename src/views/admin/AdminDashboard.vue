<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-4">Admin Dashboard</h1>
    <p>Welcome, Admin! Here’s an overview of the system:</p>

    <ul class="mt-4 list-disc ml-6">
      <li>Total Products: {{ stats.products }}</li>
      <li>Total Vendors: {{ stats.vendors }}</li>
      <li>Total Orders: {{ stats.orders }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stats: { products: 120, vendors: 45, orders: 230 } // later fetch from API
    }
  }
};
</script>
