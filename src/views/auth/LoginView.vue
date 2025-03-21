<template>
    <v-container>
      <v-form @submit.prevent="handleLogin">
        <v-text-field label="メールアドレス" v-model="email" required />
        <v-text-field label="パスワード" v-model="password" type="password" required />
        <v-btn type="submit" color="primary">ログイン</v-btn>
      </v-form>
      <router-link to="/register">新規登録</router-link>
      <router-link to="/forgot-password">パスワードを忘れた？</router-link>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { login } from '@/firebase/auth';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const store = useStore();
  
  const handleLogin = async () => {
    try {
      await login(email.value, password.value);
      await store.dispatch('auth/fetchUser');
      router.push('/');
    } catch (err) {
      alert('ログイン失敗：' + err.message);
    }
  };
  </script>