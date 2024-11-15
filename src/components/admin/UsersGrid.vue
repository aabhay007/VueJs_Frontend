<template>
    <div class="container">
        <table class="">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>isAdmin</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.is_superuser ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>
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

        const fetchUsers = async () => {
            users.value = await adminStore.getAllUsers();
        };

        onMounted(fetchUsers);

        return {
            users,
        };
    }
});
</script>

<style scoped></style>
