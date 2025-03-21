<template>
    <v-container class="mt-8" max-width="500px">
      <v-card>
        <v-card-title>パスワードリセット</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleReset">
            <v-text-field v-model="email" label="メールアドレス" required />
            <v-btn type="submit" color="primary" block class="mt-4">リセットメールを送信</v-btn>
          </v-form>
          <v-alert v-if="message" type="success" class="mt-4">{{ message }}</v-alert>
          <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
          <div class="mt-4 text-center">
            <router-link to="/login">ログイン画面に戻る</router-link>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { resetPassword } from '@/firebase/auth';
  
  const email = ref('');
  const message = ref('');
  const error = ref('');
  
  const handleReset = async () => {
    try {
      await resetPassword(email.value);
      message.value = 'リセットメールを送信しました';
      error.value = '';
    } catch (err) {
      error.value = err.message;
      message.value = '';
    }
  };
  </script>