<template>
  <div class="flex items-center justify-center h-screen text-2xl">
    Redirecting to your dashboard...
  </div>
</template>

<script>
export default {
  name: "DashboardView",
  mounted() {
    const role = this.$store.state.auth.user?.role;

    if (role === 'admin') {
      this.$router.push('/admin/dashboard');
    } else if (role === 'vendor') {
      this.$router.push('/vendor/dashboard');
    } else {
      this.$router.push('/customer/dashboard');
    }
  }
};
</script>
