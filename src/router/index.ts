// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
// import { useAuthStore } from '../store/useAuthStore';
import ItemsTable from '../components/Items/ItemsTable.vue';

const routes = [
  { path: '/home', name: 'Home', component: Home
    // , meta: { requiresAuth: true } 
  },
  { path: '/', name: 'Login', component: Login},
  { path: '/register', name: 'Register', component: Register },
  { path: '/items-list', name: 'Items', component: ItemsTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, _, next) => {
//   const authStore = useAuthStore();
//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     next('/home');
//   } else {
//     next();
//   }
// });

export default router;
