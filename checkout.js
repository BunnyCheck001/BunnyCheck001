// checkout.js
document.addEventListener('DOMContentLoaded', function () {

  // Checkout form submission
  const checkoutForm = document.querySelector('#checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const formData = new FormData(checkoutForm);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length === 0) {
        alert('Your cart is empty. Please add products to the cart.');
        return;
      }

      const orderDetails = {
        user: Object.fromEntries(formData),
        cart: cart
      };

      // Replace with actual order submission API
      console.log('Submitting order:', orderDetails);

      // Clear cart after submission
      localStorage.removeItem('cart');

      // Redirect to success page
      window.location.href = '/success.html';
    });
  }

});