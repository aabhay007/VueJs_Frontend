<template>
    <nav class="sci-fi-navbar">
        <h1 class="logo">wizstore</h1>
        <ul v-if="isAdmin" class="nav-links">
            <li><a href="/home">Admin</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        <ul v-else class="nav-links">
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        <button v-if="isLoggedIn" class="sci-fi-button logout-btn" @click="authStore.logout">Logout</button>
        <button v-else class="sci-fi-button login-btn" @click="goToLogin()">Login</button>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthStore } from "../../store/useAuthStore";
import isSuperUser from "../../services/jwt/checkUserRole";
import Cookies from "js-cookie";
import router from "../../router";

export default defineComponent({
    name: "SciFiNavbar",

    setup() {
        const authStore = useAuthStore();
        const isAdmin = isSuperUser();
        const isLoggedIn = Cookies.get("accessToken");
        const goToLogin =()=>{ router.push('/login');}
        return {
            authStore,
            isAdmin,
            isLoggedIn,
            goToLogin
        };
    },
});
</script>

<style scoped>
.sci-fi-navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    background-color: #0a0a0a;
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.4);
    position: sticky;
    top: 0;
    z-index: 1000;
    font-family: 'Orbitron', sans-serif;
    width: 100%; /* Ensures it spans across full width until the max-width */
    margin: 0 auto; /* Centers the navbar horizontally */
}

.sci-fi-navbar .logo {
    color: #00d2ff;
    font-size: 1.8em;
    font-weight: bold;
    text-shadow: 0 0 8px #00d2ff, 0 0 15px rgba(0, 210, 255, 0.6);
    transition: color 0.3s ease;
}

.sci-fi-navbar .nav-links {
    display: flex;
    list-style-type: none;
    gap: 24px;
}

.sci-fi-navbar .nav-links li a {
    color: #ffffff;
    font-size: 1.1em;
    text-decoration: none;
    position: relative;
    padding: 4px 0;
    transition: color 0.3s ease;
}

.sci-fi-navbar .nav-links li a:hover {
    color: #00d2ff;
}

.sci-fi-navbar .nav-links li a::before,
.sci-fi-navbar .nav-links li a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    background-color: #00d2ff;
    transition: width 0.3s ease;
}

.sci-fi-navbar .nav-links li a::before {
    top: 0;
    left: 0;
}

.sci-fi-navbar .nav-links li a::after {
    bottom: 0;
    right: 0;
}

.sci-fi-navbar .nav-links li a:hover::before,
.sci-fi-navbar .nav-links li a:hover::after {
    width: 100%;
}

.sci-fi-button.logout-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 15px rgba(255, 65, 108, 0.5);
}

.sci-fi-button.logout-btn:hover {
    background: linear-gradient(45deg, #ff416c, #ff4b2b);
    box-shadow: 0 0 15px #ff416c, 0 0 25px rgba(255, 65, 108, 0.7);
}

.sci-fi-button.login-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(45deg, #00d2ff, #3a0ca3);
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 15px rgba(13, 221, 248, 0.7);
}

.sci-fi-button.login-btn:hover {
    background: linear-gradient(45deg, #00d2ff, #3a0ca3);
    box-shadow: 0 0 15px #00d2ff, 0 0 25px rgba(13, 221, 248, 0.7);
}

</style>