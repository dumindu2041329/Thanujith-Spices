// Products data
const products = [
  {
    id: 1,
    name: "කුරුඳු",
    price: 250,
    image: "https://pixabay.com/get/gf2406bc7c8da4b6d5942fd041b56bdcd376b7ca5d08f974449d944aeacb7cf82edc9270e858b2f21512b27dda320cc3d_1280.jpg",
    description: "අලුත්ම ඉහල ගුණාත්මක කුරුඳු, අත්තිකාරම් වැඩ සදහා සුදුසුයි.",
    isNew: true,
    rating: 4.5,
    featured: true
  },
  {
    id: 2,
    name: "ගම්මිරිස්",
    price: 300,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600",
    description: "සාම්ප්‍රදායික ක්‍රමයට වගා කරන ලද ගම්මිරිස්, කල් තබා ගැනීමට සුදුසුයි.",
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: "කරාබුනැටි",
    price: 200,
    image: "https://pixabay.com/get/g2b132bacff79da7e4d1b5a20247222c4afb9e7fab38a7931af974d13e1845b6f50d419d9ec38518da5464d60b411963a5ce1072506525500a092bc96623c999f_1280.jpg",
    description: "තේරූ ගති ඇති කරාබුනැටි, යහපත් සුවඳ හා රස ගුණයෙන් යුතුයි.",
    isDiscount: true,
    rating: 4,
    featured: true
  },
  {
    id: 4,
    name: "කහ",
    price: 180,
    image: "https://pixabay.com/get/g4c7492cbd1f70e3aaee84444e5d9ac2a8967b6c905c82c9dc5042bb73c26cb6eeb2c3b1da75482d273a73b89e3354207067b89299c8fd337b9db130b3f950d4b_1280.jpg",
    description: "නිරෝගීමත් දිවියකට අවශ්‍ය ඉහල ගුණාත්මක කහ කුඩු.",
    rating: 3.5,
    featured: true
  },
  {
    id: 5,
    name: "සාදික්කා",
    price: 350,
    image: "https://images.unsplash.com/photo-1618981862233-9af7a7fe6c6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "ඉහල ගුණාත්මක සාදික්කා, සෞඛ්‍ය සම්පන්න ආහාර රසට.",
    rating: 4.5
  },
  {
    id: 6,
    name: "බුලත්",
    price: 150,
    image: "https://images.unsplash.com/photo-1615485251929-32c2dca40daf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "සාම්ප්‍රදායික අවශ්‍යතා සඳහා සුදුසු ගුණාත්මක බුලත්.",
    rating: 4
  },
  {
    id: 7,
    name: "එනසාල්",
    price: 280,
    image: "https://images.unsplash.com/photo-1615485290174-6566f996b349?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "පිරිසිදු එනසාල්, ඕනෑම ආහාරයකට සුදුසුයි.",
    isNew: true,
    rating: 4
  },
  {
    id: 8,
    name: "දුරු",
    price: 220,
    image: "https://images.unsplash.com/photo-1615485290441-8725a366c61f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    description: "උසස් ගුණාත්මක දුරු, ආහාර සඳහා හොඳම තේරීම.",
    isDiscount: true,
    rating: 3.5
  }
];

// Get featured products
function getFeaturedProducts() {
  return products.filter(product => product.featured);
}

// Get all products
function getAllProducts() {
  return products;
}

// Get product by id
function getProductById(id) {
  return products.find(product => product.id === parseInt(id));
}

// Generate star rating HTML
function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  let starsHTML = '';
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  
  // Add empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }
  
  return starsHTML;
}

// Generate product card HTML
function generateProductCard(product) {
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.isNew ? '<span class="badge new-badge">නව</span>' : ''}
        ${product.isDiscount ? '<span class="badge discount-badge">වට්ටම්</span>' : ''}
      </div>
      <div class="product-details">
        <h3>${product.name}</h3>
        <div class="product-meta">
          <span class="product-price">රු. ${product.price}</span>
          <div class="product-rating">
            ${generateStarRating(product.rating)}
          </div>
        </div>
        <p class="product-description">${product.description}</p>
        <button class="btn add-to-cart-btn" onclick="addToCart(${product.id})">
          <i class="fas fa-shopping-cart"></i> කරට්ටුවට එක් කරන්න
        </button>
      </div>
    </div>
  `;
}

// Render featured products
function renderFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featured-products');
  if (!featuredProductsContainer) return;
  
  const featuredProducts = getFeaturedProducts();
  let productsHTML = '';
  
  featuredProducts.forEach(product => {
    productsHTML += generateProductCard(product);
  });
  
  featuredProductsContainer.innerHTML = productsHTML;
}

// Render all products
function renderAllProducts() {
  const allProductsContainer = document.getElementById('all-products');
  if (!allProductsContainer) return;
  
  const allProducts = getAllProducts();
  let productsHTML = '';
  
  allProducts.forEach(product => {
    productsHTML += generateProductCard(product);
  });
  
  allProductsContainer.innerHTML = productsHTML;
}

// Filter products
function filterProducts(searchTerm) {
  const allProductsContainer = document.getElementById('all-products');
  if (!allProductsContainer) return;
  
  const noProductsFoundMessage = document.getElementById('no-products-found');
  
  const filteredProducts = getAllProducts().filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (filteredProducts.length === 0) {
    allProductsContainer.innerHTML = '';
    noProductsFoundMessage.classList.remove('hidden');
  } else {
    let productsHTML = '';
    
    filteredProducts.forEach(product => {
      productsHTML += generateProductCard(product);
    });
    
    allProductsContainer.innerHTML = productsHTML;
    noProductsFoundMessage.classList.add('hidden');
  }
}