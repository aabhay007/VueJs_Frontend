import { defineStore } from 'pinia';
import axios from 'axios';
import toast from '../services/toaster/toast';

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
    async fetchItems() {
      try {
        const response = await axios.get<Item[]>('http://127.0.0.1:8000/api/items/');
        this.items = response.data;
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    },
    async deleteItem(id: number) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/delete-item/${id}/`);
        this.items = this.items.filter(item => item.id !== id);
        toast.info("Item deleted successfully!");
      } catch (error) {
        console.error('Failed to delete item:', error);
        toast.info("Unable to delete item!");
      }
    },
    async createItem(newItem: Item) {
      try {
        const response = await axios.post<Item>('http://127.0.0.1:8000/api/add-item/', newItem);
        this.items.push(response.data); // Add the new item to the state
        toast.info("New Item Created Successfully!");
      } catch (error) {
        console.error('Failed to create item:', error);
        toast.info("Unable to create new item");
      }
    },
    async getItemById(id: number) {
      try {
        const response = await axios.get<Item>(`http://127.0.0.1:8000/api/item-detail/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch item:', error);
        return null;
      }
    },
    async getItemDetails(id: number) {
      try {
        const response = await axios.get<ItemResponse>(`http://127.0.0.1:8000/api/item-detail/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch item:', error);
        return null;
      }
    },
    async updateItem(item: Item) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/update-item/${item.id}/`, item);
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
