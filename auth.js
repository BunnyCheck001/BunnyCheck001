// auth.js
document.addEventListener('DOMContentLoaded', function () {

  // Login form submission
  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;

      // You should replace this with actual login API call
      if (email && password) {
        // Mocking successful login
        const user = { email: email, token: 'fake-jwt-token' };  // This would be replaced by actual authentication logic
        localStorage.setItem('user', JSON.stringify(user));  // Store user info in localStorage

        window.location.href = '/index.html';  // Redirect to homepage after login
      } else {
        alert('Please fill in all the fields.');
      }
    });
  }

  // Register form submission
  const registerForm = document.querySelector('#register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.querySelector('#register-email').value;
      const password = document.querySelector('#register-password').value;

      // Replace this with an actual registration API call
      if (email && password) {
        // Mocking successful registration
        const user = { email: email, token: 'fake-jwt-token' };  // Replace with real user data
        localStorage.setItem('user', JSON.stringify(user));  // Store user data

        window.location.href = '/login.html';  // Redirect to login page after successful registration
      } else {
        alert('Please fill in all fields.');
      }
    });
  }

  // Logout functionality
  const logoutButton = document.querySelector('#logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('user');  // Remove user session from localStorage
      window.location.href = '/login.html';  // Redirect to login page after logout
    });
  }

});