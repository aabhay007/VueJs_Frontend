// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ItemsTable from '../components/Items/ItemsGrid.vue';
import Dashboard from '../views/admin/Dashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/login', name: 'Login', component: Login},
  { path: '/register', name: 'Register', component: Register },
  { path: '/items-list', name: 'Items', component: ItemsTable },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },

];

const router = createRouter({ 
  history: createWebHistory(),
  routes,
});

export default router;
