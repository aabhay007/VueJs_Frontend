import { defineStore } from 'pinia';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axiosInstance from '../services/jwt/interceptor';

export const usePaymentStore = defineStore('payment', {
    state: () => ({
        stripe: null as Stripe | null,
        clientSecret: '' as string,
    }),
    actions: {
        async initializeStripe(publishableKey: string) {
            this.stripe = await loadStripe(publishableKey);
        },
        async createPaymentIntent(amount: number) {
            try {
                const response = await axiosInstance.post('create-payment-intent/', {
                   amount: amount
                });
                if (response.data.client_secret) {
                    this.clientSecret = response.data.client_secret;
                } else {
                    throw new Error('Failed to retrieve client secret');
                }
            } catch (error) {
                console.error('Error creating payment intent:', error);
                throw error;
            }
        },
    },
});
