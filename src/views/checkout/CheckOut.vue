<template>
  <navbar />
  <div class="fade-in">
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

        <!-- Button to trigger card form -->
        <button
          class="sci-fi-button success"
          :disabled="loading"
          @click="onCheckout"
        >
          {{ loading ? "Processing Payment..." : "Proceed to Pay" }}
        </button>

        <!-- New Button to Complete Payment -->
        <button
          v-if="showPaymentButton"
          class="sci-fi-button secondary"
          :disabled="loading"
          @click="completePayment"
        >
          {{ loading ? "Processing Payment..." : "Complete Payment" }}
        </button>

        <div v-if="paymentError" class="error-message">{{ paymentError }}</div>
      </div>

      <!-- Stripe Card Element to mount -->
      <div id="card-element" class="card-element-container"></div>
    </div>

    <div v-else class="empty-cart">
      <h3>Your cart is empty. Go add some items!</h3>
      <button class="sci-fi-button" @click="goBackToShop">Go to Cart</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import { useCartStore } from "../../store/cartStore";
import { usePaymentStore } from "../../store/paymentStore"; // Payment store import
import toast from "../../services/toaster/toast";
import Navbar from "../../components/navbar/Navbar.vue";
import { StripeElements } from "@stripe/stripe-js"; // Stripe elements import

export default defineComponent({
  components: { Navbar },
  setup() {
    const cartStore = useCartStore();
    const paymentStore = usePaymentStore();

    const cartItems = ref([]);
    const totalAmount = computed(() => cartStore.totalPrice || 0);
    const totalItems = computed(() =>
      cartStore.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    );

    const loading = ref(false);
    const paymentError = ref<string | null>(null);
    const showPaymentButton = ref(false); // Controls visibility of the "Complete Payment" button

    const stripeElements = ref<StripeElements | null>(null); // Initialize elements ref

    const fetchCartDetails = async () => {
      await cartStore.fetchCartItems();
      cartItems.value = cartStore.cartItems || [];
    };

    const onCheckout = async () => {
      loading.value = true;
      paymentError.value = null;

      try {
        // Initialize Stripe and create payment intent
        await paymentStore.initializeStripe(
          "pk_test_51OdzTIFpiA74WvTWxmL6JVHTYuvqp95ur8Zz4J0Hw28gGP4Md7S3J0EhvnjLoECfrSBSjaG6z532sEL1Y7nF3qiY00YyPq9654"
        );
        await paymentStore.createPaymentIntent(totalAmount.value);

        if (paymentStore.stripe && paymentStore.clientSecret) {
          // Pass the clientSecret to initialize Elements with the correct Payment Intent
          if (!stripeElements.value) {
            stripeElements.value = paymentStore.stripe.elements({
              clientSecret: paymentStore.clientSecret,
            }); // Initialize with clientSecret
          }

          // Create the Stripe Payment Element and mount it to the DOM
          const paymentElement = stripeElements.value.create("payment");
          paymentElement.mount("#card-element"); // Mount it to the div in the template

          // Now show the "Complete Payment" button after the user enters card details
          showPaymentButton.value = true; // Show the "Complete Payment" button

        } else {
          throw new Error("Stripe initialization or client secret missing.");
        }
      } catch (error: any) {
        paymentError.value =
          error.message || "An error occurred during payment.";
        toast.error(paymentError.value);
      } finally {
        loading.value = false;
      }
    };

    const completePayment = async () => {
      loading.value = true;
      paymentError.value = null;

      try {
        // Confirm payment with the payment element
        const { error } = await paymentStore.stripe.confirmPayment({
          elements: stripeElements.value, // Pass initialized elements
          confirmParams: {
            return_url: "http://localhost:3000/", // Update to your success URL
          },
        });

        if (error) {
          throw new Error(
            error.message || "Payment failed. Please try again."
          );
        } else {
          toast.success("Payment successful! Redirecting...");
          cartStore.clearCart(); // Clear cart after success
          window.location.href = "/success"; // Redirect to success page
        }
      } catch (error: any) {
        paymentError.value =
          error.message || "An error occurred during payment.";
        toast.error(paymentError.value);
      } finally {
        loading.value = false;
      }
    };

    const goBackToShop = () => {
      window.location.href = "/cart"; // Navigate back to cart
    };

    onMounted(fetchCartDetails);

    return {
      cartItems,
      totalAmount,
      totalItems,
      onCheckout,
      completePayment,
      goBackToShop,
      loading,
      paymentError,
      showPaymentButton, // Bind the visibility of the payment button
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
