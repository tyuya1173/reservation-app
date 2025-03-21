import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from './guards';

const routes = [
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminDashboard.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/Register.vue'),
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('@/views/auth/ForgotPassword.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;