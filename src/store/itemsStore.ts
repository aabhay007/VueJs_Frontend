import { defineStore } from 'pinia';
import toast from '../services/toaster/toast';
import axiosInstance from '../services/jwt/interceptor';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string; // Add this if you want to handle images
}
interface ItemResponse{
  id: number;
  name: string;
  description: string;
  price: '';
  image_url: string;
}

export const useItemsStore = defineStore('items', {
  state: () => ({
    items: [] as Item[],
  }),
  actions: {
    async fetchItems(searchParam: string){
      try {
        const response = await axiosInstance.get<Item[]>(`items/?search=${searchParam}`);
        this.items = response.data;
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },
    async deleteItem(id: number) {
      try {
        await axiosInstance.delete(`delete-item/${id}/`);
        this.items = this.items.filter(item => item.id !== id);
        toast.info("Item deleted successfully!");
      } catch (error) {
        console.error('Failed to delete item:', error);
        toast.info("Unable to delete item!");
      }
    },
    async createItem(newItem: Item) {
      try {
        const response = await axiosInstance.post<Item>('add-item/', newItem);
        this.items.push(response.data); // Add the new item to the state
        toast.info("New Item Created Successfully!");
      } catch (error) {
        console.error('Failed to create item:', error);
        toast.info("Unable to create new item");
      }
    },
    async getItemById(id: number) {
      try {
        const response = await axiosInstance.get<Item>(`item-detail/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch item:', error);
        return null;
      }
    },
    async getItemDetails(id: number) {
      try {
        const response = await axiosInstance.get<ItemResponse>(`item-detail/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch item:', error);
        return null;
      }
    },
    async updateItem(item: Item) {
      try {
        const response = await axiosInstance.put(`update-item/${item.id}/`, item);
        const index = this.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
          this.items[index] = response.data; // Update the item in the list
        }
        toast.info("Item updated successfully");
      } catch (error) {
        console.error('Failed to update item:', error);
        toast.info("Unable to update item");
      }
    },
  },
});
