<template>
    <div class="container">
      <div class="top-bar">
        <h2>User Management</h2>
        <button class="sci-fi-button">Add User</button>
      </div>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>isAdmin</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.first_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.is_superuser ? 'Yes' : 'No' }}</td>
            <td>
              <button class="sci-fi-button edit-btn" @click="openEditModal(user)">
                Edit
              </button>
              <button class="sci-fi-button cancel" @click="deleteUser(user.id)">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Modal for Edit User -->
      <div v-if="isEditModalOpen" class="modal-overlay">
        <div class="edit-item-modal">
          <h3>Edit User</h3>
          <input v-model="selectedUser.first_name" placeholder="Enter Name" />
          <input v-model="selectedUser.email" placeholder="Enter Email" />
          <button class="sci-fi-button success" @click="saveChanges">Save</button>
          <button class="sci-fi-button cancel" @click="closeEditModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAdminStore } from '../../store/adminStore';
  import { defineComponent, onMounted, ref } from 'vue';
  import Navbar from '../navbar/Navbar.vue';
  
  export default defineComponent({
    setup() {
      const adminStore = useAdminStore();
      const users = ref([]);
      const isEditModalOpen = ref(false);
      const selectedUser = ref({});
  
      const fetchUsers = async () => {
        users.value = await adminStore.getAllUsers();
      };
  
      const openEditModal = (user) => {
        selectedUser.value = { ...user }; // Copy the user data to selectedUser
        isEditModalOpen.value = true;
      };
  
      const closeEditModal = () => {
        isEditModalOpen.value = false;
      };
  
      const saveChanges = () => {
        // Call API to update user
        console.log('Saving changes for', selectedUser.value);
        closeEditModal();
      };
  
      const deleteUser = async (userId) => {
        // Call API to delete user
        console.log('Deleting user with id:', userId);
      };
  
      onMounted(fetchUsers);
  
      return {
        users,
        isEditModalOpen,
        selectedUser,
        openEditModal,
        closeEditModal,
        saveChanges,
        deleteUser,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Style for the table */
  .styled-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .styled-table th,
  .styled-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .styled-table th {
    background-color: #000;
    color: #fff;
  }
  
  /* Top Bar */
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  /* Sci-Fi Button Styles */
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
  
  /* Modal Styles */
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
  
  .edit-item-modal {
    background-color: #111;
    padding: 20px;
    border-radius: 8px;
    color: #fff;
    min-width: 30%;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
  }
  
  .edit-item-modal input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    background-color: #222;
    border: 1px solid #ddd;
    color: #fff;
    border-radius: 5px;
  }
  </style>
  