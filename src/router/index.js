import CartView from "@/CartView.vue";
import HomeView from "@/HomeView.vue";
import LoginView from "@/LoginView.vue";
import RegisterView from "@/RegisterView.vue";
import AdminProducts from "@/views/admin/AdminProducts.vue";
import CategoryList from "@/views/CategoryList.vue";
import DashboardView from "@/views/DashboardView.vue";
import AdminDashboard from "@/views/admin/AdminDashboard.vue";
import VendorDashboard from "@/views/vendor/VendorDashboard.vue";
import CustomerDashboard from "@/views/customer/CustomerDashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
import CheckOut from "@/components/CheckOut.vue";
import Success from "@/components/Success.vue";
import Cancel from "@/components/Cancel.vue";




const routes = [
    {
        path: '/',
        name: 'home',
        component:HomeView,
    },
    {
        path: '/checkout',
        name: 'checkout',
        component: CheckOut
    },
    {
        path: '/products',
        name: 'products',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: "/categories",
        name: "categories",
        component: CategoryList,
    },
    {
        path: '/admin/products',
        name: 'AdminProducts',
        component: AdminProducts,
        meta: { requiresAuth: true, role: 'admin' },
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { requiresAuth: true, role: 'admin' },
    },

    // ✅ Vendor Routes
    {
        path: '/vendor/dashboard',
        name: 'VendorDashboard',
        component: VendorDashboard,
        meta: { requiresAuth: true, role: 'vendor' },
    },

    // ✅ Customer Routes
    {
        path: '/customer/dashboard',
        name: 'CustomerDashboard',
        component: CustomerDashboard,
        meta: { requiresAuth: true, role: 'customer' },
    },
    {
        path: '/dashboard',
        name: 'DashboardView',
        component: DashboardView
    },
    {
        path: "/success",
        name: "Success",
        component: Success
    },
    {
        path: "/cancel",
        name: "Cancel",
        component: Cancel
    }
    
];

const router = createRouter({
    history: createWebHistory(),  // This enables history mode
    routes
  });

export default router;