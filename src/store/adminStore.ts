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
                console.log(error);
            }
        }
    }
})