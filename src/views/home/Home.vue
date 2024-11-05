<template>
  <div>
    <!-- <h2 v-if="authStore.user">Welcome, {{ authStore.user.username }}</h2>
    <h2 v-else>Loading...</h2> -->
    <h2>Welcome</h2>
    <ItemsTableVue />
    <button class="sci-fi-button" @click="showCreateItem = true">Create Item</button>
    <button class="sci-fi-button" @click="authStore.logout">Logout</button>

    <!-- Conditionally render the CreateItem component -->
    <CreateItemVue v-if="showCreateItem" @close="showCreateItem = false" />
  </div>
</template>

<script setup lang="ts">
import ItemsTableVue from '../../components/Items/ItemsTable.vue';
import CreateItemVue from '../../components/Items/CreateItems.vue';
import { ref, onMounted} from 'vue';
import { useAuthStore } from '../../store/useAuthStore';

const authStore = useAuthStore();
//  console.log(authStore);

const showCreateItem = ref(false); // Control CreateItem visibility

</script>

<style scoped>
.sci-fi-button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(45deg, #00d2ff, #3a0ca3);
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
}

.sci-fi-button:hover {
  background: linear-gradient(45deg, #3a0ca3, #00d2ff);
  box-shadow: 0 0 15px #00d2ff, 0 0 25px rgba(0, 210, 255, 0.7);
}
</style>