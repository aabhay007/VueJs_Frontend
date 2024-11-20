<template>
  <div class="confirmation-modal">
    <p>Are you sure you want to delete?</p>
    <div class="button-group">
      <button class="sci-fi-button confirm" @click="confirmDeletion">Yes, Delete</button>
      <button class="sci-fi-button cancel" @click="emitClose">Cancel</button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Emit close and confirm events
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();

const emitClose = () => emit('close');
const confirmDeletion = () => emit('confirm');
</script>

<style scoped>
.confirmation-modal {
  background-color: #111;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  width: 18%;
  margin: auto;
  text-align: center;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.sci-fi-button.confirm {
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
  color: #fff;
}

.sci-fi-button.cancel {
  background: linear-gradient(45deg, #00d2ff, #3a0ca3);
  color: #fff;
}
</style>