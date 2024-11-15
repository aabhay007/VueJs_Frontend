<template>
    <div class="app-layout">
        <Navbar />
        <div class="content">
            <UsersGrid />
        </div>
    </div>
</template>

<script setup>
import UsersGrid from '../../components/admin/UsersGrid.vue';
import Navbar from '../../components/navbar/Navbar.vue';
</script>

<style scoped>
.app-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #1a1a1a;
}
</style>
