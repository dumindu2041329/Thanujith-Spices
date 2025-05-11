// DOM Elements
const checkoutItems = document.getElementById('checkout-items');
const subtotalAmount = document.getElementById('subtotal-amount');
const shippingAmount = document.getElementById('shipping-amount');
const totalAmount = document.getElementById('total-amount');
const checkoutForm = document.getElementById('checkout-form');
const checkoutEmpty = document.getElementById('checkout-empty');
const checkoutContent = document.getElementById('checkout-content');
const orderSuccess = document.getElementById('order-success');
const orderNumber = document.getElementById('order-number');

// Constants
const SHIPPING_COST = 350; // රු. 350

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
  // Load cart
  loadCart();
  
  // Check if cart is empty - immediately redirect to index if no items
  if (cart.length === 0) {
    // Show a brief notification
    showNotification('කරට්ටුව හිස්! මුල් පිටුවට යොමු කරමින්...');
    
    // Redirect to index page
    window.location.href = 'index.html';
    return; // Stop further execution
  }
  
  // If we have items, render checkout
  renderCheckoutItems();
  calculateTotals();
  
  // Setup event listeners
  setupCheckoutEventListeners();
  
  // Initialize theme (uses the centralized implementation from script.js)
  if (typeof initTheme === 'function') {
    initTheme();
  }
});

// Setup checkout event listeners
function setupCheckoutEventListeners() {
  // Checkout form submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
}

// Show empty checkout state - only used if there's a need to show empty state without redirecting
function showEmptyCheckout() {
  if (checkoutEmpty && checkoutContent) {
    checkoutEmpty.classList.remove('hidden');
    checkoutContent.classList.add('hidden');
  }
}

// Render checkout items
function renderCheckoutItems() {
  if (!checkoutItems) return;
  
  let checkoutHTML = '';
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    
    checkoutHTML += `
      <div class="checkout-item">
        <div class="checkout-item-info">
          <div class="checkout-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="checkout-item-details">
            <h4>${item.name}</h4>
            <p class="checkout-item-price">රු. ${item.price} x ${item.quantity}</p>
          </div>
        </div>
        <div class="checkout-item-total">
          <p>රු. ${itemTotal}</p>
        </div>
      </div>
    `;
  });
  
  checkoutItems.innerHTML = checkoutHTML;
}

// Calculate order totals
function calculateTotals() {
  if (!subtotalAmount || !totalAmount) return;
  
  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Set amounts
  subtotalAmount.textContent = `රු. ${subtotal}`;
  shippingAmount.textContent = `රු. ${SHIPPING_COST}`;
  totalAmount.textContent = `රු. ${subtotal + SHIPPING_COST}`;
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
  e.preventDefault();
  
  // Validate form
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('checkout-email').value;
  const phone = document.getElementById('checkout-phone').value;
  const address = document.getElementById('address').value;
  const city = document.getElementById('city').value;
  const district = document.getElementById('district').value;
  
  // Check required fields
  if (!fullName || !email || !phone || !address || !city || !district) {
    showNotification('කරුණාකර අනිවාර්ය ක්ෂේත්‍ර පුරවන්න!');
    return;
  }
  
  // Validate email
  if (!validateEmail(email)) {
    showNotification('වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න!');
    return;
  }
  
  // Validate phone number (basic validation)
  if (!validatePhone(phone)) {
    showNotification('වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න!');
    return;
  }
  
  // Get form data
  const formData = new FormData(checkoutForm);
  const orderData = {
    customer: {
      name: formData.get('full-name'),
      email: formData.get('checkout-email'),
      phone: formData.get('checkout-phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      district: formData.get('district'),
      postalCode: formData.get('postal-code'),
      notes: formData.get('notes')
    },
    payment: formData.get('payment'),
    cart: cart,
    subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    shipping: SHIPPING_COST,
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING_COST,
    orderDate: new Date().toISOString()
  };
  
  // In a real application, you would send this to a server
  console.log('Order data:', orderData);
  
  // Generate random order number
  const randomOrderNumber = 'TS-' + Math.floor(100000 + Math.random() * 900000);
  orderNumber.textContent = randomOrderNumber;
  
  // Show success message
  checkoutContent.classList.add('hidden');
  orderSuccess.classList.remove('hidden');
  
  // Clear cart
  cart = [];
  saveCart();
  updateCartCount();
}

// Validate email format
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Validate phone number format
function validatePhone(phone) {
  // Basic validation for Sri Lankan phone numbers
  // Accepts formats like: +94XXXXXXXXX, 0XXXXXXXXX
  const re = /^(\+94|0)[1-9][0-9]{8}$/;
  return re.test(phone);
}

// Show notification
function showNotification(message) {
  const cartNotification = document.getElementById('cart-notification');
  const notificationText = document.getElementById('notification-text');
  
  if (!cartNotification || !notificationText) return;
  
  notificationText.textContent = message;
  cartNotification.classList.remove('hidden');
  
  setTimeout(() => {
    cartNotification.classList.add('hidden');
  }, 3000);
}
