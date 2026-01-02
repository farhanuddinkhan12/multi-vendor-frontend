<template>
  <div class="pt-24 pb-16 bg-gray-50 min-h-screen flex justify-center">
    <div class="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">🛒 My Cart</h1>

      <!-- Empty Cart Message -->
      <div
        v-if="!cartItems || cartItems.length === 0"
        class="text-center text-gray-500 text-lg py-10 border border-dashed border-gray-300 rounded-lg bg-gray-50"
      >
        Your cart is empty 🛍️
      </div>

      <!-- Cart Items -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-100 border-b text-gray-700">
              <th class="p-4 font-semibold">Image</th>
              <th class="p-4 font-semibold">Product</th>
              <th class="p-4 font-semibold">Price</th>
              <th class="p-4 font-semibold">Quantity</th>
              <th class="p-4 font-semibold">Total</th>
              <th class="p-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cartItems"
              :key="item.id"
              class="border-b hover:bg-gray-50 transition duration-200"
            >
              <td class="p-4">
                <img
                  :src="item.product?.image_url || '/default-image.jpg'"
                  alt="Product"
                  class="w-16 h-16 object-cover rounded-lg shadow-sm"
                />
              </td>
              <td class="p-4 text-gray-800 font-medium">
                {{ item.product?.name }}
              </td>
              <td class="p-4 text-gray-600">${{ item.product?.price }}</td>
              <td class="p-4">{{ item.quantity }}</td>
              <td class="p-4 font-semibold text-gray-800">
                ${{ (item.product?.price * item.quantity).toFixed(2) }}
              </td>
              <td class="p-4 text-center">
                <button
                  @click="removeFromCart(item.id)"
                  class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Cart Total -->
      <div v-if="cartItems && cartItems.length > 0" class="text-right mt-10">
        <h2 class="text-3xl font-bold text-gray-800">Total: ${{ cartTotal }}</h2>

        <!-- Stripe Button -->
        <button
          class="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-200"
          @click="checkoutStripe"
        >
          Pay with Stripe
        </button>

        <!-- PayPal Button -->
        <div id="paypal-button-container" class="mt-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "CartView",

  computed: {
    ...mapGetters("cart", ["cartItems", "cartItemCount"]),

    cartTotal() {
      return this.cartItems
        .reduce((total, item) => {
          return total + (item.product?.price || 0) * item.quantity;
        }, 0)
        .toFixed(2);
    },
  },

  methods: {
    ...mapActions("cart", ["fetchCart", "removeFromCart"]),

    async checkoutStripe() {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/checkout-session", {
          name: "Cart Checkout",
          description: "Payment for items in cart",
          amount: this.cartTotal * 100,
        });

        const { url } = response.data;

        if (url) {
          window.location.href = url;
        } else {
          alert("Unable to start Stripe checkout session!");
        }
      } catch (error) {
        console.error("Stripe Checkout Error:", error);
        alert("Something went wrong during Stripe checkout!");
      }
    },

    async loadPayPal() {
      if (window.paypal) return;

      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AcOMk5TkjQ-v5cFpIAKKuxa5UX5fHfBku42u2-OLvMiAywQWzIduEQ-cSElSZcup_DqvodOMhjazBCv_&currency=USD";
      script.async = true;

      script.onload = () => {
        this.renderPayPalButton();
      };

      document.body.appendChild(script);
    },

    renderPayPalButton() {
      if (!window.paypal) return;

      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.cartTotal,
                  },
                },
              ],
            });
          },

          onApprove: async (data, actions) => {
            await actions.order.capture();
            console.log("PayPal Order Details:"); // <--- Now it's used
            alert("Payment Successful via PayPal!");
            this.$router.push("/success");
          },

          onCancel: () => {
            alert("Payment Cancelled");
            this.$router.push("/cancel");
          },

          onError: (err) => {
            console.error("PayPal Error:", err);
            alert("PayPal payment failed");
          },
        })
        .render("#paypal-button-container");
    },
  },

  mounted() {
    this.$store.dispatch("cart/fetchCart");
    setTimeout(() => {
      this.renderPayPalButton();
    }, 500);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
