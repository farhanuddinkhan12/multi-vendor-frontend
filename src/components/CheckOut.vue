<template>
    <div class="checkout-container">
        <h2>Checkout Page</h2>

        <form @submit.prevent="checkout">
            <div>
                <label>Product Name:</label>
                <input v-model="product.name" required />
            </div>

            <div>
                <label>Description:</label>
                <input v-model="product.description" required />
            </div>

            <div>
                <label>Amount (USD):</label>
                <input v-model.number="product.amount" required />
            </div>

            <button type="submit">Pay with Stripe</button>
        </form>
    </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { reactive } from 'vue';

const product = reactive ({
    name:"",
    description: "",
    amount: null,
});
const checkout = async () => {
    try {
        const stripe = await loadStripe("pk_test_51SLJhPD7U5V95sgSTEfPocN75Oxw3GDn8Gr6DSGlSMtgwbDmGToZwAPqQ2xuDji3ZHUcRBYDkXYkfLF4Mi0MMpCg00yvnlnY6u");

        const response = await axios.post("http://127.0.0.1:8000/api/checkout-session", {
            name : product.name,
            description: product.description,
            amount: product.amount * 100, //cents
        });
        const sessionId = response.data.id;
        await stripe.redirectTocheckout({sessionId});
    } catch (error) {
        console.error("Stripe checkout Error:", error);
    }
}
</script>

<style scoped>
.checkout-container {
  max-width: 400px;
  margin: 50px auto;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 10px;
}
button {
  background: #6772e5;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
</style>