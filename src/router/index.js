import { createRouter, createWebHistory } from 'vue-router';
import { requireAuth } from './guards';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
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
  },
  {
    path: '/events/:id',
    name: 'EventDetails',
    component: () => import('@/views/events/EventDetails.vue'),
  },
  {
    path: '/admin/events',
    name: 'EvnetManage',
    component: () => import('@/views/admin/EventManage.vue'),
  },
  {
    path: '/admin/events/create',
    name: 'EventCreate',
    component: () => import('@/views/admin/EventCreate.vue'),
  },
  {
    path: '/admin/events/edit/:id',
    name: 'EventEdit',
    component: () => import('@/views/admin/EventEdit.vue'),
    props: true,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;