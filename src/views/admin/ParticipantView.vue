<template>
    <v-container>
      <v-card v-if="event">
        <v-card-title>{{ event.title }} の参加者一覧</v-card-title>
        <v-card-subtitle>{{ event.date.toDate().toLocaleDateString() }}</v-card-subtitle>
      </v-card>
  
      <v-data-table :items="participants" :headers="headers" class="mt-4" />
  
      <v-btn color="primary" class="mt-4" @click="exportSheet">
        スプレッドシート出力
      </v-btn>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchEventById, fetchReservationsByEvent } from '@/firebase/firestore';
  
  const route = useRoute();
  const event = ref(null);
  const participants = ref([]);
  
  const headers = [
    { text: '氏名', value: 'name' },
    { text: '学部', value: 'faculty' },
    { text: '性別', value: 'gender' }
  ];
  
  onMounted(async () => {
    event.value = await fetchEventById(route.params.id);
    const reservations = await fetchReservationsByEvent(route.params.id);
    participants.value = reservations.flatMap(r => r.participants);
  });
  
  const exportSheet = async () => {
    // Firebase Functions を使ってスプレッドシート出力を呼び出す（後述）
    alert('スプレッドシート出力を実装予定です');
  };
  </script>