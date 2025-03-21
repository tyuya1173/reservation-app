<template>
    <v-container>
      <v-card v-if="event">
        <v-card-title>{{ event.title }}</v-card-title>
        <v-card-subtitle>
          {{ formattedDate }} {{ event.startTime }} - {{ event.endTime }} @ {{ event.location }}
        </v-card-subtitle>
        <v-card-text>{{ event.description }}</v-card-text>
  
        <!-- ✅ ここに予約ボタン追加 -->
        <v-card-actions>
          <v-btn color="primary" :to="`/events/${event.id}/reserve`">
            予約する
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { fetchEventById } from '@/firebase/firestore';
  
  const route = useRoute();
  const event = ref(null);
  
  onMounted(async () => {
    event.value = await fetchEventById(route.params.id);
  });
  
  const formattedDate = computed(() =>
    event.value ? event.value.date.toDate().toLocaleDateString() : ''
  );
  </script>