<template>
    <div class="item-detail-modal">
        <h2>Item Details</h2>
        <div>
            <div v-if="item.image_url">
                <img :src="item.image_url" alt="Item Image" class="item-image" />
            </div>
            <h2> {{ item.name }}</h2>
            <span>Price: {{ parseFloat(item.price).toFixed(0) }}💸</span>
            <div>
                <hr>
            </div>
            <span> {{ item.description }}</span>
        </div>
        <button type="button" class="sci-fi-button cancel" @click="emitClose">Close</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useItemsStore } from '../../store/itemsStore';

const props = defineProps<{ itemId: number }>();

const emit = defineEmits<{ (e: 'close'): void }>();

const store = useItemsStore();
const item = ref({ name: '', description: '', price: '', image_url: null as string | null });

const fetchItemData = async () => {
    const fetchedItem = await store.getItemDetails(props.itemId);
    if (fetchedItem) {
        item.value = { ...fetchedItem };
    } else {
        alert('Item not found!');
        emit('close'); // Close modal if item not found
    }
};

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
    box-shadow: 0 0 10px rgb(0, 212, 240);
}

.item-detail-modal p {
    margin: 10px 0;
    color: #00eaff;
}

.item-image {
    max-width: 50%;
    height: 50%;
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