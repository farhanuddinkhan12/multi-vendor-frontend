import HomeView from "@/HomeView.vue";
import LoginView from "@/LoginView.vue";
import RegisterView from "@/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component:HomeView,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    }
];

const router = createRouter({
    history: createWebHistory(),  // This enables history mode
    routes
  });

export default router;