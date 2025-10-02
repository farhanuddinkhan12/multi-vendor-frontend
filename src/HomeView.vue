<template>
    <div class="container mx-auto mt-8">
        <h1 class="text-3xl font-bold text-center mb-6">All Products</h1>
        <div class="p-6">
    <!-- Add Product Button -->
    <button class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      @click="showAddProductForm = true">
      + Add Product
    </button>

    <!-- Add Product Modal -->
    <!-- Add Product Modal -->
    <div v-if="showAddProductForm"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto relative z-50">
        <h2 class="text-xl font-bold mb-4 text-gray-700">Add New Product</h2>

        <input v-model="product.name" placeholder="Product Name"
        class="w-full border p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />

        <input v-model="product.description" placeholder="Description"
        class="w-full border p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />

        <input v-model="product.price" placeholder="Price" type="number"
        class="w-full border p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />

        <input type="number" v-model="product.stock" placeholder="Stock"
        class="w-full border p-2 rounded-lg mb-3 focus:ring-2 focus:ring-blue-400" />

        <input type="file" @change="handleFileUpload"
        class="w-full border p-2 rounded-lg mb-3 bg-gray-100 cursor-pointer" />

        <div class="flex justify-between mt-4">
        <button @click="addProduct"
            class="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
            Submit
        </button>
        <button @click="showAddProductForm = false"
            class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition">
            Cancel
        </button>
        </div>
    </div>
    </div>

        </div>
                <div v-if="products.length === 0" class="text-center text-gray-500">
                    No Product availble.
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div 
                v-for="product in products" 
                :key="product.id" 
                class="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 duration-300"
            >
                <img 
                    :src="product.image_url || '/default-image.jpg'" 
                    alt="Product Image" 
                    class="w-full h-48 object-cover"
                >
                <div class="p-4">
                    <h2 class="text-xl font-semibold text-gray-800">{{ product.name }}</h2>
                    <p class="text-gray-600 text-sm mt-1">{{ product.description }}</p>
                    <p class="text-lg font-bold text-green-600 mt-2">${{ product.price }}</p>
                    <button 
                    class="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    @click="viewDetails(product)"
                    >
                    View Details
                    </button>
                </div>
            </div>
        </div>

    </div>

    <div v-if="showProductDetails" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto relative z-50">
            <h2 class="text-xl font-bold mb-4 text-gray-700">{{ selectedProduct.name }}</h2>
            <img :src="selectedProduct.image_url || '/default-image.jpg'" class="w-full h-48 object-cover mb-4" />
            <p class="text-gray-600 mb-4">{{ selectedProduct.description }}</p>
            <p class="text-lg font-bold text-green-600">${{ selectedProduct.price }}</p>
            <p class="text-gray-600 mt-2">Stock: {{ selectedProduct.stock }}</p>

            <div class="flex justify-between mt-4">
            <button @click="closeDetails" class="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition">
                Close
            </button>
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
                selectedProduct: {}
            }
        },
        computed: {
                ...mapGetters(['allProducts']),
                products() {
                    return this.allProducts;
                }
            },
        methods:{
            ...mapActions(['fetchProducts', "addNewProduct"]),
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
            }

        },
        mounted(){
            this.fetchProducts();
        }

    }
</script>

<style>

</style>