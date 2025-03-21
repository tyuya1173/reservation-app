import store from '@/store';

export function requireAuth(to, from, next) {
  if (store.getters['auth/isLoggedIn']) {
    next();
  } else {
    next('/login');
  }
}