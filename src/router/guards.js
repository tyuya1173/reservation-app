import store from '@/store';

export function requireAdmin(to, from, next) {
  const user = store.state.auth.user;
  if (user && user.role === 'admin') {
    next();
  } else {
    alert('管理者のみアクセス可能です');
    next('/');
  }
}