import { defineStore } from 'pinia';
import toast from '../services/toaster/toast'; 
import axiosInstance from '../services/jwt/interceptor'; 

// Define types for cart item and cart
interface CartItem {
  id: number;
  item_price: number;
  item_name: string;
  quantity: number;
  added_at: string;
  item_image_url:String;
}

interface Cart {
  id: number;
  user: number;
  items: CartItem[];
  created_at: string;
  updated_at: string;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
    loading: false,
  }),

  getters: {
    totalPrice: (state): number => {
      return state.cartItems.reduce((total, item) => {
        return total + item.item_price * item.quantity;
      }, 0);
    },
  },

  actions: {
    // Fetch all cart items
    async fetchCartItems(): Promise<void> {
      this.loading = true;
      try {
        const response = await axiosInstance.get<Cart>(`cart/`);
        this.cartItems = response.data.items; 
      } catch (error) {
        toast.error("Error fetching cart items!");
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    // Add item to cart
    async addToCart(itemId: number, quantity = 1): Promise<void> {
      try {
        const response = await axiosInstance.post<CartItem>(`cart/add/`, { item_id: itemId, quantity });
        const addedItem = response.data;

        // Update local cart state
        const existingItem = this.cartItems.find((item) => item.id === addedItem.id);
        if (existingItem) {
          existingItem.quantity = addedItem.quantity; 
        } else {
          this.cartItems.push(addedItem); 
        }
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Error adding item to cart!");
        console.error(error);
      }
    },

    // Update item quantity
    async updateCartItem(cartItemId: number, quantity: number): Promise<void> {
      try {
        const response = await axiosInstance.put<CartItem>(`cart/item/${cartItemId}/`, { quantity });
        const updatedItem = response.data;

        // Update local cart state
        const itemIndex = this.cartItems.findIndex((item) => item.id === updatedItem.id);
        if (itemIndex !== -1) {
          this.cartItems[itemIndex].quantity = updatedItem.quantity;
        }
        // toast.success("Cart item updated successfully!");
      } catch (error) {
        toast.error("Error updating cart item!");
        console.error(error);
      }
    },

    // Delete an item from the cart
    async deleteCartItem(cartItemId: number): Promise<void> {
      try {
        await axiosInstance.delete(`cart/item/${cartItemId}/`);

        // Remove item from local cart state
        this.cartItems = this.cartItems.filter((item) => item.id !== cartItemId);
        toast.info("Item removed from cart!");
      } catch (error) {
        toast.error("Error removing cart item!");
        console.error(error);
      }
    },
  },
});
