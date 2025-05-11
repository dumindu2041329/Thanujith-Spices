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

// Cart functionality
let cart = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderFeaturedProducts(); // From products.js
  renderAllProducts();      // From products.js
  updateCartCount();
  
  // Setup event listeners
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Mobile menu toggle
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
  }
  
  // Cart button
  if (cartButton) {
    cartButton.addEventListener('click', toggleCart);
  }
  
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
  
  // Close cart when clicking outside
  window.addEventListener('click', (e) => {
    if (cartOverlay && cartOverlay.classList.contains('hidden') === false && 
        !e.target.closest('.cart-container') && !e.target.closest('#cart-button')) {
      closeCart();
    }
  });
}

// Toggle mobile menu
function toggleMobileMenu() {
  navMenu.classList.toggle('show');
}

// Toggle cart overlay
function toggleCart() {
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
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p class="cart-item-price">රු. ${item.price}</p>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus" onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
          </div>
        </div>
        <div class="cart-item-total">
          <p>රු. ${itemTotal}</p>
          <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
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
}

// Show notification
function showNotification(message) {
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
  
  // In a real application, you would send this to a server
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
  
  // In a real application, you would send this to a server
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
