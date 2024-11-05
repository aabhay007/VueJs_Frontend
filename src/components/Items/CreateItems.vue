<template>
    <div class="create-item-modal">
        <h2>Create New Item</h2>
        <form @submit.prevent="handleSubmit">
            <!-- Item Name -->
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="newItem.name" required />

            <!-- Item Description -->
            <label for="description">Description:</label>
            <textarea id="description" v-model="newItem.description" required></textarea>

            <!-- Item Price -->
            <label for="price">Price:</label>
            <input min="0" type="number" id="price" v-model="newItem.price" required />

            <!-- Item Image (optional) -->
            <label for="image">Image:</label>
            <input type="file" id="image" @change="handleImageUpload" />

            <!-- Buttons -->
            <div class="button-group">
                <button type="submit" class="sci-fi-button">Save Item</button>
                <button type="button" class="sci-fi-button cancel" @click="$emit('close')">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useItemsStore } from '../../store/itemsStore';

  // Emits
  const emit = defineEmits<{
    (e: 'close'): void; // Define emit type for 'close'
  }>();

const store = useItemsStore();
const newItem = ref({
    name: '',
    description: '',
    price: 0,
    image: null,
});

// Function to handle image upload
const handleImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            newItem.value.image = reader.result as string; // Set the image data as a base64 string
        };
        reader.readAsDataURL(file); // Convert file to base64
    }
};

// Function to handle form submission
const handleSubmit = async () => {
    try {
        await store.createItem(newItem.value); // Call the store action to create the item
        emit('close'); // Emit a close event to hide the component
    } catch (error) {
        console.error("Failed to create item:", error);
    }
};
</script>

<style scoped>
input,textarea{
    max-width: 94%;
}
.create-item-modal {
    background-color: #111;
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    max-width: 500px;
    margin: auto;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.create-item-modal label {
    display: block;
    margin: 10px 0 5px;
    color: #00eaff;
}

.create-item-modal input,
.create-item-modal textarea {
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