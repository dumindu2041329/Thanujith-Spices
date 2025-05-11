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
const themeToggle = document.getElementById('theme-toggle');

// Constants
const SHIPPING_COST = 350; // රු. 350

// Initialize checkout page
document.addEventListener('DOMContentLoaded', () => {
  // Load cart
  loadCart();
  
  // Check if cart is empty
  if (cart.length === 0) {
    showEmptyCheckout();
  } else {
    // Render checkout
    renderCheckoutItems();
    calculateTotals();
  }
  
  // Setup event listeners
  setupCheckoutEventListeners();
  
  // Initialize theme
  initTheme();
});

// Setup checkout event listeners
function setupCheckoutEventListeners() {
  // Checkout form submission
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

// Show empty checkout state
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
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + SHIPPING_COST
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

// Theme Functions
function initTheme() {
  // Check if user previously set a theme preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateThemeIcon(false);
  }
}

function toggleTheme() {
  const isDarkTheme = document.body.classList.toggle('dark-theme');
  
  // Save preference to localStorage
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  
  // Update icon
  updateThemeIcon(isDarkTheme);
  
  // Show notification
  showNotification(isDarkTheme ? 'අඳුරු තේමාව සක්‍රිය කර ඇත' : 'ආලෝකමත් තේමාව සක්‍රිය කර ඇත');
}

function updateThemeIcon(isDarkTheme) {
  if (!themeToggle) return;
  
  // Update the icon based on current theme
  if (isDarkTheme) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.setAttribute('title', 'Switch to Light Mode');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('title', 'Switch to Dark Mode');
  }
}

// Show notification (simplified version since we don't have the cart notification element)
function showNotification(message) {
  console.log(message);
}
