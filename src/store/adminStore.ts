import { defineStore } from "pinia";
import toast from "../services/toaster/toast";
import axiosInstance from "../services/jwt/interceptor";


export const useAdminStore = defineStore('admin', {
    actions: {
        async getAllUsers() {
            try {
                const response = await axiosInstance.get(`users/`);
                return response.data;
            }
            catch (error) {
                toast.info("Error getting users!");
                console.error(error);
            }
        },
        async getUser(id: number) {
            try {
                const response = await axiosInstance.get(`users/${id}/`);
                return response.data;
            }
            catch (error) {
                toast.info("Error getting user!");
                console.error(error);
            }
        },
        async editUser(id: number) {
            try {
                const response = await axiosInstance.put(`users/${id}/`);
                return response.data;
            }
            catch (error) {
                toast.info("Error editing user!");
                console.log(error);
            }
        },
        async deleteUser(id: number) {
            const response = await axiosInstance.delete(`users/${id}/`);
            return response.data;
        }
    }
})