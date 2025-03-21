<template>
    <v-container>
      <v-card v-if="event">
        <v-card-title>{{ event.title }}</v-card-title>
        <v-card-subtitle>
          {{ formattedDate }} {{ event.startTime }} - {{ event.endTime }} @ {{ event.location }}
        </v-card-subtitle>
        <v-card-text>
          <v-select
            v-model="participantCount"
            :items="[1, 2, 3, 4, 5]"
            label="参加人数"
          />
          <div v-for="(p, index) in participants" :key="index" class="mt-4">
            <v-text-field v-model="p.name" label="氏名" required />
            <v-select v-model="p.faculty" :items="faculties" label="学部" required />
            <v-radio-group v-model="p.gender" row>
              <v-radio label="男性" value="male" />
              <v-radio label="女性" value="female" />
              <v-radio label="その他" value="other" />
            </v-radio-group>
          </div>
          <v-btn @click="submitReservation" color="primary" class="mt-4">予約確定</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, watch, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { fetchEventById, createReservation } from '@/firebase/firestore';
  import { useStore } from 'vuex';
  
  const route = useRoute();
  const router = useRouter();
  const store = useStore();
  
  const eventId = route.params.id;
  const event = ref(null);
  const participantCount = ref(1);
  const participants = ref([]);
  const faculties = ['教育学部', '経済学部', '観光学部', 'システム工学部', '社会インフォマティクス学環'];
  
  const user = computed(() => store.state.auth.user);
  
  onMounted(async () => {
    event.value = await fetchEventById(eventId);
  });
  
  watch(participantCount, (newCount) => {
    participants.value = Array.from({ length: newCount }, (_, i) => ({
      name: '',
      faculty: '',
      gender: ''
    }));
  }, { immediate: true });
  
  const submitReservation = async () => {
    if (!user.value) {
      alert('ログインが必要です');
      router.push('/login');
      return;
    }
  
    const valid = participants.value.every(p => p.name && p.faculty && p.gender);
    if (!valid) {
      alert('すべての参加者情報を入力してください');
      return;
    }
  
    await createReservation({
      eventId,
      userId: user.value.uid,
      participants: participants.value,
      participantCount: participantCount.value
    });
  
    router.push(`/reservations/complete`);
  };
  
  const formattedDate = computed(() =>
    event.value ? event.value.date.toDate().toLocaleDateString() : ''
  );
  </script>