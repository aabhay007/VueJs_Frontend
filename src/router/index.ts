// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ItemsTable from '../components/Items/ItemsGrid.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import Cart from '../views/cart/Cart.vue';
import CheckOut from '../views/checkout/CheckOut.vue';
import PaymentForm from '../components/payment/PaymentForm.vue';
import Contacts from '../views/contact/Contacts.vue';
import Services from '../views/services/Services.vue';
import ContactMessage from '../views/admin/ContactMessage.vue';

const routes = [
  { path: '/', name: 'Home', component: Home},
  { path: '/login', name: 'Login', component: Login},
  { path: '/register', name: 'Register', component: Register },
  { path: '/items-list', name: 'Items', component: ItemsTable },
  { path: '/dashboard', name: 'dashboard', component: Dashboard },
  { path: '/cart', name: 'cart', component: Cart },
  { path: '/checkout', name: 'checkout', component: CheckOut },
  { path: '/payment', name: 'payment', component: PaymentForm },
  { path: '/contact', name: 'contact', component:Contacts  },
  { path: '/services', name: 'service', component:Services  },
  { path: '/contact-messages', name: 'messages', component:ContactMessage  },
];

const router = createRouter({ 
  history: createWebHistory(),
  routes,
});

export default router;
