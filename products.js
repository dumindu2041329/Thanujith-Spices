// Products data
const products = [
  {
    id: 1,
    name: "කුරුඳු",
    price: 250,
    image: "https://images.unsplash.com/photo-1635355972494-3ab306a38206?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "අලුත්ම ඉහල ගුණාත්මක කුරුඳු, අත්තිකාරම් වැඩ සදහා සුදුසුයි.",
    isNew: true,
    rating: 4.5,
    featured: true,
    category: "කුළුබඩු" // spices
  },
  {
    id: 2,
    name: "ගම්මිරිස්",
    price: 300,
    image: "https://images.unsplash.com/photo-1599683305031-f59845a474a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "සාම්ප්‍රදායික ක්‍රමයට වගා කරන ලද ගම්මිරිස්, කල් තබා ගැනීමට සුදුසුයි.",
    rating: 5,
    featured: true,
    category: "කුළුබඩු" // spices
  },
  {
    id: 3,
    name: "කරාබුනැටි",
    price: 200,
    image: "https://images.unsplash.com/photo-1629034441270-b3f895c3c13a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "තේරූ ගති ඇති කරාබුනැටි, යහපත් සුවඳ හා රස ගුණයෙන් යුතුයි.",
    isDiscount: true,
    rating: 4,
    featured: true,
    category: "කුළුබඩු" // spices
  },
  {
    id: 4,
    name: "කහ",
    price: 180,
    image: "https://images.unsplash.com/photo-1615485500796-371ee0890bd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "නිරෝගීමත් දිවියකට අවශ්‍ය ඉහල ගුණාත්මක කහ කුඩු.",
    rating: 3.5,
    featured: true,
    category: "කුඩු" // powders
  },
  {
    id: 5,
    name: "සාදික්කා",
    price: 350,
    image: "https://images.unsplash.com/photo-1633164227993-c41a2351b6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "ඉහල ගුණාත්මක සාදික්කා, සෞඛ්‍ය සම්පන්න ආහාර රසට.",
    rating: 4.5,
    category: "කුළුබඩු" // spices
  },
  {
    id: 6,
    name: "බුලත්",
    price: 150,
    image: "https://images.unsplash.com/photo-1592129899081-76b170e3a2bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "සාම්ප්‍රදායික අවශ්‍යතා සඳහා සුදුසු ගුණාත්මක බුලත්.",
    rating: 4,
    category: "පැළ" // plants
  },
  {
    id: 7,
    name: "එනසාල්",
    price: 280,
    image: "https://images.unsplash.com/photo-1642892248349-3bd8832fa6bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "පිරිසිදු එනසාල්, ඕනෑම ආහාරයකට සුදුසුයි.",
    isNew: true,
    rating: 4,
    category: "කුළුබඩු" // spices
  },
  {
    id: 8,
    name: "දුරු",
    price: 220,
    image: "https://images.unsplash.com/photo-1603503369706-36a8e1df0d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    description: "උසස් ගුණාත්මක දුරු, ආහාර සඳහා හොඳම තේරීම.",
    isDiscount: true,
    rating: 3.5,
    category: "කුළුබඩු" // spices
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

// Get all categories
function getAllCategories() {
  const categories = [...new Set(products.map(product => product.category).filter(Boolean))];
  return categories;
}

// Filter products by category
function filterProductsByCategory(category) {
  if (!category || category === 'all') {
    return products;
  }
  return products.filter(product => product.category === category);
}

// Filter products by price range
function filterProductsByPrice(minPrice, maxPrice) {
  return products.filter(product => {
    if (minPrice && maxPrice) {
      return product.price >= minPrice && product.price <= maxPrice;
    } else if (minPrice) {
      return product.price >= minPrice;
    } else if (maxPrice) {
      return product.price <= maxPrice;
    }
    return true;
  });
}

// Apply multiple filters
function applyFilters(filters) {
  let filteredProducts = products;
  
  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category);
  }
  
  // Apply price range filter
  if (filters.minPrice || filters.maxPrice) {
    filteredProducts = filteredProducts.filter(product => {
      const price = product.price;
      const minPrice = filters.minPrice || 0;
      const maxPrice = filters.maxPrice || Infinity;
      return price >= minPrice && price <= maxPrice;
    });
  }
  
  // Apply search term filter
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  return filteredProducts;
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
function renderAllProducts(filters = {}) {
  const allProductsContainer = document.getElementById('all-products');
  const noProductsFound = document.getElementById('no-products-found');
  if (!allProductsContainer) return;
  
  // Apply filters or get all products
  const filteredProducts = Object.keys(filters).length > 0 
    ? applyFilters(filters) 
    : getAllProducts();
    
  let productsHTML = '';
  
  // Check if we have products after filtering
  if (filteredProducts.length === 0) {
    if (noProductsFound) {
      noProductsFound.classList.remove('hidden');
    }
    allProductsContainer.innerHTML = '';
    return;
  }
  
  // Hide the "no products found" message if we have products
  if (noProductsFound) {
    noProductsFound.classList.add('hidden');
  }
  
  filteredProducts.forEach(product => {
    productsHTML += generateProductCard(product);
  });
  
  allProductsContainer.innerHTML = productsHTML;
}

// Filter products by search term
function filterProducts(searchTerm) {
  // Create filter object with search term
  const filters = {
    searchTerm: searchTerm
  };
  
  // Get current category and price range if available
  const categoryFilter = document.getElementById('category-filter');
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  
  if (categoryFilter && categoryFilter.value !== 'all') {
    filters.category = categoryFilter.value;
  }
  
  if (minPriceInput && minPriceInput.value) {
    filters.minPrice = parseInt(minPriceInput.value);
  }
  
  if (maxPriceInput && maxPriceInput.value) {
    filters.maxPrice = parseInt(maxPriceInput.value);
  }
  
  // Apply all filters
  renderAllProducts(filters);
}

// Initialize and setup filters
document.addEventListener('DOMContentLoaded', function() {
  // Initialize category filter with options
  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    const categories = getAllCategories();
    let categoryOptions = '<option value="all">සියලු වර්ග</option>';
    
    categories.forEach(category => {
      categoryOptions += `<option value="${category}">${category}</option>`;
    });
    
    categoryFilter.innerHTML = categoryOptions;
    
    // Add event listener for category filter
    categoryFilter.addEventListener('change', function() {
      applyAllFilters();
    });
  }
  
  // Set up price filter button
  const priceFilterBtn = document.getElementById('price-filter-btn');
  if (priceFilterBtn) {
    priceFilterBtn.addEventListener('click', function() {
      applyAllFilters();
    });
  }
  
  // Set up search functionality
  const searchInput = document.getElementById('product-search');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      applyAllFilters();
    });
  }
  
  // Function to collect all current filter values and apply them
  function applyAllFilters() {
    const searchInput = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
  
    const searchTerm = searchInput ? searchInput.value.trim() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const minPrice = minPriceInput ? parseInt(minPriceInput.value) || 0 : 0;
    const maxPrice = maxPriceInput ? parseInt(maxPriceInput.value) || 0 : 0;
      
    const filters = {};
    
    if (searchTerm) filters.searchTerm = searchTerm;
    if (category !== 'all') filters.category = category;
    if (minPrice > 0) filters.minPrice = minPrice;
    if (maxPrice > 0) filters.maxPrice = maxPrice;
    
    renderAllProducts(filters);
  }
});
