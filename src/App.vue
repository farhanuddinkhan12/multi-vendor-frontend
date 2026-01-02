<template>
    <div class="flex flex-col min-h-screen">
      <AppNavbar />
      <main class="flex-grow">
        <RouterView />
      </main>
      <AppFooter />
    </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
  AppNavbar, 
  AppFooter
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
   margin-top: 0;
}
</style>
