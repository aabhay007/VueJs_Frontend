<template>
    <div class="item-detail-modal">
        <h2>Item Details</h2>
        <div>
            <p><strong>Name:</strong> {{ item.name }}</p>
            <p><strong>Description:</strong> {{ item.description }}</p>
            <p><strong>Price:</strong> {{ item.price }}</p>
            <div v-if="item.image">
                <strong>Image:</strong>
                <img :src="item.image" alt="Item Image" class="item-image" />
            </div>
        </div>
        <button type="button" class="sci-fi-button cancel" @click="emitClose">Close</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useItemsStore } from '../../store/itemsStore';

// Props
const props = defineProps<{ itemId: number }>();

// Emits
const emit = defineEmits<{ (e: 'close'): void }>();

// Store
const store = useItemsStore();
const item = ref({ name: '', description: '', price: 0, image: null as string | null });

// Fetch item data for viewing
const fetchItemData = async () => {
    const fetchedItem = await store.getItemById(props.itemId);
    if (fetchedItem) {
        item.value = { ...fetchedItem };
    } else {
        alert('Item not found!');
        emit('close'); // Close modal if item not found
    }
};

// Emit close event
const emitClose = () => {
    emit('close');
};

// Fetch item data on component mount
onMounted(fetchItemData);
</script>

<style scoped>
.item-detail-modal {
    background-color: #111;
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    max-width: 500px;
    margin: auto;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.item-detail-modal p {
    margin: 10px 0;
    color: #00eaff;
}

.item-image {
    max-width: 100%;
    height: auto;
    border: 1px solid #00eaff;
    margin-top: 10px;
}

.sci-fi-button.cancel {
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}
</style>