const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Denim Jacket",
    category: "fashion",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Running Shoes",
    category: "fashion",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Table Lamp",
    category: "home",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Coffee Mug Set",
    category: "home",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Backpack",
    category: "fashion",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    category: "electronics",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80"
  }
];

const productsGrid = document.getElementById("productsGrid");
const productCount = document.getElementById("productCount");
const categoryButtons = document.querySelectorAll(".category-btn");
const searchInput = document.getElementById("searchInput");
const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cartSidebar = document.getElementById("cartSidebar");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const loginButton = document.getElementById("loginButton");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");
const checkoutButton = document.getElementById("checkoutButton");
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");

let selectedCategory = "all";
let cart = [];
let isLoggedIn = false;
let userEmail = "";

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function showProducts() {
  const searchText = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(function(product) {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchText);
    return matchesCategory && matchesSearch;
  });

  productCount.textContent = `${filteredProducts.length} product(s) found`;

  productsGrid.innerHTML = filteredProducts.map(function(product) {
    return `
      <article class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3>${product.name}</h3>
          <p class="product-price">${formatPrice(product.price)}</p>
          <button class="add-btn" type="button" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </article>
    `;
  }).join("");

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p class="empty-message">No products matched your search.</p>';
  }
}

function addToCart(productId) {
  const product = products.find(function(item) {
    return item.id === productId;
  });

  const cartProduct = cart.find(function(item) {
    return item.id === productId;
  });

  if (cartProduct) {
    cartProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  updateCart();
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(function(item) {
    return item.id !== productId;
  });

  updateCart();
}

function updateCart() {
  const totalItems = cart.reduce(function(total, item) {
    return total + item.quantity;
  }, 0);

  const totalPrice = cart.reduce(function(total, item) {
    return total + item.price * item.quantity;
  }, 0);

  cartCount.textContent = totalItems;
  cartTotal.textContent = formatPrice(totalPrice);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(function(item) {
    return `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price)} x ${item.quantity}</p>
        </div>
        <button class="remove-btn" type="button" onclick="removeFromCart(${item.id})">
          Remove
        </button>
      </div>
    `;
  }).join("");
}

function openCart() {
  cartSidebar.classList.add("open");
  overlay.classList.add("show");
}

function closeCartPanel() {
  cartSidebar.classList.remove("open");
  if (!loginModal.classList.contains("open") && !checkoutModal.classList.contains("open")) {
    overlay.classList.remove("show");
  }
}

function openModal(modal) {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  overlay.classList.add("show");
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");

  if (!cartSidebar.classList.contains("open")) {
    overlay.classList.remove("show");
  }
}

function closeAllPanels() {
  closeCartPanel();
  closeModal(loginModal);
  closeModal(checkoutModal);
}

function handleCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add a product first.");
    return;
  }

  if (!isLoggedIn) {
    alert("Please login before checkout.");
    openModal(loginModal);
    return;
  }

  closeCartPanel();
  openModal(checkoutModal);
}

categoryButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    categoryButtons.forEach(function(item) {
      item.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.category;
    showProducts();
  });
});

searchInput.addEventListener("input", showProducts);
cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartPanel);
loginButton.addEventListener("click", function() {
  if (isLoggedIn) {
    isLoggedIn = false;
    userEmail = "";
    loginButton.textContent = "Login";
    alert("You are logged out.");
  } else {
    openModal(loginModal);
  }
});

closeLogin.addEventListener("click", function() {
  closeModal(loginModal);
});

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  userEmail = document.getElementById("email").value;
  isLoggedIn = true;
  loginButton.textContent = "Logout";
  loginForm.reset();
  closeModal(loginModal);
  alert(`Welcome, ${userEmail}!`);
});

checkoutButton.addEventListener("click", handleCheckout);

closeCheckout.addEventListener("click", function() {
  closeModal(checkoutModal);
});

checkoutForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const payment = document.getElementById("payment").value;

  alert(`Thank you, ${fullName}! Your order was placed using ${payment}.`);
  cart = [];
  checkoutForm.reset();
  updateCart();
  closeModal(checkoutModal);
});

overlay.addEventListener("click", closeAllPanels);

showProducts();
updateCart();
