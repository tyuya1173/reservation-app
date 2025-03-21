<template>
    <div>
      <FullCalendar
        :plugins="calendarPlugins"
        :initialView="currentView"
        :events="calendarEvents"
        @eventClick="handleEventClick"
        :headerToolbar="{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }"
        locale="ja"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { fetchEvents } from '@/firebase/firestore';
  import {
    FullCalendar,
    dayGridPlugin,
    timeGridPlugin,
    interactionPlugin
  } from '@/plugins/fullCalendar';
  
  const calendarPlugins = [dayGridPlugin, timeGridPlugin, interactionPlugin];
  const currentView = ref('dayGridMonth');
  const calendarEvents = ref([]);
  const router = useRouter();
  
  const loadEvents = async () => {
    const events = await fetchEvents();
    // FullCalendar の形式に整形
    calendarEvents.value = events.map(e => ({
      id: e.id,
      title: e.title,
      start: e.date.toDate(), // Firestore の timestamp を Date に変換
    }));
  };
  
  const handleEventClick = ({ event }) => {
    router.push(`/events/${event.id}`);
  };
  
  onMounted(() => {
    loadEvents();
  });
  </script>