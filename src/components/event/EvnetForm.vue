<template>
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="form.title" label="イベント名" required />
      <v-textarea v-model="form.description" label="イベント詳細" required />
      <v-text-field v-model="form.location" label="開催場所" required />
      <v-date-picker v-model="form.date" label="開催日" required />
      <v-text-field v-model="form.startTime" label="開始時間 (HH:MM)" required />
      <v-text-field v-model="form.endTime" label="終了時間 (HH:MM)" required />
      <v-btn type="submit" color="primary">{{ isEdit ? '更新' : '作成' }}</v-btn>
    </v-form>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { createEvent, updateEvent, fetchEventById } from '@/firebase/firestore';
  
  const props = defineProps({
    eventId: String,
  });
  
  const router = useRouter();
  const form = ref({
    title: '',
    description: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  
  const isEdit = !!props.eventId;
  
  onMounted(async () => {
    if (isEdit) {
      const event = await fetchEventById(props.eventId);
      if (event) {
        form.value = { ...event, date: event.date.toDate() };
      }
    }
  });
  
  const handleSubmit = async () => {
    const payload = {
      ...form.value,
      date: new Date(form.value.date),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    if (isEdit) {
      await updateEvent(props.eventId, payload);
    } else {
      await createEvent(payload);
    }
  
    router.push('/admin/events');
  };
  </script>