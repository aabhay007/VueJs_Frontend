<template>
  <navbar/>
    <div class="fade-in">
      <div class="top-bar">
        <h2>Your Cart</h2>
      </div>
  
      <div v-if="cartItems && cartItems.length" class="items-grid">
        <div v-for="item in cartItems" :key="item.id" class="item-card">
          <div class="item-image">
            <img v-if="item.item_image_url" :src="item.item_image_url" alt="Item Image" />
            <span v-else>No image available</span>
          </div>
          <div class="item-info">
            <h3>{{ item.item_name }}</h3>
            <p>{{ parseFloat(item.item_price).toFixed(0) }}💸 x {{ item.quantity }}</p>
            <p><strong>Total: {{ (item.item_price * item.quantity).toFixed(2) }}💸</strong></p>
            <div class="action-buttons">
              <button class="sci-fi-button" @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              <button class="sci-fi-button" @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity === 1">-</button>
              <button class="sci-fi-button cancel" @click="removeItem(item.id)">Remove</button>
            </div>
          </div>
        </div>
      </div>
  
      <div v-else class="empty-cart">
        <p>Your cart is empty!</p>
      </div>
  
      <div class="cart-summary">
        <h3>Total Price: {{ totalPrice }}💸</h3>
        <button class="sci-fi-button success" @click="checkout">Checkout</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, onMounted, ref, computed } from "vue";
import Navbar from "../../components/navbar/Navbar.vue";
  import { useCartStore } from "../../store/cartStore";
import router from "../../router";
  
  export default defineComponent({
  components: { Navbar },
    setup() {
      const cartStore = useCartStore();
      const cartItems = ref(cartStore.cartItems);
      const totalPrice = computed(() => cartStore.totalPrice);
      const fetchCartItems = async () => {
        await cartStore.fetchCartItems();
        cartItems.value = cartStore.cartItems;
      };
  
      const updateQuantity = async (cartItemId: number, quantity: number) => {
        if (quantity > 0) {
          await cartStore.updateCartItem(cartItemId, quantity);
          // fetchCartItems();
        }
      };
  
      const removeItem = async (cartItemId: number) => {
        await cartStore.deleteCartItem(cartItemId);
        fetchCartItems();
      };
  
      const checkout = () => {
        router.push("/checkout");
      };
  
      onMounted(fetchCartItems);
  
      return {
        cartItems,
        updateQuantity,
        removeItem,
        checkout,
        totalPrice,
      };
    },
  });
  </script>
  
  <style scoped>
  .empty-cart {
    text-align: center;
    margin: 20px;
    color: #00d2ff;
    font-size: 1.2em;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
    color: #fff;
  }
  
  .cart-summary h3 {
    margin-bottom: 10px;
  }
  
  .sci-fi-button {
    margin: 6px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: linear-gradient(45deg, #00d2ff, #3a0ca3);
    color: #ffffff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 0 15px rgba(100, 100, 255, 0.5);
  }
  
  .sci-fi-button:hover {
    background: linear-gradient(45deg, #3a0ca3, #00d2ff);
    box-shadow: 0 0 15px #00d2ff, 0 0 25px rgba(0, 210, 255, 0.7);
  }
  
  .sci-fi-button.cancel {
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
  }
  
  .sci-fi-button.success {
    background: linear-gradient(45deg, #04700d, #1fdd19);
  }
  
  .sci-fi-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .items-grid {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
    gap: 16px;
    margin-top: 20px;
  }
  
  .item-card {
    background-color: #000;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 265px;
    height: 320px;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 210, 255, 0.5);
  }
  
  .item-image img {
    max-height: 150px;
  }
  
  .item-info {
    margin-top: 12px;
  }
  
  .item-info h3 {
    color: #ffffff;
    font-size: 1.2em;
    margin-bottom: 5px;
  }
  
  .item-info p {
    color: #00d2ff;
    font-weight: bold;
  }
  </style>
  