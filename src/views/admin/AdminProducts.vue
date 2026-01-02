<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Admin Product Management</h2>

    <!-- ✅ Refresh Button -->
    <button
      @click="fetchProducts"
      class="mb-4 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
    >
      Refresh Products
    </button>

    <!-- ✅ Loading State -->
    <div v-if="loading" class="text-center py-6 text-gray-500">
      Loading products...
    </div>

    <!-- ✅ Products Table -->
    <table v-else class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Name</th>
          <th class="border px-4 py-2">Status</th>
          <th class="border px-4 py-2">Featured</th>
          <th class="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td class="border px-4 py-2">{{ product.id }}</td>
          <td class="border px-4 py-2">{{ product.name }}</td>
          <td
            class="border px-4 py-2 capitalize"
            :class="{
              'text-yellow-600': product.status === 'pending',
              'text-green-600': product.status === 'approved',
              'text-red-600': product.status === 'rejected'
            }"
          >
            {{ product.status }}
          </td>

          <!-- ✅ Toggle Featured -->
          <td class="border px-4 py-2 text-center">
            <button
              @click="toggleFeatured(product.id)"
              :class="[
                'px-3 py-1 rounded transition',
                product.is_featured
                  ? 'bg-green-500 hover:bg-green-600 text-white'
                  : 'bg-gray-400 hover:bg-gray-500 text-white'
              ]"
            >
              {{ product.is_featured ? 'Yes' : 'No' }}
            </button>
          </td>

          <!-- ✅ Approve / Reject -->
          <td class="border px-4 py-2 flex gap-2">
            <button
              @click="approveProduct(product.id)"
              class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              :disabled="product.status === 'approved'"
            >
              Approve
            </button>
            <button
              @click="rejectProduct(product.id)"
              class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              :disabled="product.status === 'rejected'"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ✅ No Products -->
    <div v-if="!loading && products.length === 0" class="text-center py-6 text-gray-500">
      No products found.
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminProducts",
  data() {
    return {
      products: [],
      loading: false,
    };
  },
  methods: {
    async fetchProducts() {
      try {
        this.loading = true;
        await this.$store.dispatch("fetchAdminProducts");
        this.products = this.$store.getters.allProducts;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        this.loading = false;
      }
    },
    async approveProduct(id) {
      await this.$store.dispatch("approveProduct", id);
      this.fetchProducts();
    },
    async rejectProduct(id) {
      await this.$store.dispatch("rejectProduct", id);
      this.fetchProducts();
    },
    async toggleFeatured(id) {
      await this.$store.dispatch("toggleFeatured", id);
      this.fetchProducts();
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
