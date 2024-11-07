<template>
  <div>
    <h3>Items Table</h3>
    <button class="sci-fi-button" @click="openCreateModal()">Create Item</button>
    <table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <!-- Display the image if available, otherwise show a placeholder or message -->
          <td>
            <img v-if="item.image_url" :src="item.image_url" alt="Item Image" style="width: 100px; height: 100px;" />
            <span v-else>No image available</span>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button class="sci-fi-button" @click="openDetailModal(item.id)">View</button>
            <button class="sci-fi-button success" @click="openEditModal(item.id)">Edit</button>
            <button class="sci-fi-button cancel" @click="openDeleteModal(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modals for Edit, Detail, and Delete Confirmation, wrapped with modal styles -->
    <div v-if="isCreating || isEditing || isViewing || isDeleting" class="modal-overlay" @click.self="closeModals">
      <CreateItem v-if="isCreating" @close="closeModals" />
      <EditItem v-if="isEditing" :itemId="selectedItemId" @close="closeModals" />
      <ItemDetail v-if="isViewing" :itemId="selectedItemId" @close="closeModals" />
      <DeleteConfirmation v-if="isDeleting" @close="closeDeleteModal" @confirm="confirmDelete" />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useItemsStore } from "../../store/itemsStore";
import CreateItem from '../../components/Items/CreateItems.vue';
import EditItem from "./EditItems.vue";
import ItemDetail from "./ItemDetail.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";

export default defineComponent({
  components: {
    CreateItem,
    EditItem,
    ItemDetail,
    DeleteConfirmation,
  },
  setup() {
    const store = useItemsStore();
    const items = ref();
    const isCreating = ref(false);
    const isEditing = ref(false);
    const isViewing = ref(false);
    const isDeleting = ref(false);
    const selectedItemId = ref(0);

    const fetchItems = async () => {
      await store.fetchItems();
      items.value = store.items;
    };

    const openDetailModal = (id: number) => {
      selectedItemId.value = id;
      isViewing.value = true;
    };

    const openEditModal = (id: number) => {
      selectedItemId.value = id;
      isEditing.value = true;
    };

    const openCreateModal = () => {
      isCreating.value = true;
    };

    const openDeleteModal = (id: number) => {
      selectedItemId.value = id;
      isDeleting.value = true;
    };

    const closeModals = () => {
      isCreating.value = false;
      isViewing.value = false;
      isEditing.value = false;
      isDeleting.value = false;
      selectedItemId.value = 0;
      fetchItems();
    };

    const closeDeleteModal = () => {
      isDeleting.value = false;
      selectedItemId.value = 0;
    };

    const confirmDelete = async () => {
      if (selectedItemId.value !== null) {
        await store.deleteItem(selectedItemId.value);
        fetchItems();
      }
      closeDeleteModal();
    };

    onMounted(fetchItems);

    return {
      items,
      openDetailModal,
      openCreateModal,
      openEditModal,
      openDeleteModal,
      closeModals,
      closeDeleteModal,
      confirmDelete,
      isCreating,
      isEditing,
      isViewing,
      isDeleting,
      selectedItemId,
    };
  },
});
</script>

<style scoped>

table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}                                    
th {
  background-color: #000;
  color: #fff;
}
.sci-fi-button {
  margin: 6px;
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
.sci-fi-button.success {
  background: linear-gradient(45deg, #04700d, #1fdd19);
}

/* Modal overlay and modal content styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.edit-item-modal, .detail-modal, .confirmation-modal {
  background-color: #111;
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  min-width: 20%;
  /* max-width: 500px; */
  /* width: 100%; */
  box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
  text-align: center;
}
</style>
