// DOM Elements
const mobileMenuButton = document.getElementById('mobile-menu-button');
const navMenu = document.getElementById('nav-menu');
const cartButton = document.getElementById('cart-button');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartButton = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const clearCartButton = document.getElementById('clear-cart-btn');
const checkoutButton = document.getElementById('checkout-btn');
const cartNotification = document.getElementById('cart-notification');
const notificationText = document.getElementById('notification-text');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');
const contactForm = document.getElementById('contact-form');
const contactFormSuccess = document.getElementById('contact-form-success');
const productSearch = document.getElementById('product-search');
const themeToggle = document.getElementById('theme-toggle');
const goUpBtn = document.getElementById('go-up-btn');

// Cart functionality
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  updateCartCount();
  
  // Render products if on home or product page
  if (document.getElementById('featured-products')) {
    renderFeaturedProducts(); // From products.js
  }
  
  if (document.getElementById('all-products')) {
    renderAllProducts(); // From products.js
  }
  
  // Setup event listeners
  setupEventListeners();
  
  // Setup go-up button functionality
  setupGoUpButton();
  
  // Initialize theme
  initTheme();
});

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  // Cart button - make it work on all pages
  const allCartButtons = document.querySelectorAll('.cart-button-container button');
  allCartButtons.forEach(button => {
    button.addEventListener('click', toggleCart);
  });
  
  // Close cart button
  if (closeCartButton) {
    closeCartButton.addEventListener('click', closeCart);
  }
  
  // Clear cart button
  if (clearCartButton) {
    clearCartButton.addEventListener('click', clearCart);
  }
  
  // Checkout button
  if (checkoutButton) {
    checkoutButton.addEventListener('click', checkout);
  }
  
  // Newsletter form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', handleNewsletterSubmit);
  }
  
  // Contact form
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
  
  // Product search
  if (productSearch) {
    productSearch.addEventListener('input', handleProductSearch);
  }
  
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Close cart when clicking outside
  window.addEventListener('click', (e) => {
    if (cartOverlay && cartOverlay.classList.contains('hidden') === false && 
        !e.target.closest('.cart-container') && !e.target.closest('#cart-button')) {
      closeCart();
    }
  });
  
  // Add initial cart item event listeners if cart has items
  if (cartItems && cart.length > 0) {
    addCartItemEventListeners();
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  navMenu.classList.toggle('show');
}

// Toggle cart overlay
function toggleCart(event) {
  // Prevent propagation to stop click events from bubbling
  if (event) {
    event.stopPropagation();
  }
  
  renderCartItems();
  cartOverlay.classList.toggle('hidden');
  document.body.classList.toggle('no-scroll');
}

// Close cart
function closeCart() {
  cartOverlay.classList.add('hidden');
  document.body.classList.remove('no-scroll');
}

// Add to cart
function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartCount();
  showNotification(`${product.name} කරට්ටුවට එක් කරන ලදි!`);
}

// Update cart item quantity
function updateCartItemQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      cartItem.quantity = quantity;
      saveCart();
      renderCartItems();
      updateCartCount();
    }
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCartItems();
  updateCartCount();
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  renderCartItems();
  updateCartCount();
  showNotification('කරට්ටුව හිස් කරන ලදි!');
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from local storage
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Update cart count badge
function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
  }
}

