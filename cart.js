// cart.js
document.addEventListener("DOMContentLoaded", function () {

  // Add to cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      const productId = this.dataset.productId;
      const productName = this.dataset.productName;
      const productPrice = parseFloat(this.dataset.productPrice);
      const productImage = this.dataset.productImage;

      addToCart(productId, productName, productPrice, productImage);
    });
  });

  function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(product => product.id === id);

    if (productIndex >= 0) {
      cart[productIndex].quantity += 1; // Update quantity if product is already in the cart
    } else {
      cart.push({ id, name, price, image, quantity: 1 }); // Add new product
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart in localStorage
    updateCartUI();
  }

  // Remove product from cart
  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== id); // Remove product by ID
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Update product quantity
  function updateProductQuantity(id, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.id === id);

    if (productIndex >= 0) {
      cart[productIndex].quantity = quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Update cart UI
  function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.querySelector('#cart-table-body');
    const cartTotal = document.querySelector('#cart-total');
    let total = 0;

    cartTable.innerHTML = '';

    cart.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
        <td>${product.name}</td>
        <td>${product.price} MMK</td>
        <td><input type="number" class="quantity-input" data-id="${product.id}" value="${product.quantity}" min="1"></td>
        <td>${(product.price * product.quantity).toFixed(2)} MMK</td>
        <td><button class="remove-item-btn" data-id="${product.id}">Remove</button></td>
      `;

      cartTable.appendChild(row);
      total += product.price * product.quantity;
    });

    cartTotal.textContent = `Total: ${total.toFixed(2)} MMK`;

    // Event listeners for quantity update and item removal
    const removeButtons = document.querySelectorAll('.remove-item-btn');
    removeButtons.forEach(button => {
      button.addEventListener('click', function () {
        const productId = this.dataset.id;
        removeFromCart(productId);
      });
    });

    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
      input.addEventListener('change', function () {
        const productId = this.dataset.id;
        const quantity = parseInt(this.value);
        updateProductQuantity(productId, quantity);
      });
    });
  }

  updateCartUI(); // Update the cart UI when the page loads

});