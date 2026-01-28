import { CartAPI } from "./cart-api.js";

const BASE_URL = "http://localhost:3000";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


async function loadProductDetail() {
  if (!productId) {
    document.getElementById("product-detail-container").innerHTML =
      "<p class='text-danger'>Product not found</p>";
    return;
  }

  const res = await fetch(`${BASE_URL}/products/${productId}`);
  const product = await res.json();

  document.getElementById("product-detail-container").innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-5 mb-4">
        <img src="${product.image}" class="img-fluid rounded shadow">
      </div>
      <div class="col-md-7">
        <h2 class="fw-bold">${product.name}</h2>
        <p class="text-muted">${product.description}</p>
        <h4 class="text-primary mb-4">$${product.price}</h4>

        <button class="btn btn-primary btn-lg me-2"
          onclick='addToCart(${JSON.stringify(product)})'>
          <i class="bi bi-cart-plus me-1"></i> Add to Cart
        </button>

        <a href="product.html" class="btn btn-outline-secondary btn-lg">
          Back to Products
        </a>
      </div>
    </div>
  `;
}


window.addToCart = async function (product) {
  await CartAPI.add(product);
  await updateCartCount();
  alert("Added to cart");
};


async function updateCartCount() {
  const cart = await CartAPI.getAll();
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);

  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}


loadProductDetail();
updateCartCount();