// Render cart items
function renderCartItems() {
  if (!cartItems) return;
  
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">ඔබගේ කරට්ටුව හිස්ය</div>';
    if (cartTotalPrice) {
      cartTotalPrice.textContent = 'රු. 0';
    }
    return;
  }
  
  let cartHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    
    cartHTML += `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-price">රු. ${item.price}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus" data-id="${item.id}" data-quantity="${item.quantity - 1}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}" data-quantity="${item.quantity + 1}">+</button>
          </div>
        </div>
        <div class="cart-item-total">
          <p>රු. ${itemTotal}</p>
          <button class="remove-item-btn" data-id="${item.id}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  });
  
  cartItems.innerHTML = cartHTML;
  if (cartTotalPrice) {
    cartTotalPrice.textContent = `රු. ${total}`;
  }
  
  // Add event listeners for cart item buttons using event delegation
  addCartItemEventListeners();
}

// Show notification
function showNotification(message) {
  if (!cartNotification || !notificationText) return;
  
  notificationText.textContent = message;
  cartNotification.classList.remove('hidden');
  
  setTimeout(() => {
    cartNotification.classList.add('hidden');
  }, 3000);
}

// Handle newsletter form submit
function handleNewsletterSubmit(e) {
  e.preventDefault();
  
  const email = document.getElementById('newsletter-email').value;
  
  // Validate email
  if (!validateEmail(email)) {
    showNotification('වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න!');
    return;
  }
  
  // In a real app, this would be sent to a server
  console.log('Newsletter subscription:', email);
  
  // Show success message
  newsletterForm.parentElement.classList.add('hidden');
  newsletterSuccess.classList.remove('hidden');
  
  // Reset after 3 seconds
  setTimeout(() => {
    newsletterForm.reset();
    newsletterForm.parentElement.classList.remove('hidden');
    newsletterSuccess.classList.add('hidden');
  }, 3000);
}

// Handle contact form submit
function handleContactSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;
  
  // Validate required fields
  if (!name || !email || !message) {
    showNotification('කරුණාකර අනිවාර්ය ක්ෂේත්‍ර පුරවන්න!');
    return;
  }
  
  // Validate email
  if (!validateEmail(email)) {
    showNotification('වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න!');
    return;
  }
  
  // In a real app, this would be sent to a server
  console.log('Contact form submission:', { name, email, phone, message });
  
  // Show success message
  contactForm.classList.add('hidden');
  contactFormSuccess.classList.remove('hidden');
  
  // Reset after 5 seconds
  setTimeout(() => {
    contactForm.reset();
    contactForm.classList.remove('hidden');
    contactFormSuccess.classList.add('hidden');
  }, 5000);
}

// Validate email format
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Handle product search
function handleProductSearch(e) {
  const searchTerm = e.target.value;
  filterProducts(searchTerm); // From products.js
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    showNotification('ඔබගේ කරට්ටුව හිස්ය!');
    return;
  }
  
  // Redirect to checkout page
  window.location.href = 'checkout.html';
}

// Setup "Go Up" button functionality
function setupGoUpButton() {
  if (!goUpBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      goUpBtn.classList.add('show');
    } else {
      goUpBtn.classList.remove('show');
    }
  });
  
  // Scroll to top on click with enhanced smooth transition
  goUpBtn.addEventListener('click', () => {
    // Get current scroll position
    const startPosition = window.pageYOffset;
    const duration = 1000; // Duration in milliseconds (1 second)
    const startTime = performance.now();
    
    // Scroll animation function
    function scrollAnimation(currentTime) {
      const elapsedTime = currentTime - startTime;
      
      // Easing function (easeOutCubic)
      const scroll = easeOutCubic(elapsedTime, startPosition, -startPosition, duration);
      
      window.scrollTo(0, scroll);
      
      // Continue animation if not complete
      if (elapsedTime < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }
    
    // Easing equation for smooth transition (easeOutCubic)
    function easeOutCubic(t, b, c, d) {
      t /= d;
      t--;
      return c * (t * t * t + 1) + b;
    }
    
    // Start animation
    requestAnimationFrame(scrollAnimation);
  });
}

// Theme Functions - Centralized Implementation
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
  // Select all theme toggle buttons across all pages
  const themeToggles = document.querySelectorAll('.theme-toggle-button');
  
  // Update all theme toggle icons
  themeToggles.forEach(button => {
    if (isDarkTheme) {
      button.innerHTML = '<i class="fas fa-sun"></i>';
      button.setAttribute('title', 'Switch to Light Mode');
    } else {
      button.innerHTML = '<i class="fas fa-moon"></i>';
      button.setAttribute('title', 'Switch to Dark Mode');
    }
  });
}

// Handle cart item button clicks using event delegation
function addCartItemEventListeners() {
  if (!cartItems) return;
  
  // Use event delegation for cart item buttons
  cartItems.addEventListener('click', function(e) {
    // Stop propagation to prevent closing the cart when clicking buttons
    e.stopPropagation();
    
    // Quantity buttons
    if (e.target.classList.contains('quantity-btn') || e.target.parentElement.classList.contains('quantity-btn')) {
      const button = e.target.classList.contains('quantity-btn') ? e.target : e.target.parentElement;
      const productId = parseInt(button.dataset.id);
      const newQuantity = parseInt(button.dataset.quantity);
      updateCartItemQuantity(productId, newQuantity);
    }
    
    // Remove button
    if (e.target.classList.contains('remove-item-btn') || e.target.parentElement.classList.contains('remove-item-btn')) {
      const button = e.target.classList.contains('remove-item-btn') ? e.target : e.target.parentElement;
      const productId = parseInt(button.dataset.id);
      removeFromCart(productId);
    }
  });
}
