<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2 class="form-title">Login</h2>
      <input v-model="username" type="text" placeholder="Username" required class="sci-fi-input" />
      <input v-model="password" type="password" placeholder="Password" required class="sci-fi-input" />
      <button type="submit" class="sci-fi-button">Login</button>
      <p v-if="error" class="error-text">{{ error }}</p>
      <a href="/register">New User?</a>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../store/useAuthStore';
// import { useRouter } from 'vue-router';
import toast from '../../services/toaster/toast';

const authStore = useAuthStore();
// const router = useRouter();

const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    await authStore.login(username.value, password.value);
    toast.info("Logged In Sucessfully!");
    } catch (err: any) {
    toast.info("Invalid Credentials!");
    error.value = err.message;
  }
};
</script>
<style scoped>
.login-container{
  display: flex;
  justify-content: center;
  /* align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #302e6b, #78569b); */
}
.login-form {
  max-width: 35%;
  background: rgba(20, 20, 30, 0.9);
  padding: 20px 30px;
  border-radius: 10px;
  border: 1px solid rgba(100, 100, 255, 0.2);
  box-shadow: 0 0 15px rgba(9, 202, 250, 0.5), 0 0 25px rgba(100, 100, 255, 0.3);
}
.login-form:hover{
  box-shadow: 0 0 15px rgba(51, 3, 228, 0.5), 0 0 25px rgba(100, 100, 255, 0.3);
}
.form-title {
  color: #00d2ff;
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.sci-fi-input {
  width: 95%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  outline: none;
  border-radius: 5px;
  background: rgba(20, 20, 30, 0.8);
  color: #ffffff;
  font-size: 16px;
  box-shadow: inset 0 0 10px rgba(100, 100, 255, 0.5);
  transition: box-shadow 0.3s ease, background 0.3s ease;
}

.sci-fi-input:focus {
  box-shadow: 0 0 10px #00d2ff, 0 0 20px rgba(0, 210, 255, 0.7);
  background: rgba(20, 20, 50, 0.9);
}

.sci-fi-button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(45deg, #00d2ff, #3a0ca3);
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
}

.sci-fi-button:hover {
  background: linear-gradient(45deg, #3a0ca3, #00d2ff);
  box-shadow: 0 0 15px #00d2ff, 0 0 25px rgba(0, 210, 255, 0.7);
}

.error-text {
  color: #ff4c4c;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
}
</style>