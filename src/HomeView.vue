<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- 🏠 Hero Section -->
    <section class="bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-20">
      <div class="container mx-auto text-center px-4">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span class="text-yellow-300">MultiVendor Hub</span>
        </h1>
        <p class="text-lg md:text-xl mb-8 text-gray-100">
          Discover amazing products from multiple trusted vendors — all in one place.
        </p>
        <router-link
          to="/products"
          class="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Shop Now
        </router-link>
      </div>
    </section>

    <!-- 🧭 Featured Categories -->
    <!-- 🌟 Featured Products -->
    <section class="container mx-auto px-6 py-16">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">Featured Products</h2>
    
    <div v-if="featuredProducts.length === 0" class="text-center text-gray-500">
        No featured products yet.
    </div>
    
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div
        v-for="product in featuredProducts"
        :key="product.id"
        class="relative bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
        >
        <div class="absolute top-2 left-2 bg-indigo-500 text-white text-xs px-2 py-1 rounded">Featured</div>
        <img :src="product.image_url" class="w-full h-48 object-cover" />
        <div class="p-4">
            <h3 class="font-semibold text-gray-800">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 mb-2">by {{ product.vendor.name }}</p>
            <p class="text-lg font-bold text-green-600">${{ product.price }}</p>
            <div class="flex items-center mt-2">
            <span v-for="star in 5" :key="star" class="text-yellow-400">
                <i class="fas fa-star" v-if="star <= product.rating"></i>
                <i class="far fa-star" v-else></i>
            </span>
            </div>
        </div>
        </div>
    </div>
    </section>


    <!-- 💎 Latest Products -->
    <section class="container mx-auto px-6 pb-16">
      <h2 class="text-3xl font-bold text-center text-gray-800 mb-10">Latest Products</h2>
      <div v-if="products.length === 0" class="text-center text-gray-500">
        No products available.
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div
          v-for="product in products"
          :key="product.id"
          class="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transform transition duration-300"
        >
          <img
            :src="product.image_url || '/default-image.jpg'"
            alt="Product"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-800 truncate">{{ product.name }}</h3>
            <p class="text-gray-500 text-sm mt-1">{{ product.description }}</p>
            <p class="text-lg font-bold text-green-600 mt-2">${{ product.price }}</p>
            <div class="mt-4 flex justify-between">
              <button
                @click="viewDetails(product)"
                class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                View
              </button>
              <button
                @click="addToCart(product)"
                class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 🤝 Join as Vendor -->
    <section class="bg-indigo-600 py-16 text-center text-white">
      <h2 class="text-3xl font-bold mb-4">Are you a vendor?</h2>
      <p class="text-lg mb-6 text-gray-100">
        Join our platform and reach thousands of customers across the globe.
      </p>
      <router-link
        to="/register"
        class="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Become a Vendor
      </router-link>
    </section>

    <!-- 🛍️ Product Details Modal -->
    <div
      v-if="showProductDetails"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto relative">
        <h2 class="text-xl font-bold mb-4 text-gray-700">{{ selectedProduct.name }}</h2>
        <img :src="selectedProduct.image_url || '/default-image.jpg'" class="w-full h-48 object-cover mb-4" />
        <p class="text-gray-600 mb-4">{{ selectedProduct.description }}</p>
        <p class="text-lg font-bold text-green-600">${{ selectedProduct.price }}</p>
        <div class="flex justify-end mt-4">
          <button
            @click="closeDetails"
            class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
    export default {
        name: "HomeView",
        data(){
            return {
                showAddProductForm: false,
                product: {
                    name: "",
                    description: "",
                    price: "",
                    stock: "",
                    image: null,
                },
                showProductDetails: false,
                selectedProduct: {},
                // featuredProducts: [],
            }
        },
        computed: {
                ...mapGetters(['allProducts', 'featuredProducts']),
                products() {
                    return this.allProducts;
                },
                userRole() {
                    return this.$store.getters.userRole;
                },
            },
        methods:{
            ...mapActions(['fetchProducts', "addNewProduct"]),
            ...mapActions('cart', ['addToCart']),
            handleFileUpload(event){
                this.product.image = event.target.files[0];
            },
            async addProduct() {
                const formData = new FormData();
                formData.append("name", this.product.name);
                formData.append("description", this.product.description);
                formData.append("price", this.product.price);
                formData.append("stock", this.product.stock);
                formData.append("image", this.product.image); 

                await this.addNewProduct(formData);
                this.showAddProductForm = false;
                this.product = { name: "", description: "", price: "", stock: "", image: null };
            },
            viewDetails(product) {
                this.selectedProduct = product;
                this.showProductDetails = true;
            },
            closeDetails() {
                this.showProductDetails = false;
                this.selectedProduct = {};
            },
            async addToCart(product) {
  try {
    // First, add the product to cart (backend + Vuex state)
                await this.$store.dispatch("cart/addToCart", {
                product_id: product.id,
                quantity: 1,
                });

                // Then, refresh cart from backend so UI shows updated items
                await this.$store.dispatch("cart/fetchCart");

                alert("Product added to cart ✅");
            } catch (error) {
                console.error("Error adding to cart:", error);
                alert("Error adding to cart ❌");
            }
            },
        },


        mounted(){
            this.fetchProducts();
            this.$store.dispatch('fetchFeaturedProducts');
        }

    }
</script>

<style>

</style>