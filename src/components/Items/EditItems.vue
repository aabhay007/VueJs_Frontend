<template>
    <div class="edit-item-modal">
      <h2>Edit Item</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Item Name -->
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="updatedItem.name" required />
  
        <!-- Item Description -->
        <label for="description">Description:</label>
        <textarea id="description" v-model="updatedItem.description" required></textarea>
  
        <!-- Item Price -->
        <label for="price">Price:</label>
        <input min="0" type="number" id="price" v-model="updatedItem.price" required />
  
        <!-- Item Image (optional) -->
        <label for="image">Image:</label>
        <input type="file" id="image" @change="handleImageUpload" />
  
        <!-- Buttons -->
        <div class="button-group">
          <button type="submit" class="sci-fi-button">Save Changes</button>
          <button type="button" class="sci-fi-button cancel" @click="emitClose">Cancel</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useItemsStore } from '../../store/itemsStore';
  
  // Props
  const props = defineProps<{
    itemId: number;
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'close'): void; // Define emit type for 'close'
  }>();
  
  // Store
  const store = useItemsStore();
  
  // Reactive item data
  const updatedItem = ref({
    id: props.itemId,
    name: '',
    description: '',
    price: 0,
    image: null as string | null,
  });
  
  // Fetch item data for editing
  const fetchItemData = async () => {
    const item = await store.getItemById(props.itemId);
    if (item) {
      updatedItem.value = { ...item };
    } else {
      alert('Item not found!');
      emit('close'); // Close modal if item not found
    }
  };
  
  // Watch for changes to `itemId` prop and fetch new data when it changes
  watch(
    () => props.itemId,
    () => {
      fetchItemData();
    }
  );
  
  // Handle image upload and convert to base64
  const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updatedItem.value.image = reader.result as string; // Set the image data as base64
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Emit close event
  const emitClose = () => {
    emit('close'); // Emit a close event to hide the component
  };
  
  // Submit the form to save the updated item
  const handleSubmit = async () => {
    try {
      await store.updateItem(updatedItem.value);
      emitClose(); // Emit a close event to hide the component
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };
  
  // Fetch item data on component mount
  onMounted(fetchItemData);
  </script>
  
<style scoped>
input,textarea{
    max-width: 94%;
}
.edit-item-modal {
    background-color: #111;
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    max-width: 500px;
    margin: auto;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.edit-item-modal label {
    display: block;
    margin: 10px 0 5px;
    color: #00eaff;
}

.edit-item-modal input,
.edit-item-modal textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
    border: 1px solid #00eaff;
    border-radius: 4px;
    background-color: #222;
    color: #fff;
}

.button-group {
    display: flex;
    justify-content: space-between;
}

.sci-fi-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(45deg, #00d2ff, #3a0ca3);
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
}

.sci-fi-button:hover {
    background: linear-gradient(45deg, #3a0ca3, #00d2ff);
    box-shadow: 0 0 15px #00d2ff, 0 0 25px rgba(0, 210, 255, 0.7);
}

.sci-fi-button.cancel {
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
}
</style>