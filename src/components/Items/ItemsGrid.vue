<template>
  <div>
    <div class="top-bar">
      <h2>Items Gallery</h2>
      <input type="text" v-model="searchParam" />
      <button v-if="isAdmin" class="sci-fi-button topbar-button" @click="openCreateModal()">Create Item</button>
    </div>
    <div class="items-grid">
      <div v-for="item in items" :key="item.id" class="item-card">
        <div class="item-image">
          <img loading="eager" v-if="item.image_url" :src="item.image_url" alt="Item Image" />
          <span v-else>No image available</span>
        </div>
        <div class="item-info">
          <h3>{{ item.name }}</h3>
          <p>{{ parseFloat(item.price).toFixed(0) }}💸</p>
          <div v-if="isAdmin" class="action-buttons">
            <button class="sci-fi-button" @click="openDetailModal(item.id)">View</button>
            <button class="sci-fi-button success" @click="openEditModal(item.id)">Edit</button>
            <button class="sci-fi-button cancel" @click="openDeleteModal(item.id)">Delete</button>
          </div>
          <div v-else class="action-buttons">
            <button class="sci-fi-button" @click="openDetailModal(item.id)">View</button>
            <button class="sci-fi-button cart" @click="openDetailModal(item.id)">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals for Edit, Detail, and Delete Confirmation -->
    <div v-if="isCreating || isEditing || isViewing || isDeleting" class="modal-overlay" @click.self="closeModals">
      <CreateItem v-if="isCreating" @close="closeModals" />
      <EditItem v-if="isEditing" :itemId="selectedItemId" @close="closeModals" />
      <ItemDetail v-if="isViewing" :itemId="selectedItemId" @close="closeModals" />
      <DeleteConfirmation v-if="isDeleting" @close="closeDeleteModal" @confirm="confirmDelete" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from "vue";
import { useItemsStore } from "../../store/itemsStore";
// import debounce from "lodash";
import CreateItem from '../../components/Items/CreateItems.vue';
import EditItem from "./EditItems.vue";
import ItemDetail from "./ItemDetail.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import isSuperUser from "../../services/jwt/checkUserRole";

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
    const isAdmin = isSuperUser();
    const searchParam = ref('');

    const fetchItems = async () => {
      await store.fetchItems(searchParam.value);
      items.value = store.items;
    };

    watch(searchParam, () => {
      fetchItems();
    });

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
      isAdmin,
      searchParam,
    };
  }
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #000;
  color: #fff;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.topbar-button {
  height: fit-content;
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

.sci-fi-button.cart:hover {
  background: linear-gradient(45deg, #fc4a03, #ce6007);
  box-shadow: 0 0 15px #f85d03, 0 0 25px rgba(255, 72, 0, 0.7);
}

.sci-fi-button.cancel {
  background: linear-gradient(45deg, #ff4b2b, #ff416c);
}

.sci-fi-button.success {
  background: linear-gradient(45deg, #04700d, #1fdd19);
}

.sci-fi-button.cart {
  background: linear-gradient(45deg, #f76f00, #e2a702);
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

.edit-item-modal,
.detail-modal,
.confirmation-modal {
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

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.items-grid {
  display: flex;
  justify-content: start;
  max-width: 100%;
  flex-wrap: wrap;
  gap: 30px;
}

.item-card {
  /* background-color: #1a1a1a; */
  background-color: #000;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 265px;
  height: 320px;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 210, 255, 0.5);
}

.item-image img {
  max-height: 150px;
}

.item-info {
  margin-top: 12px;
}

.item-info h4 {
  color: #ffffff;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.item-info p {
  color: #00d2ff;
  font-weight: bold;
}

.action-buttons {
  margin-top: 10px;
}

.sci-fi-button {
  margin: 4px;
  padding: 8px 16px;
}
</style>
