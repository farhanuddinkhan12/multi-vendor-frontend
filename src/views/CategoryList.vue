<template>
    <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">Manage Categories</h1>
        <!-- Add Category -->
        <form @submit.prevent="AddNewCategory" class="mb-6 space-y-3">
            <input v-model="name" type="text" placeholder="Category Name" class="border p-2 w-full rounded" required>
            <textarea v-model="description" placeholder="Description" class="border p-2 w-full rounded"></textarea>
            <input type="file" @change="onImageChange" class="border p-2 w-full rounded">
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add Category</button>
        </form>
        <!-- Category Table -->

        <table class="min-w-full bg-white border rounded-lg shadow">
            <thead class="bg-gray-100">
                <tr>
                    <th class="py-2 px-4">Image</th>
                    <th class="py-2 px-4">Name</th>
                    <th class="py-2 px-4">Description</th>
                    <th class="py-2 px-4">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="category in categories" :key="category.id" class="border-b">
                    <td class="p-2">
                        <img :src="getImageUrl(category.image)" alt="" class="w-16 h-16 object-cover rounded">
                    </td>
                    <td class="p-2">{{ category.name }}</td>
                    <td class="p-2">{{ category.description }}</td>
                    <td class="p-2">
                        <button @click="deleteCategory(category.id)" class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "CategoryList",
    data(){
       return {
        name: "",
        description: "",
        image: null,
       };
    },
    computed: {
        ...mapGetters(["allCategories"]),
        categories() {
            return this.allCategories;
        },
    },
    methods: {
        ...mapActions(["fetchCategories", "addCategory", "deleteCategory"]),
        async addNewCategory(){
            const formData = new FormData();
            formData.append("name", this.name);
            formData.append("description", this.description);
            if(this.image) formData.append("image", this.image);

            await this.addCategory(formData);
            this.name = "";
            this.description = "";
            this.image = null;
        },
        onImageChange(e) {
            this.image = e.target.files[0];
        },
        getImageUrl(path) {
            return path ? `http://127.0.0.1:8000/${path}` : "https://placehold.co/80x80";
        },
    },
    mounted(){
        this.fetchCategories();
    }
}
</script>