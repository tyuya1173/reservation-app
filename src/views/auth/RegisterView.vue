<template>
    <v-container class="mt-8" max-width="500px">
      <v-card>
        <v-card-title>新規登録</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleRegister">
            <v-text-field v-model="email" label="メールアドレス" required />
            <v-text-field v-model="password" label="パスワード" type="password" required />
            <v-text-field v-model="confirmPassword" label="パスワード確認" type="password" required />
            <v-btn type="submit" color="primary" block class="mt-4">登録</v-btn>
          </v-form>
          <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
          <div class="mt-4 text-center">
            <router-link to="/login">すでにアカウントをお持ちの方はこちら</router-link>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { register } from '@/firebase/auth';
  import { useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const error = ref('');
  
  const router = useRouter();
  const store = useStore();
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      error.value = 'パスワードが一致しません';
      return;
    }
  
    try {
      await register(email.value, password.value);
      await store.dispatch('auth/fetchUser');
      router.push('/');
    } catch (err) {
      error.value = err.message;
    }
  };
  </script>