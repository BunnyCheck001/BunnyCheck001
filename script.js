// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {

  // Add to Cart Button
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.dataset.productId;
      const productName = this.dataset.productName;
      const productPrice = parseFloat(this.dataset.productPrice);
      const productImage = this.dataset.productImage;
      
      addToCart(productId, productName, productPrice, productImage);
    });
  });

  // Add product to the cart
  function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(product => product.id === id);

    if (productIndex >= 0) {
      // Product already in cart, update quantity
      cart[productIndex].quantity += 1;
    } else {
      // New product, add to the cart
      cart.push({
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartUI();
  }

  // Update the Cart UI
  function updateCartUI() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('#cart-table-body');
    const cartSummary = document.querySelector('#cart-summary');
    const cartCount = document.querySelector('#cart-count');
    const cartTotal = document.querySelector('#cart-total');
    let total = 0;
    let count = 0;

    // Clear the cart table body
    cartTableBody.innerHTML = '';

    cart.forEach(product => {
      const productRow = document.createElement('tr');
      
      // Create product row elements
      productRow.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
        <td>${product.name}</td>
        <td>${product.price} MMK</td>
        <td>
          <input type="number" class="product-quantity" data-id="${product.id}" value="${product.quantity}" min="1">
        </td>
        <td class="product-total">${(product.price * product.quantity).toFixed(2)} MMK</td>
        <td><button class="remove-item-btn" data-id="${product.id}">Remove</button></td>
      `;
      
      cartTableBody.appendChild(productRow);
      
      // Calculate total and count
      total += product.price * product.quantity;
      count += product.quantity;
    });

    // Update the cart summary
    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2) + ' MMK';

    // Event listeners for removing items
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productId = this.dataset.id;
        removeFromCart(productId);
      });
    });

    // Event listeners for updating quantity
    const quantityInputs = document.querySelectorAll('.product-quantity');
    quantityInputs.forEach(input => {
      input.addEventListener('change', function() {
        const productId = this.dataset.id;
        const newQuantity = parseInt(this.value);
        updateProductQuantity(productId, newQuantity);
      });
    });
  }

  // Remove product from the cart
  function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart = cart.filter(product => product.id !== productId);
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Update product quantity in the cart
  function updateProductQuantity(productId, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(product => product.id === productId);

    if (productIndex >= 0 && newQuantity > 0) {
      cart[productIndex].quantity = newQuantity;
    } else {
      cart[productIndex].quantity = 1; // Prevent quantity less than 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Proceed to Checkout Button
  const checkoutButton = document.querySelector('#checkout-button');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', function() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      if (cart.length === 0) {
        alert('Your cart is empty! Please add items to the cart before proceeding.');
        return;
      }
      
      window.location.href = '/checkout.html'; // Redirect to checkout page
    });
  }

  // Order Form Submission
  const orderForm = document.querySelector('#order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = new FormData(orderForm);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (cart.length === 0) {
        alert('Your cart is empty! Please add items to the cart before submitting.');
        return;
      }

      const orderDetails = {
        userDetails: Object.fromEntries(formData),
        items: cart
      };

      // You can use an API here to submit the order details (mock example)
      console.log('Order submitted:', orderDetails);
      
      // Clear cart after order submission
      localStorage.removeItem('cart');
      window.location.href = '/success.html'; // Redirect to success page
    });
  }

  // Initialize the cart UI on page load
  updateCartUI();

});