<template>
    <div class="contact-messages-page">
        <Navbar />
        <div class="content fade-in">
            <h1>Contact Messages</h1>

            <table class="contact-messages-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="message in contactMessages" :key="message.id">
                        <td>{{ message.name }}</td>
                        <td>{{ message.email }}</td>
                        <td>{{ message.message }}</td>
                        <td>
                            <button @click="deleteMessage(message.id)" class="delete-btn">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import Navbar from '../../components/navbar/Navbar.vue';
import { ref, onMounted } from 'vue';
import axiosInstance from '../../services/jwt/interceptor';

// Store the fetched contact messages
const contactMessages = ref([]);

// Fetch all contact messages from the backend
const fetchMessages = async () => {
    try {
        const response = await axiosInstance.get('contact/');
        contactMessages.value = response.data;
    } catch (error) {
        console.error('There was an error fetching the contact messages:', error);
    }
};

// Delete a contact message
const deleteMessage = async (id) => {
    try {
        const response = await axiosInstance.delete('contact/', {
            data: { id: id } // Send the ID of the message to delete
        });
        // Remove the message from the list after successful deletion
        contactMessages.value = contactMessages.value.filter((message) => message.id !== id);
        alert(response.data.message); // Show success message
    } catch (error) {
        console.error('There was an error deleting the message:', error);
        alert('Failed to delete the message.');
    }
};

// Fetch messages when the component is mounted
onMounted(() => {
    fetchMessages();
});
</script>

<style scoped>
.contact-messages-page {
    padding: 20px;
}

.contact-messages-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.contact-messages-table th,
.contact-messages-table td {
    padding: 10px;
    border: 1px solid #ddd;
}
.contact-messages-table th{
    color: #000;
}
.contact-messages-table th {
    background-color: #f4f4f4;
}

.delete-btn {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.delete-btn:hover {
    background-color: darkred;
}
</style>