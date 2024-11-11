<template>
  <div>
    <Navbar/>
    <ItemsTableVue />
  </div>
</template>

<script setup lang="ts">
import ItemsTableVue from '../../components/Items/ItemsTable.vue';
import Navbar from '../../components/navbar/Navbar.vue';

const token = document.cookie.length;
console.log(token);
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