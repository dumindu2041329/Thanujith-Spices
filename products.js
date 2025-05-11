// Products data
const products = [
  {
    id: 1,
    name: "කුරුඳු",
    price: 250,
    image: "images/herbal.jpg",
    description: "අලුත්ම ඉහල ගුණාත්මක කුරුඳු, අත්තිකාරම් වැඩ සදහා සුදුසුයි.",
    isNew: true,
    rating: 4.5,
    featured: true
  },
  {
    id: 2,
    name: "ගම්මිරිස්",
    price: 300,
    image: "images/pepper.jpg",
    description: "සාම්ප්‍රදායික ක්‍රමයට වගා කරන ලද ගම්මිරිස්, කල් තබා ගැනීමට සුදුසුයි.",
    rating: 5,
    featured: true
  },
  {
    id: 3,
    name: "කරාබුනැටි",
    price: 200,
    image: "images/cloves.jpg",
    description: "තේරූ ගති ඇති කරාබුනැටි, යහපත් සුවඳ හා රස ගුණයෙන් යුතුයි.",
    isDiscount: true,
    rating: 4,
    featured: true
  },
  {
    id: 4,
    name: "කහ",
    price: 180,
    image: "images/Turmeric.jpg",
    description: "නිරෝගීමත් දිවියකට අවශ්‍ය ඉහල ගුණාත්මක කහ කුඩු.",
    rating: 3.5,
    featured: true
  },
  {
    id: 5,
    name: "සාදික්කා",
    price: 350,
    image: "images/nutmeg.jpg",
    description: "ඉහල ගුණාත්මක සාදික්කා, සෞඛ්‍ය සම්පන්න ආහාර රසට.",
    rating: 4.5
  },
  {
    id: 6,
    name: "බුලත්",
    price: 150,
    image: "images/Betel nut.jpg",
    description: "සාම්ප්‍රදායික අවශ්‍යතා සඳහා සුදුසු ගුණාත්මක බුලත්.",
    rating: 4
  },
  {
    id: 7,
    name: "එනසාල්",
    price: 280,
    image: "images/cardamom.jpg",
    description: "පිරිසිදු එනසාල්, ඕනෑම ආහාරයකට සුදුසුයි.",
    isNew: true,
    rating: 4
  },
  {
    id: 8,
    name: "දුරු",
    price: 220,
    image: "images/cumin.jpg",
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
