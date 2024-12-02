<template>
    <div>
      <div class="top-bar">
        <h2>Checkout</h2>
      </div>
  
      <div v-if="cartItems.length > 0" class="checkout-container">
        <div class="cart-items">
          <h3>Your Cart</h3>
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-image">
              <img :src="item.item_image_url" alt="Item Image" />
            </div>
            <div class="item-info">
              <h4>{{ item.item_name }}</h4>
              <p>Price: {{ item.item_price }}💸</p>
              <p>Quantity: {{ item.quantity }}</p>
            </div>
          </div>
        </div>
  
        <div class="checkout-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {{ totalItems }}</p>
          <p>Total Amount: {{ totalAmount }}💸</p>
          <button class="sci-fi-button success" @click="onCheckout">Proceed to Pay</button>
        </div>
      </div>
  
      <div v-else class="empty-cart">
        <h3>Your cart is empty. Go add some items!</h3>
        <button class="sci-fi-button" @click="goBackToShop">Go to Cart</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from "vue";
  import { useCartStore } from "../../store/cartStore";
  import toast from "../../services/toaster/toast";
  
  export default defineComponent({
    setup() {
      const cartStore = useCartStore();
      const cartItems = ref([]);
      const totalAmount = ref(0);
      const totalItems = ref(0);
  
      const fetchCartDetails = async () => {
        await cartStore.fetchCartItems();
        cartItems.value = cartStore.cartItems || [];
        totalAmount.value = cartStore.totalPrice || 0;
        totalItems.value = cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
      };
  
      const onCheckout = () => {
        toast.success("Your order has been placed!"); // Simulate order success
        // cartStore.clearCart(); // Assuming you have a method in your store to clear the cart
      };
  
      const goBackToShop = () => {
        // Redirect to shop or home page
        window.location.href = "/cart";
      };
  
      onMounted(fetchCartDetails);
  
      return {
        cartItems,
        totalAmount,
        totalItems,
        onCheckout,
        goBackToShop,
      };
    },
  });
  </script>
  
  <style scoped>
  .checkout-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .cart-items {
    flex: 2;
    padding: 20px;
    background-color: #000;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    background-color: #111;
    padding: 10px;
    border-radius: 5px;
  }
  
  .cart-item img {
    width: 80px;
    height: 80px;
    margin-right: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
  }
  
  .cart-item h4 {
    color: #fff;
  }
  
  .cart-item p {
    color: #00d2ff;
  }
  
  .checkout-summary {
    flex: 1;
    padding: 20px;
    background-color: #111;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  .empty-cart {
    text-align: center;
    margin-top: 50px;
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
  
  .sci-fi-button.success {
    background: linear-gradient(45deg, #04700d, #1fdd19);
  }
  
  .sci-fi-button:hover {
    background: linear-gradient(45deg, #3a0ca3, #00d2ff);
    box-shadow: 0 0 15px #00d2ff, 0 0 25px rgba(0, 210, 255, 0.7);
  }
  
  .sci-fi-button.cancel {
    background: linear-gradient(45deg, #ff4b2b, #ff416c);
  }
  </style>
  