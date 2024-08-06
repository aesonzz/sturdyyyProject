// This is your test publishable API key.
const stripe = Stripe("pk_test_51P9XZ9CP02vDN9DMVntJ122Q0ziAHUQUdwWKHY0RGk9sc4QtUIz7lRaOfbKv18X3b0g43QQrPphaasAupyykCnzV00zj872SyZ");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}