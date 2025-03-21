<script setup>
import { useStore } from 'vuex';

const store = useStore();
store.dispatch('auth/fetchUser');
</script>