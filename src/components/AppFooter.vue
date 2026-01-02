<template>
  <footer class="bg-white border-t border-gray-200 text-gray-700 py-6 mt-auto shadow-inner">
    <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
      
      <!-- Left side -->
      <p class="text-sm text-center md:text-left">
        &copy; {{ new Date().getFullYear() }}
        <span class="font-semibold text-blue-600">MultiVendor</span>. All rights reserved.
      </p>

      <!-- Right side -->
      <div class="flex space-x-4 text-sm">
        <a href="#" class="hover:text-blue-600 transition">Privacy Policy</a>
        <a href="#" class="hover:text-blue-600 transition">Terms</a>
        <a href="#" class="hover:text-blue-600 transition">Contact</a>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter"
}
</script>

<style scoped>
footer {
  width: 100%;
}
</style>
