<template>
    <div class="payment-container">
      <h2>Complete Your Payment</h2>
  
      <form @submit.prevent="handlePayment">
        <div class="payment-info">
          <label for="amount">Amount (💸):</label>
          <input
            type="number"
            id="amount"
            v-model.number="amount"
            min="1"
            placeholder="Enter amount"
            required
          />
        </div>
        <button class="sci-fi-button success" :disabled="loading" type="submit">
          {{ loading ? "Processing..." : "Pay Now" }}
        </button>
      </form>
  
      <div v-if="paymentError" class="error-message">
        <p>{{ paymentError }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from "vue";
  import { usePaymentStore } from "../../store/paymentStore";
  
  export default defineComponent({
    name: "PaymentForm",
    setup() {
      const paymentStore = usePaymentStore();
  
      const amount = ref(0); // User input amount
      const loading = ref(false); // Loading state for button
      const paymentError = ref<string | null>(null); // Error message
  
      const handlePayment = async () => {
        loading.value = true;
        paymentError.value = null;
  
        try {
          // Call the payment store to create a PaymentIntent
          await paymentStore.createPaymentIntent(amount.value);
  
          if (paymentStore.stripe && paymentStore.clientSecret) {
            const { error } = await paymentStore.stripe.confirmPayment({
              elements: paymentStore.stripe.elements!,
              confirmParams: {
                return_url: "http://yourdomain.com/success", // Update with your success page
              },
            });
  
            if (error) {
              paymentError.value = error.message || "Payment failed. Please try again.";
            } else {
              console.log("Payment succeeded!");
            }
          } else {
            throw new Error("Stripe not initialized or client secret missing.");
          }
        } catch (error: any) {
          paymentError.value = error.message || "An error occurred during payment.";
        } finally {
          loading.value = false;
        }
      };
  
      return {
        amount,
        handlePayment,
        loading,
        paymentError,
      };
    },
  });
  </script>
  
  <style scoped>
  .payment-container {
    text-align: center;
    padding: 20px;
    color: #fff;
    background-color: #000;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    max-width: 400px;
    margin: auto;
  }
  
  .payment-info {
    margin-bottom: 20px;
  }
  
  .payment-info label {
    color: #00d2ff;
    font-weight: bold;
  }
  
  .payment-info input {
    margin-top: 10px;
    padding: 8px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #1e1e1e;
    color: #fff;
    font-size: 16px;
  }
  
  .payment-info input:focus {
    outline: none;
    box-shadow: 0 0 8px #00d2ff;
  }
  
  .error-message {
    margin-top: 20px;
    color: #ff4b2b;
    font-weight: bold;
    animation: fade-in 0.5s ease-in-out;
  }
  
  .sci-fi-button {
    margin-top: 15px;
  }
  </style>
  