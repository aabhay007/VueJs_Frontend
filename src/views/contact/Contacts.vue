<template>
    <div class="contact-page">
        <Navbar />
        <div class="content fade-in">
            <h1>Contact Us</h1>
            <p>
                We’d love to hear from you! Feel free to reach out to us using the form below or via our contact
                information.
            </p>
            <form class="contact-form" @submit.prevent="handleSubmit">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="formData.name" placeholder="Enter your name" required />

                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email" placeholder="Enter your email" required />

                <label for="message">Message:</label>
                <textarea id="message" v-model="formData.message" rows="5" placeholder="Write your message here"
                    required></textarea>

                <button type="submit" class="submit-btn">Send Message</button>
            </form>
            <!-- <div v-if="responseMessage" :class="responseClass">
                {{ responseMessage }}
            </div> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../../components/navbar/Navbar.vue';
import axiosInstance from '../../services/jwt/interceptor';
import toast from '../../services/toaster/toast';
const formData = ref({
    name: '',
    email: '',
    message: ''
});

const responseMessage = ref('');
const responseClass = ref('');

// Handle form submission
const handleSubmit = async () => {
    try {
        // Make POST request to the API
        const response = await axiosInstance.post('contact/', formData.value);

        // Success handling
        responseMessage.value = response.data.message;
        responseClass.value = 'success';
        toast.success(response.data.message);
        // Clear form after submission
        formData.value.name = '';
        formData.value.email = '';
        formData.value.message = '';
    } catch (error) {
        // Error handling
        toast.error("Unable to send your message!" );
        responseMessage.value = 'There was an error sending your message. Please try again later.';
        responseClass.value = 'error';
    }
};
</script>

<style scoped>
.contact-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    padding: 20px;
    color: #fffbfb;
}

.content {
    max-width: 600px;
    text-align: center;
    margin-top: 20px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 15px;
}

.contact-form label {
    text-align: left;
    font-weight: bold;
    margin-bottom: 5px;
}

.contact-form input,
.contact-form textarea {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
}

.contact-form input:focus,
.contact-form textarea:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.submit-btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
}

.submit-btn:hover {
    background-color: #0056b3;
}
</style>