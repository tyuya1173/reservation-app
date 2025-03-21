<template>
    <v-container>
      <v-btn @click="router.push('/admin/events/create')" color="primary">イベント作成</v-btn>
  
      <v-data-table :items="events" :headers="headers">
        <template #item.actions="{ item }">
          <v-btn icon @click="edit(item.id)"><v-icon>mdi-pencil</v-icon></v-btn>
          <v-btn icon @click="remove(item.id)"><v-icon>mdi-delete</v-icon></v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { fetchEvents, deleteEvent } from '@/firebase/firestore';
  
  const router = useRouter();
  const events = ref([]);
  
  const headers = [
    { text: 'イベント名', value: 'title' },
    { text: '開催日', value: 'date' },
    { text: '場所', value: 'location' },
    { text: '操作', value: 'actions', sortable: false },
  ];
  
  onMounted(async () => {
    const data = await fetchEvents();
    events.value = data.map(e => ({
      ...e,
      date: e.date.toDate().toLocaleDateString()
    }));
  });
  
  const edit = (id) => router.push(`/admin/events/edit/${id}`);
  const remove = async (id) => {
    if (confirm('本当に削除しますか？')) {
      await deleteEvent(id);
      events.value = events.value.filter(e => e.id !== id);
    }
  };
  </script>